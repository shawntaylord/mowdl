(function() {
  this.Mowdl = function() {
    this.closeButton = null; // necessary?
    this.mowdl = null;
    this.overlay = null;

    var defaults = {
      header: false,
      headerContent: '', // should be an id, needs data-mowdl
      footer: true,
      bodyContent: '', // should be an id, needs data-mowdl
      minWidth: 200,
      maxWidth: 800,
      maxHeight: 800,
      overlay: true,
      animation: 'fade-in', // fade-in, slide-right, fade-and-drop, slide-left,
      theme: 'black'
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
    _.mowdl.addEventListener('transitionend', function(event) {
      var parent = _.mowdl.parentNode;
      // If user clicks multiple time, ignore them.
      if (parent) {
        parent.removeChild(_.mowdl);
        parent.removeChild(_.overlay);
      }
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
    var contentHolder,
        header,
        docFrag;

    docFrag = document.createDocumentFragment();

    this.mowdl = document.createElement('aside');
    this.mowdl.className = [
      'mowdl-base',
      this.options.animation,
      this.options.theme,
      this.options.baseClass ? this.options.baseClass : ''
    ].join(' ');
    this.mowdl.style.minWidth = this.options.minWidth + 'px';
    this.mowdl.style.maxWidth = this.options.maxWidth + 'px';
    this.mowdl.style.maxHeight = this.options.maxHeight + 'px';

    // Mowdl Header
    if (this.options.header === true) {
      header = document.createElement('header');
      header.className = 'mowdl-header';
      var contents = document.querySelector(this.options.headerContent).cloneNode(true);

      if (contents.hasAttribute('data-mowdl')) {
        header.appendChild(contents);
      }
      this.mowdl.appendChild(header);
    }

    // Mowdl Contents
    var contents = document.querySelector(this.options.bodyContent).cloneNode(true);
    contentHolder = document.createElement('div');
    contentHolder.className = 'mowdl-content';
    contentHolder.appendChild(contents);
    this.mowdl.appendChild(contentHolder);


    if (this.options.footer === true) {
      var footer = document.createElement('footer');
      footer.className = 'mowdl-footer';
      this.closeButton = document.createElement('button');
      this.closeButton.className = 'mowdl-close';
      this.closeButton.innerHTML = 'Done';
      footer.appendChild(this.closeButton);
      this.mowdl.appendChild(footer);
    }

    if (this.options.overlay === true) {
      this.overlay = document.createElement('div');
      // TODO: Check if 'this.options.overlayClass' exists
      this.overlay.className = [
        'mowdl-overlay',
        this.options.overlayClass,
        this.options.theme
      ].join(' ');
      docFrag.appendChild(this.overlay);
    }

    docFrag.appendChild(this.mowdl);

    document.body.appendChild(docFrag);
  }

  function initializeEvents() {
    if (this.options.footer) {
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
