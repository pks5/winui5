/*
 * 
 * WinUi5 Demo App
 *
 * pks.winui5.demo.fiori.controller.Overview
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

    return Controller.extend("pks.winui5.demo.fiori.controller.Overview", {

    	onPress: function (oEvent) {
    	    var oItem = oEvent.getParameter("item");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo(oItem.data("route"), {});
		}
    
    });
});