/*
 * 
 * WinUi5
 *
 * pks.winui5.DragSupport
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
    
    /**
     * @class
     * Class that provides methods to add drag support to items and containers.
     * @alias pks.winui5.DragSupport.Trait
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @public
     */
	var Trait = {};
	
	Trait.ondragstart = function(oEvent){
        var oFileTree = this.getItemContainer();
        
        if(oFileTree 
                && this.getEnabled() 
                && this.getDraggable() 
                && oFileTree.getDragEnabled()){
            
            //Set active item on drag
            oFileTree.setActiveItem(this, { suppressSelection : true });
            
            oEvent.stopPropagation();
            
            var mSrcInfo = {
            	//TODO use real type here 
                type : "pks.ui5.IDraggable",
                id : this.getId()
            };
            //TODO aria-grabbed
            oEvent.originalEvent.dataTransfer.setData("text", JSON.stringify(mSrcInfo));
        }
        else{
            oEvent.preventDefault();
        }
    };
    
    Trait.setDragEnabled = function(bDragEnabled, bSuppressInvalidate){
        var elDomRef = this.getDomRef();
        if(elDomRef){
            this.setProperty("dragEnabled", bDragEnabled, true);
            
            var $files = jQuery(elDomRef).find("." + Item.createStyleClass("item"));
            
            if(bDragEnabled){
                $files.attr("draggable", "true");
            }
            else{
                $files.removeAttr("draggable");
            }
        }
        else{
            this.setProperty("dragEnabled", bDragEnabled, bSuppressInvalidate);
        }
        
        return this;
    };
	
    /**
     * @class
     * Class that provides methods to add drag support to items and containers.
     * @alias pks.winui5.DragSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @public
     */
	var DragSupport = {};
	
	/**
     * Adds the metadata to item containers required for drag support.
     * 
     * @param {object} oMetadata - The item container metadata definition.
     */
    
	DragSupport.addMetadata = function(oMetadata, bDraggable){
        
        if(bDraggable){
        
            /*
             * START pks.ui5.IDraggableItem
             */
            
            /**
             * Indicates whether the item is draggable.
             */
            oMetadata.properties.draggable = {
                type: "boolean", 
                defaultValue : true
            };
            
            /*
             * END pks.ui5.IDraggableItem
             */
        }
        else{
            /*
             * START pks.ui5.IDraggableItemContainer
             */
            
            /**
             * Indicates whether dragging is allowed within the container.
             */
            oMetadata.properties.dragEnabled = {
                type : "boolean",
                defaultValue : false
            };
            
            /*
             * END pks.ui5.IDraggableItemContainer
             */
        }
    };
    
    /**
     * Adds the methods to the item required for drag support.
     * 
     * @param {pks.ui5.IItem} oProto - The item prototype.
     */
    DragSupport.addMethods = function(oProto, bDraggable){
        if(bDraggable){
            /*
             * START pks.ui5.IDraggableItem
             */
            
            /**
             * Triggered when a item has been dragged.
             * 
             * @param {sap.ui.base.Event} oEvent - The ui5 event object.
             * 
             * @protected
             * @override
             */
            oProto.ondragstart = Trait.ondragstart;
            
            /*
             * END pks.ui5.IDraggableItem
             */
        }
        else{
            /**
             * Allow / disallow dragging within the container.
             * 
             * @param {boolean} bNewAllowDrag - Whether dragging should be allowed within the container.
             * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation.
             * 
             * @return {pks.winui5.ItemContainer} Reference to this for method chaining.
             * 
             * @public
             * @override
             */
            oProto.setDragEnabled = Trait.setDragEnabled;
        }
    };
	
	//Return object
	return DragSupport;
});