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

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		onClickLogin: function(evt) {
			this.getRouter().navTo("login");
		},
		onClickRegister: function(evt) {
			this.getRouter().navTo("register");
		},
		onPressAdmin: function()
		{
			this.getRouter().navTo("admin");
		},
		
		onPressBackOffice: function()
		{
			this.getRouter().navTo("backoffice");
		}
	});
});