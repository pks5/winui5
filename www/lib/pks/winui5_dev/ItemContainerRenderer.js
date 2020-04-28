/*
 * 
 * WinUi5
 *
 * pks.winui5.ItemContainerRenderer
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
sap.ui.define(['jquery.sap.global', "./library", "./ItemContainerBase"], function(jQuery, winui5Lib, ItemContainer) {
	
	"use strict";
	
	var ItemContainerRenderer = {};
	
	/**
     * Renders the file list.
     */
	ItemContainerRenderer.render = function(rm, oItemContainer) {
        this.startRender(rm, oItemContainer);
        
        this.renderChildren(rm, oItemContainer);
        
        this.endRender(rm, oItemContainer);
    };
    
	/**
	 * Renders the tree.
	 */
	ItemContainerRenderer.startRender = function(rm, oContainer, sClasses) {
		var bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility(),
			aItems = oContainer.getItems(),
			sWidth = oContainer.getWidth(),
			sHeight = oContainer.getHeight(),
			sSelectionMode = oContainer.getSelectionMode();
		
		rm.write('<div tabindex="0"');
	    
		rm.writeControlData(oContainer);
	    
		rm.addClass(oContainer.createStyleClass());
	    
		//Selection Mode
		rm.addClass(ItemContainer.createStyleFlag("selectionMode", sSelectionMode));
		
		//View Mode
		oContainer.getViewMode && rm.addClass(oContainer.createStyleFlag("viewMode", oContainer.getViewMode()));
		
		//Checkbox Flag
        //TODO
        if(oContainer.isCheckboxRendered()){
            rm.addClass(ItemContainer.createStyleFlag("Checkbox"));
        }
		
		//Additional Classes
		if(sClasses){
            rm.addClass(sClasses);
        }
		
		rm.writeClasses();
	    
		//Width
        if(sWidth){
	    	rm.addStyle("width", sWidth);
	    }
	    
	    //Height
	    if(sHeight){
	    	rm.addStyle("height", sHeight);
	    }
	    
	    rm.writeStyles();
	    
	    //ARIA attributes
	    if(bAccessibility){
	    	rm.writeAttribute("role", oContainer.getAriaRole());
	    	
	    	if(sSelectionMode === winui5Lib.SelectionMode.Multiple){
	    		rm.writeAttribute("aria-multiselectable", "true");
	    	}
	    }
	    
	    rm.write(">");

	    
	    /*
	    rm.write('<div id="' + oContainer.createSubId("inner") + '"');
	    rm.addClass(ItemContainer.createStyleClass("inner"));
	    rm.writeClasses();
	    rm.write(">");
	    */
	};
	
	/**
     * Renders the tree.
     */
    ItemContainerRenderer.renderChildren = function(rm, oContainer, sChildrenStyle) {
        var bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility(),
            aItems = oContainer.getItems(),
            bTreeBinding = oContainer.isTreeBinding("items");
        
        rm.write('<ul id="' + oContainer.createSubId("children") + '"');
        
        rm.addClass(ItemContainer.createStyleClass("items"));
        rm.writeClasses();
        
        if(sChildrenStyle){
            rm.writeAttribute("style", sChildrenStyle);
        }
        
        rm.write(">");
        
        for(var i=0;i<aItems.length;i++){
            rm.renderControl(aItems[i]);
        }
    
        rm.write("</ul>");
    };
    
    /**
     * Renders the tree.
     */
    ItemContainerRenderer.endRender = function(rm, oContainer) {
        /*
        rm.write("</div>"); //End Inner
        */
        
        rm.write("</div>"); //End Tree
    };
	
	//Return Renderer
	return ItemContainerRenderer;
}, true);