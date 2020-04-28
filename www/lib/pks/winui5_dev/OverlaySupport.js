/*
 * 
 * WinUi5
 *
 * pks.winui5.OverlaySupport
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://pksoftware.de
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

sap.ui.define(["./library", "./Overlay", "./OverlayRenderer"], function(winui5Lib, Overlay, OverlayRenderer){
	
    "use strict";
	
	/**
      * @class
      * Class that provides methods to add context menu support to item containers.
      * @alias pks.winui5.OverlaySupport.Trait
      * @author Jan Philipp Knoeller
      * @version 1.0.8-SNAPSHOT
      * @private
      */
     var Trait = {};
     
     /**
      * @public
      * @override
      */
     Trait.setOverlayTrigger = function(sOverlayTrigger, bSuppressInvalidate){
         var sPreviousOverlayTrigger = this.getOverlayTrigger();
         
         this.setProperty("overlayTrigger", sOverlayTrigger, true);
         
         this.setInstanceEvents(this, this.getOverlayEnabled(), sPreviousOverlayTrigger);
         
         return this;
     };
     
     /**
      * @public
      * @override
      */
     Trait.setOverlayEnabled = function(bOverlayEnabled, bSuppressInvalidate){
         var bPreviousOverlayEnabled = this.getOverlayEnabled();
         
         this.setProperty("overlayEnabled", bOverlayEnabled, true);
         
         this.setInstanceEvents(this, bPreviousOverlayEnabled, this.getOverlayTrigger());
         
         return this;
     };
     
     /**
      * @public
      * @override
      */
     Trait.setOverlay = function(oOverlay, bSuppressInvalidate){
         var oPreviousOverlay = this.getOverlay();
         
         this.m_oOverlay = oOverlay;
         
         if(oPreviousOverlay && oOverlay !== oPreviousOverlay){
             oPreviousOverlay.setOwner(null);
             this.removeDependent(oPreviousOverlay);
         }
         
         if(oOverlay  && oOverlay !== oPreviousOverlay){ console.log(oOverlay)
             oOverlay.setOwner(this);
             this.addDependent(oOverlay);
         }
         
         this.setOverlayEvents(oPreviousOverlay);
         
         return this;
     };
     
     /**
      * Reuturns the Overlay assigned to the instance.
      * @public
      * @override
      */
     Trait.getOverlay = function(){
         return this.m_oOverlay;
     };
     
     /**
      * @class
      * Class that provides methods to add context menu support to item containers.
      * @alias pks.winui5.OverlaySupport
      * @author Jan Philipp Knoeller
      * @version 1.0.8-SNAPSHOT
      * @public
      */
     var OverlaySupport = {};
     
	
	/**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    OverlaySupport.addMetadata = function(oMetadata, bIsElement){
        
        if(!bIsElement){
            //TODO Only for containers
            oMetadata.properties.overlayEnabled = {
                type : "boolean"
            };
            
            oMetadata.properties.overlayTrigger = {
                type : "pks.winui5.OverlayTrigger",
                defaultValue : winui5Lib.OverlayTrigger.Manual
            };
        }
        
        oMetadata.aggregations.overlay = {
            type : "pks.winui5.Overlay",
            multiple : false
        };
    };
    
    /**
     * Adds the required methods to the prototype.
     * 
     * @param {sap.ui.core.Control} oProto - The control prototype.
     */
	OverlaySupport.addMethods = function(oProto, bIsElement){
	    
	    if(!bIsElement){
    	    //TODO make the functions static so they need to created only once
    	    oProto.setOverlayTrigger = Trait.setOverlayTrigger;
            
            oProto.setOverlayEnabled = Trait.setOverlayEnabled;
        }
        
        oProto.setOverlay = Trait.setOverlay;
        
        oProto.getOverlay = Trait.getOverlay;
    };
	
	/**
     * Called on init.
     * @protected
     */
    OverlaySupport.onInit = function(oInstance){
        
    };
	
    /**
     * Called before destruction
     * @protected
     */
	OverlaySupport.onExit = function(oInstance){
	    if(oInstance.m_oOverlay){
            oInstance.m_oOverlay.destroy();
            oInstance.m_oOverlay = null;
	    }
	    
        oInstance.m_oActiveOverlay = null;
    };
	
	//Return object
	return OverlaySupport;
	
});