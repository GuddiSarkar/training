sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Approve", {

		addSave: function(oEvent) {
			var Name = this.getView().byId("a_name").getValue();
			var Role = this.getView().byId("a_role").getValue();
			var SetUserName = this.getView().byId("a_uname").getValue();
			var SetPassword = this.getView().byId("a_pwd").getValue();
			var oEntry = {
				"user_username": SetUserName,
				"user_pwd": SetPassword,
				"user_role": Role,
				"user_name": Name
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			oModel.create("/tb_user", oEntry, {
				success: function(oData) {

					this.getView().byId("a_uname").setValue("");
					this.getView().byId("a_pwd").setValue("");
					this.getView().byId("a_role").setValue("");
					this.getView().byId("a_name").setValue("");
				}.bind(this),
				error: function(error) {

				}.bind(this)
			});

			oModel.setRefreshAfterChange(true);
		}

	});

});