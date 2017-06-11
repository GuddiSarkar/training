sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Update_Reminder", {

		onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onPressBack: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("reminder", {}, true /*no history*/ );
			}
		},

		onSearch: function(oEvent) {
			var oTable = this.getView().byId("Table");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("reminder_title", FilterOperator.Contains, value);
			var oFilter2 = new Filter("reminder_date", FilterOperator.Contains, value);
			var oFilter3 = new Filter("reminder_attended", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter3], false);
			oBinding.filter(allFilter);
		},

		formatDate: function(sValue) {
			var value = sValue.substring(6, 19); // maybe it's safer to work with regular expressions
			jQuery.sap.require("sap.ui.core.format.DateFormat");

			var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd-MM-yyyy"
			});

			console.log(oDateFormat.format(new Date(Number(value)))); // 2013/08/11
			var date = oDateFormat.format(new Date(Number(value)));
			return date;
		},
		

		onClickEdit: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("updateReminder");
			var oTable = this.getView().byId("Table");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.update_reminder", this);
				oView.addDependent(oDialog);
			}
			var rem_id = this.getView().byId("rem_id").setValue(property.reminder_id);
			var rem_date = this.getView().byId("date").setValue(property.reminder_date);
			var rem_title = this.getView().byId("title").setValue(property.reminder_title);
			var rem_desc = this.getView().byId("desc").setValue(property.reminder_description);
			oDialog.open();
		},

		onCancelFolowUp: function(oEvent) {
			this.getView().byId("updateReminder").close();
		},
		onOkEdit: function(oEvent) {
			var rem_id = this.getView().byId("rem_id").getValue();
			var rem_date = this.getView().byId("date").getValue();
			var rem_title = this.getView().byId("title").getValue();
			var rem_desc = this.getView().byId("desc").getValue();
			var data = {
				"reminder_id": rem_id,
				"reminder_description": rem_desc,
				"reminder_date": rem_date,
				"reminder_title": rem_title,
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.update("/tb_reminder(" + rem_id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("updateReminder").close();

		},

	});

});