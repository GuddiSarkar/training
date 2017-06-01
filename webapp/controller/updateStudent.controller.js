sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,Filter, FilterOperator) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.updateStudent", {

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
		},
			onInit: function(){
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},
		
		onClickEdit: function(oEvent)
		{
		var oView = this.getView();
		var oDialog = oView.byId("updateStudent");
		var oTable = this.getView().byId("Table");
		var path=oEvent.getSource().getBindingContext("course").getPath();
		var model =oTable.getModel("course");
		var property=model.getProperty(path);
		if(!oDialog)
		{
			oDialog = sap.ui.xmlfragment(oView.getId(),"com.demoTMS.view.UpdateStudent",this);
			oView.addDependent(oDialog);
			
		}
			var id = this.getView().byId("s_idEd").setValue(property.stud_id);
			var StudentName = this.getView().byId("s_nameEd").setValue(property.stud_name);
			var Gender = this.getView().byId("s_gndrEd").setValue(property.stud_gender);
			var DOB = this.getView().byId("s_dobEd").setValue(property.stud_dob);
			var Email = this.getView().byId("s_emlEd").setValue(property.stud_email);
			var Phoneno = this.getView().byId("s_phnEd").setValue(property.stud_mob);
			var CourseName = this.getView().byId("s_crsEd").setValue(property.course_name);
		
		oDialog.open();
		},

		onCloseEdit: function(oEvent) {
			this.getView().byId("updateStudent").close();
		},
		onOkEdit:function(oEvent)
		{
			var id = this.getView().byId("s_idEd").getValue();
			var StudentName = this.getView().byId("s_nameEd").getValue();
			var Gender = this.getView().byId("s_gndrEd").getValue();
			var DOB = this.getView().byId("s_dobEd").getValue();
			var Email = this.getView().byId("s_emlEd").getValue();
			var Phoneno = this.getView().byId("s_phnEd").getValue();
			var CourseName = this.getView().byId("s_crsEd").getValue();
			var data = {
				"stud_id": id,
				"stud_name": StudentName,
				"stud_gender": Gender,
				"stud_dob": DOB,
				"stud_email": Email,
				"stud_mob": Phoneno,
				"stud_course_name": CourseName
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.update("/tb_student("+id+")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
	oModel.setRefreshAfterChange(true);
	this.getView().byId("updateStudent").close();
		
		}

	});

});