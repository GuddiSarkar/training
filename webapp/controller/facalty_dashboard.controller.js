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
			this.getRouter().navTo("addFacalty");
		},
		
		onPressviewfacalty: function(oEvent) {
			this.getRouter().navTo("viewFacalty");
		},
		
		onPresspaymentFacalty: function(oEvent) {
			this.getRouter().navTo("paymentFacalty");
		}

	});

});