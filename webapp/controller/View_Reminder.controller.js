sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
	"sap/ui/core/routing/History",
	"sap/m/GroupHeaderListItem",
	"jquery.sap.global",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function(Controller, Fragment, History,GroupHeaderListItem,jquery,Filter,FilterOperator) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.View_Reminder", {

		onInit: function() {
/*			var oModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("com.demoTMS", "/tb_reminder"));
			this.getView().setModel(oModel);*/
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			oModel.create("/tb_reminder", {
				success: function(oData, response) {
					for(var i=0; i<=oData.results.length; i++)
					{
						var date
					}
				}.bind(this),
				error: function(error) {

				}.bind(this)
			});
			var today = new Date();
			var someday = new Date(2100, 0, 14);
			console.log(today);
			console.log(someday);
		},
		
		getGroupHeader: function (oGroup){
			return new GroupHeaderListItem( {
				title: oGroup.key,
				upperCase: false
			} );
		},
		getRouter: function(){
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
		
		onPressDescription: function(oEvent){
			var title = oEvent.getSource().getText();
			if (! this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("com.demoTMS.view.descPopover", this);
				var binding = this._oPopover.bindElement("course/tb_reminder");
				this.getView().addDependent(this._oPopover);
			}
			//var txt = this.getView().byId("desc").getText();
			this.getView().byId("desc").setText(title);
			this._oPopover.openBy(oEvent.getSource());
		},
 
		handleCloseButton: function (oEvent) {
			this._oPopover.close();
		}

	});

});