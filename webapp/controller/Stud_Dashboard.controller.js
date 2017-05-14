sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
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
		}

	});

});