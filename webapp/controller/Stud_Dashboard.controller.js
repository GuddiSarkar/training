sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller,History) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Stud_Dashboard", {

		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressAddStudent: function(oEvent) {
			this.getRouter().navTo("addStudent");
		},
		
		onPressViewStudent: function(oEvent) {
			this.getRouter().navTo("viewstudent");
		},
		
		onPressUpdateStudent: function(oEvent) {
			this.getRouter().navTo("updateStudent");
		},
		
		onPressDeleteStudent: function(oEvent) {
			this.getRouter().navTo("removeStudent");
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
				this.getRouter().navTo("dashboard", {}, true /*no history*/);
			}
		}

	});

});