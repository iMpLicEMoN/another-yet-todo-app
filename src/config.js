
/* eslint-disable */
"use strict";


var beType = 'https';
var beIPAddress = 'uxcandy.com';
export var beEnv = 'development'
export var bePort = '443';
export var beServiceNames = {
	getTasks: '~shapoval/test-task-backend/v2/?developer=Name'
};
export var beString = "".concat(beType, "://").concat(beIPAddress, ":").concat(bePort, "/");
export var config = {
	beString: beString,
	bePort: bePort,
	beServiceNames: beServiceNames
};

