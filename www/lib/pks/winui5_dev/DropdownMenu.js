/*
 * 
 * WinUi5
 *
 * pks.winui5.DropdownMenu
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

sap.ui.define(['./library', "./MenuBase", "./ElementHelper", "./ListNavigationSupport", "sap/ui/events/KeyCodes"], function(winui5Lib, MenuBase, ElementHelper, ListNavigationSupport, KeyCodes){
	
	"use strict";
	
	var oMetadata = {
			library : "pks.winui5",
			
			properties : {
			    //TODO
                activateAction : {
                    type : "pks.winui5.ActivateAction",
                    defaultValue : winui5Lib.ActivateAction.None
                },
                
                selectionMode : {
                    type : "pks.winui5.SelectionMode",
                    defaultValue : winui5Lib.SelectionMode.Multiple
                },
                
                iconCollapse : {
                    type : "sap.ui.core.URI",
                    defaultValue : "sap-icon://navigation-right-arrow"
                }
			},
			
			associations : {
			    parentMenu : {
			        type : "pks.winui5.MenuBase"
			    }
			},
			
			events : {
			    
			}
		};
	ListNavigationSupport.addMetadata(oMetadata);
	
	/**
	 * Constructor for a new DropdownMenu instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating menus.
	 * @extends pks.winui5.MenuBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.8-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.winui5.DropdownMenu
	 * 
	 */
	var DropdownMenu = MenuBase.extend("pks.winui5.DropdownMenu", /** @lends pks.winui5.DropdownMenu.prototype */ { 
		metadata : oMetadata,
		
		renderer : "pks.winui5.ItemContainerRenderer"
	
	}),
	/**
	 * @alias pks.winui5.DropdownMenu.prototype
	 */
	DropdownMenuProto = DropdownMenu.prototype;
	
	/*
	 * START apply helpers
	 */
	
	/**
	 * Returns the style prefix for this control.
	 * 
	 * @return {string} The style prefix of this control.
	 */
	DropdownMenu.getStylePrefix = function(){
		return "winui5DroMen";
	};
	
	/**
	 * Returns the additional style class(es) for this control.
	 * 
	 * @return {string} - The additional style classes.
	 */
	DropdownMenuProto.getAdditionalStyleClass = function(){
		return MenuBase.prototype.getAdditionalStyleClass.call(this) + " " + MenuBase.getStylePrefix();
	};
	
	//Add element helpers
	ElementHelper.addHelpers(DropdownMenu);
	ListNavigationSupport.addMethods(DropdownMenuProto);
	
	/*
	 * END apply helpers
	 */
	
	DropdownMenuProto.init = function(){
	    MenuBase.prototype.init.call(this);
	    
	    //Menu Hover
        this.attachPointerEnter(function(oEvent){
            var oItem = oEvent.getParameter("item"),
                oParentItem = oItem.getParent(),
                aSiblings = oParentItem.getItems();
            
            for(var i = 0; i < aSiblings.length; i++){
                if(oItem === aSiblings[i] && oItem.getItems().length){
                	oItem.setExpanded(true);
                	
                    var mPos = oItem.getDomRef().getBoundingClientRect(),
                        elChildren = oItem.getSubDomRef("children"),
                        mPosChild = elChildren.getBoundingClientRect(),
                        iChildX = mPos.right,
                        iChildY = mPos.top;
                    
                    if(iChildX + mPosChild.width > window.innerWidth){
                    	iChildX = mPos.left - mPosChild.width;
                    }
                    
                    elChildren.style.left = iChildX + "px";
                    elChildren.style.top = iChildY + "px";
                    
                }
                else{
                    aSiblings[i].setExpanded(false);
                }
            }
        });
        
        //Menu Select
        //TODO
        this.attachPress(function(oEvent){ 
            jQuery.sap.log.info("e");
            
            var oDialog = this.getParent();
            var _this = this;
            
            /*
            for(var i = 0; i < _this.getItems().length; i++){
                console.log(_this.getItems()[i].getSelected());
            }
            */
            
            setTimeout(function(){
                oDialog.close(winui5Lib.OverlayCloseReason.Submit);
            }, 50);
            
        });
        
        ListNavigationSupport.onInit(this);
	};
	
	DropdownMenuProto.exit = function(){
	    MenuBase.prototype.exit.call(this);
	    
	    ListNavigationSupport.onExit(this);
	};
	
	/**
     * Returns whether the given aggregation uses tree binding.
     * 
     * @param {string} sName - The aggregation name.
     * 
     * @return {boolean} Whether to use tree binding for the given aggregation.
     * 
     * @protected
     * @override
     */
	DropdownMenuProto.isTreeBinding = function(sName) {
        return (sName == "items");
    };
    
    DropdownMenuProto.setParentMenu = function(vParentMenu, bSuppressInvalidate){
        var vPreviousParentMenu = this.getParentMenu();
        
        this.setAssociation("parentMenu", vParentMenu, true);
        
        if(vPreviousParentMenu && vParentMenu !== vPreviousParentMenu){
            
        }
        
        if(vParentMenu && vParentMenu !== vPreviousParentMenu){
            this.attachNavigate(function(oEvent){ 
                var sKeyCode = oEvent.getParameter("keyCode");
                
                if(sKeyCode === KeyCodes.ARROW_LEFT
                || sKeyCode === KeyCodes.ARROW_RIGHT){
                    //Navigate the top menu when dropdown is focused and left/right is pressed.
                    //TODO Handle sub menus
                    var oParentMenu = sap.ui.getCore().byId(vParentMenu),
                        oNode = oParentMenu.getActiveItem(),
                        iStep = 1;
                    
                    if(!oNode || !oNode.getDomRef()){
                        return;
                    }
                    
                    if(oParentMenu.getLayout() === "HorizontalList"){
                        var sKeyCode = oEvent.getParameter("keyCode");
                        
                        if(sKeyCode === KeyCodes.ARROW_LEFT){
                            oParentMenu.navigate(oNode, -1);
                        }
                        else if(sKeyCode === KeyCodes.ARROW_RIGHT){
                            oParentMenu.navigate(oNode, 1); console.log(oNode, oParentMenu.getLayout());
                        }
                    }
                    
                    //TODO
                }
            });
        }
        
        return this;
    };
    
	/**
	 * Returns the aria role. Overrides abstract method <em>ItemContainer.prototype.getAriaRole</em>
	 * 
	 * @return {string} - The aria role.
	 * @override
	 */
	DropdownMenuProto.getAriaRole = function(){
		return "listbox";
	};
	
	DropdownMenuProto.getLayout = function(){
        return "VerticalList";
    };
    
    DropdownMenuProto.isCheckboxRendered = function(){
        return true;
    };
	
	return DropdownMenu;
	
});