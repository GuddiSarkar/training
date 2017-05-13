sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.demoTMS.controller.Stud_Dashboard", {

		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressAddStudent: function(oEvent) {
			this.getRouter().navTo("addStudent");
		},
		
		onPressViewStudent: function(oEvent) {
			this.getRouter().navTo("course");
		},
		
		onPressUpdateStudent: function(oEvent) {
			this.getRouter().navTo("payment");
		},
		
		onPressDeleteStudent: function(oEvent) {
			this.getRouter().navTo("reminder");
		}

	});

});