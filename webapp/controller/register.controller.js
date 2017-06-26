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
		
		onRegister: function(){
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
					this.getView().byId("role").setValue("");

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
		}
	});

});