sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Facalty_Payment", {

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
			var date = new Date();
			var ndate = date.toString();
			console.log(date);
			console.log(ndate);
			var str = ndate.split(" ");
			var month = str[1];

			if (month === "Jan") {
				this.getView().byId("Jan").setVisible(true);
				this.getView().byId("Feb").setVisible(false);
				this.getView().byId("Mar").setVisible(false);
				this.getView().byId("Apr").setVisible(false);
				this.getView().byId("May").setVisible(false);
				this.getView().byId("Jun").setVisible(false);
				this.getView().byId("Jul").setVisible(false);
				this.getView().byId("Aug").setVisible(false);
				this.getView().byId("Sep").setVisible(false);
				this.getView().byId("Oct").setVisible(false);
				this.getView().byId("Nov").setVisible(false);
				this.getView().byId("Dec").setVisible(false);
				console.log(month);
			} else if (month === "Feb") {
				this.getView().byId("Jan").setVisible(false);
				this.getView().byId("Feb").setVisible(true);
				this.getView().byId("Mar").setVisible(false);
				this.getView().byId("Apr").setVisible(false);
				this.getView().byId("May").setVisible(false);
				this.getView().byId("Jun").setVisible(false);
				this.getView().byId("Jul").setVisible(false);
				this.getView().byId("Aug").setVisible(false);
				this.getView().byId("Sep").setVisible(false);
				this.getView().byId("Oct").setVisible(false);
				this.getView().byId("Nov").setVisible(false);
				this.getView().byId("Dec").setVisible(false);
				console.log(month);
			} else if (month === "Mar") {
				this.getView().byId("Jan").setVisible(false);
				this.getView().byId("Feb").setVisible(false);
				this.getView().byId("Mar").setVisible(true);
				this.getView().byId("Apr").setVisible(false);
				this.getView().byId("May").setVisible(false);
				this.getView().byId("Jun").setVisible(false);
				this.getView().byId("Jul").setVisible(false);
				this.getView().byId("Aug").setVisible(false);
				this.getView().byId("Sep").setVisible(false);
				this.getView().byId("Oct").setVisible(false);
				this.getView().byId("Nov").setVisible(false);
				this.getView().byId("Dec").setVisible(false);
				console.log(month);
			} else if (month === "Apr") {
				this.getView().byId("Jan").setVisible(false);
				this.getView().byId("Feb").setVisible(false);
				this.getView().byId("Mar").setVisible(false);
				this.getView().byId("Apr").setVisible(true);
				this.getView().byId("May").setVisible(false);
				this.getView().byId("Jun").setVisible(false);
				this.getView().byId("Jul").setVisible(false);
				this.getView().byId("Aug").setVisible(false);
				this.getView().byId("Sep").setVisible(false);
				this.getView().byId("Oct").setVisible(false);
				this.getView().byId("Nov").setVisible(false);
				this.getView().byId("Dec").setVisible(false);
				console.log(month);
			} else if (month === "May") {
				this.getView().byId("Jan").setVisible(false);
				this.getView().byId("Feb").setVisible(false);
				this.getView().byId("Mar").setVisible(false);
				this.getView().byId("Apr").setVisible(false);
				this.getView().byId("May").setVisible(true);
				this.getView().byId("Jun").setVisible(false);
				this.getView().byId("Jul").setVisible(false);
				this.getView().byId("Aug").setVisible(false);
				this.getView().byId("Sep").setVisible(false);
				this.getView().byId("Oct").setVisible(false);
				this.getView().byId("Nov").setVisible(false);
				this.getView().byId("Dec").setVisible(false);
				console.log(month);
			} else if (month === "Jun") {
				this.getView().byId("Jan").setVisible(false);
				this.getView().byId("Feb").setVisible(false);
				this.getView().byId("Mar").setVisible(false);
				this.getView().byId("Apr").setVisible(false);
				this.getView().byId("May").setVisible(false);
				this.getView().byId("Jun").setVisible(true);
				this.getView().byId("Jul").setVisible(false);
				this.getView().byId("Aug").setVisible(false);
				this.getView().byId("Sep").setVisible(false);
				this.getView().byId("Oct").setVisible(false);
				this.getView().byId("Nov").setVisible(false);
				this.getView().byId("Dec").setVisible(false);
				console.log(month);
			} else if (month === "Jul") {
				this.getView().byId("Jan").setVisible(false);
				this.getView().byId("Feb").setVisible(false);
				this.getView().byId("Mar").setVisible(false);
				this.getView().byId("Apr").setVisible(false);
				this.getView().byId("May").setVisible(false);
				this.getView().byId("Jun").setVisible(false);
				this.getView().byId("Jul").setVisible(true);
				this.getView().byId("Aug").setVisible(false);
				this.getView().byId("Sep").setVisible(false);
				this.getView().byId("Oct").setVisible(false);
				this.getView().byId("Nov").setVisible(false);
				this.getView().byId("Dec").setVisible(false);
				console.log(month);
			} else if (month === "Aug") {
				this.getView().byId("Jan").setVisible(false);
				this.getView().byId("Feb").setVisible(false);
				this.getView().byId("Mar").setVisible(false);
				this.getView().byId("Apr").setVisible(false);
				this.getView().byId("May").setVisible(false);
				this.getView().byId("Jun").setVisible(false);
				this.getView().byId("Jul").setVisible(false);
				this.getView().byId("Aug").setVisible(true);
				this.getView().byId("Sep").setVisible(false);
				this.getView().byId("Oct").setVisible(false);
				this.getView().byId("Nov").setVisible(false);
				this.getView().byId("Dec").setVisible(false);
				console.log(month);
			} else if (month === "Sep") {
				this.getView().byId("Jan").setVisible(false);
				this.getView().byId("Feb").setVisible(false);
				this.getView().byId("Mar").setVisible(false);
				this.getView().byId("Apr").setVisible(false);
				this.getView().byId("May").setVisible(false);
				this.getView().byId("Jun").setVisible(false);
				this.getView().byId("Jul").setVisible(false);
				this.getView().byId("Aug").setVisible(false);
				this.getView().byId("Sep").setVisible(true);
				this.getView().byId("Oct").setVisible(false);
				this.getView().byId("Nov").setVisible(false);
				this.getView().byId("Dec").setVisible(false);
				console.log(month);
			} else if (month === "Oct") {
				this.getView().byId("Jan").setVisible(false);
				this.getView().byId("Feb").setVisible(false);
				this.getView().byId("Mar").setVisible(false);
				this.getView().byId("Apr").setVisible(false);
				this.getView().byId("May").setVisible(false);
				this.getView().byId("Jun").setVisible(false);
				this.getView().byId("Jul").setVisible(false);
				this.getView().byId("Aug").setVisible(false);
				this.getView().byId("Sep").setVisible(false);
				this.getView().byId("Oct").setVisible(true);
				this.getView().byId("Nov").setVisible(false);
				this.getView().byId("Dec").setVisible(false);
				console.log(month);
			} else if (month === "Nov") {
				this.getView().byId("Jan").setVisible(false);
				this.getView().byId("Feb").setVisible(false);
				this.getView().byId("Mar").setVisible(false);
				this.getView().byId("Apr").setVisible(false);
				this.getView().byId("May").setVisible(false);
				this.getView().byId("Jun").setVisible(false);
				this.getView().byId("Jul").setVisible(false);
				this.getView().byId("Aug").setVisible(false);
				this.getView().byId("Sep").setVisible(false);
				this.getView().byId("Oct").setVisible(false);
				this.getView().byId("Nov").setVisible(true);
				this.getView().byId("Dec").setVisible(false);
				console.log(month);
			} else {
				this.getView().byId("Jan").setVisible(false);
				this.getView().byId("Feb").setVisible(false);
				this.getView().byId("Mar").setVisible(false);
				this.getView().byId("Apr").setVisible(false);
				this.getView().byId("May").setVisible(false);
				this.getView().byId("Jun").setVisible(false);
				this.getView().byId("Jul").setVisible(false);
				this.getView().byId("Aug").setVisible(false);
				this.getView().byId("Sep").setVisible(false);
				this.getView().byId("Oct").setVisible(false);
				this.getView().byId("Nov").setVisible(false);
				this.getView().byId("Dec").setVisible(true);
				console.log(month);
			}
		},

		formatAmount6: function(sValue) {
			var str = sValue;
			var res = str.split(",");
			var amount = res[0];
			console.log(amount);
			return amount;
		},

		// onSelect: function(){
		// 	var date = new Date();
		// 	var ndate = date.toString();
		// 	console.log(date);
		// 	console.log(ndate);
		// 	var str = ndate.split(" ");
		// 	var month = str[1];
		// 	console.log(month);
		// 	var items = this.getView().byId("sel").getItems();
		// 	for(var i=0; i<items.length; i++)
		// 	{
		// 		var mon = items[i].getText();
		// 		//console.log(mon);
		// 		if(items[i].getText() !== month)
		// 		{
		// 			items[i].setEnabled(false);
		// 		}
		// 	}
		// },

		onSearch: function(oEvent) {
			var oTable = this.getView().byId("Jan");
			var oTable1 = this.getView().byId("Feb");
			var oTable2 = this.getView().byId("Mar");
			var oTable3 = this.getView().byId("Apr");
			var oTable4 = this.getView().byId("May");
			var oTable5 = this.getView().byId("Jun");
			var oTable6 = this.getView().byId("Jul");
			var oTable7 = this.getView().byId("Aug");
			var oTable8 = this.getView().byId("Sep");
			var oTable9 = this.getView().byId("Oct");
			var oTable10 = this.getView().byId("Nov");
			var oTable11 = this.getView().byId("Dec");
			var oBinding = oTable.getBinding("items");
			var oBinding1 = oTable1.getBinding("items");
			var oBinding2 = oTable2.getBinding("items");
			var oBinding3 = oTable3.getBinding("items");
			var oBinding4 = oTable4.getBinding("items");
			var oBinding5 = oTable5.getBinding("items");
			var oBinding6 = oTable6.getBinding("items");
			var oBinding7 = oTable7.getBinding("items");
			var oBinding8 = oTable8.getBinding("items");
			var oBinding9 = oTable9.getBinding("items");
			var oBinding10 = oTable10.getBinding("items");
			var oBinding11 = oTable11.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("facul_payment_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("facul_payment_course", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2], false);
			oBinding.filter(allFilter);
			oBinding1.filter(allFilter);
			oBinding2.filter(allFilter);
			oBinding3.filter(allFilter);
			oBinding4.filter(allFilter);
			oBinding5.filter(allFilter);
			oBinding6.filter(allFilter);
			oBinding7.filter(allFilter);
			oBinding8.filter(allFilter);
			oBinding9.filter(allFilter);
			oBinding10.filter(allFilter);
			oBinding11.filter(allFilter);
			oBinding.filter(allFilter);
		},

		onPayJan: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("jan_fac_pay");
			var oTable = this.getView().byId("Jan");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.jan_fac_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("jan_tid").setValue(property.facul_payment_id);
			var date = oView.byId("jan_date").setValue(date);
			oDialog.open();
		},
		onPayFeb: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("feb_fac_pay");
			var oTable = this.getView().byId("Feb");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.feb_fac_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("feb_tid").setValue(property.facul_payment_id);
			var date = oView.byId("feb_date").setValue(date);
			oDialog.open();
		},
		onPayMar: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("mar_fac_pay");
			var oTable = this.getView().byId("Mar");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.mar_fac_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("mar_tid").setValue(property.facul_payment_id);
			var date = oView.byId("mar_date").setValue(date);
			oDialog.open();
		},
		onPayApr: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("apr_fac_pay");
			var oTable = this.getView().byId("Apr");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.apr_fac_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("apr_tid").setValue(property.facul_payment_id);
			var date = oView.byId("apr_date").setValue(date);
			oDialog.open();
		},
		onPayMay: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("may_fac_pay");
			var oTable = this.getView().byId("May");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.may_fac_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("may_tid").setValue(property.facul_payment_id);
			var date = oView.byId("may_date").setValue(date);
			oDialog.open();
		},
		onPayJun: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("jun_fac_pay");
			var oTable = this.getView().byId("Jun");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.jun_fac_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("jun_tid").setValue(property.facul_payment_id);
			var date = oView.byId("jun_date").setValue(date);
			oDialog.open();
		},
		onPayJul: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("jul_fac_pay");
			var oTable = this.getView().byId("Jul");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.jul_fac_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("jul_tid").setValue(property.facul_payment_id);
			var date = oView.byId("jul_date").setValue(date);
			oDialog.open();
		},
		onPayAug: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("aug_fac_pay");
			var oTable = this.getView().byId("Aug");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.aug_fac_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("aug_tid").setValue(property.facul_payment_id);
			var date = oView.byId("aug_date").setValue(date);
			oDialog.open();
		},
		onPaySep: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("sep_fac_pay");
			var oTable = this.getView().byId("Sep");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.sep_fac_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("sep_tid").setValue(property.facul_payment_id);
			var date = oView.byId("sep_date").setValue(date);
			oDialog.open();
		},
		onPayOct: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("oct_fac_pay");
			var oTable = this.getView().byId("Oct");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.oct_fac_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("oct_tid").setValue(property.facul_payment_id);
			var date = oView.byId("oct_date").setValue(date);
			oDialog.open();
		},
		onPayNov: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("nov_fac_pay");
			var oTable = this.getView().byId("Nov");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.nov_fac_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("nov_tid").setValue(property.facul_payment_id);
			var date = oView.byId("nov_date").setValue(date);
			oDialog.open();
		},
		onPayDec: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("dec_fac_pay");
			var oTable = this.getView().byId("Dec");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var today = new Date();
			var date = this.oFormatDdmmyyyy.format(today);
			var property = model.getProperty(path);
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.dec_fac_payment", this);
				oView.addDependent(oDialog);
			}
			var id = oView.byId("dec_tid").setValue(property.facul_payment_id);
			var date = oView.byId("dec_date").setValue(date);
			oDialog.open();
		},

		onClosejan: function() {
			var oView = this.getView();
			var oDialog = oView.byId("jan_fac_pay");
			oDialog.close();
		},
		onClosefeb: function() {
			var oView = this.getView();
			var oDialog = oView.byId("feb_fac_pay");
			oDialog.close();
		},
		onClosemar: function() {
			var oView = this.getView();
			var oDialog = oView.byId("mar_fac_pay");
			oDialog.close();
		},
		onCloseapr: function() {
			var oView = this.getView();
			var oDialog = oView.byId("apr_fac_pay");
			oDialog.close();
		},
		onClosemay: function() {
			var oView = this.getView();
			var oDialog = oView.byId("may_fac_pay");
			oDialog.close();
		},
		onClosejun: function() {
			var oView = this.getView();
			var oDialog = oView.byId("jun_fac_pay");
			oDialog.close();
		},
		onClosejul: function() {
			var oView = this.getView();
			var oDialog = oView.byId("jul_fac_pay");
			oDialog.close();
		},
		onCloseaug: function() {
			var oView = this.getView();
			var oDialog = oView.byId("aug_fac_pay");
			oDialog.close();
		},
		onClosesep: function() {
			var oView = this.getView();
			var oDialog = oView.byId("sep_fac_pay");
			oDialog.close();
		},
		onCloseoct: function() {
			var oView = this.getView();
			var oDialog = oView.byId("oct_fac_pay");
			oDialog.close();
		},
		onClosenov: function() {
			var oView = this.getView();
			var oDialog = oView.byId("nov_fac_pay");
			oDialog.close();
		},
		onClosedec: function() {
			var oView = this.getView();
			var oDialog = oView.byId("dec_fac_pay");
			oDialog.close();
		},
		/* jan */
		OnClickSetjan: function() {
			var id = this.getView().byId("jan_tid").getValue();
			var amount = this.getView().byId("jan_amnt").getValue();
			var date = this.getView().byId("jan_date").getValue();
			var janAmount = amount + "," + date;
			var oModel = this.getOwnerComponent().getModel("course");
			var tranType = this.getView().byId("jan_tran_type").getSelectedItem().getText();
			var chequeNo = this.getView().byId("jan_chq_no").getValue();
			var bankName = this.getView().byId("jan_bank_name").getValue();
			var data = {
				"facul_payment_jan": janAmount,
				"facul_payment_type": tranType,
				"facul_payment_bank": bankName,
				"facul_payment_cheque_no": chequeNo
			};

			oModel.update("/tb_facul_payment(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("jan_amnt").setValue("");
					this.getView().byId("jan_date").setValue("");
					this.getView().byId("jan_tran_type").setSelectedKey("");
					this.getView().byId("jan_chq_no").setValue("");
					this.getView().byId("jan_bank_name").setValue("");
					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("jan_fac_pay").close();
		},
		/* feb */
		OnClickSetfeb: function() {
			var id = this.getView().byId("feb_tid").getValue();
			var amount = this.getView().byId("feb_amnt").getValue();
			var date = this.getView().byId("feb_date").getValue();
			var janAmount = amount + "," + date;
			var tt;
			var cn;
			var bn;
			var filterid = new Filter("facul_payment_id", FilterOperator.EQ, id);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read("/tb_remarks", {
				filters: [filterid],
				success: function(oData, oResponse) {
					tt = oData.results[0].facul_payment_type;
					cn = oData.results[0].facul_payment_cheque_no;
					bn = oData.results[0].facul_payment_bank;
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});
			var tranType = tt + "," + this.getView().byId("feb_tran_type").getSelectedItem().getText();
			var chequeNo = cn + "," + this.getView().byId("feb_chq_no").getValue();
			var bankName = bn + "," + this.getView().byId("feb_bank_name").getValue();
			var data = {
				"facul_payment_feb": janAmount,
				"facul_payment_type": tranType,
				"facul_payment_bank": bankName,
				"facul_payment_cheque_no": chequeNo
			};

			oModel.update("/tb_facul_payment(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("feb_amnt").setValue("");
					this.getView().byId("feb_date").setValue("");
					this.getView().byId("feb_tran_type").setSelectedKey("");
					this.getView().byId("feb_chq_no").setValue("");
					this.getView().byId("feb_bank_name").setValue("");
					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("feb_fac_pay").close();
		},
		/* feb */
		/* mar */
		OnClickSetmar: function() {
			var id = this.getView().byId("mar_tid").getValue();
			var amount = this.getView().byId("mar_amnt").getValue();
			var date = this.getView().byId("mar_date").getValue();
			var janAmount = amount + "," + date;
			var tt;
			var cn;
			var bn;
			var filterid = new Filter("facul_payment_id", FilterOperator.EQ, id);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read("/tb_remarks", {
				filters: [filterid],
				success: function(oData, oResponse) {
					tt = oData.results[0].facul_payment_type;
					cn = oData.results[0].facul_payment_cheque_no;
					bn = oData.results[0].facul_payment_bank;
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});
			var tranType = tt + "," + this.getView().byId("mar_tran_type").getSelectedItem().getText();
			var chequeNo = cn + "," + this.getView().byId("mar_chq_no").getValue();
			var bankName = bn + "," + this.getView().byId("mar_bank_name").getValue();
			var data = {
				"facul_payment_mar": janAmount,
				"facul_payment_type": tranType,
				"facul_payment_bank": bankName,
				"facul_payment_cheque_no": chequeNo
			};

			oModel.update("/tb_facul_payment(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("mar_amnt").setValue("");
					this.getView().byId("mar_date").setValue("");
					this.getView().byId("mar_tran_type").setSelectedKey("");
					this.getView().byId("mar_chq_no").setValue("");
					this.getView().byId("mar_bank_name").setValue("");
					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("mar_fac_pay").close();
		},
		/* mar */
		/* apr */
		OnClickSetapr: function() {
			var id = this.getView().byId("apr_tid").getValue();
			var amount = this.getView().byId("apr_amnt").getValue();
			var date = this.getView().byId("apr_date").getValue();
			var janAmount = amount + "," + date;
			var tt;
			var cn;
			var bn;
			var filterid = new Filter("facul_payment_id", FilterOperator.EQ, id);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read("/tb_remarks", {
				filters: [filterid],
				success: function(oData, oResponse) {
					tt = oData.results[0].facul_payment_type;
					cn = oData.results[0].facul_payment_cheque_no;
					bn = oData.results[0].facul_payment_bank;
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});
			var tranType = tt + "," + this.getView().byId("apr_tran_type").getSelectedItem().getText();
			var chequeNo = cn + "," + this.getView().byId("apr_chq_no").getValue();
			var bankName = bn + "," + this.getView().byId("apr_bank_name").getValue();
			var data = {
				"facul_payment_apr": janAmount,
				"facul_payment_type": tranType,
				"facul_payment_bank": bankName,
				"facul_payment_cheque_no": chequeNo
			};

			oModel.update("/tb_facul_payment(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("apr_amnt").setValue("");
					this.getView().byId("apr_date").setValue("");
					this.getView().byId("apr_tran_type").setSelectedKey("");
					this.getView().byId("apr_chq_no").setValue("");
					this.getView().byId("apr_bank_name").setValue("");
					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("apr_fac_pay").close();
		},
		/* apr */
		/* may */
		OnClickSetmay: function() {
			var id = this.getView().byId("may_tid").getValue();
			var amount = this.getView().byId("may_amnt").getValue();
			var date = this.getView().byId("may_date").getValue();
			var janAmount = amount + "," + date;
			var tt;
			var cn;
			var bn;
			var filterid = new Filter("facul_payment_id", FilterOperator.EQ, id);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read("/tb_remarks", {
				filters: [filterid],
				success: function(oData, oResponse) {
					tt = oData.results[0].facul_payment_type;
					cn = oData.results[0].facul_payment_cheque_no;
					bn = oData.results[0].facul_payment_bank;
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});
			var tranType = tt + "," + this.getView().byId("may_tran_type").getSelectedItem().getText();
			var chequeNo = cn + "," + this.getView().byId("may_chq_no").getValue();
			var bankName = bn + "," + this.getView().byId("may_bank_name").getValue();
			var data = {
				"facul_payment_may": janAmount,
				"facul_payment_type": tranType,
				"facul_payment_bank": bankName,
				"facul_payment_cheque_no": chequeNo
			};

			oModel.update("/tb_facul_payment(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("may_amnt").setValue("");
					this.getView().byId("may_date").setValue("");
					this.getView().byId("may_tran_type").setSelectedKey("");
					this.getView().byId("may_chq_no").setValue("");
					this.getView().byId("may_bank_name").setValue("");
					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("may_fac_pay").close();
		},
		/* may */
		/* jun */
		OnClickSetjun: function() {
			var id = this.getView().byId("jun_tid").getValue();
			var amount = this.getView().byId("jun_amnt").getValue();
			var date = this.getView().byId("jun_date").getValue();
			var janAmount = amount + "," + date;
			var tt;
			var cn;
			var bn;
			var filterid = new Filter("facul_payment_id", FilterOperator.EQ, id);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read("/tb_remarks", {
				filters: [filterid],
				success: function(oData, oResponse) {
					tt = oData.results[0].facul_payment_type;
					cn = oData.results[0].facul_payment_cheque_no;
					bn = oData.results[0].facul_payment_bank;
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});
			var tranType = tt + "," + this.getView().byId("jun_tran_type").getSelectedItem().getText();
			var chequeNo = cn + "," + this.getView().byId("jun_chq_no").getValue();
			var bankName = bn + "," + this.getView().byId("jun_bank_name").getValue();
			var data = {
				"facul_payment_jun": janAmount,
				"facul_payment_type": tranType,
				"facul_payment_bank": bankName,
				"facul_payment_cheque_no": chequeNo
			};

			oModel.update("/tb_facul_payment(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("jun_amnt").setValue("");
					this.getView().byId("jun_date").setValue("");
					this.getView().byId("jun_tran_type").setSelectedKey("");
					this.getView().byId("jun_chq_no").setValue("");
					this.getView().byId("jun_bank_name").setValue("");
					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("jun_fac_pay").close();
		},
		/* jun */
		/* jul */
		OnClickSetjul: function() {
			var id = this.getView().byId("jul_tid").getValue();
			var amount = this.getView().byId("jul_amnt").getValue();
			var date = this.getView().byId("jul_date").getValue();
			var janAmount = amount + "," + date;
			var tt;
			var cn;
			var bn;
			var filterid = new Filter("facul_payment_id", FilterOperator.EQ, id);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read("/tb_remarks", {
				filters: [filterid],
				success: function(oData, oResponse) {
					tt = oData.results[0].facul_payment_type;
					cn = oData.results[0].facul_payment_cheque_no;
					bn = oData.results[0].facul_payment_bank;
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});
			var tranType = tt + "," + this.getView().byId("jul_tran_type").getSelectedItem().getText();
			var chequeNo = cn + "," + this.getView().byId("jul_chq_no").getValue();
			var bankName = bn + "," + this.getView().byId("jul_bank_name").getValue();
			var data = {
				"facul_payment_jul": janAmount,
				"facul_payment_type": tranType,
				"facul_payment_bank": bankName,
				"facul_payment_cheque_no": chequeNo
			};

			oModel.update("/tb_facul_payment(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("jul_amnt").setValue("");
					this.getView().byId("jul_date").setValue("");
					this.getView().byId("jul_tran_type").setSelectedKey("");
					this.getView().byId("jul_chq_no").setValue("");
					this.getView().byId("jul_bank_name").setValue("");

					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("jul_fac_pay").close();
		},
		/* jul */
		/* aug */
		OnClickSetaug: function() {
			var id = this.getView().byId("aug_tid").getValue();
			var amount = this.getView().byId("aug_amnt").getValue();
			var date = this.getView().byId("aug_date").getValue();
			var janAmount = amount + "," + date;
			var tt;
			var cn;
			var bn;
			var filterid = new Filter("facul_payment_id", FilterOperator.EQ, id);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read("/tb_remarks", {
				filters: [filterid],
				success: function(oData, oResponse) {
					tt = oData.results[0].facul_payment_type;
					cn = oData.results[0].facul_payment_cheque_no;
					bn = oData.results[0].facul_payment_bank;
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});
			var tranType = tt + "," + this.getView().byId("aug_tran_type").getSelectedItem().getText();
			var chequeNo = cn + "," + this.getView().byId("aug_chq_no").getValue();
			var bankName = bn + "," + this.getView().byId("aug_bank_name").getValue();
			var data = {
				"facul_payment_aug": janAmount,
				"facul_payment_type": tranType,
				"facul_payment_bank": bankName,
				"facul_payment_cheque_no": chequeNo
			};

			oModel.update("/tb_facul_payment(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("aug_amnt").setValue("");
					this.getView().byId("aug_date").setValue("");
					this.getView().byId("aug_tran_type").setSelectedKey("");
					this.getView().byId("aug_chq_no").setValue("");
					this.getView().byId("aug_bank_name").setValue("");
					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("aug_fac_pay").close();
		},
		/* aug */
		/* sep */
		OnClickSetsep: function() {
			var id = this.getView().byId("sep_tid").getValue();
			var amount = this.getView().byId("sep_amnt").getValue();
			var date = this.getView().byId("sep_date").getValue();
			var janAmount = amount + "," + date;
			var tt;
			var cn;
			var bn;
			var filterid = new Filter("facul_payment_id", FilterOperator.EQ, id);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read("/tb_remarks", {
				filters: [filterid],
				success: function(oData, oResponse) {
					tt = oData.results[0].facul_payment_type;
					cn = oData.results[0].facul_payment_cheque_no;
					bn = oData.results[0].facul_payment_bank;
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});
			var tranType = tt + "," + this.getView().byId("sep_tran_type").getSelectedItem().getText();
			var chequeNo = cn + "," + this.getView().byId("sep_chq_no").getValue();
			var bankName = bn + "," + this.getView().byId("sep_bank_name").getValue();
			var data = {
				"facul_payment_sep": janAmount,
				"facul_payment_type": tranType,
				"facul_payment_bank": bankName,
				"facul_payment_cheque_no": chequeNo
			};

			oModel.update("/tb_facul_payment(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("sep_amnt").setValue("");
					this.getView().byId("sep_date").setValue("");
					this.getView().byId("sep_tran_type").setSelectedKey("");
					this.getView().byId("sep_chq_no").setValue("");
					this.getView().byId("sep_bank_name").setValue("");
					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("sep_fac_pay").close();
		},
		/* sep */

		/* oct */
		OnClickSetoct: function() {
			var id = this.getView().byId("oct_tid").getValue();
			var amount = this.getView().byId("oct_amnt").getValue();
			var date = this.getView().byId("oct_date").getValue();
			var janAmount = amount + "," + date;
			var tt;
			var cn;
			var bn;
			var filterid = new Filter("facul_payment_id", FilterOperator.EQ, id);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read("/tb_remarks", {
				filters: [filterid],
				success: function(oData, oResponse) {
					tt = oData.results[0].facul_payment_type;
					cn = oData.results[0].facul_payment_cheque_no;
					bn = oData.results[0].facul_payment_bank;
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});
			var tranType = tt + "," + this.getView().byId("oct_tran_type").getSelectedItem().getText();
			var chequeNo = cn + "," + this.getView().byId("oct_chq_no").getValue();
			var bankName = bn + "," + this.getView().byId("oct_bank_name").getValue();
			var data = {
				"facul_payment_oct": janAmount,
				"facul_payment_type": tranType,
				"facul_payment_bank": bankName,
				"facul_payment_cheque_no": chequeNo
			};

			oModel.update("/tb_facul_payment(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("oct_amnt").setValue("");
					this.getView().byId("oct_date").setValue("");
					this.getView().byId("oct_tran_type").setSelectedKey("");
					this.getView().byId("oct_chq_no").setValue("");
					this.getView().byId("oct_bank_name").setValue("");
					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("oct_fac_pay").close();
		},
		/* oct */
		/* nov */
		OnClickSetnov: function() {
			var id = this.getView().byId("nov_tid").getValue();
			var amount = this.getView().byId("nov_amnt").getValue();
			var date = this.getView().byId("nov_date").getValue();
			var janAmount = amount + "," + date;
			var tt;
			var cn;
			var bn;
			var filterid = new Filter("facul_payment_id", FilterOperator.EQ, id);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read("/tb_remarks", {
				filters: [filterid],
				success: function(oData, oResponse) {
					tt = oData.results[0].facul_payment_type;
					cn = oData.results[0].facul_payment_cheque_no;
					bn = oData.results[0].facul_payment_bank;
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});
			var tranType = tt + "," + this.getView().byId("nov_tran_type").getSelectedItem().getText();
			var chequeNo = cn + "," + this.getView().byId("nov_chq_no").getValue();
			var bankName = bn + "," + this.getView().byId("nov_bank_name").getValue();
			var data = {
				"facul_payment_nov": janAmount,
				"facul_payment_type": tranType,
				"facul_payment_bank": bankName,
				"facul_payment_cheque_no": chequeNo
			};

			oModel.update("/tb_facul_payment(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("nov_amnt").setValue("");
					this.getView().byId("nov_date").setValue("");
					this.getView().byId("nov_tran_type").setSelectedKey("");
					this.getView().byId("nov_chq_no").setValue("");
					this.getView().byId("nov_bank_name").setValue("");
					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("nov_fac_pay").close();
		},
		/* nov */
		/* dec */
		OnClickSetdec: function() {
				var id = this.getView().byId("dec_tid").getValue();
				var amount = this.getView().byId("dec_amnt").getValue();
				var date = this.getView().byId("dec_date").getValue();
				var janAmount = amount + "," + date;
				var tt;
				var cn;
				var bn;
				var filterid = new Filter("facul_payment_id", FilterOperator.EQ, id);
				var oModel = this.getOwnerComponent().getModel("course");
				oModel.read("/tb_remarks", {
					filters: [filterid],
					success: function(oData, oResponse) {
						tt = oData.results[0].facul_payment_type;
						cn = oData.results[0].facul_payment_cheque_no;
						bn = oData.results[0].facul_payment_bank;
					}.bind(this),
					error: function(error) {

					}.bind(this)

				});
				var tranType = tt + "," + this.getView().byId("dec_tran_type").getSelectedItem().getText();
				var chequeNo = cn + "," + this.getView().byId("dec_chq_no").getValue();
				var bankName = bn + "," + this.getView().byId("dec_bank_name").getValue();
				var data = {
					"facul_payment_dec": janAmount,
					"facul_payment_type": tranType,
					"facul_payment_bank": bankName,
					"facul_payment_cheque_no": chequeNo
				};

				oModel.update("/tb_facul_payment(" + id + ")", data, {
					success: function(oData, oResponse) {
						console.log(oData);
						console.log(oResponse);
						this.getView().byId("dec_amnt").setValue("");
						this.getView().byId("dec_date").setValue("");
						this.getView().byId("dec_tran_type").setSelectedKey("");
						this.getView().byId("dec_chq_no").setValue("");
						this.getView().byId("dec_bank_name").setValue("");
						this.onInit();
					}.bind(this),
					error: function(err) {
						console.log(err);
					}.bind(this)
				});
				oModel.setRefreshAfterChange(true);
				this.getView().byId("dec_fac_pay").close();
			}
			/* dec */
	});

});