sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
], function(Controller,Filter, FilterOperator,History) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.viewStudent", {

	onPressBack: function(oEvent)
	{
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}
			else {
				this.getRouter().navTo("student", {}, true /*no history*/);
			}
	},
	
	formatDate: function(sValue){
			//var dt = this.getView().byId("date").getText();
			var value = sValue.substring(6, 19); // maybe it's safer to work with regular expressions
			jQuery.sap.require("sap.ui.core.format.DateFormat");

			var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd-MMM-yyyy"
			});
            
			console.log(oDateFormat.format(new Date(Number(value)))); // 2013/08/11
			var date = oDateFormat.format(new Date(Number(value)));
			return date;
	},
	
	onInit: function(){
			
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			
	},	


		onSearch: function(oEvent){
		    var oTable = this.getView().byId("adCrsTable");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("stud_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("stud_gender", FilterOperator.Contains, value);
			var oFilter3 = new Filter("stud_dob", FilterOperator.Contains, value);
			var oFilter4 = new Filter("stud_email", FilterOperator.Contains, value);
			var oFilter5 = new Filter("course_name", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2,oFilter3,oFilter4,oFilter5], false); 
			oBinding.filter(allFilter);
		}

	});

});