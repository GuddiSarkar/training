sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.addStudent", {
	
	onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
	},

	onSelectCourse: function(oEvent){
		var crs_id = this.getView().byId("c_name").getSelectedKey();
		var oModel = this.getOwnerComponent().getModel("course");
		this.getView().setModel(oModel);
		oModel.read("/tb_course('" + crs_id + "')",{
				success: function(oData, oResponse) {
						this.getView().byId("c_fee").setValue(oData.course_fee);
						this.getView().byId("c_type").setValue(oData.course_type);
						this.getView().byId("c_fee1").setValue(oData.course_fee);
				}.bind(this),
				error: function(error)
				{
					
				}.bind(this)
		});
	},
	
	onChangeInput: function(oEvent){
		var crs_fee = this.getView().byId("c_fee1").getValue();
		var discount = this.getView().byId("d_scunt").getValue();
		var net_fee = parseInt(crs_fee-((crs_fee*discount)/100));
		this.getView().byId("r_fee").setValue(1000);
		this.getView().byId("tp_amnt").setValue(net_fee);
		var instlmnt = parseInt((net_fee-1000)/3);
		this.getView().byId("f_instl").setValue(instlmnt);
		this.getView().byId("sec_instl").setValue(instlmnt);
		this.getView().byId("thrd_instl").setValue(instlmnt);
		
	},

	addStudent:function(oEvent)
	{
			var firstName = this.getView().byId("f_name").getValue();
			var lastName = this.getView().byId("l_name").getValue();
			var name = firstName+" "+lastName;
			var gender = this.getView().byId("g_nder").getSelectedButton().getText();
			var dob = this.getView().byId("d_ob").getValue();
			var phone = this.getView().byId("p_hone").getValue();
			var email = this.getView().byId("e_ml").getValue();
			var addstreet1 = this.getView().byId("a_strt1").getValue();
			var addstreet2 = this.getView().byId("a_strt2").getValue();
			var address = addstreet1+" "+addstreet2;
			var city = this.getView().byId("c_ty").getValue();
			var state = this.getView().byId("s_tate").getValue();
			var zip = this.getView().byId("zip_code").getValue();
			var crs_id = this.getView().byId("c_name").getSelectedKey();
			var startDate = this.getView().byId("s_date").getValue();
			var discount = this.getView().byId("d_scunt").getValue();
			var tax = this.getView().byId("t_ax").getValue();
			var totalPaybleAmount = this.getView().byId("tp_amnt").getValue();
			var registrationFee = this.getView().byId("r_fee").getValue();
			var fstInstlment = this.getView().byId("f_instl").getValue();
			var secondInstlment = this.getView().byId("sec_instl").getValue();
			var thrdInstlment = this.getView().byId("thrd_instl").getValue();
			
			
			var oEntryAdd = {
				"address_street":address,
				"address_city":city,
				"address_state":state,
				"address_zip":zip
			};
			var oModelAdd = this.getOwnerComponent().getModel("course");
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
			oModelAdd.setRefreshAfterChange(true);
			//oModelAdd.read("/tb_address",)
			
			var oEntryStud = {
				"stud_name": name, 
				"stud_gender": gender, 
				"stud_dob": dob, 
				"stud_mob": phone,
				"stud_email":email,
				"stud_strt_date":startDate,
				//"add_id":
				"course_id":crs_id
			};
			var oModelStud = this.getOwnerComponent().getModel("course");
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
			oModelStud.setRefreshAfterChange(true);
			
			
			var oEntryStudPay = {
				"course_id":crs_id,
				"stud_payment_disc":discount,
				"stud_payment_tax":tax,
				"stud_payment_fee":totalPaybleAmount,
				"stud_payment_reg_fee":registrationFee,
				"stud_payment_instal_1":fstInstlment,
				"stud_payment_instal_2":secondInstlment,
				"stud_payment_instal_3":thrdInstlment
			};
			var oModelStudPay = this.getOwnerComponent().getModel("course");
			oModelStudPay.setUseBatch(false);
			oModelStudPay.create("/tb_stud_payment",oEntryStudPay,
			{
				success: function(oData)
				{
					
				}.bind(this),
				error: function(error)
				{
					
				}.bind(this)
			}
			);
			oModelStudPay.setRefreshAfterChange(true);
			
	}
	});

});