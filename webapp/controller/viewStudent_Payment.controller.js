sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
], function(Controller, Filter, FilterOperator, History) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.viewStudent_Payment", {

		onPressBack: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("payment", {}, true /*no history*/ );
			}
		},

		onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},
		formatAmount: function(sValue)
		{
			var str = sValue;
			var res = str.split(",");
    		var amount = res[0];
    		return amount;
		},
		onSearch: function(oEvent) {
			var oTable = this.getView().byId("adCrsTable");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("stud_payment_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("stud_payment_course", FilterOperator.Contains, value);
			var oFilter3 = new Filter("stud_payment_reg_fee", FilterOperator.Contains, value);
			var oFilter4 = new Filter("stud_payment_instal_1", FilterOperator.Contains, value);
			var oFilter5 = new Filter("stud_payment_instal_2", FilterOperator.Contains, value);
			var oFilter6 = new Filter("stud_payment_instal_3", FilterOperator.Contains, value);
			//var oFilter7 = new Filter("Amount", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6], false);
			oBinding.filter(allFilter);
		},
	onClickDelete: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("deletepayment");
			var oTable = this.getView().byId("adCrsTable");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.deletePaymnt", this);
				oView.addDependent(oDialog);
			}
			var id = this.getView().byId("c_idDel").setValue(property.stud_payment_id);
			oDialog.open();
		},
		onCloseDelete: function(oEvent) {
			this.getView().byId("deletepayment").close();
		},

		onOkDelete: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("deletepayment");
			var id = this.getView().byId("c_idDel").getValue();
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.remove("/tb_stud_payment(" + id + ")", {
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