sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'jquery.sap.global',
	'sap/ui/model/SimpleType',
	'sap/ui/model/ValidateException',
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",

], function(Controller) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Home", {
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		onLogin: function(evt) {
			this.getRouter().navTo("login");
		}
	});
});