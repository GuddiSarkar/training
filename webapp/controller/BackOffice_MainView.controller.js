sap.ui.define([
	'jquery.sap.global',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(jQuery, MessageToast, Fragment, Controller, JSONModel) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.BackOffice_MainView", {
		_ListCount: 0,
		_selectIndex: null,

		onLogoffPress: function(oEvent) {

			//window.sessionStorage.removeItem("un");
			this.getRouter().navTo("home");

		},
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onPressDetailBack: function() {
			this.getSplitAppObj().backDetail();
		},

		onPressMasterBack: function() {
			this.getSplitAppObj().backMaster();
		},

		onPressGoToMaster: function() {
			this.getSplitAppObj().toMaster(this.createId("master2"));
		},

		onListItemPress: function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitAppObj().toDetail(this.createId(sToPageId));
		},

		onPressModeBtn: function(oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

			this.getSplitAppObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {
				duration: 5000
			});
		},

		getSplitAppObj: function() {
			var result = this.byId("split");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		},

		onPressBack: function() {
			this.getSplitAppObj().backDetail();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData('2');
			this.getView().setModel(oModel, "navType");
			// this.getView().byId("v2").setVisible(false);
			// this.getView().byId("v1").setVisible(true);
			this.getNextPrev();
			this.enableDisableButtons();
		},

		onPressNext1: function(oEvent) {
			this.getSplitAppObj().to(this.createId("admn_det"));
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData('1');
			this.getView().setModel(oModel, "navType");
			this.getNextPrev();
			this.enableDisableButtons();
			// this.getView().byId("v2").setVisible(true);
			// this.getView().byId("v1").setVisible(false);
			if (oEvent) {

			}

		},

		onPressNext2: function(oEvent) {
			this.getSplitAppObj().to(this.createId("fee_det"));
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData('1');
			this.getView().setModel(oModel, "navType");
			this.getNextPrev();
			this.enableDisableButtons();
			// this.getView().byId("v2").setVisible(true);
			// this.getView().byId("v1").setVisible(false);
			if (oEvent) {

			}

		},

		getNextPrev: function(oEvent) {

			if (oEvent) {
				var path = oEvent.getSource().getBindingContext().sPath;
				var selectItem = oEvent.getSource().getModel().getProperty(path);
				var pathArray = path.split('/');
				this._selectIndex = pathArray[pathArray.length - 1];
				this.setSelectedClass(oEvent.getSource(), 'event1');
			} else {
				if (this._selectIndex === null) {
					this._selectIndex = 0;
				}
				var prevnext = this.getView().getModel("navType").oData;
				if (prevnext === '1') {
					this._selectIndex = parseInt(this._selectIndex) + 1;
					this.setSelectedClass(' ', 'next');
				} else {
					this._selectIndex = parseInt(this._selectIndex) - 1;
					this.setSelectedClass(' ', 'prev');

				}

			}
		},

		enableDisableButtons: function() {
			//enable disable buttons
			var l = this.getView().byId("idStatuslist").getItems().length;
			if ((l - 1) === this._selectIndex) {
				this.getView().byId("next").setEnabled(false);
			} else {
				this.getView().byId("next").setEnabled(true);
			}
			if (this._selectIndex.toString() === '0') {
				this.getView().byId("prev").setEnabled(false);
			} else {
				this.getView().byId("prev").setEnabled(true);
			}
		},

		setSelectedClass: function(id, type) {

			var items = this.getView().byId("Tree").getItems();
			if (type === 'event1') {
				for (var i = 0; i < items.length; i++) {
					items[i].removeStyleClass("selected-Item");
				}
				id.addStyleClass("selected-Item");
			} else
			if (type === 'next') {
				for (var i = 0; i < items.length; i++) {
					if (items[i].hasStyleClass("selected-Item")) {
						items[i].removeStyleClass("selected-Item");
						var id3 = items[i + 1].sId;
						if (id3.length > 4) {
							items[i + 1].addStyleClass("selected-Item");
							break;
						}
					}
				}
			} else {
				for (var i = 0; i < items.length; i++) {
					if (items[i].hasStyleClass("selected-Item")) {
						items[i].removeStyleClass("selected-Item");
						var id3 = items[i - 1].sId;
						if (id3.length > 4) {
							items[i - 1].addStyleClass("selected-Item");
							break;
						}
					}
				}
			}
		},

		onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},

		onSelectCourse: function(oEvent) {
			var crs_id = this.getView().byId("c_name").getSelectedKey();
			var oModel = this.getOwnerComponent().getModel("course");
			this.getView().setModel(oModel);

			oModel.read("/tb_course(" + crs_id + ")", {

				success: function(oData, oResponse) {
					this.getView().byId("c_fee").setValue(oData.course_fee);
					this.getView().byId("c_type").setValue(oData.course_type);
					this.getView().byId("c_fee1").setValue(oData.course_fee);
				}.bind(this),
				error: function(error) {

				}.bind(this)
			});
		},

		onChangeInput: function(oEvent) {
			var crs_fee = this.getView().byId("c_fee1").getValue();
			var discount = this.getView().byId("d_scunt").getValue();
			var net_fee = parseInt(crs_fee - ((crs_fee * discount) / 100));
			this.getView().byId("r_fee").setValue(1000);
			this.getView().byId("tp_amnt").setValue(net_fee);
		},

		addStudent: function(oEvent) {
			var firstName = this.getView().byId("f_name").getValue();
			var lastName = this.getView().byId("l_name").getValue();
			var name = firstName + " " + lastName;
			var gender = this.getView().byId("g_nder").getSelectedButton().getText();
			var dob = this.getView().byId("d_ob").getValue();
			var phone = this.getView().byId("p_hone").getValue();
			var email = this.getView().byId("e_ml").getValue();
			var addstreet1 = this.getView().byId("a_strt1").getValue();
			var addstreet2 = this.getView().byId("a_strt2").getValue();
			var address = addstreet1 + " " + addstreet2;
			var city = this.getView().byId("c_ty").getValue();
			var state = this.getView().byId("s_tate").getValue();
			var zip = this.getView().byId("zip_code").getValue();
			var crs_name = this.getView().byId("c_name").getSelectedItem().getText();
			var startDate = this.getView().byId("s_date").getValue();
			var discount = this.getView().byId("d_scunt").getValue();
			var tax = this.getView().byId("t_ax").getValue();
			var totalPaybleAmount = this.getView().byId("tp_amnt").getValue();
			var registrationFee = this.getView().byId("r_fee").getValue();
			var installments = this.getView().byId("noi").getSelectedItem().getText();
			var paidAmnt = registrationFee;
			var dueAmnt = totalPaybleAmount - paidAmnt;
			var image = "";

			var oEntryStud = {
				"stud_name": name,
				"stud_gender": gender,
				"stud_dob": dob,
				"stud_mob": phone,
				"stud_email": email,
				"stud_photo": image,
				"stud_strt_date": startDate,
				"stud_course_name": crs_name,
				"stud_street": address,
				"stud_city": city,
				"stud_zip": zip,
				"stud_state": state,
				"stud_installment": installments
			};
			var oModelStud = this.getOwnerComponent().getModel("course");
			oModelStud.setUseBatch(false);
			oModelStud.create("/tb_student", oEntryStud, {
				success: function(oData) {

					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.success(
						"Data Saved Successfully", {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
					this.getView().byId("f_name").setValue("");
					this.getView().byId("l_name").setValue("");
					this.getView().byId("g_nder").setValue("");
					this.getView().byId("d_ob").setValue("");
					this.getView().byId("p_hone").setValue("");
					this.getView().byId("e_ml").setValue("");
					this.getView().byId("a_strt1").setValue("");
					this.getView().byId("a_strt2").setValue("");
					this.getView().byId("c_ty").setValue("");
					this.getView().byId("s_tate").setValue("");
					this.getView().byId("zip_code").setValue("");
					this.getView().byId("c_name").setSelectedKey("");
					this.getView().byId("noi").setSelectedKey("");
				}.bind(this),
				error: function(error) {

				}.bind(this)

			});
			oModelStud.setRefreshAfterChange(true);

			var oEntryStudPay = {
				"stud_payment_name": name,
				"stud_payment_course": crs_name,
				"stud_payment_disc": discount,
				"stud_payment_tax": tax,
				"stud_payment_reg_fee": registrationFee,
				"stud_payment_instal_1": "0",
				"stud_payment_instal_2": "0",
				"stud_payment_instal_3": "0",
				"stud_payment_instal_4": "0",
				"stud_payment_instal_5": "0",
				"stud_payment_fee": totalPaybleAmount,
				"stud_payment_paid": paidAmnt,
				"stud_payment_due": dueAmnt,
				"stud_payment_installment": installments
			};
			var oModelStudPay = this.getOwnerComponent().getModel("course");
			oModelStudPay.setUseBatch(false);
			oModelStudPay.create("/tb_stud_payment", oEntryStudPay, {
				success: function(oData) {

					this.getView().byId("d_scunt").setValue("");
					this.getView().byId("tp_amnt").setValue("");
					this.getView().byId("r_fee").setValue("");

				}.bind(this),
				error: function(error) {

				}.bind(this)
			});
			oModelStudPay.setRefreshAfterChange(true);

		},
		onSave: function(oEvent) {
			var oView = this.getView();
			var formInput = [
				// oView.byId("select"),
				oView.byId("c_fee1"),
				oView.byId("d_scunt"),
				oView.byId("tp_amnt"),
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
			if (forward) {
				jQuery.sap.require("sap.m.MessageBox");
				MessageBox.alert("Success");

				// this.getRouter().navTo("stu_fac");
			} else {
				jQuery.sap.require("sap.m.MessageBox");
				MessageBox.alert("Please Enter all the fields");
			}
		},
		onSubmit: function(oEvent) {
			var oView = this.getView();
			var formInput = [
				// oView.byId("select"),
				oView.byId("f_name"),
				oView.byId("l_name"),
				oView.byId("d_ob"),
				oView.byId("p_hone"),
				oView.byId("e_ml"),
				oView.byId("a_strt1"),
				oView.byId("c_ty"),
				oView.byId("zip_code"),
				oView.byId("s_tate"),
				oView.byId("fileUploader"),
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
			if (forward) {
				jQuery.sap.require("sap.m.MessageBox");
				MessageBox.alert("Success");

				// this.getRouter().navTo("stu_fac");
			} else {
				jQuery.sap.require("sap.m.MessageBox");
				MessageBox.alert("Please Enter all the fields");
			}
		},
		onPress: function(oEvent) {
			var oView = this.getView();
			var formInput = [
				// oView.byId("select"),
				oView.byId("c_fee"),
				oView.byId("c_type"),
				oView.byId("s_date")
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
			if (forward) {
				jQuery.sap.require("sap.m.MessageBox");
				MessageBox.alert("Success");

				// this.getRouter().navTo("stu_fac");
			} else {
				jQuery.sap.require("sap.m.MessageBox");
				MessageBox.alert("Please Enter all the fields");
			}
		},

		onChangePhone: function phonenumber(inputtxt) {
			var x = this.getView().byId("p_hone").getValue();
			var phoneno = /^\d{10}$/;
			if (x.match(phoneno)) {
				return true;
			} else {
				alert("Phone Number should contain only Number between 0-9");
				return false;
			}
		},
		onChangeEmail: function validateForm() {
			var x = this.getView().byId("e_ml").getValue();
			var atpos = x.indexOf("@");
			var dotpos = x.lastIndexOf(".");
			if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
				alert("Not a valid e-mail address");
				return false;
			}
		},

		onChangeFName: function validateForm() {
			var x = this.getView().byId("f_name").getValue();

			if (x == "") {
				alert("This field cannot be empty");
				return false;
			}
		}

	});

});