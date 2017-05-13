sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Reminder_Dashboard", {

		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressAddReminder: function(oEvent) {
			this.getRouter().navTo("addReminder");
		},
		
		onPressViewReminder: function(oEvent) {
			this.getRouter().navTo("course");
		},
		
		onPressUpdateReminder: function(oEvent) {
			this.getRouter().navTo("payment");
		},
		
		onPressDeleteReminder: function(oEvent) {
			this.getRouter().navTo("reminder");
		}

	});

});