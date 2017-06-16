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
	});

});