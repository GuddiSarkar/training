sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/unified/CalendarLegendItem',
	'sap/ui/unified/DateTypeRange',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/core/Fragment',
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function(Controller, CalendarLegendItem, DateTypeRange, History, MessageBox, Filter, FilterOperator, Fragment) {
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

	
	// onInit: function() {
	// 	this.oFormatDdmmyyyy = sap.ui.core.format.DateFormat.getInstance({pattern: "dd-MM-yyyy", calendarType: sap.ui.core.CalendarType.Gregorian});
	// },
		
	onPressBack: function(oEvent)
		{
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}
			else {
				this.getRouter().navTo("Reminder_Dashboard", {}, true /*no history*/);
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
			var sTitle = this.getView().byId("title").getValue();
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
					this.getView().byId("title").setValue("");
					this.getView().byId("desc").setValue("");

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
			var title = oEvent.getSource().getText();
			var remdata;
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var filterTitle = new sap.ui.model.Filter("reminder_title", sap.ui.model.FilterOperator.EQ, title);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			oModel.read(path, {
				filters: [filterTitle],
				success: function(oData, oResponse) {
					//oData.results;
					var nModel = new sap.ui.model.json.JSONModel();
					nModel.setData({
						id: oData.reminder_id,
						title: oData.reminder_title,
						desc: oData.reminder_description,
						atnd: oData.reminder_attended,
						rem: oData.reminder_remarks
					});
					sap.ui.getCore().setModel(nModel, "tip");
					remdata = sap.ui.getCore().getModel("tip").getData();
					this.getView().byId("tit").setText(remdata.title);
					this.getView().byId("des").setText(remdata.desc);
					this.getView().byId("id").setText(remdata.id);
					if (remdata.atnd === "Yes") {
						this.getView().byId("atnd").setSelectedIndex(1);
					} else if (remdata.atnd === "No") {
						this.getView().byId("atnd").setSelectedIndex(0);
					} else {
						this.getView().byId("atnd").setSelectedIndex(0);
					}

					if (remdata.rem === null && (remdata.atnd === null || remdata.atnd === "No")) {
						this.getView().byId("hbremnull").setVisible(true);
						this.getView().byId("hbrem").setVisible(false);
						this.getView().byId("save").setVisible(true);
						//this.getView().byId("ok").setVisible(false);
					} else {
						this.getView().byId("hbremnull").setVisible(false);
						this.getView().byId("hbrem").setVisible(true);
						this.getView().byId("save").setVisible(false);
						//this.getView().byId("ok").setVisible(true);
						this.getView().byId("rem").setText(remdata.rem);
					}
				}.bind(this),
				error: function(error) {
					alert("in error block");
				}.bind(this)
			});
			var oView = this.getView();
			var oDialog = oView.byId("set_rem");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.demoTMS.view.reminder_remarks", this);
				oView.addDependent(oDialog);
			}

			oDialog.openBy(oEvent.getSource());
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