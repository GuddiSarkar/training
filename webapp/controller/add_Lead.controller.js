sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/m/MessageBox'
], function(Controller, Filter, FilterOperator,MessageBox) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.add_Lead", {
		oFormatDdmmyyyy: null,
	
		onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			
			this.oFormatDdmmyyyy = sap.ui.core.format.DateFormat.getInstance({
				pattern: "dd-MM-yyyy",
				calendarType: sap.ui.core.CalendarType.Gregorian
			});

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
			var oFilter6 = new Filter("lead_gender", FilterOperator.Contains, value);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5,oFilter6], false);
			oBinding.filter(allFilter);
		},
		addLeadCalls: function(oEvent) {
			var oView = this.getView();
			var formInput = [
				oView.byId("Lc_name"),
				oView.byId("Lc_mob"),
				oView.byId("Lc_eml"),
				oView.byId("Lc_add"),
				oView.byId("Lc_crs")
			];
			jQuery.each(formInput, function(i, input) {
				if (!input.getValue()) {
					input.setValueState("Error");
				}
			});
			var forward = true;
			jQuery.each(formInput, function(i, input) {
				if ("Error" === input.getValueState()) {
					forward = false;
					return false;
				}
			});

			// output result
			if (forward){
			var Name = this.getView().byId("Lc_name").getValue();
			var Gender = this.getView().byId("Lc_gnder").getSelectedItem().getText();
			var Mobile = this.getView().byId("Lc_mob").getValue();
			var Email = this.getView().byId("Lc_eml").getValue();
			var Address = this.getView().byId("Lc_add").getValue();
			var Course = this.getView().byId("Lc_crs").getValue();
			var uname = window.sessionStorage.getItem("un");
			var oEntry = {
				"lead_name": Name,
				"lead_gender": Gender,
				"lead_mobile": Mobile,
				"lead_email": Email,
				"lead_address": Address,
				"lead_course": Course,
				"lead_tc_name": uname
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
		/*	jQuery.sap.require("sap.m.MessageBox");
				MessageBox.alert("Success");*/
		
			} else {
				jQuery.sap.require("sap.m.MessageBox");
				MessageBox.alert("Please Enter all the fields");
			}
		},
		onAppointment: function(oEvent) {
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

		onAddRemarks: function(oEvent) {
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
			var name = this.getView().byId("rem_name").setValue(property.lead_name);
			var lid = this.getView().byId("lead_id").getValue()
		    var filterid = new Filter("lead_id", FilterOperator.EQ, lid);
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			oModel.read("/tb_remarks", {
				filters: [filterid],
				success: function(oData, oResponse) {
				
					var nModel = new sap.ui.model.json.JSONModel();
					nModel.setData({remarks:oData.results});
					this.getView().setModel(nModel,"remDet");  
				}.bind(this),
				error: function(error) {
					
				}.bind(this)

			});

		},

		onBack: function() {
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

		addRemarks: function() {
			var id = this.getView().byId("lead_id").getValue();
			var date = this.getView().byId("rem_date").getValue();
			var rem = this.getView().byId("add_rem").getValue();
			var name = this.getView().byId("rem_name").getValue();
			//var remarks = date+" "+rem+",";
			var data = {
				"lead_remarks": rem
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.update("/tb_lead(" + id + ")", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("rem_date").setValue("");
					this.getView().byId("add_rem").setValue("");
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			var remData = {
				"lead_id": id,
				"remarks_date": date,
				"remarks": rem,
				"stud_name":name
			}
			oModel.create("/tb_remarks", remData, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					this.getView().byId("rem_date").setValue("");
					this.getView().byId("add_rem").setValue("");
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
			this.getView().byId("leadTitle").setVisible(false);
		},
		onChangePhone: function phonenumber(inputtxt) {
			var x = this.getView().byId("Lc_mob").getValue();
			var phoneno = /^\d{10}$/;
			if (x.match(phoneno)) {
				return true;
			} else {
				alert("Phone Number should contain only Number between 0-9");
				return false;
			}
		},
		onChangeEmail: function validateForm() {
			var x = this.getView().byId("Lc_eml").getValue();
			var atpos = x.indexOf("@");
			var dotpos = x.lastIndexOf(".");
			if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
				alert("Not a valid e-mail address");
				return false;
			}
		}
	});

});