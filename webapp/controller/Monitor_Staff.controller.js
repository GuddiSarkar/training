sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,Filter, FilterOperator) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Monitor_Staff", {

	
	onSearch: function(oEvent) {
			var oTable = this.getView().byId("Table");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("user_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("user_role", FilterOperator.Contains, value);
			var oFilter3 = new Filter("login_dtime", FilterOperator.Contains, value);
			var oFilter4 = new Filter("logout_dtime", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter3,oFilter4], false);
			oBinding.filter(allFilter);
		}
	});

});