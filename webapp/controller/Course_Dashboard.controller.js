sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Course_Dashboard", {

		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressAddCourse: function(oEvent) {
			this.getRouter().navTo("addCourse");
		},
		
		onPressViewCourse: function(oEvent) {
			this.getRouter().navTo("viewCourse");
		},
		
		onPressUpdateCourse: function(oEvent) {
			this.getRouter().navTo("updateCourse");
		},
		
		onPressDeleteCourse: function(oEvent) {
			this.getRouter().navTo("removeCourse");
		}

	});

});