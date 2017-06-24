sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
], function(Controller, Filter, FilterOperator, History) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.student_payment", {

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
		onSearch: function(oEvent) {
			var oTable = this.getView().byId("adCrsTable");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("stud_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("course_name", FilterOperator.Contains, value);
			var oFilter3 = new Filter("stud_payment_reg_fee", FilterOperator.Contains, value);
			var oFilter4 = new Filter("stud_payment_instal_1", FilterOperator.Contains, value);
			var oFilter5 = new Filter("stud_payment_instal_2", FilterOperator.Contains, value);
			var oFilter6 = new Filter("stud_payment_instal_3", FilterOperator.Contains, value);
			//var oFilter7 = new Filter("Amount", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6], false);
			oBinding.filter(allFilter);
		},
		
		formatPay: function(){
			
		},
		onAfterRendering: function() {
			var oTable = this.getView().byId("adCrsTable");
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read("/tb_stud_payment", {
				success: function(oData, oResponse) {
					for (var i = 0; i < oData.results.length; i++) {
						var val = oData.results[i].stud_payment_instal_1;
						if (val === "0") {
							 this.getView().byId("lnk").setEnabled(true);
							
							this.getView().byId("btn1").setVisible(true);
							this.getView().byId("btn21").setVisible(true);
							this.getView().byId("btn3").setVisible(true);
							/*this.getView().byId("btn4").setVisible(true);*/
							console.log("hello");
							//oTable.getColumns()[4].setVisible(false);
							//var link2 = this.getView().byId("lnk1").setEnabled(false);
							//var col = this.getView().byId("ins1").data("mykey", link1);
						} else {
							this.getView().byId("lnk").setEnabled(false);
							 this.getView().byId("lnk").setText(val);
							//var link = this.getView().byId("lnk").setEnabled(false);
							//var col = this.getView().byId("ins1").data("mykey", link4);
							console.log(oData.results[i].stud_payment_instal_1);
						}
					}
				}.bind(this)
			});
		}

	
		
		
});
});