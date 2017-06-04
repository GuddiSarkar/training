sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller,History) {
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
			this.getRouter().navTo("viewCash");
		},
		
/*		onPressUpdateCash: function(oEvent) {
			this.getRouter().navTo("payment");
		},
		
		onPressDeleteCash: function(oEvent) {
			this.getRouter().navTo("reminder");
		}
*/

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