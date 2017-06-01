sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,Filter, FilterOperator) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.addCash", {
		
	onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},
	onSearch: function(oEvent){
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
			var allFilter = new Filter([oFilter1, oFilter2,oFilter3,oFilter4,oFilter5,oFilter6], false); 
			oBinding.filter(allFilter);
		},
		 onAfterRendering: function(){
		 		var btn = this.getView().byId("bt");
		 			btn.setVisible(true);
			var oTable = this.getView().byId("adCrsTable");
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.read("/tb_stud_payment",{
				success: function(oData, oResponse) {
					for(var i = 0; i<oData.results.length; i++){
						var val = oData.results[i].stud_payment_instal_1;
						if(val === "0")
						{
							//var cell = this.getView().byId("in1");
							var btn = this.getView().byId("bt");
							if(btn.getVisible())
							{
								btn.setVisible(true);
							}
						}
						else{
							/*var txt = this.getView().byId("t1");
							if(txt.getVisible())
							{
								txt.setVisible(true);
							}*/
							console.log(oData.results[i].stud_payment_instal_1);
						}
					}	
				}.bind(this)
			});
		 }
		/*xyz: function(){
			read data
			
		}*/
	});

});