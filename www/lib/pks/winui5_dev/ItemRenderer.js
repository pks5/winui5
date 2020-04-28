/*
 * 
 * WinUi5
 *
 * pks.winui5.ItemRenderer
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
sap.ui.define(['jquery.sap.global', "./library", "./ItemBase"], function(jQuery, winui5Lib, ItemBase) {
	
	"use strict";
	
	var ItemRenderer = {},
	    bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility();
	
	/**
	 * Renders the head of the item.
	 * 
	 * @param {sap.ui.core.RenderManager} rm - The render manager
	 * @param {pks.winui5.ItemBase} oItem - The item to render.
	 * @param {string} sStyle - Custom css style for the root node.
	 */
	ItemRenderer.startRender = function(rm, oItem, oContainer, sClasses){
		var bExpanded = oItem.getExpanded(),
            bSelected = oItem.getSelected(),
            bEnabled = oItem.getEnabled(),
            aSubNodes = oItem.getItems(),
            bTreeBinding = oContainer.isTreeBinding("items");
		
		//Node
		rm.write("<li");
		
		rm.writeControlData(oItem);
		
		rm.addClass(oItem.createStyleClass());
		
		if(bExpanded && aSubNodes.length){
			rm.addClass(ItemBase.createStyleFlag("Expanded"));
		}
		
		if(bSelected){
			rm.addClass(ItemBase.createStyleFlag("Selected"));
		}
		
		if(!oItem.getSelectable()){
			rm.addClass(ItemBase.createStyleFlag("selectable", "False"));
		}
		
		if(oItem.getHidden()){
            rm.addClass(ItemBase.createStyleFlag("Hidden"));
        }
		
		rm.addClass(ItemBase.createStyleFlag("enabled", bEnabled ? "True" : "False"));
        
		if(oItem === oContainer.getActiveItem()){
			rm.addClass(ItemBase.createStyleFlag("Active"));
		}
		
		if(sClasses){
			rm.addClass(sClasses);
		}
	    
		rm.writeClasses();
		
		rm.writeAttribute("role", bTreeBinding ? "treeitem" : "listitem");
		
		if(bAccessibility){
			if(bTreeBinding){
				rm.writeAttribute("aria-expanded", bExpanded ? "true" : "false");
			}
			
			rm.writeAttribute("aria-selected", bSelected ? "true" : "false");
			
			rm.writeAttribute("aria-disabled", bEnabled ? "false" : "true");
		}
		
	    //Tooltip
		//rm.writeAttributeEscaped("title", oItem.getTooltip_AsString());
	
		rm.write(">");
	};
	
	/**
     * Renders the head of the inner item.
     * 
     * @param {sap.ui.core.RenderManager} rm - The render manager
     * @param {pks.winui5.ItemBase} oItem - The item to render.
     * @param {string} sItemStyle - Custom style.
     * @param {string} sItemTitle - title to show in native tooltip.
     */
    ItemRenderer.startRenderItem = function(rm, oItem, oContainer, sItemStyle){
        var sItemTitle = oItem._getHtmlTitle();
        //START item
        rm.write('<div id="' + oItem.createSubId("item") + '"');
        rm.addClass(ItemBase.createStyleClass("item"));
        rm.writeClasses();
        
        if(sItemStyle){
            rm.writeAttribute("style", sItemStyle);
        }
        
        if(sItemTitle){
            rm.writeAttributeEscaped("title", sItemTitle);
        }
        
        rm.write(">");  
    };
    
    /**
     * Renders the head of item content.
     * 
     * @param {sap.ui.core.RenderManager} rm - The render manager
     * @param {pks.winui5.ItemBase} oItem - The item to render.
     */
    ItemRenderer.startRenderItemContent = function(rm, oItem, oContainer){
        //START itemContent
        rm.write("<div class='" + ItemBase.createStyleClass("itemContent") + "'");
        
        if(oContainer.getDragEnabled() && oItem.getDraggable()){
            rm.writeAttribute("draggable", "true");
        }
        
        rm.write(">");
    };
    
    /**
    * Renders the expand icon.
    * 
    * @param {sap.ui.core.RenderManager} rm - The render manager
    * @param {pks.winui5.ItemBase} oItem - The item to render.
    */
    ItemRenderer.renderExpandIcon = function(rm, oItem, oContainer, sStyle){
        //Render expand icon
        rm.write(
                winui5Lib.createIcon(oItem.getExpanded() 
                ? oContainer.getIconCollapse() 
                        : oContainer.getIconExpand(), ItemBase.createStyleClass("expandIcon"), oItem.createSubId("expandIcon"), sStyle));
    };
	
	/**
     * Renders the children.
     * 
     * @param {sap.ui.core.RenderManager} rm - The render manager
     * @param {pks.winui5.ItemBase} oItem - The item to render.
     * @param {string} sChildrenStyle - A string with css style to be added to the children node of the item.
     */
    ItemRenderer.renderChildren = function(rm, oItem, oContainer, sChildrenStyle){
        var aSubNodes = oItem.getItems(),
            bExpanded = oItem.getExpanded();
        
        if(aSubNodes.length){
            rm.write('<ul role="group" id="' + oItem.createSubId("children") + '"');
            
            if(bAccessibility){
                rm.writeAttribute("aria-hidden", bExpanded ? "false" : "true");
            }
            
            rm.addClass(ItemBase.createStyleClass("items"));
            rm.writeClasses();
            
            if(sChildrenStyle){
                rm.writeAttribute("style", sChildrenStyle);
            }
            
            rm.write(">");
            
            for(var i = 0; i<aSubNodes.length; i++){
                rm.renderControl(aSubNodes[i]);
            }
            
            rm.write("</ul>");
        }
    };
    
    /**
    * Renders the checkbox.
    * 
    * @param {sap.ui.core.RenderManager} rm - The render manager
    * @param {pks.winui5.ItemBase} oItem - The item to render.
    */
    ItemRenderer.renderCheckbox = function(rm, oItem, oContainer){
        if(oItem.getSelectable() && oContainer.isCheckboxRendered()){
            //Checkbox
            rm.write("<div class='" + ItemBase.createStyleClass("checkbox") + "' aria-hidden='true'>");
            rm.write("<div class='" + ItemBase.createStyleClass("checkboxFrame") + "'>");
            rm.write(winui5Lib.createIcon(oContainer.getIconCheckmark(), ItemBase.createStyleClass("checkboxMark")));
            rm.write("</div></div>");
        }
    };
    
    /**
    * Renders the tail of item content.
    * 
    * @param {sap.ui.core.RenderManager} rm - The render manager
    * @param {pks.winui5.ItemBase} oItem - The item to render.
    */
    ItemRenderer.endRenderItemContent = function(rm, oItem, oContainer){
        rm.write("</div>"); //END itemContent
    };
    
    /**
     * Renders the tail of the inner item.
     * 
     * @param {sap.ui.core.RenderManager} rm - The render manager
     * @param {pks.winui5.ItemBase} oItem - The item to render.
     */
    ItemRenderer.endRenderItem = function(rm, oItem, oContainer){
        rm.write("</div>"); //END item
    };
	
	/**
	 * Renders the tail of the item.
	 * 
     * @param {sap.ui.core.RenderManager} rm - The render manager
     * @param {pks.winui5.Item} oItem - The item to render.
     */
	ItemRenderer.endRender = function(rm, oItem, oContainer){
		rm.write("</li>"); //END ROOT
	};
	
	//Return Renderer
	return ItemRenderer;
}, true);