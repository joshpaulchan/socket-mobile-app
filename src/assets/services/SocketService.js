var SocketService = function() {

	var sockets;

	this.initialize = function() {
		// No Initialization required
		var promise = new Promise(function(resolve, reject) {
			resolve();
		});
		return promise;
	}

	this.findById = function(id) {
		var promise = new Promise(function(resolve, reject) {
			if (id < 0 || sockets[sockets.length-1].id < id) {
				reject("Invalid ID.");
			} else {
				resolve(sockets[id]);
			}
		});
		return promise;
	}

	this.getAll = function() {
		var promise = new Promise(function(resolve, reject) {
			resolve(sockets);
		});
		return promise;
	}

	this.createSocket = function(socketInfo) {
		// TODO: Some data verification

		// Give it an ID & uuid
		socketInfo.id = 1;
		societInfo.uuid = 'bb:cc:dd:aa';

		sockets.push(socketInfo);

		return;
	}

	// FUNCTIONAL METHODS
	this.setBrightness = function(id, brightness) {
		// var deferred = $.Deferred();
		// var promise = deferred.promise();
		var promise = new Promise(function(resolve, reject) {
			// Get Socket
			var socket = null;
			var l = sockets.length;
			for (var i = 0; i < l; i++) {
				if (sockets[i].id === id) {
					socket = sockets[i];
					break;
				}
			}
			// Set brightness
			brightness = (brightness > 100) ? 100 : brightness;
			brightness = (brightness < 0) ? 0 : brightness;

			socket.curBrightness = brightness;
			var success = true;

			if (success) {
				resolve(socket);
			} else {
				reject(Error('Could not change socket brightness'));
			}
		});

		return promise;
	}

	this.setProximity = function(id, state) {
		var promise = new Promise(function(resolve, reject) {
			// Get Socket
			var socket = null;
			var l = sockets.length;
			for (var i = 0; i < l; i++) {
				if (sockets[i].id === id) {
					socket = sockets[i];
					break;
				}
			}
			// Set state
			if (state==true || state==false) {
				socket.proximity = state;
			}

			var success = true;
			if (success) {
				resolve(socket);
			} else {
				reject(Error('Could not change socket\'s proximity feature.'));
			}
		});

		return promise;
	}

	sockets = [
		{
			'id': 0,
			'uuid': 'xx-xx-xx-xx-xx-xx',
			'macAddress': '00:00:00:00:00:00',
			'nickName': 'undefined',
			'rssi': 0,
			'curBrightness': 50,
			'prvBrightness': 0,
			'proximity': false,
			'alarm': false,
			'notification': false
		},
		{
			'id': 1,
			'uuid': 'xx-xx-xx-xx-xx-xx',
			'macAddress': '00:00:00:00:00:00',
			'nickName': 'Sockrates',
			'rssi': 0,
			'curBrightness': 0,
			'prvBrightness': 75,
			'proximity': true,
			'alarm': false,
			'notification': false
		},
		{
			'id': 2,
			'uuid': 'xx-xx-xx-xx-xx-xx',
			'macAddress': '00:00:00:00:00:00',
			'nickName': 'Sockatoa',
			'rssi': 0,
			'curBrightness': 75,
			'prvBrightness': 0,
			'proximity': false,
			'alarm': false,
			'notification': false
		},
		{
			'id': 3,
			'uuid': 'xx-xx-xx-xx-xx-xx',
			'macAddress': '00:00:00:00:00:00',
			'nickName': 'Sockiavelli',
			'rssi': 0,
			'curBrightness': 100,
			'prvBrightness': 0,
			'proximity': false,
			'alarm': false,
			'notification': false
		}
	];
}

module.exports = SocketService;
