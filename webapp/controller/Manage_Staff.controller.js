sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function(Controller, Filter, FilterOperator) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Manage_Staff", {

	onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
	},
	

	onClickDelete: function(oEvent) {
			var oView = this.getView();
			var oTable = this.getView().byId("Table");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var property = model.getProperty(path);

			var oModel = this.getOwnerComponent().getModel("course");
			oModel.remove(path, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
		},
		onSearch: function(oEvent) {
			var oTable = this.getView().byId("Table");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("user_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("user_username", FilterOperator.Contains, value);
			var oFilter3 = new Filter("user_role", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter3], false);
			oBinding.filter(allFilter);
		}

	});

});