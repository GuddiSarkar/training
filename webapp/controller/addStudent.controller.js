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
			var name = firstName+" "+lastName;
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
			var oEntryStud = {
				"stud_name": name, 
				"stud_gender": gender, 
				"stud_dob": dob, 
				"stud_mob": phone,
				"stud_email":email,
			};
			var oEntryAdd = {
				"address_street":address,
				"address_city":city,
				"adress_state":state,
				"adress_zip":zip,
			};
			var oEntryStudPay = {
				
			}
			var oModelStud = this.getOwnerComponent().getModel("student");
			oModelStud.setUseBatch(false);
			oModelStud.create("/tb_student",oEntryStud,
			{
				success: function(oData)
				{
					
				}.bind(this),
				error: function(error)
				{
					
				}.bind(this)
			}
			);
			var oModelAdd = this.getOwnerComponent().getModel("address");
			oModelAdd.setUseBatch(false);
			oModelAdd.create("/tb_address",oEntryAdd,
			{
				success: function(oData)
				{
					
				}.bind(this),
				error: function(error)
				{
					
				}.bind(this)
			}
			);
			oModelStud.setRefreshAfterChange(true);
			oModelAdd.setRefreshAfterChange(true);
	}

	});

});