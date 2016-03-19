$(function(){
	var olinDtechConnector = jsPlumb.getInstance();
	olinDtechConnector.setContainer($(".explanation-section"));

	var dtechLaunchCampConnector = jsPlumb.getInstance();
	dtechLaunchCampConnector.setContainer($(".explanation-section"));

	olinDtechConnector.importDefaults({
		Connector:[ "Flowchart"],
		Anchors : [ "Bottom", "Top" ],
		Endpoint: "Blank",
		EndpointStyle : { fillStyle: "#567567"  },
		PaintStyle: { strokeStyle: "#FF9185", lineWidth: 5 }
		// Anchor : [ 0.5, 0.5, 1, 1 ]
	});

	dtechLaunchCampConnector.importDefaults({
		Connector:[ "Flowchart"],
		Anchors : [ "Bottom", "Top" ],
		Endpoint: "Blank",
		EndpointStyle : { fillStyle: "#567567"  },
		PaintStyle: { strokeStyle: "#FF9185", lineWidth: 5 }
		// Anchor : [ 0.5, 0.5, 1, 1 ]
	});

	olinDtechConnector.connect({
		source:"olin-logo-container",
		target:"dtech-logo-container"
	});	

	dtechLaunchCampConnector.connect({
		source:"dtech-logo-container",
		target:"launch-camp-logo-container"
	});	
})