sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller,History) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Reminder_Dashboard", {

		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressAddReminder: function(oEvent) {
			this.getRouter().navTo("addReminder");
		},
		
		/*onPressViewReminder: function(oEvent) {
			this.getRouter().navTo("course");
		},
		
		onPressUpdateReminder: function(oEvent) {
			this.getRouter().navTo("payment");
		},
		
		onPressDeleteReminder: function(oEvent) {
			this.getRouter().navTo("reminder");
		},*/
		
		onPressBack: function(oEvent)
		{
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}
			else {
				this.getRouter().navTo("dashboard", {}, true /*no history*/);
			}
		}

	});

});