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
     * Determines the item level of an item.
     * 
     * @param {pks.winui5.Item} oItem - The item to test.
     * 
     * @return {int} The item level.
     */
    Trait.determineItemLevel = function(oItem){
        var iItemLevel = this.ROOT_LEVEL;
        
        if(oItem){
            var oParent = oItem.getParent();
            
            if(!oParent){
                throw new Error("Item has no parent.");
            }
            else if(oParent.getMetadata().isInstanceOf("pks.ui5.IItem")){
                iItemLevel = this.determineItemLevel(oParent) + 1;
            }
            else if(!oParent.getMetadata().isInstanceOf("pks.ui5.IItemContainer")){
                throw new Error("Item is not part of an item container.");
            }
        }
        
        return iItemLevel;
    };
    
    /**
     * Determines the number of items.
     * 
     * @param {pks.winui5.Item} oItem - The item to test.
     * 
     * @return {int} The length
     */
    Trait.determineItemLength = function(oItem){
        var iLength = 1;
        
        if(oItem.getExpanded()){
            var aChildren = oItem.getItems();
            for(var i = 0; i < aChildren.length; i++){
                var oChild = aChildren[i];
                iLength += this.determineItemLength(oChild);
            }
        }
        
        return iLength;
    };
    
    /**
     * Determines the position of an item.
     * 
     * @param {pks.winui5.Item} oItem - The item position.
     * 
     * @return {int} The item position.
     * 
     * @override
     */
    Trait.determineItemPosition = function(oItem){
        var oParent = oItem.getParent()
        
        if(!oParent){
            throw new Error("Item has no parent.");
        }
        else if(oParent.getMetadata().isInstanceOf("pks.ui5.IItem")){
            if(!oParent.getExpanded()){
                throw new Error("Item not visible.");
            }
            var iPos = oParent.indexOfItem(oItem),
                aChildren = oParent.getItems(),
                iResPos = 0;
            
            for(var i = 0; i < iPos; i++){
                var oParentItem = aChildren[i];
                iResPos += this.determineItemLength(oParentItem);
            }
            
            return this.determineItemPosition(oParent) + iResPos + 1;
        }
        else if(!oParent.getMetadata().isInstanceOf("pks.ui5.IItemContainer")){
            throw new Error("Item is not part of an item container.");
        }
        
        return this.indexOfItem(oItem);
    };
    
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
        
        if(iNodeIndex < 0 || iParentChildrenCount === 0 || iDir < -1 || iDir === 0 || iDir > 1){
            //Should never happen
            throw new Error("Invalid state!");
        }
        
        iNodeIndex += iDir;
        
        var oNextNodeCandidate = null;
        
        if(iNodeIndex < 0){
            //If we are on top level, do nothing.
            //Otherwise, go one level up.
            if(oNodeParent && oNodeParent !== this){
                oNextNodeCandidate = oNodeParent;
            }
        }
        else if(iNodeIndex >= iParentChildrenCount){
            var aChildNodes = oNode.getItems();
            
            //If we are on top level, do nothing.
            //Otherwise, go to next node in parent.
            if(!bSkipChildren && oNode.getExpanded() && aChildNodes.length){
                //First Item of children
                oNextNodeCandidate = aChildNodes[0];
            }
            else if(!oNodeParent || oNodeParent === this){
                //End of list reached.
                
                oNextNodeCandidate = null;
            }
            else{
                oNextNodeCandidate = this.findNextItem(oNodeParent, 1, true);
            }
        }
        else{
            oNextNodeCandidate = aParentChildren[iNodeIndex];
            if(!bSkipChildren){
                if(iDir < 0){
                    var aChildNodes = oNextNodeCandidate.getItems();
                    
                    while(oNextNodeCandidate.getExpanded() && aChildNodes.length){
                        oNextNodeCandidate = aChildNodes[aChildNodes.length - 1];
                        aChildNodes = oNextNodeCandidate.getItems();
                    }
                    
                }
                else{
                    var aChildNodes = oNode.getItems();
                    
                    oNextNodeCandidate = oNode.getExpanded() && aChildNodes.length ? aChildNodes[0] : oNextNodeCandidate;
                }
            }
        }
        
      //Skip item if unavailable
        if(oNextNodeCandidate && !oNextNodeCandidate.isAvailable()){
            oNextNodeCandidate = this.findNextItem(oNextNodeCandidate, iDir, bSkipChildren);
        }
        
        return oNextNodeCandidate;
    };
    
    /**
     * Returns the aria role.
     * @return {string} - The aria role.
     */
    Trait.getAriaRole = function(){
        return "tree";
    };
    
    var Delegate = {};
    
    Delegate.onBeforeRendering = function(oEvent){
        this.$().off("scroll");
    };
    
    Delegate.onAfterRendering = function(oEvent){
        var _this = this;
        this.$().on("scroll", function(){
            if(winui5Lib.TreeScrollX.Scroll !== _this.getScrollX()){
                this.scrollLeft = 0;
            }
        });
    };
    
    /**
     * @class
     * Class that provides methods to add drag support to items and containers.
     * @alias pks.winui5.ListNavigationSupport
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @public
     */
    var TreeNavigationSupport = {};
    
    TreeNavigationSupport.addMetadata = function(oMetadata, bIsElement){
       
        
    };
    
    TreeNavigationSupport.addMethods = function(oProto, bIsElement){
        oProto.determineItemLevel = Trait.determineItemLevel;
        
        oProto.determineItemLength = Trait.determineItemLength;
        
        oProto.determineItemPosition = Trait.determineItemPosition;
        
        oProto.findNextItem = Trait.findNextItem;
        
        oProto.getAriaRole = Trait.getAriaRole;
    };
    
    TreeNavigationSupport.onInit = function(oInstance){
        oInstance.addEventDelegate(Delegate, oInstance);
        
        oInstance.attachNavigate(function(oEvent){ 
            var sKeyCode = oEvent.getParameter("keyCode");
            
            if(sKeyCode === KeyCodes.ARROW_LEFT
               || sKeyCode === KeyCodes.ARROW_RIGHT){
                
                var oNode = this.getActiveItem();
                
                if(!oNode || !oNode.getDomRef()){
                    return;
                }
                
                if(sKeyCode === KeyCodes.ARROW_LEFT){
                      if(oNode && oNode.getEnabled()){
                          this.setNodeExpanded(oNode, false);
                      }
                  }
                  else if(sKeyCode === KeyCodes.ARROW_RIGHT){
                      if(oNode && oNode.getEnabled()){
                          this.setNodeExpanded(oNode, true);
                      }
                  }
            }
            else if(sKeyCode === KeyCodes.ARROW_UP
                || sKeyCode === KeyCodes.ARROW_DOWN){
                 var oNode = this.getActiveItem();
                 
                 if(!oNode || !oNode.getDomRef()){
                     return;
                 }
                 
                 if(sKeyCode === KeyCodes.ARROW_UP){
                     this.navigate(oNode, -1);
                 }
                 else if(sKeyCode === KeyCodes.ARROW_DOWN){
                     this.navigate(oNode, 1);
                 }
             }
            
        });
        
        
    };
    
    TreeNavigationSupport.onExit = function(oInstance){
        this.$().off("scroll");
    };
   
    return TreeNavigationSupport;
});