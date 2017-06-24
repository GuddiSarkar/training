sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";
	/*eslint linebreak-style: ["error", "windows"]*/
	return Controller.extend("com.demoTMS.controller.TeleCaller_mainView", {
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

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		onLogoffPress: function(oEvent) {
			var uname = window.sessionStorage.getItem("un");
			var loginTime = window.sessionStorage.getItem("dt");
			var filterun = new Filter("user_name", FilterOperator.EQ, uname);
			var filterlt = new Filter("login_dtime", FilterOperator.EQ, loginTime);
			//var id1 = null;
			var oFilter = new Filter({
				filters: [filterun, filterlt],
				bAnd: true
			});
			var oModel = this.getOwnerComponent().getModel("course");
			oModel.setUseBatch(false);
			var oCatDef = $.Deferred();
			oModel.read("/tb_ulginhstry", {
				filters: [oFilter],
				success: function(oData, oResponse) {
					var nm = oData.results[0].user_name;
					this.id = oData.results[0].user_id;
					console.log(nm);
					console.log(this.id);
					var dateTime = new Date();
					this.date = dateTime.toLocaleString();
					oCatDef.resolve();
				}.bind(this),
				error: function(oErr) {
					console.log("we r in error block" + oErr);
					oCatDef.reject();
				}.bind(this)
			});

			$.when(oCatDef).then(
				function() {

					var data = {
						"logout_dtime": this.date
					};
					oModel.update("/tb_ulginhstry(" + this.id + ")", data, {
						//filters: [filterlt],
						success: function(dData, dResponse) {
							console.log(dData);
							console.log(dResponse);
							//console.log(dData.results.logout_dtime);
							window.sessionStorage.removeItem("un");

						}.bind(this),
						error: function(err) {
							console.log(err);
						}.bind(this)
					});
					this.getRouter().navTo("home");
					oModel.setRefreshAfterChange(true);

				}.bind(this)
			);
		}
	});

});