sensorGroups = [];
operators = [];
app_configurations = [];

function addSensorGroup() {
	var sensor_group = new SensorGroup();
	SensorGroup.addSensorGroup('#sensor-group-list', sensorGroups, sensor_group);
}

function addOperator() {
	Operator.addOperatorDialog('#operator-list', operators);
}

function initConfigurationList() {
	AppConfiguration.initConfigurationList('#configuration-list', app_configurations);
}

function completeSetup() {
}

$(document).ready(function() {
	$('#full-page').fullpage({
		verticalCentered: false,
		slidesNavigation: false,
		easing: "swing",
		controlArrow: false,
		anchors: ['config']
	});

	initConfigurationList();

	// Add the first group
	var sensor_group = new SensorGroup();
	sensorGroups.push(sensor_group);
	sensor_group.el.appendTo('#sensor-group-list');

	$('#panel-add').click(function(){
		addSensorGroup();
	});
	$('#btn-add-operator').click(function(){
		addOperator();
	});

	$('.nav-prev').click(function() {
		$('#full-page').fullpage.moveSlideLeft();
	});
	$('.nav-next').click(function() {
		$('#full-page').fullpage.moveSlideRight();
	});

	$('#btn-complete').click(function() {
		$('#full-page').fullpage.moveSlideRight(function() {
			completeSetup();
			$('#sensors').html('<div></div>');
			$('#operators').html('<div></div>');
			$('#configurations').html('<div></div>');
		});
	});
});