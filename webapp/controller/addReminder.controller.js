sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/unified/CalendarLegendItem',
	'sap/ui/unified/DateTypeRange',
	"sap/ui/core/routing/History"
], function(Controller, CalendarLegendItem, DateTypeRange,History) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.addReminder", {
		
			onPressBack: function(oEvent)
		{
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}
			else {
				this.getRouter().navTo("reminder", {}, true /*no history*/);
			}
	},
		handleShowSpecialDays: function(oEvent) {
			var oCal1 = this.getView().byId("calendar1");
			var oLeg1 = this.getView().byId("legend1");
			var oCal2 = this.getView().byId("calendar2");
			var oLeg2 = this.getView().byId("legend2");
			var bPressed = oEvent.getParameter("pressed");
			if (bPressed) {
				var oRefDate = new Date();
				for (var i = 1; i <= 10; i++) {
					oRefDate.setDate(i);
					var sType = "";
					if (i < 10) {
						sType = "Type0" + i;
					} else {
						sType = "Type" + i;
					}
					oCal1.addSpecialDate(new DateTypeRange({
						startDate : new Date(oRefDate),
						type : sType,
						tooltip : "Placeholder " + i
					}));
					oCal2.addSpecialDate(new DateTypeRange({
						startDate : new Date(oRefDate),
						type : sType,
						tooltip : "Placeholder " + i
					}));
					oLeg1.addItem(new CalendarLegendItem({
						text : "Placeholder " + i
					}));
					oLeg2.addItem(new CalendarLegendItem({
						text : "Placeholder " + i
					}));
				}
			} else {
				oCal1.destroySpecialDates();
				oCal2.destroySpecialDates();
				oLeg1.destroyItems();
				oLeg2.destroyItems();
			}
		},
		
		handleCalendarSelect: function(oEvent){
			var oView = this.getView();
			var oDialog = oView.byId("addFollowUp");
			if(!oDialog)
			{
				oDialog = sap.ui.xmlfragment(oView.getId(),"com.demoTMS.view.create_followUp",this);
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},
		
		onCloseFolowUp: function(oEvent) {
			this.getView().byId("addFollowUp").close();
		},
	});

});