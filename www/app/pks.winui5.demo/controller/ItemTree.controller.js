/*
 * 
 * WinUi5 Demo App
 *
 * pks.winui5.demo.fiori.controller.ItemTree
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

    return Controller.extend("pks.winui5.demo.fiori.controller.ItemTree", {

    	onSelectionChange : function(oEvent){
    		console.log(oEvent.getParameter("selectedItems"));
    	},
    	
    	onPress : function(oEvent){
			var oItem = oEvent.getParameter("item");
			if(oItem){
				console.log("You have clicked node: " + oItem.getName());
			}
    	}
    
    });
});