/*
 *  
 * WinUi5 Demo App
 *
 * pks.winui5.demo.fiori.model.ContainerConnector
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
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "./model/ContainerConnector"
], function (UIComponent, JSONModel, ContainerConnector) {
   "use strict";
   
   
   var Component = UIComponent.extend("pks.winui5.demo.fiori.Component", {
	   metadata : {
           manifest: "json"
     }
      
   }),
   ComponentProto = Component.prototype;
   
   /**
    * Initialize
    * @protected
    */
   ComponentProto.init = function () {
       // call the init function of the parent
       UIComponent.prototype.init.apply(this, arguments);
      
       
      // create the views based on the url/hash
      this.getRouter().initialize();
    };
    
    /**
     * Returns the instance of the ContainerConnector Bean.
     */
    ComponentProto.getContainerConnector = function(){
        if(!this.m_oContainerConnector){
            this.m_oContainerConnector = new ContainerConnector({
                component : this
            });
        }
        
        return this.m_oContainerConnector;
    };
    
    return Component;
});