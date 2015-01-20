(function() {
  this.Mowdl = function() {
    this.closeButton = null;
    this.mowdl = null;
    this.overlay = null;

    var defaults = {
      closeButton: true,
      content: '',
      minWidth: 200,
      maxWidth: 800,
      overlay: true
    }

    if (arguments[0] && typeof arguments[0] === 'object') {
      this.options = extendDefaults(defaults, arguments[0]);
    } else {
      this.options = defaults;
    }
  }

  Mowdl.prototype.open = function() {
    mowdlize.call(this);
    initializeEvents.call(this);
    window.getComputedStyle(this.mowdl).height;
    this.mowdl.className = this.mowdl.className +
      (this.mowdl.offsetHeight > window.innerHeight ?
        " mowdl-open mowdl-anchored" : " mowdl-open");
    this.overlay.className = this.overlay.className + " mowdl-open";
  }

  Mowdl.prototype.close = function() {
    var _ = this;
    _.mowdl.className = _.mowdl.className.replace(' mowdl-open', '');
    _.overlay.className = _.overlay.className.replace(' mowdl-open', '');
    _.mowdl.addEventListener(this.transitionEnd, function() {
      // THIS DOESN'T WORK
      _.mowdl.parentNode.removeChild(_.mowdl);
    });
    _.overlay.addEventListener(this.transitionEnd, function() {
      // THIS DOESN'T WORK
      if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
    });
  }

  function extendDefaults(defaults, custom) {
    var property;
    for (property in custom) {
      if (custom.hasOwnProperty(property)) {
        defaults[property] = custom[property];
      }
    }
    return defaults;
  }
  
  function mowdlize() {
    var content,
        contentHolder,
        docFrag;

    if (typeof this.options.content === 'string') {
      content = this.options.content;
    } else {
      content = this.options.content.innerHTML;
    }

    docFrag = document.createDocumentFragment();

    this.mowdl = document.createElement('aside');
    this.mowdl.className = 'mowdl-base fade-and-drop ' +
      (this.options.baseClass ? this.options.baseClass : '');
    this.mowdl.style.minWidth = this.options.minWidth + 'px';
    this.mowdl.style.maxWidth = this.options.maxWidth + 'px';

    if (this.options.closeButton === true) {
      this.closeButton = document.createElement('button');
      this.closeButton.className = 'mowdl-close';
      this.closeButton.innerHTML = '&times;';
      this.mowdl.appendChild(this.closeButton);
    }

    if (this.options.overlay === true) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'mowdl-overlay ' + this.options.overlayClass;
      docFrag.appendChild(this.overlay);
    }

    contentHolder = document.createElement('div');
    contentHolder.className = 'mowdl-content';
    contentHolder.innerHTML = content;
    this.mowdl.appendChild(contentHolder);

    docFrag.appendChild(this.mowdl);

    document.body.appendChild(docFrag);
  }

  function initializeEvents() {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', this.close.bind(this));
    }
  }

  function transitionSelect() {
    var el = document.createElement("div");
    if (el.style.WebkitTransition) return "webkitTransitionEnd";
    if (el.style.OTransition) return "oTransitionEnd";
    return 'transitionend';
  }
}());