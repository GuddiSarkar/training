sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
], function(Controller,Filter, FilterOperator,History) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.updateCourse", {
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


		onInit: function()
			{
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
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

		
		onClickEdit: function(oEvent)
		{
		var oView = this.getView();
		var oDialog = oView.byId("updateCourse");
		var oTable = this.getView().byId("Table");
		var path=oEvent.getSource().getBindingContext("course").getPath();
		var model =oTable.getModel("course");
		var property=model.getProperty(path);
		if(!oDialog)
		{
			oDialog = sap.ui.xmlfragment(oView.getId(),"com.demoTMS.view.UpdateCourse",this);
			oView.addDependent(oDialog);
			
		}
			var id = this.getView().byId("c_idEd").setValue(property.course_id);
			var CourseName = this.getView().byId("c_nameEd").setValue(property.course_name);
			var CourseFee = this.getView().byId("c_feeEd").setValue(property.course_fee);
			var CourseType = this.getView().byId("c_typeEd").setSelectedItem(property.course_type);
			var CourseDuration = this.getView().byId("c_durEd").setSelectedItem(property.course_duration);
		
		oDialog.open();
		},

		onCloseEdit: function(oEvent) {
			this.getView().byId("updateCourse").close();
		},
		onOkEdit:function(oEvent)
		{
			var id = this.getView().byId("c_idEd").getValue();
			var CourseName = this.getView().byId("c_nameEd").getValue();
			var CourseFee = this.getView().byId("c_feeEd").getValue();
			var CourseType = this.getView().byId("c_typeEd").getSelectedItem().getText();
			var CourseDuration = this.getView().byId("c_durEd").getSelectedItem().getText();
			var data = {
				"course_id": id,
				"course_name": CourseName,
				"course_fee": CourseFee,
				"course_type": CourseType,
				"course_duration": CourseDuration
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.update("/tb_course("+id+")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
	oModel.setRefreshAfterChange(true);
	this.getView().byId("updateCourse").close();
		
		}

	});

});