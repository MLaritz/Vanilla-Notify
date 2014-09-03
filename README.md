Vanilla Notify
==============

Notification Library built using Vanilla Javascript.  No jQuery or other dependencies.

##Demo
http://mlaritz.github.io/Vanilla-Notify/

##Installation
The JS and CSS files are required:
```html
<link rel="stylesheet" href="dist/vanilla-notify.css" />

<script src="dist/vanilla-notify.js"></script>
```

##Examples
```javascript
//Info Notification
vNotify.info('text', 'title');

//Success Notification
vNotify.success('text', 'title');

//Warning Notification
vNotify.warning('text', 'title');

//Error Notification
vNotify.error('text', 'title');

//Notify Notification
vNotify.notify('text', 'title');
```

##Options
```javascript
vNotify.options = {
  fadeInDuration: 2000,
  fadeOutDuration: 2000,
  fadeInterval: 50,
  visibleDuration: 5000,
  postHoverVisibleDuration: 500
};
```
