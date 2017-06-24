sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.add_Lead", {
		oFormatDdmmyyyy: null,

		onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			this.oFormatDdmmyyyy = sap.ui.core.format.DateFormat.getInstance({
			pattern: "dd-MM-yyyy", 
			calendarType: sap.ui.core.CalendarType.Gregorian});
			
			var str = "26-05-1991 Hello,03-12-1991 Hiii,04-11-1993 Byyy"
			var len = str.length;
			var comma = str.lastIndexOf(",");
			var newStr = str.slice(comma+1, len);
			
			var str1 = str-newStr;

		},

		onSearch: function(oEvent) {
			var oTable = this.getView().byId("adCrsTable");
			var oBinding = oTable.getBinding("items");
			var value = oEvent.getParameter("query");
			var oFilter1 = new Filter("lead_name", FilterOperator.Contains, value);
			var oFilter2 = new Filter("lead_mobile", FilterOperator.Contains, value);
			var oFilter3 = new Filter("lead_email", FilterOperator.Contains, value);
			var oFilter4 = new Filter("lead_course", FilterOperator.Contains, value);
			var oFilter5 = new Filter("lead_address", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5], false);
			oBinding.filter(allFilter);
		},
		addLeadCalls: function(oEvent) {
			var Name = this.getView().byId("Lc_name").getValue();
			var Gender = this.getView().byId("Lc_gnder").getSelectedItem().getText();
			var Mobile = this.getView().byId("Lc_mob").getValue();
			var Email = this.getView().byId("Lc_eml").getValue();
			var Address = this.getView().byId("Lc_add").getValue();
			var Course = this.getView().byId("Lc_crs").getValue();
			var oEntry = {
				"lead_name": Name,
				"lead_gender": Gender,
				"lead_mobile": Mobile,
				"lead_email": Email,
				"lead_address": Address,
				"lead_course": Course
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			oModel.create("/tb_lead", oEntry, {
				success: function(oData) {
					this.getView().byId("Lc_name").setValue("");
					this.getView().byId("Lc_gnder").setSelectedKey("");
					this.getView().byId("Lc_mob").setValue("");
					this.getView().byId("Lc_eml").setValue("");
					this.getView().byId("Lc_add").setValue("");
					this.getView().byId("Lc_crs").setValue("");

				}.bind(this),
				error: function(error) {

				}.bind(this)
			});

			oModel.setRefreshAfterChange(true);
		},
		onAppointment: function(oEvent)
		{
			this.getView().byId("leadTitle").setVisible(true);
			this.getView().byId("calTitle").setVisible(true);
			this.getView().byId("remTitle").setVisible(false);
			this.getView().byId("leadCalndr").setVisible(true);
			this.getView().byId("cal").setVisible(true);
			this.getView().byId("addRemarks").setVisible(false);
			this.getView().byId("back").setVisible(true);
			this.getView().byId("addLead").setVisible(false);
			this.getView().byId("leadCalls").setVisible(false);
			this.getView().byId("addRem").setVisible(false);
			
			var oTable = this.getView().byId("adCrsTable");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var property = model.getProperty(path);
			var id = this.getView().byId("id").setValue(property.lead_id);

		},
		
		onAddRemarks: function(oEvent)
		{
			this.getView().byId("addLead").setVisible(false);
			this.getView().byId("leadCalls").setVisible(false);
			this.getView().byId("back").setVisible(true);
			this.getView().byId("leadTitle").setVisible(true);
			this.getView().byId("calTitle").setVisible(false);
			this.getView().byId("remTitle").setVisible(true);
			this.getView().byId("leadCalndr").setVisible(true);
			this.getView().byId("cal").setVisible(false);
			this.getView().byId("addRem").setVisible(true);
			this.getView().byId("addRemarks").setVisible(true);
			
			var oTable = this.getView().byId("adCrsTable");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var property = model.getProperty(path);
			var id = this.getView().byId("lead_id").setValue(property.lead_id);
			var date = this.getView().byId("rem_date").setValue(property.lead_date);
		},
		
		onBack: function(){
			this.getView().byId("addLead").setVisible(true);
			this.getView().byId("leadCalls").setVisible(true);
			this.getView().byId("leadTitle").setVisible(false);
			this.getView().byId("leadCalndr").setVisible(false);
			this.getView().byId("addRemarks").setVisible(false);
			this.getView().byId("addRem").setVisible(false);
			this.getView().byId("back").setVisible(false);
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
			var aSelectedDates = oCalendar.getSelectedDates();
			var id = this.getView().byId("id").getValue();
			var oDate;
			
			if (aSelectedDates.length > 0) {
				oDate = aSelectedDates[0].getStartDate();
			} else {
				//oText.setValue("No Date Selected");
			}
			var date = this.oFormatDdmmyyyy.format(oDate);
			var data = {
				"lead_date": date
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.update("/tb_lead(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("leadTitle").setVisible(false);
			this.getView().byId("leadCalndr").setVisible(false);
			this.getView().byId("addLead").setVisible(true);
			this.getView().byId("leadCalls").setVisible(true);
			this.getView().byId("back").setVisible(false);
		},
		
		addRemarks: function()
		{
			var id = this.getView().byId("lead_id").getValue();
			var date = this.getView().byId("rem_date").getValue();
			var rem = this.getView().byId("add_rem").getValue();
			//var remarks = date+" "+rem+",";
			var data = {
				"lead_remarks": rem
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.update("/tb_lead(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
			this.getView().byId("addRem").setVisible(false);
			this.getView().byId("addRemarks").setVisible(false);
			this.getView().byId("addLead").setVisible(true);
			this.getView().byId("leadCalls").setVisible(true);
			this.getView().byId("back").setVisible(false);
		}
	});

});