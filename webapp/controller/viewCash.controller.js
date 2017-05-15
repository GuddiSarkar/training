sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,Filter, FilterOperator) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.viewCash", {

		onSearch: function(oEvent){
		    var oTable = this.getView().byId("table");
			var oBinding = oTable.getBinding("rows");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("Student Name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("Course Name", FilterOperator.Contains, value);
			var oFilter3 = new Filter("Transaction Type", FilterOperator.Contains, value);
			var oFilter4 = new Filter("cheque Number", FilterOperator.Contains, value);
			var oFilter5 = new Filter("Discount", FilterOperator.Contains, value);
			var oFilter6 = new Filter("Amount", FilterOperator.Contains, value);
			var oFilter7 = new Filter("Registration Fee", FilterOperator.Contains, value);
			var oFilter8 = new Filter("1st Installment", FilterOperator.Contains, value);
			var oFilter9 = new Filter("2nd Installment", FilterOperator.Contains, value);
			var oFilter10 = new Filter("3rd Installment", FilterOperator.Contains, value);
			var oFilter11 = new Filter("Tax", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2,oFilter3,oFilter4,oFilter5,oFilter6,oFilter7,oFilter8,oFilter9,oFilter10,oFilter11], false); 
			oBinding.filter(allFilter);
		}
	});

});