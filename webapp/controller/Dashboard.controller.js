sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller,History) {
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
		},
		onPressBack: function(oEvent)
		{
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}
			else {
				this.getRouter().navTo("stu_facs", {}, true /*no history*/);
			}
		}

	});

});