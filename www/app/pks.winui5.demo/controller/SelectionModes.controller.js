/*
 * 
 * WinUi5 Demo App
 *
 * pks.winui5.demo.fiori.controller.SelectionModes
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://pksoftware.de
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * ALL RIGHTS RESERVED
 * 
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("pks.winui5.demo.fiori.controller.SelectionModes", {

    	onSelectionChange : function(oEvent){
    		console.log(oEvent.getParameter("selectedItems"));
    	},
    	
    	onPress : function(oEvent){
            var oItem = oEvent.getParameter("item");
            if(oItem){
                console.log("Item pressed: " + oItem.getId() + ", origin: " + oEvent.getParameter("origin"));
            }
            else{
                console.log("Container pressed: " + oEvent.getSource().getId() + ", origin: " + oEvent.getParameter("origin"));
            }
        },
    	
    	onDrop : function(oEvent){
    		var oDropData = oEvent.getParameter("data"),
    			oTgtItem = oEvent.getParameter("target"),
    			oDataTransfer = oEvent.getParameter("dataTransfer");
    		
    		
    		
    		if(oDropData && oDropData.type){
    			
    			var oSrcItem = sap.ui.getCore().byId(oDropData.id);
    			
    			if(oSrcItem && oSrcItem !== oTgtItem){
	    			oSrcItem.getParent().removeItem(oSrcItem);
	    			oTgtItem.addItem(oSrcItem);
	    			
	    			jQuery.sap.log.info("You dropped " + oSrcItem.getId() + " on " + oTgtItem.getId())
    			}
    		}
    		else if(oDataTransfer && oDataTransfer.files){
    			alert("You dropped " + oDataTransfer.files[0].name + " into " + oTgtItem.getId());
    		}
    		else{
    			jQuery.sap.log.info("Invalid drop");
    		}
    	},
    	
    	showSelection : function(oEvent){
    		console.log(this.getView().byId("fileTreeSmallItemsMultipleSelection").getSelection());
    	}
    
    });
});