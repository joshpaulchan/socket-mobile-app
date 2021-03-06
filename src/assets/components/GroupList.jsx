var React = require('react');
var ReactDOM = require('react-dom');

var StateIndicator = React.createClass({
	getDefaultProps: function() {
		return ({
			'on': false,
		});
	},
	render: function() {
		var icon = 'icon ion-record ';
		return (
			<i className={ (this.props.on) ? icon + 'state-on': icon + 'state-off'}></i>
		);
	}
});

var GroupListItem = React.createClass({
	contextTypes: {
		'router': React.PropTypes.object,
		'bff': React.PropTypes.object
	},
	getDefaultProps: function() {
		return ({
			'id': 0,
			'uuid': 'xx-xx-xx-xx-xx-xx',
			'groupName': 'undefined',
			'proximity': false,
		});
	},
	getInitialState: function() {
		return ({
			curBrightness: 50,
			prvBrightness: 0
		});
	},
	handleTap: function(ev) {
		if (ev.tapCount == 2) {
			this.handleDblTap(ev);
		} else {
			this.handleSglTap(ev);
		}
	},
	handleSglTap: function(ev) {
		// TODO: Toggle brightness slider
		console.log("Toggle brightness slider");
	},
	handleDblTap: function(ev) {
		// TODO: Toggle brightness
		console.log("Toggle brightness");
		var oldBrightness = this.state.curBrightness;
		var newBrightness = (this.state.curBrightness > 0 ) ? 0 : this.state.prvBrightness;

		// BTLE Flow
		// ble.connect(this.props.macId, function(success) {
		// 	// On success, client & server data update flow
		// 	ble.write(this.props.macId, service_uuid, characteristic_uuid, data, function(success) {
		//
		// 	}, function(failure) {
		// 		alert("Error writing to " + this.props.nickName + ".");
		// 	});
		// }, function(error) {
		// 	alert("Error connecting to " + this.props.nickName + " :(");
		// });

		// Or Update via web

		// Update backend
		var that = this;
		this.context.bff.groupService.setBrightness(this.props.id, newBrightness).then(function(socketInfo) {
			// Update view
			that.setState({
				'curBrightness': newBrightness,
				'prvBrightness': oldBrightness,
			});
		}, function(error) {
			console.log(error);
		});
	},
	handleSwipe: function(ev) {
		console.log("Swipe GroupItem");
		this.context.router.push('/groups/' + this.props.id);
	},
	componentDidMount: function() {
		// Fetch Socket Info
		var that = this;
		this.context.bff.groupService.findById(this.props.id).then(function(groupInfo) {
			that.setState({
				'groupName': groupInfo.groupName,
				'curBrightness': groupInfo.curBrightness,
				'prvBrightness': groupInfo.prvBrightness,
				'proximity': groupInfo.proximity
			});
		}, function(error) {
			console.log(error);
		});

		// Setup touch handlers
		var opts = {}
		var mc = new Hammer.Manager(ReactDOM.findDOMNode(this));

		mc.add(new Hammer.Tap({event: 'dbl-tap', taps: 2}));
		mc.add(new Hammer.Tap({event: 'sgl-tap'}));
		mc.add(new Hammer.Swipe({direction: Hammer.DIRECTION_HORIZONTAL}));

		mc.get('dbl-tap').recognizeWith('sgl-tap');
		mc.get('sgl-tap').requireFailure('dbl-tap');

		mc.on('sgl-tap', this.handleSglTap);
		mc.on('dbl-tap', this.handleDblTap);
		mc.on('swipe', this.handleSwipe);
	},
	render: function() {
		return (
			<li className='item item-icon-left item-clickable' key={this.props.key}>
				<StateIndicator on={(this.state.curBrightness > 0)} />
				<h4>{this.props.groupName}</h4>
			</li>
		);
	}
});

var GroupList = React.createClass({
	getDefaultProps: function() {
		return ({
			'groups': [],
			'history': null
		});

	},
	render: function() {
		var key = 0;
		var listItems = this.props.groups.map(function(group) {
			key += 1;
			return (
				<GroupListItem
					key={key}
					id={group.id}
					groupName={group.groupName}
					macId={group.macId}
					proximity={group.proximity}
					history={history}
				/>
			);
		});

		return (
			<ul className='list'>
				{listItems}
			</ul>
		);
	}
});

module.exports = GroupList;
