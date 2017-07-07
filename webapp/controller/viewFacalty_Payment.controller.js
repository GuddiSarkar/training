sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.viewFacalty_Payment", {
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
				this.getView().byId("sel").setSelectedKey("1");
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
				this.getView().byId("sel").setSelectedKey("2");
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
				this.getView().byId("sel").setSelectedKey("3");
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
				this.getView().byId("sel").setSelectedKey("4");
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
				this.getView().byId("sel").setSelectedKey("5");
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
				this.getView().byId("sel").setSelectedKey("6");
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
				this.getView().byId("sel").setSelectedKey("7");
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
				this.getView().byId("sel").setSelectedKey("8");
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
				this.getView().byId("sel").setSelectedKey("9");
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
				this.getView().byId("sel").setSelectedKey("10");
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
				this.getView().byId("sel").setSelectedKey("11");
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
				this.getView().byId("sel").setSelectedKey("12");
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

		formatAmount: function(sValue) {
			var str = sValue;
			var res = str.split(",");
			var amount = res[0];
			console.log(amount);
			return amount;
		},

		formatDate: function(sValue) {
			var str = sValue;
			var res = str.split(",");
			var date = res[1];
			console.log(date);
			return date;
		},

		onSelectMonth: function() {
			var items = this.getView().byId("sel").getSelectedItem().getText();
			if (items === "January") {
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
			} else if (items === "February") {
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
			} else if (items === "March") {
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
			} else if (items === "April") {
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
			} else if (items === "May") {
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
			} else if (items === "June") {
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
			} else if (items === "July") {
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
			} else if (items === "August") {
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
			} else if (items === "September") {
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
			} else if (items === "October") {
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
			} else if (items === "November") {
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
			}
		},

	});

});