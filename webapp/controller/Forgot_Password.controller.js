sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'jquery.sap.global',
	'sap/m/MessageBox',
	'sap/m/MessageToast',
	'sap/ui/model/ValidateException',
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",

], function(Controller, jQuery, MessageBox, MessageToast, ValidateException, JSONModel, History, Filter, FilterOperator) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Forgot_Password", {

		onPressBack: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("home", {}, true /*no history*/ );
			}
		},

		onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onPwdUpdate: function() {
			var email = this.getView().byId("email").getValue();
			var pwd = this.getView().byId("pwd").getValue();
			var cnfPwd = this.getView().byId("cnfpwd").getValue();
			var id;
			var data = {
				"user_pwd": pwd,
				"user_cnfpwd": cnfPwd
			};
			var filterEmail = new sap.ui.model.Filter("user_email", sap.ui.model.FilterOperator.EQ, email);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			oModel.read("/tb_user", {
				filters: [filterEmail],
				success: function(oData, oResponse) {
					id = oData.results[0].user_id;
					oModel.update("/tb_user(" + id + ")", data, {
						success: function(oData, oResponse) {
							console.log(oData);
							console.log(oResponse);
							this.getRouter().navTo("home");
						}.bind(this),
						error: function(err) {
							console.log(err);
						}.bind(this)
					});
					oModel.setRefreshAfterChange(true);
				}.bind(this),
				error: function(error) {
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.error(
						"Invalid Email ! Enter Registered Email Id", {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}.bind(this)
			});

		}

	});

});