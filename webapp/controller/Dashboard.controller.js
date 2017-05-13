sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Dashboard", {

		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressStudent: function(oEvent) {
			this.getRouter().navTo("student");
		},
		
		onPressCourse: function(oEvent) {
			this.getRouter().navTo("course");
		},
		
		onPressPayment: function(oEvent) {
			this.getRouter().navTo("payment");
		},
		
		onPressReminder: function(oEvent) {
			this.getRouter().navTo("reminder");
		}

	});

});