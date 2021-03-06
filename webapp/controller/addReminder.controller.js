sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/unified/CalendarLegendItem',
	'sap/ui/unified/DateTypeRange',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/core/Fragment',
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function(Controller, CalendarLegendItem, DateTypeRange, Filter, FilterOperator, Fragment, MessageBox, History) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.addReminder", {

		oFormatDdmmyyyy: null,
		onInit: function() {
			this.oFormatDdmmyyyy = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy-MM-dd",
				calendarType: sap.ui.core.CalendarType.Gregorian
			});
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);

			var today = new Date();
			console.log(today);
			var date = this.oFormatDdmmyyyy.format(today);
			var filterid = new sap.ui.model.Filter("reminder_date", sap.ui.model.FilterOperator.EQ, date);
			oModel.read("/tb_reminder", {
				filters: [filterid],
				success: function(oData, oResponse) {

					var nModel = new sap.ui.model.json.JSONModel();
					nModel.setData({
						reminder: oData.results
					});
					this.getView().setModel(nModel, "currentDayRem");

				}.bind(this),
				error: function(error) {

				}.bind(this)

			});

			oModel.setRefreshAfterChange(true);
		},

		formatDate: function(sValue) {
			var value = sValue.substring(6, 19); // maybe it's safer to work with regular expressions
			jQuery.sap.require("sap.ui.core.format.DateFormat");

			var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd-MM-yyyy"
			});

			console.log(oDateFormat.format(new Date(Number(value)))); // 2013/08/11
			var date = oDateFormat.format(new Date(Number(value)));
			return date;
		},

		onPressBack: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("Reminder_Dashboard", {}, true /*no history*/ );
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
						startDate: new Date(oRefDate),
						type: sType,
						tooltip: "Placeholder " + i
					}));
					oCal2.addSpecialDate(new DateTypeRange({
						startDate: new Date(oRefDate),
						type: sType,
						tooltip: "Placeholder " + i
					}));
					oLeg1.addItem(new CalendarLegendItem({
						text: "Placeholder " + i
					}));
					oLeg2.addItem(new CalendarLegendItem({
						text: "Placeholder " + i
					}));
				}
			} else {
				oCal1.destroySpecialDates();
				oCal2.destroySpecialDates();
				oLeg1.destroyItems();
				oLeg2.destroyItems();
			}
		},

		handleCalendarSelect: function(oEvent) {
			var oCalendar = oEvent.oSource;
			//this.updateText(oCalendar);
			var oView = this.getView();
			var oDialog = oView.byId("addFollowUp");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.create_followUp", this);
				oView.addDependent(oDialog);
			}
			var oText = this.getView().byId("date");
			var aSelectedDates = oCalendar.getSelectedDates();
			var oDate;
			if (aSelectedDates.length > 0) {
				oDate = aSelectedDates[0].getStartDate();
				oText.setValue(this.oFormatDdmmyyyy.format(oDate));
			} else {
				oText.setValue("No Date Selected");
			}
			oDialog.open();
		},

		onCloseFolowUp: function(oEvent) {
			this.getView().byId("addFollowUp").close();
		},

		OnClickSet: function() {
			var sDate = this.getView().byId("date").getValue();
			var sTitle = this.getView().byId("rtitle").getValue();
			var sDesc = this.getView().byId("desc").getValue();
			var oEntry = {
				"reminder_description": sDesc,
				"reminder_date": sDate,
				"reminder_title": sTitle
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			oModel.create("/tb_reminder", oEntry, {
				success: function(oData, response) {
					this.getView().byId("date").setValue("");
					this.getView().byId("rtitle").setValue("");
					this.getView().byId("desc").setValue("");
					this.onInit();
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.success(
						"Data Saved Successfully", {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);

				}.bind(this),
				error: function(error) {

				}.bind(this)
			});

			oModel.setRefreshAfterChange(true);
			this.getView().byId("addFollowUp").close();
		},

		onPressEvent: function(oEvent) {
			//var sSrc = oEvent.getSource().getTarget();
			var pathList = oEvent.getParameter("listItem").getBindingContext("currentDayRem").getPath();
			var oItem = oEvent.getParameter("listItem");
			var src = this.getView().byId("remList").getModel("currentDayRem").getProperty(pathList);
			var id = src.reminder_id;
			var title = src.reminder_title;
			var desc = src.reminder_description;
			var atnd = src.reminder_attended;
			var rem = src.reminder_remarks;
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			var remdata;
			var oView = this.getView();
			var oDialog = oView.byId("set_rem");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.reminder_remarks", this);
				oView.addDependent(oDialog);
			}
			this.getView().byId("tit").setText(title);
			this.getView().byId("des").setText(desc);
			this.getView().byId("id").setText(id);
			if (atnd === "Yes") {
				this.getView().byId("atnd").setSelectedIndex(1);
			} else if (atnd === "No") {
				this.getView().byId("atnd").setSelectedIndex(0);
			} else {
				this.getView().byId("atnd").setSelectedIndex(0);
			}

			if (rem === null && (atnd === null || atnd === "No")) {
				this.getView().byId("hbremnull").setVisible(true);
				this.getView().byId("hbrem").setVisible(false);
				this.getView().byId("save").setVisible(true);
				this.getView().byId("ok").setVisible(false);
				this.getView().byId("cancel").setVisible(true);
			} else {
				this.getView().byId("hbremnull").setVisible(false);
				this.getView().byId("hbrem").setVisible(true);
				this.getView().byId("save").setVisible(false);
				this.getView().byId("ok").setVisible(true);
				this.getView().byId("rem").setText(rem);
				this.getView().byId("cancel").setVisible(false);
			}
			oModel.setRefreshAfterChange(true);
			 //oDialog.openBy(oEvent.getSource());
			oDialog.open();
		},

		handleCloseButton: function() {
			this.getView().byId("set_rem").close();
		},

		onPressSave: function(oEvent) {
			var id = this.getView().byId("id").getText();
			var atnd = this.getView().byId("atnd").getSelectedButton().getText();
			var rem = this.getView().byId("remnull").getValue();
			var data = {
				"reminder_attended": atnd,
				"reminder_remarks": rem
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.update("/tb_reminder(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.success(
						"Reminder remarks Saved Successfully", {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
					this.onInit();
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("set_rem").close();
		}
	});

});