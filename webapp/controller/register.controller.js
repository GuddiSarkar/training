sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.register", {
		
		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		onPressBack: function(){
			this.getRouter().navTo("home");
		},
		
		onInit: function(){
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},

		onRegister: function(){
			var oView = this.getView();
			var formInput = [
				oView.byId("name"),
				oView.byId("email"),
				// oView.byId("role"),
				oView.byId("uname"),
				oView.byId("pwd"),
				oView.byId("cnfpwd")
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
			var eName = this.getView().byId("name").getValue();
			var eEmail = this.getView().byId("email").getValue();
			var eRole = this.getView().byId("role").getSelectedItem().getText();
			var eUname = this.getView().byId("uname").getValue();
			var ePass = this.getView().byId("pwd").getValue();
			var eCnfPass = this.getView().byId("cnfpwd").getValue();
			var oEntry = {
				"register_user_name": eName,
				"register_user_email": eEmail,
				"register_user_role": eRole,
				"register_user_username": eUname,
				"register_user_password": ePass,
				"register_user_cnfPassword": eCnfPass
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			oModel.create("/tb_register", oEntry, {
				success: function(oData, response) {
					this.getView().byId("name").setValue("");
					this.getView().byId("email").setValue("");
					this.getView().byId("role").setSelectedKey("");
					this.getView().byId("uname").setValue();
					this.getView().byId("pwd").setValue();
					this.getView().byId("cnfpwd").setValue();
					this.getRouter().navTo("home");
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.success(
						"You have Successfully. Wait for the approval from Admin.", {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
					this.getRouter().navTo("home");
				}.bind(this),
				error: function(error) {

				}.bind(this)
			});

			oModel.setRefreshAfterChange(true);
			}	else {
				jQuery.sap.require("sap.m.MessageBox");
				MessageBox.alert("Please Enter all the fields");
			}
		}
	});

});
