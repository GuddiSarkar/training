sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	var sPath;
	return Controller.extend("com.demoTMS.controller.addCourse", {
		
		onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},

		onSearch: function(oEvent) {
			var oTable = this.getView().byId("adCrsTable");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("course_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("course_type", FilterOperator.Contains, value);
			var oFilter3 = new Filter("course_fee", FilterOperator.Contains, value);
			var oFilter4 = new Filter("course_duration", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter3, oFilter4], false);
			oBinding.filter(allFilter);
		},

		addCourse: function(oEvent) {
			var courseName = this.getView().byId("c_name").getValue();
			var courseFee = this.getView().byId("c_fee").getValue();
			var courseType = this.getView().byId("c_type").getSelectedItem().getText();
			var courseDuration = this.getView().byId("c_dur").getSelectedItem().getText();
			var oEntry = {
				"course_name": courseName,
				"course_type": courseType,
				"course_fee": courseFee,
				"course_duration": courseDuration
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			oModel.create("/tb_course", oEntry, {
				success: function(oData) {
					this.getView().byId("c_name").setValue("");
					this.getView().byId("c_type").setValue("");
					this.getView().byId("c_fee").setValue("");
					this.getView().byId("c_dur").setValue("");
				}.bind(this),
				error: function(error) {

				}.bind(this)
			});
		
			oModel.setRefreshAfterChange(true);
		},

	/*	onClickEdit: function(oEvent) 
		{
				var oView = this.getView();
			var oDialog = oView.byId("editCourse");
				if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.editCourse", this);
				oView.addDependent(oDialog);
			}
			
			oDialog.open();
		
			var oTable = oView.byId("Table");
			var path = sPath;
			var name;
			var id;
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read(path, 
			{
				success: function(oData,oResponse) 
				{
					console.log(oData);
					console.log(oResponse);
					name = oData.course_name;
					console.log(name);
					id = oData.course_id;
					console.log(id);
					var CourseName = this.getView().byId("c_nameEd").setValue(name);
			console.log(CourseName);
			var Id = this.getView().byId("c_feeEd").setValue(id);
			console.log(Name);
				}.bind(this),
				error: function(oErr) 
				{
					
				}.bind(this)
			});
		
		},*/
		
		
		
		onClickEdit: function(oEvent)
		{
		var oView = this.getView();
		var oDialog = oView.byId("editCourse");
		var oTable = this.getView().byId("adCrsTable");
		var path=oEvent.getSource().getBindingContext().getPath();
		var model =oTable.getModel();
		var property=model.getProperty(path);
		if(!oDialog)
		{
			oDialog = sap.ui.xmlfragment(oView.getId(),"com.demoTMS.view.editCourse",this);
			oView.addDependent(oDialog);
			
	}
		
			var CourseName = this.getView().byId("c_nameEd").setValue(property.course_name);
			var CourseFee = this.getView().byId("c_feeEd").setValue(property.course_fee);
			var CourseType = this.getView().byId("c_typeEd").setValue(property.course_type);
			var CourseDuration = this.getView().byId("c_durEd").setValue(property.course_duration);
		
		oDialog.open();
		},

		onCloseEdit: function(oEvent) {
			this.getView().byId("editCourse").close();
		},
		onOkEdit:function(oEvent)
		{
		
			var CourseName = this.getView().byId("c_nameEd").getValue();
			var CourseFee = this.getView().byId("c_feeEd").getValue();
			var CourseType = this.getView().byId("c_typeEd").getValue();
			var CourseDuration = this.getView().byId("c_durEd").getValue();
			var data = {
				"ID": id,
				"Description": description,
				"Name": name,
				"Rating": rating,
				"Price": price
			};
			var oModel = this.getOwnerComponent().getModel();
			oModel.update("/Products("+id+")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
	oModel.setRefreshAfterChange(true);
	this.getView().byId("dialog").close();
		},

		/*onClickDelete: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("deleteCourse");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.deleteCourse", this);
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},
		onCancel: function(oEvent) {
			this.getView().byId("deleteCourse").close();
		},
		*/
		
		onOkDelete: function(oEvent) 
		{
			var oView = this.getView();
			//var oDialog = oView.byId("dialog");
			var oTable = this.getView().byId("Table");
			var path=oEvent.getSource().getParent().getBindingContext().getPath();
			var model =oTable.getModel();
			var property=model.getProperty(path);
			
			var oModel = this.getOwnerComponent().getModel();
			oModel.remove("/tb_course(" + property.ID + ")", {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			//this.getView().byId("deleteCourse").close();
		},

			/*onLogin: function(oEvent) {
				var name=this.byId("name").getValue();
				var pwd=this.byId("pwd").getValue();
				var filtername= new Filter("name",FilterOperator.EQ,name);
				var filterpwd= new Filter("pwd",FilterOperator.EQ,paswsword);
				var oFilter=new Filter({
					filters: [filtername,filterpwd],
					bAnd: true });
				oModel.read("/tb_course",{
					filters: [oAllFilters],
					success: function(oData, oResponse) {
						oData.results;
				}
				});
				

		}*/
	});

});