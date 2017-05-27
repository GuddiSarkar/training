sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,Filter, FilterOperator) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	var sPath;
	return Controller.extend("com.demoTMS.controller.addFacalty", {

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
			var allFilter = new Filter([oFilter1, oFilter2,oFilter3,oFilter4,oFilter5], false); 
			oBinding.filter(allFilter);
		},
	addFacalty: function(oEvent)
		{
			var FacaltyName = this.getView().byId("fac_name").getValue();
			var PhoneNumber = this.getView().byId("phn_num").getValue();
			var Salary = this.getView().byId("s_lary").getValue();
			var Email = this.getView().byId("e_mil").getValue();
			var CourseName = this.getView().byId("crs_name").getValue();
			var DateofJoining = this.getView().byId("d_oj").getValue();
			var oEntry = {"faculty_name": FacaltyName, "faculty_mob": PhoneNumber, "faculty_salary": Salary, "faculty_email": Email,"faculty_course":CourseName,"faculty_doj":DateofJoining};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			oModel.create("/tb_faculty",oEntry,
			{
				success: function(oData)
				{
					this.getView().byId("fac_name").setValue("");
					this.getView().byId("phn_num").setValue("");
					this.getView().byId("s_lary").setValue("");
					this.getView().byId("e_mil").setValue("");
					this.getView().byId("crs_name").setValue("");
					this.getView().byId("d_oj").setValue("");
				}.bind(this),
				error: function(error)
				{
					
				}.bind(this)
			}
			);
				oModel.setRefreshAfterChange(true);
		},
		
		onClickDelete: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("deleteFacalty");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.deleteFacalty", this);
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},
		onCancel: function(oEvent) {
			this.getView().byId("deleteFacalty").close();
		},
		
		onSelectRow: function(oEvent)
		{
			var oTable = this.getView().byId("idTable");
			sPath = oEvent.getParameter("rowContext").getPath();
		},
		onOkDelete: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.remove(sPath, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("deleteFacalty").close();
		},
	});

});