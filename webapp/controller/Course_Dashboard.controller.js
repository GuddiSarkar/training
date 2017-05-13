sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.demoTMS.controller.Course_Dashboard", {

		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressAddCourse: function(oEvent) {
			this.getRouter().navTo("addCourse");
		},
		
		onPressViewCourse: function(oEvent) {
			this.getRouter().navTo("course");
		},
		
		onPressUpdateCourse: function(oEvent) {
			this.getRouter().navTo("payment");
		},
		
		onPressDeleteCourse: function(oEvent) {
			this.getRouter().navTo("reminder");
		}

	});

});