'use strict';

var vNotify = require('./vanilla-notify.js');

var VanillaNotify = {
    positionOption: vNotify.positionOption,
    options: vNotify.options,
    info: vNotify.info,
    success: vNotify.success,
    error: vNotify.error,
    warning: vNotify.warning,
    notify: vNotify.notify,
    custom: vNotify.custom,
};

module.exports = VanillaNotify;