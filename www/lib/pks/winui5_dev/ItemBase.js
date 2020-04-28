/*
 * 
 * WinUi5
 *
 * pks.winui5.Item
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

sap.ui.define(["./library", "sap/ui/core/Control", "./ElementHelper", "./DragSupport", "./DropSupport"], function(winui5Lib, ControlBase, ElementHelper, DragSupport, DropSupport){
	
	"use strict";
	
	var oMetadata = {
			interfaces : ["pks.ui5.IItem", "pks.ui5.ISelectableItem", "pks.ui5.IExpandableItem", "pks.ui5.IDraggableItem", "pks.ui5.IDropZone"],

			library : "pks.winui5",
			
			properties : {
				/*
				 * START pks.ui5.IItem
				 */
				
				/**
				 * Indicates whether the file is enabled.
				 */
				enabled : {
					type: "boolean", 
					defaultValue : true
				},
				
				/**
                 * Indicates whether the file is enabled.
                 */
				hidden : {
                    type: "boolean", 
                    defaultValue : false
                },
                
				/*
				 * END pks.ui5.IItem
				 */
				
				/*
				 * START pks.ui5.ISelectableItem
				 */
				
				/**
				 * Indicates whether the file is selected.
				 */
				selected : {
					type: "boolean", 
					defaultValue : false
				},
				
				/**
				 * Indicates whether the file can be selected.
				 */
				selectable : {
					type: "boolean", 
					defaultValue : true
				},
				
				/*
				 * END pks.ui5.ISelectableItem
				 */
				
				/*
				 * START pks.ui5.IExpandableItem
				 */
				
				/**
				 * Indicates whether the item is expanded.
				 */
				expanded : {
					type: "boolean", 
					defaultValue : false
				},
				
				/*
				 * END pks.ui5.IExpandableItem
				 */
			},
			
			aggregations : {
				/*
				 * START pks.ui5.IExpandableItem
				 */
				
				/**
				 * Child files to be displayed in a sub tree beyond this file.
				 */
		    	items : {
		    		type : "pks.winui5.ItemBase", 
		    		multiple : true, 
		    		singularName : "item"
		    	}
			
				/*
				 * START pks.ui5.IExpandableItem
				 */
			},
			
			events : {
			   
			},
			
			defaultAggregation : "items"
		};
	
	//Add drag support for draggable items
	DragSupport.addMetadata(oMetadata, true);
	
	//Add metadata needed for drop support
	DropSupport.addMetadata(oMetadata, true);
	
	/**
	 * Constructor for a new Item instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating items.
	 * @extends sap.ui.core.Element
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.8-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.winui5.Item
	 * 
	 */
	var Item = ControlBase.extend("pks.winui5.ItemBase", /** @lends pks.winui5.Item.prototype */ { 
		metadata : oMetadata,
		renderer: null
	}),
	/**
	 * @alias pks.winui5.Item.prototype
	 */
	ItemProto = Item.prototype;
	
	/*
	 * START apply helpers
	 */
	
	/**
	 * Returns the style prefix for this control
	 * 
	 * @return {string} - The style class prefix
	 */
	Item.getStylePrefix = function(){
		return "winui5Item";
	};
	
	ElementHelper.addHelpers(Item);
	
	//Add drag support for draggable items.
	DragSupport.addMethods(ItemProto, true);
	
	//Add drop support for drop zones
	DropSupport.addMethods(ItemProto, true);
	
	/*
	 * END apply helpers
	 */
	
	/*
	 * START Lifecycle
	 */
	
	/**
	 * Called when the element is destroyed.
	 * 
	 * @protected
	 * @override
	 */
	ItemProto.destroy = function(){
		var oContainer = this.getItemContainer();
		
		oContainer && oContainer.onDisableItem(this);
		
		jQuery(this.getSubDomRef("item")).off("mousedown").off("mouseenter").off("mouseleave");
		
		ControlBase.prototype.destroy.call(this);
	};
	
	ItemProto.onBeforeRendering = function(oEvent){
	    jQuery(this.getSubDomRef("item")).off("mousedown").off("mouseenter").off("mouseleave");
    };
    
    ItemProto.onAfterRendering = function(oEvent){
        var _this = this,
            $item = jQuery(this.getSubDomRef("item"));
        
        $item.on("mousedown", function(ev){
            //Needed to suppress mouse selection
            ev.setMark("winui5Item-onmousedown", true);
        });
        
        $item.on("mouseenter", function(){
            _this.getItemContainer().firePointerEnter({ "item" : _this });
        });
        
        $item.on("mouseleave", function(){
            _this.getItemContainer().firePointerLeave({ "item" : _this });
        });
    };
    
    ItemProto.onfocusin = function(){
    	if(sap.ui.Device.browser.msie){
    		//Workaround for Internet Explorer. 
    		//If you press an item in IE, the focus of the container is lost.
    		//So we need to put it back to the item container. 
	    	var oItemContainer = this.getItemContainer();
	    	if(oItemContainer){
	    		oItemContainer.focus();
	    	}
    	}
    };
	
	/*
	 * END Lifecycle
	 */
	
	/*
	 * START pks.ui5.IItem
	 */
    
    /**
     * Returns the reference to the container that owns this file.
     * 
     * @return {pks.winui5.ItemContainer} The container that owns this file.
     * 
     * @public
     */
    ItemProto.getItemContainer = function(){
        var oParent = this.getParent(),
            oItemContainer = oParent;
        
        if(!oParent){
            oItemContainer = null;
        }
        else if(oParent instanceof Item){
            oItemContainer = oParent.getItemContainer();
        }
        else if(!oParent.getMetadata().isInstanceOf("pks.ui5.IItemContainer")){
            throw new Error("Item must be inside an item container.");
        }
        
        return oItemContainer;
    };
    
    /**
     * Returns whether this item is a group header.
     */
    ItemProto.isGroupHeader = function(){
        return this.m_bGroupHeader;
    };
    
    /**
	 * Sets the enabled state of this file.
	 *
	 * @param {boolean} sNewEnabled - The new selected state.
	 * @param {boolean} bSuppressInvalidate - Whether to invalidate the element.
	 * 
	 * @return {pks.winui5.Item} The reference to this element for method chaining.
	 * 
	 * @public
	 * @override
	 */
	ItemProto.setEnabled = function(bNewEnabled, bSuppressInvalidate){
		if(this.getDomRef()){
			this.setProperty("enabled", bNewEnabled, true);
			
			var $item = this.$(),
				bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility();
			
			$item.toggleClass(Item.createStyleFlag("enabled", "True"), bNewEnabled)
			     .toggleClass(Item.createStyleFlag("enabled", "False"), !bNewEnabled);
			
			if(bAccessibility){
				$item.attr("aria-disabled", bNewEnabled ? "false" : "true");
			}
		}
		else{
			this.setProperty("enabled", bNewEnabled, bSuppressInvalidate);
		}
		
		if(!bNewEnabled){
		    var oContainer = this.getItemContainer();
	        
	        oContainer && oContainer.onDisableItem(this);
		}
		
		return this;
	};
	
	/**
     * Sets the hidden state of this file.
     *
     * @param {boolean} bNewSelected - The new selected state.
     * @param {boolean} bSuppressInvalidate - Whether to invalidate the element.
     * 
     * @return {pks.winui5.Item} The reference to this element for method chaining.
     * 
     * @public
     * @override
     */
    ItemProto.setHidden = function(bNewHidden, bSuppressInvalidate){
        this.setProperty("hidden", bNewHidden, true);
        
        if(this.getDomRef()){
            var $item = this.$(),
                bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility();
            
            $item
                .toggleClass(Item.createStyleFlag("Hidden"), bNewHidden);
            
            if(bAccessibility){
                $item.attr("aria-hidden", bNewHidden ? "true" : "false");
            }
        }
        
        if(!bNewHidden){
            var oContainer = this.getItemContainer();
            
            oContainer && oContainer.onDisableItem(this);
        }
        
        return this;
    };
    
    /**
     * Returns whether this item is available for actions.
     */
    ItemProto.isAvailable = function(){
        return this.getEnabled() && !this.getHidden() && !this.isGroupHeader();
    };
    
    /*
     * END pks.ui5.IItem
     */
    
    /*
     * START pks.ui5.ISelectableItem
     */
    
    /**
     * Sets the selected state of this file.
     *
     * @param {boolean} bNewSelected - The new selected state.
     * @param {boolean} bSuppressInvalidate - Whether to invalidate the element.
     * 
     * @return {pks.winui5.Item} The reference to this element for method chaining.
     * 
     * @public
     * @override
     */
    ItemProto.setSelected = function(bNewSelected, bSuppressInvalidate){
        if(this.getDomRef()){
            this.setProperty("selected", bNewSelected, true);
            
            var $item = this.$(),
                bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility();
            
            $item
                .toggleClass(Item.createStyleFlag("Selected"), bNewSelected);
            
            if(bAccessibility){
                $item.attr("aria-selected", bNewSelected ? "true" : "false");
            }
        }
        else{
            this.setProperty("selected", bNewSelected, bSuppressInvalidate);
        }
        
        return this;
    };
    
    /**
	 * Sets the selectable state of this file.
	 *
	 * @param {boolean} bNewSelectable - The new selectable state.
	 * @param {boolean} bSuppressInvalidate - Whether to invalidate the element.
	 * 
	 * @return {pks.winui5.Item} The reference to this element for method chaining.
	 * 
	 * @public
	 * @override
	 */
    ItemProto.setSelectable = function(bNewSelectable, bSuppressInvalidate){
		if(this.getDomRef()){
			this.setProperty("selectable", bNewSelectable, true);
			
			this.$().toggleClass(Item.createStyleFlag("selectable", "False"), !bNewSelectable);
		}
		else{
			this.setProperty("selectable", bNewSelectable, bSuppressInvalidate);
		}
		
		return this;
	};
	
	/*
	 * END pks.ui5.ISelectableItem
	 */
	
	/*
	 * START pks.ui5.IExpandableItem
	 */
	
	/**
	 * Sets the expanded state of this file.
	 *
	 * @param {boolean} bNewExpanded - The new expanded state.
	 * @param {boolean} bSuppressInvalidate - Whether to invalidate the element.
	 * 
	 * @return {pks.winui5.Item} The reference to this element for method chaining.
	 * 
	 * @public
	 * @override
	 */
	ItemProto.setExpanded = function(bNewExpanded, bSuppressInvalidate){
		if(this.getDomRef()){
			this.setProperty("expanded", bNewExpanded, true);
			
			if(this.getItems().length){
				var $item = this.$(),
				    oContainer = this.getItemContainer(),
					bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility();
				
				$item.toggleClass(Item.createStyleFlag("Expanded"), bNewExpanded);
				
				if(bAccessibility){
					$item.attr("aria-expanded", bNewExpanded ? "true" : "false");
					
					this.getSubDomRef("children").setAttribute("aria-hidden", bNewExpanded ? "false" : "true");
				}
				
				winui5Lib.updateIcon(this.getSubDomRef("expandIcon"), bNewExpanded 
                        ? oContainer.getIconCollapse() 
                                : oContainer.getIconExpand());
				
			}
		}
		else{
			this.setProperty("expanded", bNewExpanded, bSuppressInvalidate);
		}
		
		return this;
	};
	
	/**
	 * Removes the specified item.
	 * 
	 * @param {pks.winui5.Item} oItem - The file to remove
	 * @param {boolean} bSuppressInvalidate - Whether to invalidate this element.
	 * 
	 * @return {pks.winui5.Item} The removed file or null.
	 */
	ItemProto.removeItem = function(oItem, bSuppressInvalidate){
		var oContainer = this.getItemContainer();
		
		oContainer && oContainer.onDisableItem(oItem);
		
		return ControlBase.prototype.removeAggregation.call(this, "items", oItem, bSuppressInvalidate);
	};
	
	/**
	 * Removes all children items.
	 * 
	 * @param {boolean} bSuppressInvalidate - Whether to invalidate this element.
	 * 
	 */
	ItemProto.removeAllItems = function(bSuppressInvalidate){
		var oContainer = this.getItemContainer(),
			aChildren = this.getItems();
		
		if(oContainer){
			for(var i = 0; i < aChildren.length; i++){
				oContainer.onDisableItem(aChildren[i]);
			}
		}
		
		ControlBase.prototype.removeAllAggregation.call(this, "items", bSuppressInvalidate);
	};
	
	/**
	 * Checks whether this file contains the specified file.
	 * 
	 * @param {pks.winui5.Item} oItem - The file to check.
	 * 
	 * @return {boolean} Whether this file contains the specified file.
	 * 
	 * @public
	 */
	ItemProto.containsItem = function(oItem){
		var aChildren = this.getItems();
		
		for(var i = 0; i < aChildren.length; i++){
			if(oItem === aChildren[i]){
				return true;
			}
			
			if(aChildren[i].containsItem(oItem)){
				return true;
			}
		}
		
		return false;
	};
	
	/*
	 * END pks.ui5.IExpandableItem
	 */

	ItemProto._getHtmlTitle = function(){
		return this.getTooltip_AsString();
	};
	
	//Return Constructor
	return Item;
});