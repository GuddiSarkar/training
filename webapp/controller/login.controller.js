sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'jquery.sap.global',
	'sap/m/MessageBox',
	'sap/m/MessageToast',
	'sap/ui/model/SimpleType',
	'sap/ui/model/ValidateException',
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

], function(Controller, jQuery, MessageBox, MessageToast, SimpleType, ValidateException, JSONModel, History, Filter, FilterOperator) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.login", {

		onInit: function() {
			var oData = sap.ui.getCore().getModel("myModel").getData();
			if (oData.role === "Admin") {
				this.getView().byId("admin").setVisible(true);
				this.getView().byId("backOffice").setVisible(false);
				this.getView().byId("teleCaller").setVisible(false);
			} else if (oData.role === "BackOffice") {
				this.getView().byId("admin").setVisible(false);
				this.getView().byId("backOffice").setVisible(true);
				this.getView().byId("teleCaller").setVisible(false);
			} else {
				this.getView().byId("admin").setVisible(false);
				this.getView().byId("backOffice").setVisible(false);
				this.getView().byId("teleCaller").setVisible(true);
			}

			this.getView().setModel(new JSONModel({
				username: "",
				password: ""
			}));

			// attach handlers for validation errors
			sap.ui.getCore().attachValidationError(function(evt) {
				var control = evt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("Error");
				}
			});

			// attach handlers for validation success
			sap.ui.getCore().attachValidationSuccess(function(evt) {
				var control = evt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("None");
				}
			});

		},
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onPress: function(oEvent) {

			var uname = this.getView().byId("username").getValue();
			var pwd = this.getView().byId("password").getValue();
			var filtername = new Filter("user_username", FilterOperator.EQ, uname);
			var filterpwd = new Filter("user_pwd", FilterOperator.EQ, pwd);
			var oFilter = new Filter({
				filters: [filtername, filterpwd],
				bAnd: true
			});
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			oModel.read("/tb_user", {
				filters: [oFilter],
				success: function(oData, oResponse) {
					window.sessionStorage.setItem("un", oData.results[0].user_name);
					var oData = sap.ui.getCore().getModel("myModel").getData();
					if (oData.role === "BackOffice") 
					{
						this.getRouter().navTo("backoffice");
					} 
					else 
					{
						this.getRouter().navTo("telecaller");
					}
				}.bind(this),
				error: function(error) {
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.error(
						"Invalid Credentials", {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}.bind(this)

			});
			if (uname === "admin" && pwd === "admin") {
				this.getRouter().navTo("admin");
			} 
			else 
			{
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.error(
					"Invalid Credentials", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			}

		},
		handleLinkPress: function(evt) {
			this.getRouter().navTo("complain");
		},
		handleLinkPressAdmin: function(evt) {
			this.getRouter().navTo("admin_home");
		}

	});

});