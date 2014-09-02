var vNotify = (function() {

  var options = {
    fadeInDuration: 2000,
    fadeOutDuration: 2000,
    fadeInterval: 50,
    visibleDuration: 5000,
    postHoverVisibleDuration: 500
  };

  var info = function(text, title) {
    return addNotify('vnotify-info', text, title);
  };

  var success = function(text, title) {
    return addNotify('vnotify-success', text, title);
  };

  var error = function(text, title) {
    return addNotify('vnotify-error', text, title);
  };

  var warning = function(text, title) {
    return addNotify('vnotify-warning', text, title);
  };

  var notify = function(text, title) {
    return addNotify('vnotify-notify', text, title);
  };

  var addNotify = function(className, text, title) {
    var container = getNotifyContainer();

    var frag = document.createDocumentFragment();

    var item = document.createElement('div');
    item.classList.add('vnotify-item');
    item.classList.add(className);
    item.style.opacity = 0;

    if (title) {
        item.appendChild(addTitle(title));
    }
    item.appendChild(addText(text));

    item.visibleDuration = options.visibleDuration; //option

    var hideNotify = function() {
      item.fadeInterval = fade('out', options.fadeOutDuration, item);
    };

    var resetInterval = function() {
      clearTimeout(item.interval);
      clearTimeout(item.fadeInterval);
      item.style.opacity = null;
      item.visibleDuration = options.postHoverVisibleDuration;
    };

    var hideTimeout = function () {
      item.interval = setTimeout(hideNotify, item.visibleDuration);
    };

    frag.appendChild(item);
    container.appendChild(frag);

    item.addEventListener("mouseover", resetInterval);
    item.addEventListener("mouseout", hideTimeout);

    fade('in', options.fadeInDuration, item);
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
    var container = document.querySelector('.vnotify-container');
    return container ? container : createNotifyContainer();
  };

  var createNotifyContainer = function() {
    var frag = document.createDocumentFragment();
    container = document.createElement('div');
    container.classList.add('vnotify-container');
    container.setAttribute('role', 'alert');

    frag.appendChild(container);
    document.body.appendChild(frag);

    return container;
  };

  //New fade - based on http://toddmotto.com/raw-javascript-jquery-style-fadein-fadeout-functions-hugo-giraudel/
  var fade = function(type, ms, el) {
    var isIn = type === 'in',
      opacity = isIn ? 0 : el.style.opacity || 1,
      goal = isIn ? 0.8 : 0,
      gap = options.fadeInterval / ms;

    if(isIn) {
      el.style.display = 'block';
      el.style.opacity = opacity;
    }

    function func() {
      opacity = isIn ? opacity + gap : opacity - gap;
      el.style.opacity = opacity;

      if(opacity <= 0) {
        el.style.display = 'none';
        el.outerHTML = '';
        checkRemoveContainer();
      }
      if((!isIn && opacity <= goal) || (isIn && opacity >= goal)) {
        window.clearInterval(fading);
      }
    }

    var fading = window.setInterval(func, options.fadeInterval);
    return fading;
  };

  var checkRemoveContainer = function() {
    var item = document.querySelector('.vnotify-item');
    if (!item) {
      var container = document.querySelector('.vnotify-container');
      container.outerHTML = '';
      container = null;
    }
  };

  return {
    info: info,
    success: success,
    error: error,
    warning: warning,
    notify: notify,
    options: options
  };
})();
