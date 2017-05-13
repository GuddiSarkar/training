sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.demoTMS.controller.stu_facalty", {

		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressStudent: function(oEvent) {
			this.getRouter().navTo("dashboard");
		},
		
		onPressFacalty: function(oEvent) {
			this.getRouter().navTo("facalty");
		}


	});

});