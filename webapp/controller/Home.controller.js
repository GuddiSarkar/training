sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'jquery.sap.global',
	'sap/ui/model/SimpleType',
	'sap/ui/model/ValidateException',
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
], function(Controller, History) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Home", {

		onInit: function(){
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			//this.getView().byId("loginList").setSelectedItem("");
		},
		
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		onPressTile: function()
		{
			this.getRouter().navTo("tilelogin");
			// this.getRouter().navTo("admin");
		},
		
		onClickLogin: function(oEvent)
		{
			var oView = this.getView();
			var oDialog = oView.byId("login");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.loginPopover", this);
				oView.addDependent(oDialog);
			}

			oDialog.openBy(oEvent.getSource());
		},
		
		onClickRegister: function(oEvent)
		{
			var oView = this.getView();
			var oDialog = oView.byId("register");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.rgstrPopover", this);
				oView.addDependent(oDialog);
			}

			oDialog.openBy(oEvent.getSource());
		},
		
		onItemSelect: function(oEvent)
		{
			var oItem = oEvent.getParameter("listItem");
			var oSelected = oItem.getTitle();
			var data = {
				"role": oSelected
			};
			var oModel =new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			sap.ui.getCore().setModel(oModel,"myModel");
			this.getRouter().navTo("login");
		},
		
		onItemSelected: function(oEvent)
		{
			var oItem = oEvent.getParameter("listItem");
			var oSelected = oItem.getTitle();
			var data = {
				"role": oSelected
			};
			var oModel =new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			sap.ui.getCore().setModel(oModel,"regModel");
			this.getRouter().navTo("register");
		},
		handleLinkPress: function(evt) {
			this.getRouter().navTo("complain");
		}

		
	});
});
