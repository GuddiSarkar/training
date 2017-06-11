sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
], function(Controller,Filter, FilterOperator,History) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	var sPath;
	return Controller.extend("com.demoTMS.controller.addFacalty", {
		
		onPressBack: function(oEvent)
		{
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}
			else {
				this.getRouter().navTo("facalty", {}, true /*no history*/);
			}
		},

		onInit: function(){
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
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
	
	

		onSearch: function(oEvent){
		    var oTable = this.getView().byId("adCrsTable");
			var oBinding = oTable.getBinding("items");
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
		
		
		onClickEdit: function(oEvent)
		{
		var oView = this.getView();
		var oDialog = oView.byId("editFacalty");
		var oTable = this.getView().byId("adCrsTable");
		var path=oEvent.getSource().getBindingContext("course").getPath();
		var model =oTable.getModel("course");
		var property=model.getProperty(path);
		if(!oDialog)
		{
			oDialog = sap.ui.xmlfragment(oView.getId(),"com.demoTMS.view.editFacalty",this);
			oView.addDependent(oDialog);
			
		}
			var id = this.getView().byId("f_idEd").setValue(property.faculty_id);
			var FacaltyName = this.getView().byId("f_nameEd").setValue(property.faculty_name);
			var PhoneNumber = this.getView().byId("f_phneEd").setValue(property.faculty_mob);
			var Salary = this.getView().byId("f_salEd").setValue(property.faculty_salary);
			var Email = this.getView().byId("f_emlEd").setValue(property.faculty_email);
			var CourseName = this.getView().byId("f_crsnmeEd").setValue(property.faculty_course);
			var DateofJoining = this.getView().byId("f_dojEd").setValue(property.faculty_doj);
		
		oDialog.open();
		},

		onCloseEdit: function(oEvent) {
			this.getView().byId("editFacalty").close();
		},
		onOkEdit:function(oEvent)
		{
			var id = this.getView().byId("f_idEd").getValue();
			var FacaltyName = this.getView().byId("f_nameEd").getValue();
			var PhoneNumber = this.getView().byId("f_phneEd").getValue();
			var Salary = this.getView().byId("f_salEd").getValue();
			var Email = this.getView().byId("f_emlEd").getValue();
			var CourseName = this.getView().byId("f_crsnmeEd").getValue();
			var DateofJoining = this.getView().byId("f_dojEd").getValue();
			var data = {
				"faculty_id": id,
				"faculty_name": FacaltyName,
				"faculty_mob": PhoneNumber,
				"faculty_salary": Salary,
				"faculty_email": Email,
				"faculty_course": CourseName,
				"faculty_doj": DateofJoining
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.update("/tb_faculty("+id+")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
	oModel.setRefreshAfterChange(true);
	this.getView().byId("editFacalty").close();
		},
		
		onClickDelete: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("deleteFacalty");
			var oTable = this.getView().byId("adCrsTable");
			var path=oEvent.getSource().getBindingContext("course").getPath();
			var model =oTable.getModel("course");
			var property=model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.deleteFacalty", this);
				oView.addDependent(oDialog);
			}
			var id = this.getView().byId("c_idDel1").setValue(property.faculty_id);
			oDialog.open();
		},
		onCloseDelete: function(oEvent) {
			this.getView().byId("deleteFacalty").close();
		},
		
		
		onOkDelete: function(oEvent) 
		{
			var oView = this.getView();
			var oDialog = oView.byId("deleteFacalty");
			var id = this.getView().byId("c_idDel1").getValue();
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.remove("/tb_faculty(" +id + ")", {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			oDialog.close();
		}
	});

});