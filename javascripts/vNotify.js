vNotify.info('This is an info notification.', 'Info Notification.');
vNotify.success('This is a success notification.', 'Success Notification.');
vNotify.warning('This is a warning notification.', 'Warning Notification.');
vNotify.error('This is an error notification.', 'Error Notification.');
vNotify.notify('This is a notify notification.', 'Notify Notification.');


document.querySelector('#info-notify').addEventListener('click', function () {
    vNotify.info('This is an info notification.', 'Info Notification.');
});

document.querySelector('#success-notify').addEventListener('click', function () {
    vNotify.success('This is a success notification.', 'Success Notification.');
});

document.querySelector('#warning-notify').addEventListener('click', function () {
    vNotify.warning('This is a warning notification.', 'Warning Notification.');
});

document.querySelector('#error-notify').addEventListener('click', function () {
    vNotify.error('This is an error notification.', 'Error Notification.');
});

document.querySelector('#notify-notify').addEventListener('click', function () {
    vNotify.notify('This is a notify notification.', 'Notify Notification.');
});
