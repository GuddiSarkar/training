sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,Filter, FilterOperator) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.viewStudent", {

		onInit: function(){
			
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
/*			var s_id = this.getView().byId("sid").getText();
			this.getView().setModel(oModel);
			var c_id;
*/			oModel.read("/tb_student",
			{
				success: function(oData, oResponse) {
					var sData = oData.results;
					for(var i = 0; i<sData.length; i++)
					{
						var c_id = [];
						c_id[i] = sData[i].course_id;
						oModel.read("/tb_course",
						{
							success: function(oData1, oResponse1){
								var cData = oData1.results;
								for(var j = 0; j<cData.length; j++)
								{
									var c_name = [];
									c_name[j] = cData[c_id[j]].course_name;
								}
							}.bind(this),
							error: function(error)
							{
								
							}.bind(this)
						});
					}
				}.bind(this),
				error: function(error)
				{
					
				}.bind(this)
			});
		},	


		onSearch: function(oEvent){
		    var oTable = this.getView().byId("table");
			var oBinding = oTable.getBinding("rows");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("Student Name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("Gender", FilterOperator.Contains, value);
			var oFilter3 = new Filter("D.O.B", FilterOperator.Contains, value);
			var oFilter4 = new Filter("Email", FilterOperator.Contains, value);
			var oFilter5 = new Filter("Course Name", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2,oFilter3,oFilter4,oFilter5], false); 
			oBinding.filter(allFilter);
		}

	});

});