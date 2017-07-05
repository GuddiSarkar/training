sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
], function(Controller,Filter, FilterOperator,History) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.viewCourse", {
		
			onPressBack: function(oEvent)
		{
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}
			else {
				this.getRouter().navTo("course", {}, true /*no history*/);
			}
	},

		onSearch: function(oEvent){
		    var oTable = this.getView().byId("Table");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("course_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("course_type", FilterOperator.Contains, value);
			var oFilter3 = new Filter("course_fee", FilterOperator.Contains, value);
			var oFilter4 = new Filter("course_duration", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2,oFilter3,oFilter4], false); 
			oBinding.filter(allFilter);
		},
		onInit: function(){
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		}
	});

});