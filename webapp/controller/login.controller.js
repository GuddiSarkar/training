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
	"sap/ui/model/FilterOperator",
	'sap/ui/core/Fragment',

], function(Controller, jQuery, MessageBox, MessageToast, SimpleType, ValidateException, JSONModel, History, Filter, FilterOperator,
	Fragment) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.login", {

		onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			var oData = sap.ui.getCore().getModel("myModel").getData();
			if (oData.role === "Admin") {
				this.getView().byId("admin").setVisible(true);
				this.getView().byId("BackOffice").setVisible(false);
				this.getView().byId("Telecaller").setVisible(false);
			} else if (oData.role === "BackOffice") {
				this.getView().byId("admin").setVisible(false);
				this.getView().byId("BackOffice").setVisible(true);
				this.getView().byId("Telecaller").setVisible(false);
			} else {
				this.getView().byId("admin").setVisible(false);
				this.getView().byId("BackOffice").setVisible(false);
				this.getView().byId("Telecaller").setVisible(true);
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

		onPressBack: function() {
			this.getRouter().navTo("home");
			var oModel = sap.ui.getCore().getModel("myModel");
			this.getView().byId("admin").setVisible(false);
			this.getView().byId("BackOffice").setVisible(false);
			this.getView().byId("Telecaller").setVisible(false);
		},

		onPress: function(oEvent) {
			var oView = this.getView();
			var formInput = [
				oView.byId("username"),
				oView.byId("password"),
			];
			jQuery.each(formInput, function(i, input) {
				if (!input.getValue()) {
					input.setValueState("Error");
				}
			});
			var forward = true;
			jQuery.each(formInput, function(i, input) {
				if ("Error" === input.getValueState()) {
					forward = false;
					return false;
				}
			});
		},

		onPressLogin: function(oEvent) {
			var dateTime = new Date();
			console.log(dateTime.toLocaleString());
			var date = dateTime.toLocaleString();
			// output result

			var dateTime = new Date();
			console.log(dateTime.toLocaleString());
			var date = dateTime.toLocaleString();

			var Data = sap.ui.getCore().getModel("myModel").getData();
			var uname = this.getView().byId("username").getValue();
			var pwd = this.getView().byId("password").getValue();
			if (uname === "admin" && pwd === "admin") {
				this.getRouter().navTo("admin");
			} else {

				var filtername = new Filter("user_username", FilterOperator.EQ, uname);
				var filterpwd = new Filter("user_pwd", FilterOperator.EQ, pwd);
				var filterrole = new Filter("user_role", FilterOperator.EQ, Data.role);
				var oFilter = new Filter({
					filters: [filtername, filterpwd, filterrole],
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
								"Invalid Credentials", {
									styleClass: bCompact ? "sapUiSizeCompact" : ""
								}
							);
						} else {
							window.sessionStorage.setItem("un", oData.results[0].user_username);
							window.sessionStorage.setItem("dt", date);
							if (Data.role === "BackOffice") {
								this.getRouter().navTo("backoffice");
							} else {
								this.getRouter().navTo("telecaller");
							}
						}
					}.bind(this),
					error: function(error) {
						// var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
						// MessageBox.error(
						// 	"Invalid Credentials", {
						// 		styleClass: bCompact ? "sapUiSizeCompact" : ""
						// 	}
						// );
						alert("Please Enter The Valid Credentials");
					}.bind(this)
				});

				var oEntry = {
					"user_name": uname,
					"login_dtime": date,
					"user_role": Data.role
				};
				oModel.create("/tb_ulginhstry", oEntry, {
					success: function(oData) {

					}.bind(this),
					error: function(error) {

					}.bind(this)
				});
				oModel.setRefreshAfterChange(true);
			}
		},
		onClickForgotPassword: function(oEvent) {
			this.getRouter().navTo("Forgot_Password");
		},

		onCloseEdit: function(oEvent) {
			this.getView().byId("frgpwd").close();
		},

		handleLinkPress: function(evt) {
			this.getRouter().navTo("complain");
		},

		handleLinkPressAdmin: function(evt) {
			this.getRouter().navTo("admin_home");
		}

	});

});