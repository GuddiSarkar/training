sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
], function(Controller, Filter, FilterOperator, History) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	var sPath;
	return Controller.extend("com.demoTMS.controller.addCourse", {

		onPressBack: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("course", {}, true /*no history*/ );
			}
		},

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
					this.getView().byId("c_type").setSelectedKey("");
					this.getView().byId("c_fee").setValue("");
					this.getView().byId("c_dur").setSelectedKey("");
				}.bind(this),
				error: function(error) {

				}.bind(this)
			});

			oModel.setRefreshAfterChange(true);
		},

		onClickEdit: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("editCourse");
			var oTable = this.getView().byId("adCrsTable");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.editCourse", this);
				oView.addDependent(oDialog);
			}
			var id = this.getView().byId("c_idEd").setValue(property.course_id);
			var CourseName = this.getView().byId("c_nameEd").setValue(property.course_name);
			var CourseFee = this.getView().byId("c_feeEd").setValue(property.course_fee);
			var CourseType = property.course_type;
			var CourseDuration = property.course_duration;

			if (CourseType === "Functional") {
				this.getView().byId("c_typeEd").setSelectedKey(2);
			} else {
				this.getView().byId("c_typeEd").setSelectedKey(1);
			}

			if (CourseDuration === "3 Month") {
				this.getView().byId("c_durEd").setSelectedKey(3);
			} else if (CourseDuration === "2 Month") {
				this.getView().byId("c_durEd").setSelectedKey(2);
			} else {
				this.getView().byId("c_durEd").setSelectedKey(1);
			}

			oDialog.open();
			var CourseType = this.getView().byId("c_typeEd").setSelectedItem(property.course_type);
			var CourseDuration = this.getView().byId("c_durEd").setSelectedItem(property.course_duration);
			oDialog.open();
		},

		onCloseEdit: function(oEvent) {
			this.getView().byId("editCourse").close();
		},

		onOkEdit: function(oEvent) {
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
			oModel.update("/tb_course(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("editCourse").close();
		},

		onClickDelete: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("deleteCourse");
			var oTable = this.getView().byId("adCrsTable");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.deleteCourse", this);
				oView.addDependent(oDialog);
			}
			var id = this.getView().byId("c_idDel").setValue(property.course_id);
			oDialog.open();
		},
		onCloseDelete: function(oEvent) {
			this.getView().byId("deleteCourse").close();
		},

		onOkDelete: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("deleteCourse");
			var id = this.getView().byId("c_idDel").getValue();
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.remove("/tb_course(" + id + ")", {
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