var vNotify = (function() {

  var info = function(text, title) {
    return addNotify('v-notify-info', text, title);
  };

  var success = function(text, title) {
    return addNotify('v-notify-success', text, title);
  };

  var error = function(text, title) {
    return addNotify('v-notify-error', text, title);
  };

  var warning = function(text, title) {
    return addNotify('v-notify-warning', text, title);
  };

  var notify = function(text, title) {
    return addNotify('v-notify-notify', text, title);
  };

  var addNotify = function(className, text, title) {
    var container = getNotifyContainer();

    var frag = document.createDocumentFragment();

    var item = document.createElement('div');
    item.classList.add('v-notify-item');
    item.classList.add(className);
    item.style.opacity = 0;

    if (title) {
        item.appendChild(addTitle(title));
    }
    item.appendChild(addText(text));

    var hideNotify = function() {
      fadeOut(item);
    };

    var resetInterval = function() {
      clearTimeout(item.interval);
    };

    var hideTimeout = function () {
      item.interval = setTimeout(hideNotify, 5000);
    };

    frag.appendChild(item);
    container.appendChild(frag);

    item.addEventListener("mouseover", resetInterval);
    item.addEventListener("mouseout", hideTimeout);

    fadeIn(item);
    hideTimeout();

    return item;
  };

  var addText = function(text) {
    var item = document.createElement('div');
    item.classList.add('vnotify-text');
    item.innerHTML = text;
    return item;
  };

  var addTitle = function(title) {
    var item = document.createElement('div');
    item.classList.add('vnotify-title');
    item.innerHTML = title;
    return item;
  };

  var getNotifyContainer = function() {

    var container = document.querySelector('.v-notify-container');

    if (container) {
      return container;
    }

    return createNotifyContainer();
  };

  var createNotifyContainer = function() {
    var frag = document.createDocumentFragment();
    container = document.createElement('div');
    container.classList.add('v-notify-container');

    frag.appendChild(container);
    document.body.appendChild(frag);

    return container;
  };


  /* Animations - Fade In and Out */
  /* Borrowed from this JsFiddle - http://jsfiddle.net/gabrieleromanato/cMp7s/ */
  var animate = function(options) {
        var start = new Date();
        var id = setInterval(function() {
            var timePassed = new Date() - start;
            var progress = timePassed / options.duration;
            if (progress > 1) {
                progress = 1;
            }
            options.progress = progress;
            var delta = options.delta(progress);
            options.step(delta);
            if (progress === 1) {
                clearInterval(id);
                if (options.complete){
                  options.complete();
                }
            }
        }, options.delay || 10);
    };
    var fadeOut = function(element) {
        var to = 1;
        animate({
            duration: 2000,
            delta: function(progress) {
                progress = this.progress;
                return 0.5 - Math.cos(progress * Math.PI) / 2;
            },
            complete: function () {
              element.style.display = 'none';
              element.outerHTML = '';
            },
            step: function(delta) {
                element.style.opacity = to - delta;
            }
        });
    };
    var fadeIn = function(element) {
        var to = 0;
        animate({
            duration: 2000,
            delta: function(progress) {
                progress = this.progress;
                return 0.5 - Math.cos(progress * Math.PI) / 2;
            },
            step: function(delta) {
                element.style.opacity = to + delta;
            }
        });
    };

  return {
    info: info,
    success: success,
    error: error,
    warning: warning,
    notify: notify
  };
})();
