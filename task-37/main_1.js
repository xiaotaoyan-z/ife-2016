
(function() {
	console.log('start:' + Date.parse(new Date()));
	var layout = createFloatLayout($('#box'));
	layout.show();

	addEvent($('#login'), 'click', function() {
		layout.show('登录');
	})
	addEvent($('#logout'), 'click', function() {
		layout.show('退出');
	})
	addEvent($('#close_btn'), 'click', function() {
		layout.hide();
	})
})()