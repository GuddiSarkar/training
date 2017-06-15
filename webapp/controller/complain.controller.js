sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox'
], function(Controller, MessageBox) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.complain", {

		onSubmit: function(oEvent) {

			var name;
			var issue = this.getView().byId("select").getSelectedItem().getText();
			if (issue === "Student") {
				name = this.getView().byId("s_name").getValue();
			} else {
				name = this.getView().byId("f_name").getValue();
			}
			var subject = this.getView().byId("sub").getValue();
			var description = this.getView().byId("descriptn").getValue();

			var oEntry = {
				"name": name,
				"issue_for": issue,
				"subject": subject,
				"description": description
			};
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			oModel.create("/tb_complain", oEntry, {
				success: function(oData) {
					if (issue === "Student") {
						this.getView().byId("s_name").setValue("");
					} else {
						this.getView().byId("f_name").setValue("");
					}
					//this.getView().byId("name").setValue("");
					this.getView().byId("select").setSelectedKey("");
					this.getView().byId("sub").setValue("");
					this.getView().byId("descriptn").setValue("");
				}.bind(this),
				error: function(error) {

				}.bind(this)
			});
			oModel.setRefreshAfterChange(true);
		},
		onChange: function(evt) {
			var oSelected = this.getView().byId("select").getSelectedItem().getText();
			if (oSelected === "Student") {
				this.getView().byId("vis1").setVisible(true);
				this.getView().byId("vis2").setVisible(false);
			} else {
				this.getView().byId("vis1").setVisible(false);
				this.getView().byId("vis2").setVisible(true);
			}
		}

	});

});