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
			this.getView().byId("unpaid").setVisible(true);
			this.getView().byId("paid").setVisible(true);
			this.getView().byId("receipt").setVisible(false);
			this.getView().byId("prntbtn").setVisible(false);
			this.getView().byId("backbtn").setVisible(false);
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

		formatAmount: function(sValue) {
			var str = sValue;
			var res = str.split(",");
			var amount = res[0];
			return amount;

		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);

		},

		onSearch: function(oEvent) {
			var oTable = this.getView().byId("adCrsTable");

			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("stud_payment_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("stud_payment_course", FilterOperator.Contains, value);
			var oFilter3 = new Filter("stud_payment_instal_1", FilterOperator.Contains, value);
			var oFilter4 = new Filter("stud_payment_fee", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter3, oFilter4], false);
			oBinding.filter(allFilter);
		},
		onSearch1: function(oEvent) {
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
		onSearch1: function(oEvent) {
			var oTable = this.getView().byId("Table");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("stud_payment_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("stud_payment_course", FilterOperator.Contains, value);
			var oFilter3 = new Filter("stud_payment_instal_1", FilterOperator.Contains, value);
			var oFilter4 = new Filter("stud_payment_type", FilterOperator.Contains, value);
			var oFilter5 = new Filter("stud_payment_fee", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5], false);
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

		onClose: function() {
			var oView = this.getView();
			var oDialog = oView.byId("stud_pay");
			oDialog.close();
		},

		OnClickSet: function() {
			var id = this.getView().byId("tid").getValue();
<<<<<<< Upstream, based on 2c1625679b3a226a9e83bcd1b8234a966b1b6c75
			var paid = this.getView().byId("paid").getValue();
			var due = this.getView().byId("due").getValue();
			var total = this.getView().byId("total").getValue();
			var amount = this.getView().byId("amnt").getValue();

			var paidamnt = this.getView().byId("paid").getValue();
			var paid = parseInt(paidamnt);
			var dueamnt = this.getView().byId("due").getValue();
			var due = parseInt(paidamnt);
			var totalamnt = this.getView().byId("total").getValue();
			var total = parseInt(totalamnt);
			var amnt = this.getView().byId("amnt").getValue();
			var amount = parseInt(amnt);

			var newPaid = paid + amount;
			var newDue = total - newPaid;
			var date = this.getView().byId("date").getValue();
			var installment = amount + "," + date;
			var tranType = this.getView().byId("tran_type").getSelectedItem().getText() + ",";
			var chequeNo = this.getView().byId("chq_no").getValue() + ",";
			var bankName = this.getView().byId("bank_name").getValue() + ",";
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
					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("stud_pay").close();
		},

		onClickBill: function(oEvent) {
			console.log("hello");
			this.getView().byId("paid").setVisible(false);
			this.getView().byId("unpaid").setVisible(false);
			this.getView().byId("receipt").setVisible(true);
			//this.getView().byId("prntbtn").setVisible(true);
			//this.getView().byId("backbtn").setVisible(true);
			//this.getRouter().navTo("Bill_Generate");
			
			var oTable = this.getView().byId("Table");
			var path = oEvent.getSource().getBindingContext("paid").getPath();
			var model = oTable.getModel("paid");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path); 
			var name = property.stud_payment_name;
			var course = property.stud_payment_course;
			var amnt = property.stud_payment_instal_1;
			var res = amnt.split(",");
			var amount = res[0];
			var totalFee = property.stud_payment_fee;
			var due = property.stud_payment_due;
			var cheque = property.tb_stud_payment_cheque_no;
			var chq = cheque.split(",");
			var chequeNo = chq[2];
			
			this.getView().byId("bill_date").setText(date);
			this.getView().byId("bill_name").setText(name);
			this.getView().byId("bill_crs").setText(course);
			this.getView().byId("bill_inr").setText(amount);
			this.getView().byId("total_fee").setText(totalFee);
			this.getView().byId("amnt_paid").setText(amount);
			this.getView().byId("amnt_due").setText(due);
			this.getView().byId("bill_chq_no").setText(chequeNo);
		},

		onPrint: function(oEvent) {
			// var header='<center><h3>Payment Receipt</h3></center>';
			var oTarget = this.getView(),
				// this.getView().byId("result").innerHTML = this.getView().byId('fname').value + " " + this.getView().byId('mname').value + " " + this.getView().byId('lname').value;
				sTargetId = oEvent.getSource().data("prnt");

			if (sTargetId) {
				oTarget = oTarget.byId("prnt");
			}

			if (oTarget) {
				var $domTarget = oTarget.$()[0],
					sTargetContent = $domTarget.innerHTML,
					sOriginalContent = document.body.innerHTML;

				document.body.innerHTML = sTargetContent;
				window.print();
				document.body.innerHTML = sOriginalContent;
			} else {
				jQuery.sap.log.error("onPrint needs a valid target container [view|data:targetId=\"SID\"]");
			}
		}

	});

});