sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller,History) {
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
				this.getRouter().navTo("stu_fac", {}, true /*no history*/);
			}
		}

	});

});