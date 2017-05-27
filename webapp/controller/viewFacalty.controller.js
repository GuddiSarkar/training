sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,Filter, FilterOperator) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	

	return Controller.extend("com.demoTMS.controller.viewFacalty", {

		onInit: function(){
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},
			
		onSearch: function(oEvent){
		    var oTable = this.getView().byId("idTable");
			var oBinding = oTable.getBinding("rows");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("faculty_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("faculty_mob", FilterOperator.Contains, value);
			var oFilter3 = new Filter("faculty_email", FilterOperator.Contains, value);
			var oFilter4 = new Filter("faculty_course", FilterOperator.Contains, value);
			var oFilter5 = new Filter("faculty_salary", FilterOperator.Contains, value);
			//var oFilter6 = new Filter("Date of Joining", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2,oFilter3,oFilter4,oFilter5], false); 
			oBinding.filter(allFilter);
		}
	});

});