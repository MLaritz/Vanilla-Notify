Vanilla Notify
==============

Notification Library built using Vanilla Javascript.  No jQuery or other dependencies.

This library was built with customization in mind.  While there are global options, each
notification can override the global options.

## Demo
http://mlaritz.github.io/Vanilla-Notify/

## Installation
The JS and CSS files are required:
```html
<link rel="stylesheet" href="dist/vanilla-notify.css" />

<script src="dist/vanilla-notify.js"></script>
```

## Examples
```javascript
//Info Notification
vNotify.info({text: 'text', title:'title'});

//Success Notification
vNotify.success({text: 'text', title:'title'});

//Warning Notification
vNotify.warning({text: 'text', title:'title'});

//Error Notification
vNotify.error({text: 'text', title:'title'});

//Notify Notification
vNotify.notify({text: 'text', title:'title'});
```

## Global Options
```javascript
vNotify.options = {
  fadeInDuration: 2000,
  fadeOutDuration: 2000,
  fadeInterval: 50,
  visibleDuration: 5000,
  postHoverVisibleDuration: 500,
  position: positionOption.topRight,
  sticky: false,
  showClose: true 
};
```

## Notification Options
Each individual notification can override the global options.

If you want to make an error notification sticky with the close icon:
```javascript
vNotify.error({text: 'text', title:'title', sticky: true, showClose: true});
```

### Dist Folder
The dist folder contains:
* JS File (vanilla-notify.js) to use for debugging purposes
* Minified JS File (vanilla-notify.min.js) to use for your site
* CSS file to link to directly in your HTML
* SCSS Partial file for you to use with your other SASS stylesheets
* LESS file for you to use with your other LESS stylesheets
