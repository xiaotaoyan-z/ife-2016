
//获取元素对象
function get(el) { return document.getElementById(el); }

//点击半透明遮罩和关闭按钮时，使半透明遮罩和登录框不可见
get('mask').onclick = get('close_btn').onclick = function () {
	get('mask').style.display = "none";
	get('box').style.display = "none";
}

//点击页面标题‘登录’链接时，使半透明遮罩和登录框可见
get('login').onclick = function () {
	get('mask').style.display = "block";
	get('box').style.display = "block";
}

//自动居中
function autoCenter(el) {
	console.log(el);
	var bodyW = document.documentElement.clientWidth;
	var bodyH = document.documentElement.clientHeight;

	var elW = el.offsetWidth;
	var elH = el.offsetHeight;

	el.style.left = (bodyW - elW)/2 + 'px';
	el.style.top = (bodyH - elH)/2 + 'px';
}

var mouseOffsetX = 0;
var mouseOffsetY = 0;
var isDraging = false;

get('box_header').addEventListener('mousedown', function (e) {
	var e = e || window.event;
	//鼠标点击点离浮出层左边框的距离
	mouseOffsetX = e.pageX - get('box').offsetLeft;
	//鼠标点击点离浮出层上边框的距离
	mouseOffsetY = e.pageY - get('box').offsetTop;
	isDraging = true;
})

document.onmousemove = function(e) {
	var e = e || window.event;
	mouseX = e.pageX;
	mouseY = e.pageY;

	var moveX = 0, moveY = 0;

	if(isDraging === true) {
		moveX = mouseX - mouseOffsetX;
		moveY = mouseY - mouseOffsetY;

		//获取页面的宽和高
		var pageWidth = document.documentElement.clientWidth;
		var pageHeight = document.documentElement.clientHeight;

		//获取浮出层的宽和高
		var boxWidth = get('box').offsetWidth;
		var boxHeight = get('box').offsetHeight;

		var maxMoveX = pageWidth - boxWidth;
		var maxMoveY = pageHeight - boxHeight;

		moveX = Math.min(maxMoveX, Math.max(0, moveX));
		moveY = Math.min(maxMoveY, Math.max(0, moveY));

		get('box').style.left = moveX + 'px';
		get('box').style.top = moveY + 'px';
	}
}

document.onmouseup = function () {
	isDraging = false;
	console.log(isDraging);

	clearInterval(moving);
	moving = 0;
	var cls = document.getElementsByClassName('resize-box');
	for(var i=0; i<cls.length; i++) {
		cls[i].style.left = "";
		cls[i].style.top = "";
	}
}

var mousePanel, mouseCtrl, mouseType;
var moving = 0, mouseStartX = 0, mouseStartY = 0;
function onMouseDown(e, panel, ctrl, type) {
	console.log(type);
	var e = e || window.event;
	mouseStartX = e.pageX - ctrl.offsetLeft;
	mouseStartY = e.pageY - ctrl.offsetTop;

	mousePanel = panel;
	mouseCtrl = ctrl;
	mouseType = type;

	moving = setInterval(onMove, 10);
	console.log(moving);
}

function onMove() {
	if(moving) {
		var toX = mouseX - mouseStartX;
		var toY = mouseY - mouseStartY;

		//限定浮出层最大宽度和高度
		var maxToX = document.documentElement.clientWidth - mousePanel.offsetLeft -10;
		var maxToY = document.documentElement.clientHeight - mousePanel.offsetTop - 10;

		toX = Math.min(maxToX, Math.max(toX, 300));
		toY = Math.min(maxToY, Math.max(toY, 200));

		switch(mouseType) {
			case "R": {
				mouseCtrl.style.left = toX + 'px';
				mousePanel.style.width = toX + 'px';
				break;
			}
			case "B": {
				mouseCtrl.style.top = toY + 'px';
				mousePanel.style.height = toY + 'px';
				break;
			}
			case "RB": {
				mouseCtrl.style.left = toX - 8 + 'px';
				mouseCtrl.style.top = toY - 8 + 'px';
				mousePanel.style.width = toX + 'px';
				mousePanel.style.height = toY + 'px';
				break;
			}
		}
	}
}

function resizeable(el) {
	var panel = el;
	var rightBox = document.createElement('div');
	var bottomBox = document.createElement('div');
	var rbBox = document.createElement('div');
	rightBox.class = rightBox.className = "resize-box resize-right";
	bottomBox.class = bottomBox.className = "resize-box resize-bottom";
	rbBox.class = rbBox.className = "resize-box resize-right-bottom";

	panel.appendChild(rightBox);
	panel.appendChild(bottomBox);
	panel.appendChild(rbBox);

	rightBox.addEventListener('mousedown', function(e) {
		console.log('mousedown');
		onMouseDown(e, panel, rightBox, "R");
	})
	bottomBox.addEventListener('mousedown', function(e) {
		onMouseDown(e, panel, bottomBox, "B");
	})
	rbBox.addEventListener('mousedown', function(e) {
		onMouseDown(e, panel, rbBox, "RB");
	})
}

window.onload = function () {
	autoCenter(get('box'));
	resizeable(get('box'));
}