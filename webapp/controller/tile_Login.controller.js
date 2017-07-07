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
	return Controller.extend("com.demoTMS.controller.tile_Login", {

		onPressBack: function() {
			this.getRouter().navTo("home");
		},

		onClickForgotPassword: function(oEvent) {
			this.getRouter().navTo("Forgot_Password");
		},

		onInit: function() {

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

		onPressLogin: function(oEvent) {
			var dateTime = new Date();
			console.log(dateTime.toLocaleString());
			var date = dateTime.toLocaleString();
			//var role;
			var uname = this.getView().byId("username").getValue();
			var pwd = this.getView().byId("password").getValue();
			if (uname === "admin" && pwd === "admin") {
				this.getRouter().navTo("admin");
			} else {
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
						if (!oData.results[0]) {
							var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
							MessageBox.alert(
								"Invalid Credentials !", {
									styleClass: bCompact ? "sapUiSizeCompact" : ""
								}
							);
						} else {
							var role = oData.results[0].user_role;
							if (role === "BackOffice") {
								window.sessionStorage.setItem("un", oData.results[0].user_username);
								window.sessionStorage.setItem("dt", date);
								this.getRouter().navTo("backoffice");
								var oEntry = {
									"user_name": uname,
									"login_dtime": date,
									"user_role": role
								};
								oModel.create("/tb_ulginhstry", oEntry, {
									success: function(Data) {

									}.bind(this),
									error: function(err) {

									}.bind(this)
								});
							} else if (role === "Telecaller") {
								window.sessionStorage.setItem("un", oData.results[0].user_username);
								window.sessionStorage.setItem("dt", date);
								this.getRouter().navTo("telecaller");
								var oEntry = {
									"user_name": uname,
									"login_dtime": date,
									"user_role": roles
								};
								oModel.create("/tb_ulginhstry", oEntry, {
									success: function(Data) {

									}.bind(this),
									error: function(err) {

									}.bind(this)
								});
							} else {
								alert("Invalid Credentials");
							}
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
				oModel.setRefreshAfterChange(true);
			}
		}
	});

});