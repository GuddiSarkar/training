sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,Filter, FilterOperator) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.paymentFacalty", {

	onSearch: function(oEvent){
		    var oTable = this.getView().byId("table");
			var oBinding = oTable.getBinding("rows");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("Facalty Name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("Payment Type", FilterOperator.Contains, value);
			var oFilter3 = new Filter("cheque Number", FilterOperator.Contains, value);
			var oFilter4 = new Filter("Name of Bank", FilterOperator.Contains, value);
			var oFilter5 = new Filter("Payment Date", FilterOperator.Contains, value);
			var oFilter6 = new Filter("Amount", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2,oFilter3,oFilter4,oFilter5,oFilter6], false); 
			oBinding.filter(allFilter);
		}
	});

});