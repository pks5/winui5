/*
 * 
 * WinUi5
 *
 * pks.winui5.ListNavigationSupport
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

sap.ui.define(["./library", "sap/ui/events/KeyCodes"], function(winui5Lib, KeyCodes){
    
    "use strict";
    
    /**
     * @class
     * Class that provides methods to add drag support to items and containers.
     * @alias pks.winui5.ListNavigationSupport.Trait
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @public
     */
    var Trait = {};
   
    /**
     * Finds the next node in the order.
     * 
     * @param {pks.winui5.Item} oNode - The node to search from.
     * @param {int} iDir - The direction and step length.
     * @param {boolean} bSkipChildren - Whether to skip the children.
     * 
     * @return {pks.winui5.Item} The next node.
     * 
     * @protected
     * @override
     */
    Trait.findNextItem = function(oNode, iDir, bSkipChildren){
        if(!oNode){
            jQUery.sap.log.warning("Cannot find next item from null!");
            return null;
        }
        
        var aChildNodes = this.getItems();
        
        if(!aChildNodes.length){
            //Should never happen
            throw new Error("Unable to find next item: no items.");
        }
        
        var oNodeParent = oNode.getParent(),
            aParentChildren = oNodeParent.getItems(),
            iNodeIndex = oNodeParent.indexOfItem(oNode),
            iParentChildrenCount = aParentChildren.length;
        
        if(iNodeIndex < 0 || iParentChildrenCount === 0 || iDir === 0){
            //Should never happen
            throw new Error("Could not determine node index.");
        }
        
        iNodeIndex += iDir;
        
        var oNextNode = null;
        
        if(iNodeIndex >= 0 && iNodeIndex < iParentChildrenCount){
            oNextNode = aParentChildren[iNodeIndex];
            
            //Skip item if unavailable
            if(oNextNode && !oNextNode.isAvailable()){
                oNextNode = this.findNextItem(oNextNode, iDir, bSkipChildren);
            }
        }
        
        return oNextNode;
    };
    
    /**
     * Determines the position (index) of the item.
     * 
     * @param {pks.winui5.Item} oItem - The item to test.
     * 
     * @return {int} - The position.
     * 
     * @override
     */
    Trait.determineItemPosition = function(oItem){
        var oParent = oItem.getParent();
        
        if(this !== oParent){
            throw new Error("Item must be inside this container.");
        }
        
        return this.indexOfItem(oItem);
    };
    
    
    
    /**
     * Returns the aria role. Overrides abstract method <em>ItemContainer.prototype.getAriaRole</em>
     * 
     * @return {string} - The aria role.
     * @override
     */
    Trait.getAriaRole = function(){
        return this.getLayout() === "Grid" ? "grid" : "listbox";
    };
    
    /**
     * @class
     * Class that provides methods to add drag support to items and containers.
     * @alias pks.winui5.ListNavigationSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @public
     */
    var ListNavigationSupport = {};
    
    ListNavigationSupport.addMetadata = function(oMetadata, bIsElement){
       
        
    };
    
    ListNavigationSupport.addMethods = function(oProto, bIsElement){
        oProto.findNextItem = Trait.findNextItem;
        
        oProto.determineItemPosition = Trait.determineItemPosition;
        
        oProto.getAriaRole = Trait.getAriaRole;
    };
    
    ListNavigationSupport.onInit = function(oInstance){
        
        oInstance.attachNavigate(function(oEvent){
            
            var sKeyCode = oEvent.getParameter("keyCode");
            if(sKeyCode === KeyCodes.ARROW_LEFT
               || sKeyCode === KeyCodes.ARROW_RIGHT){
                
                if(this.getLayout() !== "VerticalList"){
                    //Grid or HorizontalList
                    var oNode = this.getActiveItem(),
                        iStep = 1;
                    
                    if(!oNode || !oNode.getDomRef()){
                        return;
                    }
                
                    var sKeyCode = oEvent.getParameter("keyCode");
                    
                    if(sKeyCode === KeyCodes.ARROW_LEFT){
                        this.navigate(oNode, -1);
                    }
                    else if(sKeyCode === KeyCodes.ARROW_RIGHT){
                        this.navigate(oNode, 1);
                    }
                }
                
            }
            else if(sKeyCode === KeyCodes.ARROW_UP
                    || sKeyCode === KeyCodes.ARROW_DOWN){
                     
                 var oNode = this.getActiveItem();
                 
                 if(!oNode || !oNode.getDomRef()){
                     return;
                 }
                   
                 var iStep = 1; //Width including border
               
                 //this.$()[0].clientWidth, //Container width without border
                   
                   if(this.getLayout() === "Grid"){
                       //Grid only
                       var iWidth = jQuery(this.getSubDomRef("children")).width(), //Width without padding
                           iNodeWidth = oNode.getDomRef().offsetWidth;
                       
                       iStep = Math.floor(iWidth / iNodeWidth);
                   }
                   
                   if(this.getLayout() !== "HorizontalList"){
                       //Grid and vertical list
                       if(sKeyCode === KeyCodes.ARROW_UP){
                           this.navigate(oNode, -iStep);
                       }
                       else if(sKeyCode === KeyCodes.ARROW_DOWN){
                           this.navigate(oNode, iStep);
                       }
                   }
              }
        
        });
        
        
    };
    
    return ListNavigationSupport;
});