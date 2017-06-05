sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'jquery.sap.global',
	'sap/m/MessageBox',
	'sap/m/MessageToast',
	'sap/ui/model/SimpleType',
	'sap/ui/model/ValidateException',
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"

], function(Controller, jQuery, MessageBox, MessageToast, SimpleType, ValidateException, JSONModel, History) {
	"use strict";

	return Controller.extend("com.demoTMS.controller.Home", {
		onInit: function() {
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
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onPress: function(oEvent) {
			var oView = this.getView();
			var formInput = [
				oView.byId("username"),
				oView.byId("password")
			];
			jQuery.each(formInput, function(i, input) {
				if (!input.getValue()) {
					input.setValueState("Error");
				}
			});
			var forward = true;
			jQuery.each(formInput, function (i, input) {
				if ("Error" === input.getValueState()) {
					forward = false;
					return false;
				}
			});
 
			// output result
			if (forward) {
				
				this.getRouter().navTo("stu_fac");
			} else {
				jQuery.sap.require("sap.m.MessageBox");
				MessageBox.alert("Please Enter all the fields");
			}
		},
		
		handleLinkPress: function (evt) {
			this.getRouter().navTo("complain");
		}


	});
});