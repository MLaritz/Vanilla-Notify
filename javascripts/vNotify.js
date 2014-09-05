vNotify.info({text:'This is an info notification.', title:'Info Notification.'});
vNotify.success({text:'This is a success notification.', title:'Success Notification.'});
vNotify.warning({text:'This is a warning notification.', title:'Warning Notification.'});
vNotify.error({text:'This is an error notification.', title:'Error Notification.'});
vNotify.notify({text:'This is a notify notification.', title:'Notify Notification.'});


document.querySelector('#info-notify').addEventListener('click', function () {
    vNotify.info({text:'This is an info notification.', title:'Info Notification.'});
});

document.querySelector('#success-notify').addEventListener('click', function () {
    vNotify.success({text:'This is a success notification.', title:'Success Notification.'});
});

document.querySelector('#warning-notify').addEventListener('click', function () {
    vNotify.warning({text:'This is a warning notification.', title:'Warning Notification.'});
});

document.querySelector('#error-notify').addEventListener('click', function () {
    vNotify.error({text:'This is an error notification.', title:'Error Notification.'});
});

document.querySelector('#notify-notify').addEventListener('click', function () {
    vNotify.notify({text:'This is a notify notification.', title:'Notify Notification.'});
});


document.querySelector('#sticky-notify').addEventListener('click', function () {
    vNotify.error({text:'This is a sticky error notification.', title:'Error Notification.', sticky: true});
});

document.querySelector('#noclose-notify').addEventListener('click', function () {
    vNotify.success({text:'This is a success notification without the close button.', title:'Success Notification.', showClose: false});
});
