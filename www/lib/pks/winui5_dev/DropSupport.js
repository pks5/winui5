/*
 * 
 * WinUi5
 *
 * pks.winui5.DropSupport
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
     * Class that provides methods to add drop support to items and containers.
     * @alias pks.winui5.DropSupport.Trait
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @public
     */
    var Trait = {};
    
    Trait.ondragenter = function(oEvent){
        var oFileTree = this.getItemContainer();
        
        if(oFileTree && oFileTree.getDropEnabled()){
            oEvent.preventDefault();
            oEvent.stopPropagation();
            
            //TODO effectAllowed
            //oEvent.originalEvent.dropEffect = "move";
            oFileTree.focus();
            
            if(this !== oFileTree){
                oFileTree.setActiveItem(this, { suppressSelection : true });
            }
            else{
                oFileTree.setActiveItem(null, { suppressSelection : true });
            }
        }
    };
    
    Trait.ondragover = function(oEvent){
        var oFileTree = this.getItemContainer();
        
        if(oFileTree && oFileTree.getDropEnabled()){
            oEvent.preventDefault();
            oEvent.stopPropagation();
            
        }
    };
    
    Trait.ondrop = function(oEvent){
        var oFileTree = this.getItemContainer();
        
        if(oFileTree && oFileTree.getDropEnabled()){
            oEvent.preventDefault();
            oEvent.stopPropagation();
            
            var oDataTransfer = oEvent.originalEvent.dataTransfer,
                sText = oDataTransfer.getData("text");
            
            //Text has been dropped on the node.
            try{
                var oDropData = JSON.parse(sText);
                
                oFileTree.fireDrop({
                    dataTransfer : oDataTransfer,
                    data : oDropData,
                    target : this
                });
                
            }
            catch(oError){
                //A text has been dropped, but without additional information.
                //jQuery.sap.log.warning("Ignoring plain text that has been dropped on the node.");
            }
            
            //Something different has been dropped on the node.
            oFileTree.fireDrop({
                dataTransfer : oDataTransfer,
                target : this
            });
            
        }
    };
    
    /**
     * Allow / disallow dropping within the container. No rerendering required.
     * 
     * @param {boolean} bNewAllowDrop - Whether dropping should be allowed within this container.
     * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation.
     * 
     * @return {pks.winui5.ItemContainer} Reference to this for method chaining.
     *
     * @public
     * @override
     */
    Trait.setDropEnabled = function(bDropEnabled, bSuppressInvalidate){
        this.setProperty("dropEnabled", bDropEnabled, true);
        
        return this;
    }
    
    
    
	/**
	 * @class
	 * Class that provides methods to add drop support to items and containers.
	 * @alias pks.winui5.DropSupport
	 * @author Jan Philipp Knoeller
	 * @version 1.0.8-SNAPSHOT
	 * @public
	 */
	var DropSupport = {};
	
	/**
     * Adds the metadata to item containers required for drop support.
     * 
     * @param {object} oMetadata - The item container metadata definition.
     */
    DropSupport.addMetadata = function(oMetadata, bIsElement){
        
        
            
            
            /*
             * START pks.ui5.IDropZone / pks.ui5.IDraggableItemContainer
             */
            
            /**
             * Indicates whether dropping is allowed within the container.
             */
            oMetadata.properties.dropEnabled = {
                type : "boolean",
                defaultValue : false
            };
            
            oMetadata.events.drop = {
                
            };
            
            /*
             * END pks.ui5.IDropZone / pks.ui5.IDraggableItemContainer
             */
        
        
    };
    
    /**
     * Adds the methods to the drop zone required for drop support.
     * 
     * @param {pks.ui5.IDropZone} oProto - The drop zone prototype.
     */
    DropSupport.addMethods = function(oProto, bIsElement){
             
            /*
             * START pks.ui5.IDropZone
             */
            
            /**
             * Triggered when a dragged item enters an other node.
             * 
             * @protected
             * @override
             */
            oProto.ondragenter = Trait.ondragenter;
            
            /**
             * Triggered while a dragged item is moved over an other node.
             * 
             * @protected
             * @override
             */
            oProto.ondragover = Trait.ondragover;
            
            /**
             * Triggered when a dragged item is dropped on a file node.
             * 
             * @protected
             * @override
             */
            oProto.ondrop = Trait.ondrop;
            
            oProto.setDropEnabled = Trait.setDropEnabled;
            
            /*
             * END pks.ui5.IDropZone
             */
        
    };
	
	return DropSupport;
});