sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.addStudent", {

	addStudent:function(oEvent)
	{
			var firstName = this.getView().byId("f_name").getValue();
			var lastName = this.getView().byId("l_name").getValue();
			var name = firstName+""+lastName;
			var gender = this.getView().byId("g_nder").getValue();
			var dob = this.getView().byId("d_ob").getValue();
			var phone = this.getView().byId("p_hone").getValue();
			var email = this.getView().byId("e_ml").getValue();
			var addstreet1 = this.getView().byId("a_strt1").getValue();
			var addstreet2 = this.getView().byId("a_strt2").getValue();
			var address = addstreet1+""+addstreet2;
			var city = this.getView().byId("c_ty").getValue();
			var state = this.getView().byId("s_tate").getValue();
			var zip = this.getView().byId("zip_code").getValue();
			var courseName = this.getView().byId("c_name").getValue();
			var courseType = this.getView().byId("c_type").getSelectedItem().getText();
			var courseFee = this.getView().byId("c_fee").getValue();
			var startDate = this.getView().byId("s_date").getValue();
			var courseFee = this.getView().byId("c_fee1").getValue();
			var discount = this.getView().byId("d_scunt").getValue();
			var tax = this.getView().byId("t_ax").getValue();
			var totalPaybleAmount = this.getView().byId("tp_amnt").getValue();
			var registrationFee = this.getView().byId("r_fee").getValue();
			var fstInstlment = this.getView().byId("f_instl").getValue();
			var secondInstlment = this.getView().byId("sec_instl").getValue();
			var thrdInstlment = this.getView().byId("thrd_instl").getValue();
			var oEntry = {"stud_name": name, "stud_gender": gender, "stud_dob": dob, "stud_mob": phone,"stud_email":email,
			"address_street":address,"address_city":city,"adress_state":state,"adress_zip":zip,"course_name": courseName,
			"course_type": courseType,"course_fee": courseFee,
			};
			var oModel = this.getOwnerComponent().getModel("student");
			oModel.setUseBatch(false);
			oModel.create("/tb_student",oEntry,
			{
				success: function(oData)
				{
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
				}.bind(this),
				error: function(error)
				{
					
				}.bind(this)
			}
			);
			oModel.setRefreshAfterChange(true);
	}

	});

});