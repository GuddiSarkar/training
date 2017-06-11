sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment'
], function(Controller,Fragment) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.stu_facalty", {
		onInit: function(){
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			
			var uname =  window.sessionStorage.getItem("un");
			this.getView().byId("user").setText("Welcome "+uname);
		},
		
		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressStudent: function(oEvent) {
			this.getRouter().navTo("dashboard");
		},
		
		onPressFacalty: function(oEvent) {
			this.getRouter().navTo("facalty");
		},
		handleResponsivePopoverPress: function(oEvent)
		{
			if (! this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("com.demoTMS.view.popover", this);
				this._oPopover.bindElement("/ProductCollection/0");
				this.getView().addDependent(this._oPopover);
			}
 
			this._oPopover.openBy(oEvent.getSource());
		},
 
		handleCloseButton: function (oEvent) {
			this._oPopover.close();
		},
		onLogoffPress: function(oEvent)
		{
		
              window.sessionStorage.removeItem("un");
              this.getRouter().navTo("home");
              

		}


	});

});