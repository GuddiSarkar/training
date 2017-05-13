sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Pay_Dashboard", {

		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressAddCash: function(oEvent) {
			this.getRouter().navTo("addCash");
		},
		
		onPressViewCash: function(oEvent) {
			this.getRouter().navTo("course");
		},
		
		onPressUpdateCash: function(oEvent) {
			this.getRouter().navTo("payment");
		},
		
		onPressDeleteCash: function(oEvent) {
			this.getRouter().navTo("reminder");
		}

	});

});