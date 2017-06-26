sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.Approve", {
		
		onInit: function() {
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
		},


		// addSave: function(oEvent) {
		// 	var Name = this.getView().byId("a_name").getValue();
		// 	var Role = this.getView().byId("a_role").getValue();
		// 	var SetUserName = this.getView().byId("a_uname").getValue();
		// 	var SetPassword = this.getView().byId("a_pwd").getValue();
		// 	var oEntry = {
		// 		"user_username": SetUserName,
		// 		"user_pwd": SetPassword,
		// 		"user_role": Role,
		// 		"user_name": Name
		// 	};
		// 	var oModel = this.getOwnerComponent().getModel("course");
		// 	oModel.setUseBatch(false);
		// 	oModel.create("/tb_user", oEntry, {
		// 		success: function(oData) {

		// 			this.getView().byId("a_uname").setValue("");
		// 			this.getView().byId("a_pwd").setValue("");
		// 			this.getView().byId("a_role").setValue("");
		// 			this.getView().byId("a_name").setValue("");
		// 		}.bind(this),
		// 		error: function(error) {

		// 		}.bind(this)
		// 	});

		// 	oModel.setRefreshAfterChange(true);
		// },
		
		onClickApprove: function(oEvent){
			var oView = this.getView();
			var oDialog = oView.byId("approveFragment");
			var oTable = this.getView().byId("adCrsTable");
			var path = oEvent.getSource().getBindingContext("course").getPath();
			var model = oTable.getModel("course");
			var property = model.getProperty(path);
			
			var id = property.register_id;
			var eUname = property.register_user_username;
			var ePass = property.register_user_password;
			var eRole = property.register_user_role;
			var eName = property.register_user_name;
			var eCnfPass = property.register_user_cnfPassword;
			
			var data = {
				"user_username": eUname,
				"user_pwd": ePass,
				"user_role": eRole,
				"user_name": eName,
				"user_cnfpwd": eCnfPass
			};
			
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.create("/tb_user", data, {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			
			oModel.remove("/tb_register(" + id + ")", {
				success: function(oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.success(
						"Username and password for "+eName+" set Successfully !", {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}.bind(this),
				error: function(err) {
					console.log(err);
				}.bind(this)
			});
			
			oModel.setRefreshAfterChange(true);
		}
		
		// onClickSave:  function(){
		// 	var id = this.getView().byId("id").getValue();
		// 	var eName = this.getView().byId("name").getValue();
		// 	var eRole = this.getView().byId("role").getValue();
		// 	var uName = this.getView().byId("uname").getValue();
		// 	var pwd = this.getView().byId("pwd").getValue();
		// 	var data = {
		// 		"user_username": uName,
		// 		"user_pwd": pwd,
		// 		"user_role": eRole,
		// 		"user_name": eName
		// 	};
		// 	var oModel = this.getOwnerComponent().getModel("course");
		// 	oModel.create("/tb_user", data, {
		// 		success: function(oData, oResponse) {
		// 			console.log(oData);
		// 			console.log(oResponse);
		// 		}.bind(this),
		// 		error: function(err) {
		// 			console.log(err);
		// 		}.bind(this)
		// 	});
			
		// 	oModel.remove("/tb_register(" + id + ")", {
		// 		success: function(oData, oResponse) {
		// 			console.log(oData);
		// 			console.log(oResponse);
		// 			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
		// 			MessageBox.success(
		// 				"Username and password for "+eName+" set Successfully !", {
		// 					styleClass: bCompact ? "sapUiSizeCompact" : ""
		// 				}
		// 			);
		// 		}.bind(this),
		// 		error: function(err) {
		// 			console.log(err);
		// 		}.bind(this)
		// 	});
			
		// 	oModel.setRefreshAfterChange(true);
		// 	this.getView().byId("approveFragment").close();
		// }

	});

});