sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
], function(Controller, Filter, FilterOperator, History) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.firstInstalment", {
		oFormatDdmmyyyy: null,
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
			
			this.oFormatDdmmyyyy = sap.ui.core.format.DateFormat.getInstance({
				pattern: "dd-MM-yyyy",
				calendarType: sap.ui.core.CalendarType.Gregorian
			});
			
			var amnt = 0;
			var filterUnpaid = new Filter("stud_payment_instal_1", FilterOperator.EQ, amnt);
			oModel.read("/tb_stud_payment", {
				filters: [filterUnpaid],
				success: function(oData, oResponse) {
					var nModel = new sap.ui.model.json.JSONModel();
					nModel.setData({
						insU: oData.results
					});
					this.getView().setModel(nModel, "unpaid");
					var uModel = this.getView().getModel("unpaid");
					uModel.setRefreshAfterChange(true);
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});

			var filterPaid = new Filter("stud_payment_instal_1", FilterOperator.NE, amnt);
			oModel.read("/tb_stud_payment", {
				filters: [filterPaid],
				success: function(oData, oResponse) {
					var cModel = new sap.ui.model.json.JSONModel();
					cModel.setData({
						insP: oData.results
					});
					this.getView().setModel(cModel, "paid");
					var pModel = this.getView().getModel("paid");
					pModel.setRefreshAfterChange(true);
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});
		},
		
		formatAmount: function(sValue)
		{
			var str = sValue;
			var res = str.split(",");
    		var amount = res[0];
    		return amount;
		},

		onSearch: function(oEvent) {
			var oTable = this.getView().byId("Table");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("stud_payment_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("stud_payment_course", FilterOperator.Contains, value);
			var oFilter3 = new Filter("stud_payment_instal_1", FilterOperator.Contains, value);
			var oFilter4 = new Filter("stud_payment_fee", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter3, oFilter4], false);
			oBinding.filter(allFilter);
		},

		onClickPayNow: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("stud_pay");
			var oTable = this.getView().byId("adCrsTable");
			var path = oEvent.getSource().getBindingContext("unpaid").getPath();
			var model = oTable.getModel("unpaid");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.stud_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("tid").setValue(property.stud_payment_id);
			var paid = oView.byId("paid").setValue(property.stud_payment_paid);
			var due = oView.byId("due").setValue(property.stud_payment_due);
			var total = oView.byId("total").setValue(property.stud_payment_fee);
			var date = oView.byId("date").setValue(date);
			oDialog.open();
		},
		
		onClose: function()
		{
			var oView = this.getView();
			var oDialog = oView.byId("stud_pay");
			oDialog.close();
		},
		
		OnClickSet: function()
		{
			var id = this.getView().byId("tid").getValue();
			var paid = this.getView().byId("paid").getValue();
			var due = this.getView().byId("due").getValue();
			var total = this.getView().byId("total").getValue();
			var amount = this.getView().byId("amnt").getValue();
			var newPaid = paid+amount;
			var newDue = total-newPaid;
			var date = this.getView().byId("date").getValue();
			var installment = amount+","+date;
			var tranType = this.getView().byId("tran_type").getSelectedItem().getText()+",";
			var chequeNo = this.getView().byId("chq_no").getValue()+",";
			var bankName = this.getView().byId("bank_name").getValue()+",";
			var data = {
				"stud_payment_instal_1": installment,
				"stud_payment_paid": newPaid,
				"stud_payment_due": newDue,
				"stud_payment_type": tranType,
				"stud_payment_bank": bankName,
				"tb_stud_payment_cheque_no": chequeNo
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.update("/tb_stud_payment(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("stud_pay").close();
		}

	});

});