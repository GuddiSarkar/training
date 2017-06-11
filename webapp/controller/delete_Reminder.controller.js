sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.delete_Reminder", {

		onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},
		
		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressBack: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("reminder", {}, true /*no history*/ );
			}
		},
		
		onSearch: function(oEvent) {
			var oTable = this.getView().byId("Table");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("reminder_title", FilterOperator.Contains, value);
			var oFilter2 = new Filter("reminder_date", FilterOperator.Contains, value);
			var oFilter3 = new Filter("reminder_attended", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter3], false);
			oBinding.filter(allFilter);
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
		}


	});

});