sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.facalty_dashboard", {

	
			getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressAddFacalty: function(oEvent) {
			this.getRouter().navTo("addStudent");
		},
		
		onPressviewfacalty: function(oEvent) {
			this.getRouter().navTo("course");
		},
		
		onPresspaymentFacalty: function(oEvent) {
			this.getRouter().navTo("payment");
		}

	});

});