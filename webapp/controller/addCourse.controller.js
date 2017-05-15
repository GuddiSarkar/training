sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,Filter, FilterOperator) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.addCourse", {

			onSearch: function(oEvent){
		    var oTable = this.getView().byId("table");
			var oBinding = oTable.getBinding("rows");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("Course Name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("Course Type", FilterOperator.Contains, value);
			var oFilter3 = new Filter("Course Fee", FilterOperator.Contains, value);
			var oFilter4 = new Filter("Course Duration", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2,oFilter3,oFilter4], false); 
			oBinding.filter(allFilter);
		}
	});

});