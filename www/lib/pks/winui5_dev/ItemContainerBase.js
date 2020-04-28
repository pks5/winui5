/*
 * 
 * WinUi5
 *
 * pks.winui5.ItemContainer
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

sap.ui.define(['./library', 'sap/ui/core/Control', "sap/ui/Device", './ItemBase', "./ElementHelper", "./DragSupport", "./DropSupport", "./SizeSupport", "sap/ui/events/KeyCodes", "./GroupHeaderItem"], function(winui5Lib, ControlBase, Device, Item, ElementHelper, DragSupport, DropSupport, SizeSupport, KeyCodes, GroupHeaderItem){
	
	"use strict";
	
	var oMetadata = {
			interfaces : ["pks.ui5.IItemContainer", "pks.ui5.ISelectionProvider", "pks.ui5.IDraggableItemContainer"],
			
			library : "pks.winui5",
			
			properties : {
				/**
				 * Defines the selection mode.
				 */
				selectionMode : {
					type : "pks.winui5.SelectionMode",
					defaultValue : winui5Lib.SelectionMode.None
				},
				
				activateAction : {
				    type : "pks.winui5.ActivateAction",
				    defaultValue : winui5Lib.ActivateAction.Select
				},
				
				keyModifiersEnabled : {
				    type : "boolean"
				},
				
				iconCheckmark : {
				    type : "sap.ui.core.URI",
				    defaultValue : "sap-icon://accept"
				},
				
				iconExpand : {
                    type : "sap.ui.core.URI",
                    defaultValue : "sap-icon://navigation-right-arrow"
                },
                
                iconCollapse : {
                    type : "sap.ui.core.URI",
                    defaultValue : "sap-icon://navigation-down-arrow"
                },
				
				/**
				 * Defines the width of the control. If the width is not defined, the default width is taken from the theme.
				 */
				width : {
					type : "sap.ui.core.CSSSize"
				},
				
				/**
				 * Defines the height of the control. If the height is not defined, the default height is taken from the theme.
				 */
				height : {
					type : "sap.ui.core.CSSSize"
				},
				
				secondaryPressEnabled : {
				    type : "boolean"
				}
			},
			
			aggregations : {
				/**
				 * Items to be shown in the root level of the file tree.
				 */
		    	items : {
		    		type : "pks.winui5.ItemBase", 
		    		multiple : true, 
		    		singularName : "item", 
		    		bindable : "bindable"
		    	}
			},
			
			defaultAggregation : "items",
			
			events : {
				/**
				 * Triggered when the selection changes.
				 */
				selectionChange : {},
				
				/**
				 * Triggered when the colection changes.
				 */
				itemsChange : {},
				
				/**
				 * Triggered when the control is clicked or tapped, the space key or the enter key is pressed while an item is active.
				 */
				press : {},
				
				/**
				 * Triggered when the control is double clicked.
				 */
				doublePress : {},
				
				/**
				 * Triggered when the mouse enters an item.
				 */
				pointerEnter : {},
	            
				/**
				 * Triggered when the mouse enters an item.
				 */
	            pointerLeave : {},
	            
	            /**
	             * Triggered when up/down arrow key is pressed.
	             */
	            navigate : {}
			}
		};
	
	ElementHelper.addMetadata(oMetadata);
	
	//Add drag support for containers
	DragSupport.addMetadata(oMetadata);
	
	//Add drop support for containers
	DropSupport.addMetadata(oMetadata);
	
	SizeSupport.addMetadata(oMetadata);
    
    /**
	 * Constructor for a new ItemContainer instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Base class for file containers.
	 * @extends sap.ui.core.Control
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.8-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.winui5.ItemContainerBase
	 * 
	 */
	var ItemContainer = ControlBase.extend("pks.winui5.ItemContainerBase", /** @lends pks.winui5.ItemContainerBase.prototype */{ 
		metadata : oMetadata
	}),
	/**
	 * @alias pks.winui5.ItemContainerBase.prototype
	 */
	ItemContainerProto = ItemContainer.prototype;
	
	/**
	 * Returns the style prefix for this control.
	 * 
	 * @return {string} The style prefix of this control.
	 */
	ItemContainer.getStylePrefix = function(){
		return "winui5IteConBas";
	};
	
	/**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    ItemContainerProto.getAdditionalStyleClass = function(){
        return SizeSupport.createSizeStyleClass(ItemContainer, this);
    };
    
    
	
	//Add element helpers
	ElementHelper.addHelpers(ItemContainer, true);
	
	//Add methods needed for drag support
	DragSupport.addMethods(ItemContainerProto);
	
	//Add methods needed for drop support.
	DropSupport.addMethods(ItemContainerProto);
	
	/*
	 * START Lifecycle
	 */
	
	ItemContainerProto.init = function(){
		var _this = this;
	    this.m_fnContextListener = function(oEvent){
	          //We need to suppress browser default context menu
    	      oEvent.preventDefault();
    	        
    	      //We have no srcControl provided. We need to find it out by ourselves.
              _this.triggerPress({
                  origin : winui5Lib.PressOrigin.SecondaryPress,
                  target : oEvent.target, 
                  clientX : oEvent.clientX,
                  clientY : oEvent.clientY
              })
        };
	};
	
	/**
	 * Called when the control is destroyed.
	 * 
	 * TODO use destroy instead to keep exit clean for sub classes?
	 * 
	 * @override
	 * @protected
	 */
	ItemContainerProto.exit = function(){
		this._scrollTop = null;
		
		this.m_oActiveItem = null;
		
		this.m_oStartItem = null;
		
		//TODO Must we remove the listener too?
		this.m_fnContextListener = null;
	};
	
	/**
	 * Triggered when this control gains the focus.
	 * 
	 * @protected
	 * @override
	 */
	ItemContainerProto.onfocusin = function(){
		if(!this.m_oActiveItem){
		    var oAvailableItem = this.getFirstAvailableItem();
		    
		    if(oAvailableItem){
    		    this.m_oActiveItem = oAvailableItem;
    			this.m_bSilentActiveItem = true;
		    }
		}
	};
	
	/**
	 * Triggered before rendering.
	 * 
	 * @override
	 * @protected
	 */
	ItemContainerProto.onBeforeRendering = function(){
		var elDomRef = this.getDomRef();
		
		if(elDomRef){
			if(!this._scrollTop){
				this._scrollTop = { 
						mode : "rerender",
						value : elDomRef.scrollTop
				};
			}
			
			elDomRef.removeEventListener("contextmenu", this.m_fnContextListener);
		}
		
		//this.$().off("mousemove");
		
		/*
		this.m_mRenderingInfo = {
            accessibility = sap.ui.getCore().getConfiguration().getAccessibility(),
            container = this,
            treeBinding = this.isTreeBinding("items")   
        };
        */
	};
	
	/**
	 * Triggered after rendering.
	 * 
	 * @protected
	 * @override
	 */
	ItemContainerProto.onAfterRendering = function(){
	    var elDomRef = this.getDomRef();
	    
	    if(this._scrollTop){
			if(this._scrollTop.mode === "rerender"){
				elDomRef.scrollTop = this._scrollTop.value;
			}
			else if(this._scrollTop.mode === "node"){
				//Scroll Top Value is top position of item.
				this.scrollToItem(this._scrollTop.node);
			}
			this._scrollTop = null;
		}
		
	    if(this.getSecondaryPressEnabled()){
	        elDomRef.addEventListener("contextmenu", this.m_fnContextListener);
	    }
	    
		//TODO Still needed?
		//this.$().on("mousemove", jQuery.proxy(this.onmousemove, this));
		
		if(this.m_iItemsChangeLength){
		    this.m_iItemsChangeLength = 0;
		    this.fireItemsChange();
	    }
		
		jQuery.sap.log.info(this.getId() + " rendered.");
	};
	
	/*
	 * END Lifecycle
	 */
	
	ItemContainerProto.addItemGroup = function(oGroup, oHeader, bSuppressInvalidate) {
        oHeader = oHeader || new GroupHeaderItem({
            title: oGroup.text || oGroup.key
        });

        oHeader.m_bGroupHeader = true;
        
        this.addAggregation("items", oHeader, bSuppressInvalidate);
        
        return oHeader;
    };

    ItemContainerProto.removeGroupHeaders = function(bSuppressInvalidate) {
        var aItems = this.getItems();
        
        for(var i = 0; i < aItems.length; i++){
            var oItem = aItems[i];
            if (oItem.isGroupHeader()) {
                oItem.destroy(bSuppressInvalidate);
            }
        };
    };
	
	/*
	 * START Setter override
	 */
	
	/**
     * Sets the activation mode. No rerendering required for this property.
     * 
     * @param {winui5.ActivateAction} sActivateAction - The new activation mode.
     * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation.
     * 
     * @return {pks.winui5.ItemContainer} - Reference to this for method chaining.
     */
    ItemContainerProto.setActivateAction = function(sActivateAction, bSuppressInvalidate){
        this.setProperty("activateAction", sActivateAction, true);
        
        return this;
    };
	
	/**
	 * Sets the viewModeProperty.
	 * 
	 * @param {string} sViewMode - The new viewMode
	 * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation
	 * @param {object} ViewMode - The view mode options.
	 * 
	 * @return {pks.winui5.ItemContainer} - Reference to this for method chaining.
	 */
	ItemContainerProto.setViewMode = function(sViewMode, bSuppressInvalidate, ViewMode){
		var elDomRef = this.getDomRef();
		if(elDomRef){
			this.setProperty("viewMode", sViewMode, true);
			
			var sClassesToRemove = "";
			
			for(var sFlag in ViewMode){
				sClassesToRemove += " " + this.createStyleFlag("viewMode", sFlag);
			}
			
			jQuery(elDomRef)
				.removeClass(sClassesToRemove)
				.addClass(this.createStyleFlag("viewMode", sViewMode));
		}
		else{
			this.setProperty("viewMode", sViewMode, bSuppressInvalidate);
		}
		
		return this;
	};
	
	/**
	 * Sets the selection mode.
	 * 
	 * @param {pks.winui5.SelectionMode} sSelectionMode - The new selection mode.
	 * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation.
	 * 
	 * @return {pks.winui5.ItemContainer} Reference to the control for method chaining.
	 * 
	 * @public
	 * @override
	 */
	ItemContainerProto.setSelectionMode = function(sSelectionMode, bSuppressInvalidate){
		var elDomRef = this.getDomRef();
		if(elDomRef){
		    return this.updateSelectionMode(elDomRef, sSelectionMode);
		}
		
		this.setProperty("selectionMode", sSelectionMode, bSuppressInvalidate);
		
		return this;
	};
	
	ItemContainerProto.updateSelectionMode = function(elDomRef, sSelectionMode){
	    this.setProperty("selectionMode", sSelectionMode, true);
	    
	    var sClassesToRemove = "",
            sClassesToAdd = ItemContainer.createStyleFlag("selectionMode", sSelectionMode);
        
        for(var sFlag in winui5Lib.SelectionMode){
            if(sFlag !== sSelectionMode){
                sClassesToRemove += " " + ItemContainer.createStyleFlag("selectionMode", sFlag);
            }
        }
        
        jQuery(elDomRef)
            .removeClass(sClassesToRemove)
            .addClass(sClassesToAdd);
    
        return this;
	};
	
	/**
	 * Returns whether the checkbox is viisble.
	 * 
	 * @return {boolean} Whether the checkbox is visible.
	 */
	ItemContainerProto.isCheckboxRendered = function(){
		return false;
	};
	
	/**
	 * Sets the width.
	 * 
	 * @param {sap.ui.core.CSSSize} sWidth - The new width.
	 * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation.
	 * 
	 * @return {pks.winui5.ItemContainer} Reference to the control for method chaining.
	 * 
	 * @public
	 * @override
	 */
	ItemContainerProto.setWidth = function(sWidth, bSuppressInvalidate){
		var elDomRef = this.getDomRef();
		if(elDomRef){
			this.setProperty("width", sWidth, true);
			
			jQuery(elDomRef).css("width", sWidth);
		}
		else{
			this.setProperty("width", sWidth, bSuppressInvalidate);
		}
		
		return this;
	}
	
	/**
	 * Sets the height.
	 * 
	 * @param {sap.ui.core.CSSSize} sHeight - The new height.
	 * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation.
	 * 
	 * @return {pks.winui5.ItemContainer} Reference to the control for method chaining.
	 * 
	 * @public
	 * @override
	 */
	ItemContainerProto.setHeight = function(sHeight, bSuppressInvalidate){
		var elDomRef = this.getDomRef();
		if(elDomRef){
			this.setProperty("height", sHeight, true);
			
			jQuery(elDomRef).css("height", sHeight);
		}
		else{
			this.setProperty("height", sHeight, bSuppressInvalidate);
		}
		
		return this;
	};
	
	
	
	/*
	 * END Setter override
	 */
	
	/*
	 * START Event handling
	 */
	
	/**
	 * The handler for key press events.
	 * 
	 * @param {sap.ui.base.Event} oEvent - The ui5 event object.
	 * 
	 * @protected
	 * @override
	 */
	ItemContainerProto.onkeypress = function(oEvent){
		if(oEvent.keyCode === KeyCodes.SPACE){
			//We don't want the default behaviour of the space bar within this control.
			oEvent.preventDefault();
		}
	};
	
	/**
	 * The handler for key down events.
	 * 
	 * @param {sap.ui.base.Event} oEvent - The ui5 event object.
	 * 
	 * @protected
	 * @override
	 */
	ItemContainerProto.onkeydown = function(oEvent){
	    var bKeyModifiersEnabled = this.getKeyModifiersEnabled();
	    
	    if(bKeyModifiersEnabled){
    		if(oEvent.ctrlKey){
    			this.m_bCtrlKeyHold = true;
    		}
    		
    		if(oEvent.shiftKey){
    			this.m_bShiftKeyHold = true;
    			
    			if(!this.m_oStartItem){
    				this.m_oStartItem = this.m_oActiveItem;
    			}
    		}
	    }
		
		var sKeyCode = oEvent.keyCode;
		
          if(sKeyCode === KeyCodes.ARROW_LEFT
             || sKeyCode === KeyCodes.ARROW_RIGHT
             || sKeyCode === KeyCodes.ARROW_UP
             || sKeyCode === KeyCodes.ARROW_DOWN){
              
              //Prevent browser scrolling
              //Needed?
              oEvent.preventDefault();
              
              if(bKeyModifiersEnabled){
                  //We need to disable propagation, cause ctrl + left/right scrolls horizontally
                  //TODO is there a better way without stopPropagation?
                  oEvent.stopPropagation();
              }
              
              this.fireNavigate({
                  keyCode : sKeyCode,
                  ctrlKey : oEvent.ctrlKey,
                  shiftKey : oEvent.shiftKey
              });
          }
          
	};
	
	/**
	 * The handler for key up events.
	 * 
	 * @param {sap.ui.base.Event} oEvent - The ui5 event object.
	 * 
	 * @protected
	 * @override
	 */
	ItemContainerProto.onkeyup = function(oEvent){
		if(!this.getDomRef()){
			return;
		}
		
		if(!oEvent.ctrlKey){
			this.m_bCtrlKeyHold = false;
		}
		
		if(!oEvent.shiftKey){
			this.m_bShiftKeyHold = false;
			
			this.m_oStartItem = null;
		}
		
		var oItem = this.m_oActiveItem;
		
		if(oItem && oItem.getDomRef()){
			if(oEvent.keyCode === KeyCodes.SPACE){
				//Select item with space bar.
			    //TODO needed?
				oEvent.preventDefault();
				
				var sSelectionMode = this.getSelectionMode(),
					sDefaultSelectionGroup = this.getDefaultSelectionGroup();
				
				this.pressItem(oItem, {
	                origin : winui5Lib.PressOrigin.SpaceKey
	            });
			}
			else if(oEvent.keyCode === KeyCodes.ENTER){
				//Trigger press event with enter key.
			    //TODO needed?
				oEvent.preventDefault();
				
				this.pressItem(oItem, {
				    origin : winui5Lib.PressOrigin.EnterKey
                });
			}
		}
	};
	
	/**
	 * Determines the items that are within the current rentangle selection.
	 * 
	 * @param {pks.winui5.Item} oParentItem - The parent item.
	 * @param {object} mRect1 - The rectagle selection.
	 * @param {pks.winui5.Item[]} aRectItems - The items in selection.
	 */
	ItemContainerProto.findItemsInRect = function(oParentItem, mRect1, aRectItems){
		var aChildItems = oParentItem.getItems();
		for(var i = 0; i < aChildItems.length; i++){
			var oItem = aChildItems[i];
			
			var mRect2 = oItem.getSubDomRef("item").getBoundingClientRect();
			
			if(mRect2.right >= mRect1.left 
				&& mRect2.bottom >= mRect1.top
				&& mRect1.right >= mRect2.left
				&& mRect1.bottom >= mRect2.top){
				
				aRectItems.push(oItem);
			}
			
			if(oItem.getExpanded()){
				this.findItemsInRect(oItem, mRect1, aRectItems);
			}
		}
	};
	
	
	
	/**
	 * Finds the src control by searching the dom tree. This is required if the srcControl property is not set within events.
	 * 
	 * @protected
	 */
	ItemContainerProto.findClosestItemByDomRef = function($target){
		var i = 0;
		
		while(i < 10){
			if($target.hasClass(Item.getStylePrefix())){
				return sap.ui.getCore().byId($target[0].id);
			}
			
			$target = $target.parent();
			i++;
		}
		
		return null;
	};
	
	/**
	 * Triggered when a click event occurs. This can be a left-mouse click, tap or context menu event.
	 * 
	 * @protected
	 */
	ItemContainerProto.triggerPress = function(mOptions){
		if(this._bSuppressClick){
			this._bSuppressClick = false;
			return;
		}
		
		var oItem,
			bExpandIconPressed = false,
            bCheckboxPressed = false,
            bRootElementPressed = false;
		
		//Target Item is provided by UI5 as event property.
		if(mOptions.srcControl){
            oItem = this.findClosestItem(mOptions.srcControl);
        }
		
		if(mOptions.target){
    		var $target = jQuery(mOptions.target);
		    
		    bRootElementPressed = $target.hasClass(Item.getStylePrefix());
            bExpandIconPressed = $target.hasClass(Item.createStyleClass("expandIcon"));
            bCheckboxPressed = $target.hasClass(Item.createStyleClass("checkboxMark")) 
                || $target.hasClass(Item.createStyleClass("checkboxFrame"))
                || $target.hasClass(Item.createStyleClass("checkbox"));
            
            if(!oItem){
                //We have to find the item by dom reference.
                //Slow!!!
                oItem = this.findClosestItemByDomRef($target);
            }
		}
		
		var mPressParams = {
            origin : mOptions.origin,
            rootElementPressed : bRootElementPressed,
            expandIconPressed : bExpandIconPressed,
            checkboxPressed : bCheckboxPressed
        };
		
		if(mOptions.clientX){
            mPressParams.clientX = mOptions.clientX; 
            mPressParams.clientY = mOptions.clientY;
        }
		
		return this.pressItem(
	        oItem, 
	        mPressParams
		);
	};
	
	ItemContainerProto.pressItem = function(oItem, mOptions){
	  //TODO add parameter where the press came from
        var sOrigin = mOptions.origin,
        	mPressParams = {
	            origin : sOrigin
	        };
        
        if(mOptions.clientX){
            mPressParams.clientX = mOptions.clientX; 
            mPressParams.clientY = mOptions.clientY;
        }
        
        if(oItem){
            //Item has been pressed
            
            if(mOptions.rootElementPressed){
                //Root element has been pressed. Ignore that.
                //TODO Make better?
                return;
            }
            
            //Set highlighted node
            if(oItem.isAvailable()){
            
                if(mOptions.expandIconPressed){
                    //Toggle expanded state
                    //TODO Move away?
                    this.setNodeExpanded(oItem, !oItem.getExpanded());
                }
                else{
                    var sSelectionMode = this.getSelectionMode(),
                    	sActivateAction = this.getActivateAction(),
                                    
                            bCtrlKeyHold = this.m_bCtrlKeyHold,
                            bShiftKeyHold = this.m_bShiftKeyHold,
                            
                            bDirectSelection = true,
                            	/*
                            		!(sOrigin === winui5Lib.PressOrigin.SpaceKey
                                	|| sOrigin === winui5Lib.PressOrigin.EnterKey) || (winui5Lib.ActivateAction.Select !== this.getActivateAction()),
                            */
                            bSuppressSelection = false,//!mOptions.checkboxPressed && !bDirectSelection && !bCtrlKeyHold && !bShiftKeyHold, 
                            
                            bToggleSelection =  mOptions.checkboxPressed //Checkbox has been pressed (only for clicks)
                                                || winui5Lib.ActivateAction.None === sActivateAction
                                                || (winui5Lib.ActivateAction.Toggle === sActivateAction && this.isItemSelected(oItem, this.getDefaultSelectionGroup()))
                                                || (!bShiftKeyHold && bCtrlKeyHold), //CTRL is hold without shift
                                                
                            //Windows behaviour: if a checkbox is pressed while shift key is hold, the shift key is ignored.                    
                            bFromStartItem = !mOptions.checkboxPressed && bShiftKeyHold && !bCtrlKeyHold;
                                
                    if(bFromStartItem && sOrigin === winui5Lib.PressOrigin.SecondaryPress){
                          //We need to manually set back the shift state, because once you did a right click, the shift release is not recognized.
						  //TODO Why does this happen?
                    	  bFromStartItem = false;
                    	
                    	  this.m_bShiftKeyHold = false;
						  this.m_oStartItem = null;
                    }
                    
                    if( (sOrigin === winui5Lib.PressOrigin.SecondaryPress
                    	|| sOrigin === winui5Lib.PressOrigin.PointerEnter)
                    	&& this.isItemSelected(oItem, this.getDefaultSelectionGroup())){
                    	//For right click and pointer enter, do not deselect the item.
                    	bSuppressSelection = true;
                    }
                                                
                    //console.log(oItem, "mode: " + sSelectionMode, "ctrl: " + bCtrlKeyHold, "shift: " + bShiftKeyHold, "supress_sel: " + bSuppressSelection, "toggle_sel: " + bToggleSelection)
                    
                    //Perform activation and selection
                    this.setActiveItem(
                        oItem, 
                        {
                            suppressSelection : bSuppressSelection, //Whether to suppress selection
                            toggleSelection : bToggleSelection, //Whether to toggle the selection
                            fromStartItem : bFromStartItem //startSelection
                        }
                    );
                    
                    mPressParams[this.getDefaultItemEventParameter()] = oItem;
                }
            }
        }
        else{
            //Container itself has been pressed
            
            jQuery.sap.log.info("No item selected. Clearing selection.");
                
            this.clearSelection();
        }
        
        this.firePress(mPressParams);
        
        return oItem;
	};
	
	/**
	 * Handler for tap / click events (desktop & mobile).
	 * 
	 * @param {sap.ui.base.Event} oEvent - The ui5 event object.
	 * 
	 * @protected
	 */
	ItemContainerProto.onclick = function(oEvent){  //[Device.support.touch && !Device.system.desktop ? "ontap" : "onclick"] 
		this.triggerPress({
		    origin : winui5Lib.PressOrigin.PrimaryPress,
		    srcControl : oEvent.srcControl, 
		    target : oEvent.target,
		    clientX : oEvent.clientX,
		    clientY : oEvent.clientY
		});
	};
	
	/**
	 * Handler for double-click (only desktop).
	 * 
	 * @protected
	 */
	ItemContainerProto.ondblclick = function(oEvent){ //[Device.support.touch && !Device.system.desktop ? "ontap" : "onclick"] 
		var oItem = this.findClosestItem(oEvent.srcControl),
		    mParams = {
    		    target : oEvent.target,
                clientX : oEvent.clientX,
                clientY : oEvent.clientY,
                srControl : oEvent.srcControl
		    };
		
		if(oItem){
		    mParams[this.getDefaultItemEventParameter()] = oItem;
		}
		
		this.fireDoublePress(mParams);
	};
		
	/*
	 * END Event handling
	 */
	
	/*
	 * START NodeSelectionProvider Base
	 */
	
	/**
	 * Changes the selection.
	 * 
	 * @param {pks.ui5.ISelectableItem} oParentItem - The item container that should be tested.
	 * @param {object} mChanges - The map with changes to populate.
	 * @param {pks.ui5.ISelectableItem[]} aSelectedItems - Array with items to select.
	 * @param {string} sMode - The change mode.
	 * @param {string} sSelectionGroup - The selection group.
	 * @param {boolean} bRecursive - Whether the children of the given item should be checked too.
	 * 
	 * @protected
	 */
	ItemContainerProto.changeChildSelection = function(oParentItem, mChanges, aSelectedItems, sMode, sSelectionGroup, bRecursive){
		var aChildNodes = this.getSelectionGroupItems(oParentItem, sSelectionGroup);
		
		for(var i = 0; i < aChildNodes.length; i++){
			var oNode = aChildNodes[i];
			
			//Only available nodes can be selected
			if(oNode.isAvailable()){
				
			    //TODO Verify selectable behaviour
				if(this.isItemSelectable(oNode, sSelectionGroup)){
					
					mChanges.tested.push(oNode);
					
					var bItemSelected = this.isItemSelected(oNode, sSelectionGroup);
					
					if("ALL" === aSelectedItems || -1 !== jQuery.inArray(oNode, aSelectedItems)){
						//Item is subject to select / deselect
						if("replace" === sMode || "add" === sMode){
							if(!bItemSelected){
								mChanges.selected.push(oNode);
								mChanges.changed.push(oNode);
								
								this.setItemSelected(oNode, true, sSelectionGroup);
							}
							else{
								mChanges.unchanged.push(oNode);
							}
						}
						else if("remove" === sMode){
							if(bItemSelected){
								mChanges.deselected.push(oNode);
								mChanges.changed.push(oNode);
								
								this.setItemSelected(oNode, false, sSelectionGroup);
							}
							else{
								mChanges.unchanged.push(oNode);
							}
						}
						else if("toggle" === sMode){
							if(!bItemSelected){
								mChanges.selected.push(oNode);
							}
							else{
								mChanges.deselected.push(oNode);
							}
							
							mChanges.changed.push(oNode);
							
							this.setItemSelected(oNode, !bItemSelected, sSelectionGroup);
						}
					}
					else{
						//Item is no subject to select / deselect
						if("replace" === sMode){
							if(bItemSelected){
								mChanges.deselected.push(oNode);
								mChanges.changed.push(oNode);
								
								this.setItemSelected(oNode, false, sSelectionGroup);
							}
							else{
								mChanges.unchanged.push(oNode);
							}
						}
						else if("add" === sMode || "remove" === sMode || "toggle" === sMode){
							mChanges.unchanged.push(oNode);
						}
					}
					
				
				} //END isSelectable
				
				//If the node is expanded, check children nodes.
				if(bRecursive && oNode.getExpanded()){
					this.changeChildSelection(oNode, mChanges, aSelectedItems, sMode, sSelectionGroup, bRecursive);
				}
			} //END getEnabled
		} //END for
	};
	
	/**
	 * Changes the selection in the children of the specified node.
	 * 
	 * @param {pks.ui5.ISelectableItem} oStartNode - The node which children should be tested.
	 * @param {pks.ui5.ISelectableItem[]} aSelectedItems - Array with nodes to select.
	 * @param {string} sMode - The change mode.
	 * @param {string} sSelectionGroup - The selection group.
	 * @param {boolean} bRecursive - Whether the children of the given item should be checked too.
	 * @param {boolean} bSuppressChangeEvent - Whether the selectionChange event should be suppressed.
	 * 
	 * @return {object} An object with information about all changes made to the selection.
	 * 
	 * @protected
	 */
	ItemContainerProto.changeSelection = function(oStartNode, aSelectedItems, sMode, sSelectionGroup, bSuppressChangeEvent){
		
		var mChanges = {
				"tested" : [],
				"selected" : [],
				"deselected" : [],
				"changed" : [],
				"unchanged" : [],
				"selection" : []
			};
		
		if("ALL" !== aSelectedItems && !jQuery.isArray(aSelectedItems)){
			aSelectedItems = [aSelectedItems];
		}
		
		this.changeChildSelection(oStartNode, mChanges, aSelectedItems, sMode, sSelectionGroup, this.isTreeBinding("items"));
		
		if(mChanges.changed.length && !bSuppressChangeEvent){
			var mParameters = {};
			mParameters[sSelectionGroup] = mChanges;
			this.fireSelectionChange(mParameters);
		}
		
		return mChanges;
	};
	
	/**
	 * Collects an array of selected nodes.
	 * 
	 * @param {pks.ui5.ISelectableItem} oStartNode - The node which children should be tested.
	 * @param {pks.ui5.ISelectableItem[]} aSelectedItems - Array with nodes to select.
	 * @param {string} sSelectionGroup - The selection group.
	 * @param {boolean} bRecursive - Whether the children of the given item should be checked too.
	 * 
	 * @protected
	 */
	ItemContainerProto.collectSelection = function(oStartNode, aSelectedItems, sSelectionGroup, bRecursive){
		var aChildNodes = this.getSelectionGroupItems(oStartNode, sSelectionGroup);
		
		for(var i = 0; i < aChildNodes.length; i++){
			var oNode = aChildNodes[i];
			
			//TODO do we want to collect disabled selected items, too?
			if(oNode.isAvailable() && this.isItemSelected(oNode, sSelectionGroup)){
				aSelectedItems.push(oNode);
			}
			
			if(bRecursive){
				this.collectSelection(oNode, aSelectedItems, sSelectionGroup, bRecursive);
			}
		}
	};
	
	/**
	 * Returns the default selection group.
	 * 
	 * @return {string} The default selection group.
	 * 
	 * @protected
	 * 
	 */
	ItemContainerProto.getDefaultSelectionGroup = function(){
		return "selectedItems";
	};
	
	/**
	 * Returns the default event parameter that holds the reference to the subject item.
	 * 
	 * @return {string} The name of the event parameter.
	 * 
	 * @protected
	 */
	ItemContainerProto.getDefaultItemEventParameter = function(){
		return "item";
	};
	
	/**
	 * Defines how to get items for the given selectionGroup.
	 * 
	 * @param {pks.winui5.Item} oNode - The node to test.
	 * @param {string} sSelectionGroup - The selection group.
	 * 
	 * @return {pks.ui5.Item[]} An array with files.
	 * 
	 * @protected
	 * @override
	 */
	ItemContainerProto.getSelectionGroupItems = function(oNode, sSelectionGroup){
	    //var aItems = [];
	    
		return sSelectionGroup === this.getDefaultSelectionGroup() ? oNode.getItems() : [];
	};
	
	/**
	 * Defines how to decide whether an item is selected within the given selectionGroup.
	 * 
	 * @param {pks.ui5.ISelectableItem} oNode - The node to test.
	 * @param {string} sSelectionGroup - The selection group.
	 * 
	 * @return {boolean} Whether the given node is selected.
	 * 
	 * @protected
	 */
	ItemContainerProto.isItemSelected = function(oNode, sSelectionGroup){
		return sSelectionGroup === this.getDefaultSelectionGroup() ? oNode.getSelected() : false;
	};
	
	/**
	 * Defines how to decide whether an item is selectable within the given selectionGroup.
	 *
	 * @param {pks.ui5.ISelectableItem} oNode - The node to test.
	 * @param {string} sSelectionGroup - The selection group.
	 * 
	 * @return {boolean} Whether the given node is selectable.
	 * 
	 * @protected
	 */
	 //TODO Verify selectable behaviour
	 ItemContainerProto.isItemSelectable = function(oNode, sSelectionGroup){
		 return sSelectionGroup === this.getDefaultSelectionGroup() ? oNode.getSelectable() : false;
	 };
	
	/**
	 * Defines how to select an item within the given selectionGroup.
	 *
	 * @param {pks.ui5.ISelectableItem} oNode - The node to test.
	 * @param {boolean} bSelected - Whether to select the node.
	 * @param {string} sSelectionGroup - The selection group.
	 * 
	 * @return {pks.winui5.ItemContainer} Reference to this for method chaining.
	 * 
	 * @protected
	 */
	ItemContainerProto.setItemSelected = function(oNode, bSelected, sSelectionGroup){
		if(sSelectionGroup === this.getDefaultSelectionGroup()){
			oNode.setSelected(bSelected);
		}
	};
	
	/*
	 * END NodeSelectionProvider Base
	 */
	
	/*
	 * START SelectionProvider Impl
	 */
	
	/**
	 * Tries to select one or multiple items and returns all changes.
	 *
	 * @param {pks.ui5.ISelectableItem[]} aSelectedItems - Array with nodes to select.
	 * @param {string} sSelectionGroup - The selection group.
	 * @param {boolean} bSuppressChangeEvent - Whether to suppress the selectionChange event.
	 *
	 * @return {object} An object with information about all changes made to the selection.
	 * 
	 * @public
	 * @override
	 */
	ItemContainerProto.setSelection = function(aSelectedItems, sSelectionGroup, bSuppressChangeEvent){
		sSelectionGroup = sSelectionGroup || this.getDefaultSelectionGroup();
		return this.changeSelection(this, aSelectedItems, "replace", sSelectionGroup, bSuppressChangeEvent);
	};
	
	/**
	 * Adds one or multiple items to the selection.
	 *
	 * @param {pks.ui5.ISelectableItem[]} aSelectedItems - Array with nodes to select.
	 * @param {string} sSelectionGroup - The selection group.
	 * @param {boolean} bSuppressChangeEvent - Whether to suppress the selectionChange event.
	 *
	 * @return {object} An object with information about all changes made to the selection.
	 *
	 * @public
	 * @override
	 */
	ItemContainerProto.addSelection = function(aSelectedItems, sSelectionGroup, bSuppressChangeEvent){
		sSelectionGroup = sSelectionGroup || this.getDefaultSelectionGroup();
		return this.changeSelection(this, aSelectedItems, "add", sSelectionGroup, bSuppressChangeEvent);
	};
	
	/**
	 * Removes one or multiple items from the selection.
	 *
	 * @param {pks.ui5.ISelectableItem[]} aSelectedItems - Array with nodes to select.
	 * @param {string} sSelectionGroup - The selection group.
	 * @param {boolean} bSuppressChangeEvent - Whether to suppress the selectionChange event.
	 *
	 * @return {object} An object with information about all changes made to the selection. 
	 * 
	 * @public
	 * @override
	 */
	ItemContainerProto.removeSelection = function(aSelectedItems, sSelectionGroup, bSuppressChangeEvent){
		sSelectionGroup = sSelectionGroup || this.getDefaultSelectionGroup();
		return this.changeSelection(this, aSelectedItems, "remove", sSelectionGroup, bSuppressChangeEvent);
	};
	
	/**
	 * Toggles one or multiple items.
	 *
	 * @param {pks.ui5.ISelectableItem[]} aSelectedItems - Array with nodes to select.
	 * @param {string} sSelectionGroup - The selection group.
	 * @param {boolean} bSuppressChangeEvent - Whether to suppress the selectionChange event.
	 * 
	 * @return {object} An object with information about all changes made to the selection.
	 *  
	 * @public
	 * @override
	 */
	ItemContainerProto.toggleSelection = function(aSelectedItems, sSelectionGroup, bSuppressChangeEvent){
		sSelectionGroup = sSelectionGroup || this.getDefaultSelectionGroup();
		return this.changeSelection(this, aSelectedItems, "toggle", sSelectionGroup, bSuppressChangeEvent);
	};
	
	/**
	 * Clears the selection.
	 * 
	 * @param {string} sSelectionGroup - The selection group.
	 * @param {boolean} bSuppressChangeEvent - Whether to suppress the selectionChange event.
	 *
	 * @return {object} An object with information about all changes made to the selection.
	 * 
	 * @public
	 * @override
	 */
	ItemContainerProto.clearSelection = function(sSelectionGroup, bSuppressChangeEvent){
		sSelectionGroup = sSelectionGroup || this.getDefaultSelectionGroup();
		return this.changeSelection(this, "ALL", "remove", sSelectionGroup, bSuppressChangeEvent);
	};
	
	/**
	 * Returns an array with the current selected items.
	 *
	 * @param {string} sSelectionGroup - The selection group.
	 * 
	 * @return {pks.ui5.ISelectableItem[]} Array with selected nodes.
	 * 
	 * @public
	 * @override
	 */
	ItemContainerProto.getSelection = function(sSelectionGroup){
		var aSelectedItems = [];
		sSelectionGroup = sSelectionGroup || this.getDefaultSelectionGroup();
		this.collectSelection(this, aSelectedItems, sSelectionGroup, this.isTreeBinding("items"));
		
		return aSelectedItems;
	};
	
	/**
	 * Checks whether the given item is part of the current selection.
	 *
	 * @param {pks.ui5.ISelectableItem} oNode - The node to test.
	 * @param {string} sSelectionGroup - The selection group.
	 * 
	 * @return {boolean} Whether the given node is part of the current selection.
	 * 
	 * @public
	 * @override
	 */
	ItemContainerProto.isInSelection = function(oNode, sSelectionGroup){
		return -1 !== jQuery.inArray(oNode, this.getSelection(sSelectionGroup));
	};
	
	/*
	 * END SelectionProvider Impl
	 */
	
	/*
	 * START Helpers
	 */
	
	ItemContainerProto.getFirstAvailableItem = function(){
	    var oAvailableItem = null, 
	        aChildNodes = this.getItems();
        
        if(aChildNodes.length){
            //Invisible active item
            oAvailableItem = aChildNodes[0];
            
            //Skip item if unavailable
            if(oAvailableItem && !oAvailableItem.isAvailable()){
                oAvailableItem = this.findNextItem(oAvailableItem, 1, true);
            }
        }
        
        return oAvailableItem;
	};
	
	/**
	 * Finds the next item in the given direction.
	 * Must be overwritten by sub class.
	 * 
	 * @protected
	 */
	ItemContainerProto.findNextItem = function(oNode, iDir, bSkipChildren){
		throw new Error("Please override ItemContainer.prototype.findNextItem");
	};
	
	/**
	 * Returns the aria role.
	 * Must be overwritten by sub class.
	 * 
	 * @return {string} - The aria role.
	 */
	ItemContainerProto.getAriaRole = function(){
		throw new Error("Please override ItemContainer.prototype.getAriaRole");
	};
	
	/**
	 * Finds the closest parent control of type Item.
	 * 
	 * @param {sap.ui.core.Control} oControl - The control where to start searching.
	 * 
	 * @return {pks.ui5.IItem} The found node.
	 * 
	 * @protected
	 */
	ItemContainerProto.findClosestItem = function(oControl) {
		var iMaxDepth = 10, 
			i = 0;
		
		while (oControl && !(oControl instanceof Item)) {
			if (oControl === this || i >= iMaxDepth) {
				oControl = null;
				
				break;
			}
			
			oControl = oControl.getParent();
			i++;
		}

		return oControl;
	};
	
	/**
	 * Gets the scrollTop value for the given item.
	 * 
	 * @param {object} oDomRef - The dom reference to the tree.
	 * @param {pks.ui5.IItem} oNode - The node to scroll to.
	 * @param {int} iRefScrollTop - The reference scroll top.
	 * 
	 * @return {int} The scrollTop value or -1 for no change.
	 * 
	 * @protected
	 */
	ItemContainerProto.getItemScrollTop = function(oDomRef, oNode, iRefScrollTop){
		var $node = oNode.$(),
			iNodeTop = $node.position().top, //Position relative to the parent
			iNodeBottom = iNodeTop + oNode.getSubDomRef("item").offsetHeight, //Height including border
			iDif = iNodeBottom - oDomRef.clientHeight, //Height without border
			iNewScrollTop = -1;
		
		if(iDif > iRefScrollTop){
			iNewScrollTop = iDif;
		}
		else if(iNodeTop < iRefScrollTop){
			iNewScrollTop = iNodeTop;
		}
		
		return iNewScrollTop;
	}
	
	/**
	 * Scrolls to the given item.
	 * 
	 * @param {pks.ui5.IItem} oNode - The node to scroll to.
	 * @param {pks.ui5.IItem} oPrefNode - The node that should stay visible in any case.
	 * 
	 * @return {pks.winui5.ItemContainer} Reference to this for method chaining.
	 * 
	 * @protected
	 */
	ItemContainerProto.scrollToItem = function(oNode, oPrefNode){
		var oDomRef = this.getDomRef();
		
		if(!oDomRef){
			this._scrollTop = {
				mode : "node",
				node : oNode
			};
		}
		else{	
			var iNewScrollTop = this.getItemScrollTop(oDomRef, oNode, oDomRef.scrollTop);
			
			if(oPrefNode && iNewScrollTop >= 0){
				var iNewScrollTopPref = this.getItemScrollTop(oDomRef, oPrefNode, iNewScrollTop);
				
				if(iNewScrollTopPref >= 0){
					iNewScrollTop = iNewScrollTopPref;
				}
			}
			
			if(iNewScrollTop >= 0){
				oDomRef.scrollTop = iNewScrollTop;
			}
		}
	};
	
	/**
	 * Sets the current item.
	 * 
	 * @param {pks.ui5.ISelectableItem} oNode - The node to set as current node.
	 * @param {boolean} bSuppressSelection - Whether selection should be suppressed. The item is marked as current only.
	 * @param {boolean} bToggleSelection - Whether selection state should be toggled.
	 * @param {boolean} bFromStartItem - Whether multiple items should be selected.
 	 * 
	 * @return {pks.winui5.ItemContainer} Reference to this for method chaining.
	 * 
	 * @public
	 * 
	 */
	ItemContainerProto.setActiveItem = function(oNode, mOptions){
		if(oNode && !oNode.isAvailable()){
		    jQuery.sap.log.warning("Cannot set current item: item is disabled!");
		    return;
		}
		
		if(!mOptions){
		    mOptions = {};
		}
	    
	    var oActiveItem = this.m_oActiveItem,
	        bSuppressSelection = mOptions.suppressSelection, 
	        bToggleSelection = mOptions.toggleSelection, 
	        bFromStartItem = mOptions.fromStartItem;
	    
		if(this.m_bSilentActiveItem || oActiveItem !== oNode){
			this.m_bSilentActiveItem = false;
			
			var bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility();
			
			if(oActiveItem){
			    oActiveItem.$().removeClass(Item.createStyleFlag("Active"));
			}
			
			if(oNode){
				this.m_oActiveItem = oNode;
				
				oNode.$().addClass(Item.createStyleFlag("Active"));
				
				if(bAccessibility){
					this.$().attr("aria-activedescendant", oNode.getId());
				}
				
				this.scrollToItem(oNode);
			}
			else{
				this.m_oActiveItem = null;
				this.$().removeAttr("aria-activedescendant");
			}
		}
		
		if(!bSuppressSelection){ 
		    var sSelectionMode = this.getSelectionMode();
			if(oNode && oNode.getSelectable()){
				var sDefaultSelectionGroup = this.getDefaultSelectionGroup();
				
				if(sSelectionMode === winui5Lib.SelectionMode.Multiple){
					if(bToggleSelection){
						this.toggleSelection(oNode, sDefaultSelectionGroup);
					}
					else{
						if(bFromStartItem){
							//Shift + click, or shift + keyboard navigation
							var aItemsToSelect = this.collectItems(this.m_oStartItem, oNode);
							this.setSelection(aItemsToSelect, sDefaultSelectionGroup);
						}
						else{
							this.setSelection(oNode, sDefaultSelectionGroup);
						}
					}
				}
				else if(winui5Lib.SelectionMode.Single === sSelectionMode){
					if(bToggleSelection && this.isItemSelected(oNode, sDefaultSelectionGroup)){
						this.removeSelection(oNode, sDefaultSelectionGroup);
					}
					else{
						this.setSelection(oNode, sDefaultSelectionGroup);
					}
				}
				
			}
			else if(winui5Lib.SelectionMode.Single === sSelectionMode){
				console.log("Cleared selection cause an unselectable item has been clicked, or active item set to null");
				//TODO Make sense?
				//If only one item can be selected, we need to clear the selection when active item is null.
			    this.clearSelection();
			}
			
		}
		
		return this;
	};
	
	ItemContainerProto.navigate = function(oStartItem, iDirection){
	    //TODO Clear selection when oStartItem === null???
	    var oNextItem = this.findNextItem(oStartItem, iDirection),
    	    bCtrlKeyHold = this.m_bCtrlKeyHold,
            bShiftKeyHold = this.m_bShiftKeyHold,
            bSuppressSelection = !bShiftKeyHold && (bCtrlKeyHold || winui5Lib.ActivateAction.None === this.getActivateAction());
        
	    if(oNextItem){
            this.setActiveItem(oNextItem, {
                suppressSelection : bSuppressSelection, 
                toggleSelection : false, 
                fromStartItem : bShiftKeyHold && !bCtrlKeyHold
            });
        }
        else if(oStartItem){
            //This is needed to select the first item, if no item is selected and first item is current.
            this.setActiveItem(oStartItem, {
                suppressSelection : bSuppressSelection, 
                toggleSelection : false, 
                fromStartItem : bShiftKeyHold && !bCtrlKeyHold
            });
        }
	};
	
	/**
	 * Returns the current item.
	 * 
	 * @return {pks.ui5.IItem} The current item.
	 * 
	 * TODO Rename to getActiveItem
	 */
	ItemContainerProto.getActiveItem = function(){
		return this.m_oActiveItem;
	};
	
	/**
	 * 
	 */
	ItemContainerProto.collectItems = function(oFromItem, oToItem){ 
		if(oFromItem === oToItem){
			return [oFromItem];
		}
		
		var iFromPos = this.determineItemPosition(oFromItem),
			iToPos = this.determineItemPosition(oToItem),
			oPointer,
			oTarget;
		
		if(iFromPos === iToPos){
			//Should never happen
			throw new Error("Invalid state");
		}
		else if(iFromPos < iToPos){
			oPointer = oFromItem;
			oTarget = oToItem;
		}
		else{
			oPointer = oToItem;
			oTarget = oFromItem;
		}
		
		var aItems = [oPointer];
		
		while(oPointer !== oTarget){
			oPointer = this.findNextItem(oPointer, 1);
			if(!oPointer){
				throw new Error("Cannot find target.")
			}
			aItems.push(oPointer);
		}
		
		return aItems;
	};
	
	/**
	 * Determines the position of an item inside the container.
	 * Must be overwritten by sub class.
	 * 
	 * @param {pks.winui5.Item} The item.
	 * @return {int} The item position.
	 */
	ItemContainerProto.determineItemPosition = function(oItem){
		throw new Error("Please override determineItemPosition.");
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
	ItemContainerProto.containsItem = function(oItem){
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
	
	/**
	 * Triggered when an item is removed from the container.
	 * 
	 * @protected
	 */
	ItemContainerProto.onDisableItem = function(oItem){
		var oActiveItem = this.m_oActiveItem,
			oStartItem = this.m_oStartItem;
		
		if(oActiveItem && (oActiveItem === oItem || oItem.containsItem(oActiveItem))){
			oActiveItem.$().removeClass(Item.createStyleFlag("Active"));
			this.m_oActiveItem = null;
		}
		
		if(oStartItem && (oStartItem === oItem || oItem.containsItem(oStartItem))){
			this.m_oStartItem = null;
		}
	};
	
	/**
	 * Adds an item to the container.
	 * 
	 * @param {pks.winui5.Item} oItem - The item to add.
	 * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation.
	 */
	ItemContainerProto.addItem = function(oNode, bSuppressInvalidate){
		var vReturn = ItemContainer.prototype.addAggregation.call(this, "items", oNode, bSuppressInvalidate);
		
		this.m_iItemsChangeLength = this.getItems().length;
		
		return vReturn;
	};
	
	/**
	 * Removes an item from the container.
	 * 
	 * @param {pks.winui5.Item} oItem - The file to remove.
	 * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation.
	 * 
	 * @return {pks.winui5.Item} The removed file or null.
	 */
	ItemContainerProto.removeItem = function(oNode, bSuppressInvalidate){
		this.onDisableItem(oNode);
		
		var vReturn = ItemContainer.prototype.removeAggregation.call(this, "items", oNode, bSuppressInvalidate);
		
		this.m_iItemsChangeLength = this.getItems().length;
		
		return vReturn;
	};
	
	/**
	 * Removes all files from the container.
	 * 
	 * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation.
	 *
	 */
	ItemContainerProto.removeAllItems = function(bSuppressInvalidate){
		this.m_oActiveItem = null;
		this.m_oStartItem = null;
		
		ItemContainer.prototype.removeAllAggregation.call(this, "items", bSuppressInvalidate);
		
		this.m_iItemsChangeLength = this.getItems().length;
	};
	
	
	
	/**
	 * Returns the reference to the item container.
	 * 
	 * @return {pks.winui5.ItemContainer} The reference to this.
	 * 
	 * @public
	 */
	ItemContainerProto.getItemContainer = function(){
		return this;
	};
	
	/*
	 * END Helpers
	 */
	
	//Return Constructor
	return ItemContainer;
});