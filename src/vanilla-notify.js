class VanillaNotify {

    constructor() {
        this.positionOption = {
            topLeft: 'topLeft',
            topRight: 'topRight',
            bottomLeft: 'bottomLeft',
            bottomRight: 'bottomRight',
            center: 'center'
        };

        this.options = {
            fadeInDuration: 1000,
            fadeOutDuration: 1000,
            fadeInterval: 50,
            visibleDuration: 5000,
            postHoverVisibleDuration: 500,
            position: this.positionOption.topRight,
            sticky: false,
            showClose: true
        };
    }

    info(params) {
        params.notifyClass = 'vnotify-info';
        return this.addNotify(params);
    };

    success(params) {
        params.notifyClass = 'vnotify-success';
        return this.addNotify(params);
    };

    error(params) {
        params.notifyClass = 'vnotify-error';
        return this.addNotify(params);
    };

    warning(params) {
        params.notifyClass = 'vnotify-warning';
        return this.addNotify(params);
    };

    notify(params) {
        params.notifyClass = 'vnotify-notify';
        return this.addNotify(params);
    };

    custom(params) {
        return addNotify(params);
    };



    addNotify(params) {
        if (!params.title && !params.text) {
            return null;
        }

        let frag = document.createDocumentFragment();

        let item = document.createElement('div');
        item.classList.add('vnotify-item');
        item.classList.add(params.notifyClass);
        item.style.opacity = 0;

        item.options = this.getOptions(params);

        if (params.title) {
            item.appendChild(this.addTitle(params.title));
        }
        if (params.text) {
            item.appendChild(this.addText(params.text));
        }
        if (item.options.showClose) {
            item.appendChild(this.addClose(item));
        }

        item.visibleDuration = item.options.visibleDuration; //option

        let hideNotify = function() {
            item.fadeInterval = this.fade('out', item.options.fadeOutDuration, item);
        };

        let resetInterval = function() {
            clearTimeout(item.interval);
            clearTimeout(item.fadeInterval);
            item.style.opacity = null;
            item.visibleDuration = item.options.postHoverVisibleDuration;
        };

        let hideTimeout = function () {
            item.interval = setTimeout(hideNotify, item.visibleDuration);
        };

        frag.appendChild(item);
        let container = this.getNotifyContainer(item.options.position);
        container.appendChild(frag);

        item.addEventListener("mouseover", resetInterval);

        this.fade('in', item.options.fadeInDuration, item);

        if (!item.options.sticky){
            item.addEventListener("mouseout", hideTimeout);
            hideTimeout();
        }

        return item;
    };

    addText(text) {
        let item = document.createElement('div');
        item.classList.add('vnotify-text');
        item.innerHTML = text;
        return item;
    };

    addTitle(title) {
        let item = document.createElement('div');
        item.classList.add('vnotify-title');
        item.innerHTML = title;
        return item;
    };

    addClose(parent) {
        let item = document.createElement('span');
        item.classList.add('vn-close');
        item.addEventListener('click', function(){this.remove(parent);});
        return item;
    };

    getNotifyContainer(position) {
        let positionClass = this.getPositionClass(position);
        let container = document.querySelector('.' + positionClass);
        return container ? container : this.createNotifyContainer(positionClass);
    };

    createNotifyContainer(positionClass) {
        let frag = document.createDocumentFragment();
        let container = document.createElement('div');
        container.classList.add('vnotify-container');
        container.classList.add(positionClass);
        container.setAttribute('role', 'alert');

        frag.appendChild(container);
        document.body.appendChild(frag);

        return container;
    };

    getPositionClass(option) {
        switch (option) {
            case this.positionOption.topLeft:
                return 'vn-top-left';
            case this.positionOption.bottomRight:
                return 'vn-bottom-right';
            case this.positionOption.bottomLeft:
                return 'vn-bottom-left';
            case this.positionOption.center:
                return 'vn-center';
            default:
                return 'vn-top-right';
        }
    };

    getOptions(opts) {
        return {
            fadeInDuration: opts.fadeInDuration || this.options.fadeInDuration,
            fadeOutDuration: opts.fadeOutDuration || this.options.fadeOutDuration,
            fadeInterval: opts.fadeInterval || this.options.fadeInterval,
            visibleDuration: opts.visibleDuration || this.options.visibleDuration,
            postHoverVisibleDuration: opts.postHoverVisibleDuration || this.options.postHoverVisibleDuration,
            position: opts.position || this.options.position,
            sticky: opts.sticky != null ? opts.sticky : this.options.sticky,
            showClose: opts.showClose != null ? opts.showClose : this.options.showClose
        };
    };

    remove(item) {
        item.style.display = 'none';
        item.outerHTML = '';
        item = null;
    };

    //New fade - based on http://toddmotto.com/raw-javascript-jquery-style-fadein-fadeout-functions-hugo-giraudel/
    fade(type, ms, el) {
        let isIn = type === 'in',
            opacity = isIn ? 0 : el.style.opacity || 1,
            goal = isIn ? 0.8 : 0,
            gap = this.options.fadeInterval / ms;

        if(isIn) {
            el.style.display = 'block';
            el.style.opacity = opacity;
        }

        function func() {
            opacity = isIn ? opacity + gap : opacity - gap;
            el.style.opacity = opacity;

            if(opacity <= 0) {
                this.remove(el);
                this.checkRemoveContainer();
            }
            if((!isIn && opacity <= goal) || (isIn && opacity >= goal)) {
                window.clearInterval(fading);
            }
        }

        let fading = window.setInterval(func, this.options.fadeInterval);
        return fading;
    };

    checkRemoveContainer() {
        let item = document.querySelector('.vnotify-item');
        if (!item) {
            let container = document.querySelectorAll('.vnotify-container');
            for (let i=0; i< container.length; i++) {
                container[i].outerHTML = '';
                container[i] = null;
            }
        }
    };
}

export default VanillaNotify;