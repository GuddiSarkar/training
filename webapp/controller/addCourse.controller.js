sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.addCourse", {

		onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},

		onSearch: function(oEvent) {
			var oTable = this.getView().byId("table");
			var oBinding = oTable.getBinding("rows");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("Course Name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("Course Type", FilterOperator.Contains, value);
			var oFilter3 = new Filter("Course Fee", FilterOperator.Contains, value);
			var oFilter4 = new Filter("Course Duration", FilterOperator.Contains, value);
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
			//var oCDef = $.Deferred();
			/*oModel.read("/tb_course", 
			{
				success: function(oData) 
				{
					this.nextId = oData.results.length;
					oCDef.resolve();
				}.bind(this),
				error: function(oErr) 
				{
					this.nextId = null;
					oCDef.reject();
				}.bind(this)
			});

			$.when(oCDef).then(
				function() 
				{
					var oEntry = 
					{
						"course_id": this.nextId,
						"course_name": courseName,
						"course_type": courseType,
						"course_fee": courseFee,
						"course_duration": courseDuration
					};
					oModel.create("/tb_course", oEntry);

				}.bind(this)
			);*/
			oModel.setRefreshAfterChange(true);
		},

		onClickEdit: function() {
			var oView = this.getView();
			var oDialog = oView.byId("editCourse");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.editCourse", this);
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},

		onCloseEdit: function(oEvent) {
			this.getView().byId("editCourse").close();
		},

		onClickDelete: function(oEvent) {
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
		onOkDelete: function(oEvent) {
			var oView = this.getView();
			var oTable = this.getView().byId("Table");
			var path = oEvent.getSource().getParent().getBindingContext().getRows();
			var model = oTable.getModel();
			var property = model.getProperty(path);

			var oModel = this.getOwnerComponent().getModel();
			oModel.remove("/tb_course(" + property.id + ")", {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("deleteCourse").close();
		},

			onLogin: function(oEvent) {
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
				

		}
	});

});