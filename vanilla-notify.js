var notify = (function() {

  var info = function(text) {
    return addNotify('notify-info', text);
  };

  var success = function(text) {
    return addNotify('notify-success', text);
  };

  var error = function(text) {
    return addNotify('notify-error', text);
  };

  var warning = function(text) {
    return addNotify('notify-warning', text);
  };

  var notify = function(text) {
    return addNotify('notify-notify', text);
  };

  var addNotify = function(className, text) {
    var container = getNotifyContainer();

    var frag = document.createDocumentFragment();

    var item = document.createElement('div');
    item.classList.add('notify-item');
    item.classList.add(className);
    item.innerHTML = text;
    item.style.opacity = 0;

    frag.appendChild(item);

    container.appendChild(frag);

    var hideNotify = function() {
      fadeOut(item);
    };

    fadeIn(item);

    interval = setTimeout(hideNotify, 5000);

    return item;
  };

  var getNotifyContainer = function() {

    var container = document.querySelector('.notify-container');

    if (container) {
      return container;
    }

    return createNotifyContainer();
  };

  var createNotifyContainer = function() {
    var frag = document.createDocumentFragment();
    container = document.createElement('div');
    container.classList.add('notify-container');

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
