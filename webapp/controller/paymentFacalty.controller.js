sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,Filter, FilterOperator) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.paymentFacalty", {
		
	onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},
	onSearch: function(oEvent){
		    var oTable = this.getView().byId("idTable");
			var oBinding = oTable.getBinding("rows");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("faculty_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("transaction_type", FilterOperator.Contains, value);
			var oFilter3 = new Filter("transaction_cheque_no", FilterOperator.Contains, value);
			var oFilter4 = new Filter("transaction_bank_name", FilterOperator.Contains, value);
			//var oFilter5 = new Filter("Payment Date", FilterOperator.Contains, value);
			var oFilter5 = new Filter("transaction_amount", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2,oFilter3,oFilter4,oFilter5], false); 
			oBinding.filter(allFilter);
		}
	});

});