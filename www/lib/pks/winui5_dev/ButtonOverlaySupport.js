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

sap.ui.define(["./library"], function(winui5Lib){
    
    "use strict";
    
    var OverlayTrigger = winui5Lib.OverlayTrigger,
        InstanceEvent = {},
        OverlayEvent = {};
    
    /**
     * Handler for the Instance press Event.
     * Used for right-click menus.
     */
    InstanceEvent.press = function(oEvent){
        var mParam = oEvent.getParameters();
        
        if(mParam.origin === winui5Lib.PressOrigin.SecondaryPress){
            var oOverlay = this.chooseOverlay(mParam.item);
            
            oOverlay && oOverlay.setPosition(mParam.clientX, mParam.clientY).open();
        }
    },
    
    /**
     * Handler for the Instance selectionChange Event.
     * Used for classic dropdown menus.
     */
    InstanceEvent.selectionChange = function(oEvent){
        var mSelectedItems = oEvent.getParameter(this.getDefaultSelectionGroup());
        console.log(mSelectedItems);
        if(mSelectedItems.selected.length){
            //New Item has been selected
            var oItem = mSelectedItems.selected[0],
                oOverlay = this.chooseOverlay(oItem);
            
            if(mSelectedItems.deselected.length){
                var oCurrentOverlay = this.chooseOverlay(mSelectedItems.deselected[0]);
                
                if(oCurrentOverlay !== oOverlay){
                    oCurrentOverlay && oCurrentOverlay.close(winui5Lib.OverlayCloseReason.Switch);
                }
            }
            
            if(oOverlay){
                oOverlay.setPosition("left", "bottom", oItem.getDomRef()).open();
            }
            else{
                //If the menu has no overlay, focus the owner again.
                oEvent.getSource().focus();
            }
            
        }
        else if(mSelectedItems.deselected.length){
            //Item has been deselected only.
            //Happens when a menu item is selected which does not have an overlay assigned.
            var oItem = mSelectedItems.deselected[0],
                oOverlay = this.chooseOverlay(oItem);
            
            oOverlay && oOverlay.close(winui5Lib.OverlayCloseReason.Switch);
        }
     },
     
     /**
      * Handler for the Instance pointerEnter Event.
      * Used for classic dropdown menus.
      */
     InstanceEvent.pointerEnter = function(oEvent){
         var oItem = oEvent.getParameter(this.getDefaultItemEventParameter());
         
         if(this.getSelection().length){
            //Suppress Deselection
            this.pressItem(oItem, {
                origin : winui5Lib.PressOrigin.PointerEnter
            });
         }
     };
     
     /**
      * Handler for the Overlay beforeOpen Event.
      */
     OverlayEvent.beforeOpen = function(oEvent){ 
         var oContent = this.getContent();
         
         /*
         if(oContent.getMetadata().isInstanceOf("pks.ui5.ISelectionProvider")){
             //If the overlay content is a selection provider
             //e.g. a DropdownMenu
             //oContent.clearSelection();
             oContent.setActiveItem(null, { suppressSelection : true });
         }
         */
     };
     
     /**
      * Clear the selection when the overlay is closed.
      */
     OverlayEvent.afterClose = function(oEvent){ 
         var sCloseReason = oEvent.getParameter("reason");
         if(sCloseReason === winui5Lib.OverlayCloseReason.Cancel 
             || sCloseReason === winui5Lib.OverlayCloseReason.Submit
         ){
             var oControl = this.getOwner().getItemContainer();
             
             if(oControl.getOverlayTrigger() === winui5Lib.OverlayTrigger.SelectionChange){
                 //If the overlay has been triggered by a selectionChange, then clear the selection when overlay is closed.
                 oControl.clearSelection(); 
             }
         }
     };
     
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
      * @protected
      */
     Trait.chooseOverlay = function(oItem){
         var oActiveOverlay;
         
         //TODO check interface
         if(oItem && oItem.getOverlay){
             oActiveOverlay = oItem.getOverlay();
         }
         else{
             oActiveOverlay = this.getOverlay();
         }
         
         this.m_oActiveOverlay = oActiveOverlay; 
         
         return oActiveOverlay;
     };
     
     /**
      * 
      * @param bPreviousOverlayEnabled
      * @param sPreviousOverlayTrigger
      */
     Trait.setInstanceEvents = function(bPreviousOverlayEnabled, sPreviousOverlayTrigger){
         var sOverlayTrigger = this.getOverlayTrigger(),
             bOverlayEnabled = this.getOverlayEnabled();
         
         if(bOverlayEnabled === bPreviousOverlayEnabled && sOverlayTrigger === sPreviousOverlayTrigger){
             //Overlay configuration is still same, do nothing.
             return;
         }
         
         if(sPreviousOverlayTrigger && (!bOverlayEnabled || sOverlayTrigger === OverlayTrigger.Manual || sPreviousOverlayTrigger !== sOverlayTrigger)){
             //OverlayTrigger has changed!
             //TODO other press variants
             if(sPreviousOverlayTrigger === OverlayTrigger.SecondaryPress){
                 this.detachPress(InstanceEvent.press);
             }
             else if(sPreviousOverlayTrigger === OverlayTrigger.SelectionChange){
                 this.detachSelectionChange(InstanceEvent.selectionChange);
                 this.detachPointerEnter(InstanceEvent.pointerEnter);
             }
         }
         
         if(bOverlayEnabled){
             //Only attach if overlay is set
             //TODO other press variants
             if(sOverlayTrigger === OverlayTrigger.SecondaryPress){
                 this.attachPress(InstanceEvent.press);
             }   
             else if(sOverlayTrigger === OverlayTrigger.SelectionChange){
                 this.attachSelectionChange(InstanceEvent.selectionChange);
                 this.attachPointerEnter(InstanceEvent.pointerEnter);
             }
         }
     };
     
     /**
      * protected
      */
     Trait.setOverlayEvents = function(oCurrentOverlay){
         var oOverlay = this.m_oOverlay;
         
         if(oCurrentOverlay && oOverlay !== oCurrentOverlay){
             //Deselection of dropdown menu items
             //TODO Move
             oOverlay.detachBeforeOpen(OverlayEvent.beforeOpen);
             
             //Close listener
             oOverlay.detachAfterClose(OverlayEvent.afterClose);
         }
         
         if(oOverlay  && oOverlay !== oCurrentOverlay){
             //Deselection of dropdown menu items
             //TODO Move
             oOverlay.attachBeforeOpen(OverlayEvent.beforeOpen);
             
             //Close listener
             oOverlay.attachAfterClose(OverlayEvent.afterClose);
         }
     };
     
     /**
      * @class
      * Class that provides methods to add context menu support to item containers.
      * @alias pks.winui5.ButtonOverlaySupport
      * @author Jan Philipp Knoeller
      * @version 1.0.8-SNAPSHOT
      * @public
      */
     var ButtonOverlaySupport = {};
    
    /**
     * Adds the required methods to the prototype.
     * 
     * @param {sap.ui.core.Control} oProto - The control prototype.
     * @param {boolean} bIsItem - Whether the Instance is an Item.
     */
    ButtonOverlaySupport.addMethods = function(oProto, bIsItem){
        oProto.setInstanceEvents = Trait.setInstanceEvents;
        oProto.setOverlayEvents = Trait.setOverlayEvents;
        oProto.chooseOverlay = Trait.chooseOverlay;
    };    
        
    //Return Constructor
    return ButtonOverlaySupport;
});