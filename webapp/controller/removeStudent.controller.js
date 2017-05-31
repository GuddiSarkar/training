sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,Filter, FilterOperator) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.removeStudent", {

			onSearch: function(oEvent){
		    var oTable = this.getView().byId("adCrsTable");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("stud_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("course_name", FilterOperator.Contains, value);
			//var oFilter3 = new Filter("Pay Status", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2], false); 
			oBinding.filter(allFilter);
		},
			onInit: function(){
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},
		onClickDelete: function(oEvent)
		{
			var oView = this.getView();
			var oTable = this.getView().byId("Table");
			var path=oEvent.getSource().getBindingContext("course").getPath();
			var model =oTable.getModel("course");
			var property=model.getProperty(path);
			
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