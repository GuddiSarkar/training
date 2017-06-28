sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.demoTMS.controller.Bill_Generate", {

		onPrint:  function(oEvent) {
			// var header='<center><h3>Payment Receipt</h3></center>';
			var oTarget = this.getView(),
			// this.getView().byId("result").innerHTML = this.getView().byId('fname').value + " " + this.getView().byId('mname').value + " " + this.getView().byId('lname').value;
            sTargetId = oEvent.getSource().data("print");
            
        if (sTargetId) {
            oTarget = oTarget.byId("print");
        }
        
        if (oTarget) {
            var $domTarget = oTarget.$()[0],
                sTargetContent = $domTarget.innerHTML,
                sOriginalContent = document.body.innerHTML;
                
            document.body.innerHTML = sTargetContent;
            window.print();
            document.body.innerHTML = sOriginalContent;
        } else {
            jQuery.sap.log.error("onPrint needs a valid target container [view|data:targetId=\"SID\"]");
        }
			// window.print();
			// var i;
		// 	var header='<center><h3>Payment Receipt</h3></center>';
		// 	// var data=oModel.getProperty("/");
		// // 	 var divToPrint=this.getView().byId("print");

  //var newWin=window.open('',"Print-Window");
  //var divToPrint=this.getView().byId("print");
  //newWin.document.write(header+divToPrint);
  //newWin.print();
  //newWin.close();

  //newWin.document.open();

  //newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

  //newWin.document.close();

  //setTimeout(function(){newWin.close();},10);
		// }
}
	});

});