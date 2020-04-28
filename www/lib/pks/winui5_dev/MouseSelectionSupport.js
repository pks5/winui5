/*
 * 
 * WinUi5
 *
 * pks.winui5.MouseSelectionSupport
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

sap.ui.define(["./library", "./ItemContainerBase"], function(winui5Lib, ItemContainer){
    
    "use strict";
    
    var MouseSelectionSupport = {},
        Delegate = {}
    
    /**
     * Triggered when the user presses the mouse button down.
     * 
     * @param {sap.ui.base.Event} oEvent - The ui5 event object.
     */
    Delegate.onmousedown = function(oEvent){
        if(oEvent.which !== 1
            || !this.getMouseSelectionEnabled()
            || oEvent.isMarked("winui5Item-onmousedown")
            || this.getSelectionMode() !== winui5Lib.SelectionMode.Multiple 
                || (window.TouchEvent && (oEvent.originalEvent instanceof window.TouchEvent))){
            //Event is made by a touch device - ignore
            return;
        }
        
        this.m_iSelectionLeft = oEvent.clientX;
        this.m_iSelectionTop = oEvent.clientY;
        this._bSuppressClick = false;
        this.m_aLastSelection = this.getSelection();
        
        this.$().on("mousemove", jQuery.proxy(Delegate.onmousemove, this))
                .on("mouseleave", jQuery.proxy(Delegate.onmouseup, this))
                .addClass(ItemContainer.createStyleFlag("Selecting"))
                ;
        
        
    };
    
    /**
     * Triggered when the user moves the mouse with pressed mouse button.
     */
    Delegate.onmousemove = function(oEvent){
        if(oEvent.which !== 1 || !this.m_iSelectionLeft){
            return;
        }
        
        var iLeft2 = oEvent.clientX,
            iTop2 = oEvent.clientY,
            iMinX = Math.min(this.m_iSelectionLeft, iLeft2),
            iMinY = Math.min(this.m_iSelectionTop, iTop2),
            iWidth = Math.abs(iLeft2 - this.m_iSelectionLeft),
            iHeight = Math.abs(iTop2 - this.m_iSelectionTop),
            aRectItems = [];
        
        if(iWidth >= 10 || iHeight >= 10){
            this.findItemsInRect(this, { left: iMinX, top: iMinY, right: iMinX + iWidth, bottom: iMinY + iHeight}, aRectItems);
        
            if(this.m_bCtrlKeyHold){
            	var aSelect = [],
            		aSelect = winui5Lib.arrayIntersect(aRectItems, this.m_aLastSelection, true);
            	
            	//,
            	//	aDeselect = winui5Lib.arrayIntersect(aRectItems, this.m_aLastSelection);
            	
            	this.setSelection(aSelect);
            	
            	//this.removeSelection(aDeselect);
            }
            else{
            	this.setSelection(aRectItems);
            }
            
            if(aRectItems.length){
               // this.setActiveItem(aRectItems[0], { suppressSelection : true });
            }
            
            this._bSuppressClick = true;
        }
        
        jQuery(this.m_elSelection).css({
            left : iMinX + "px",
            top : iMinY + "px",
            width : iWidth + "px",
            height : iHeight + "px",
            display: "block"
        });
        
        //console.log(oEvent.clientX, oEvent.clientY);
    };
    
    /**
     * Triggered when the user releases the mouse button.
     */
    Delegate.onmouseup = function(oEvent){
        if(oEvent.which !== 1 || !this.m_iSelectionLeft){
            return;
        }
        
        this.m_iSelectionLeft = null;
        this.m_iSelectionTop = null;
        this.m_aLastSelection = null;
        
        this.$().off("mousemove").off("mouseleave")
        .removeClass(ItemContainer.createStyleFlag("Selecting"));
        
        this.m_elSelection.style.display = "none";
    };
    
    //ItemContainerProto.onmouseout = ItemContainerProto.onmouseup; 
    
    /*
    ItemContainerProto.ontouchleave = function(oEvent){
        this.m_iSelectionLeft = null;
        this.m_iSelectionTop = null;
        
        jQuery("#" + this.createSubId("selection")).css({
            display : 'none'
        });
    };
    */
    
    MouseSelectionSupport.addMetadata = function(oMetadata, bIsElement){
        oMetadata.properties.mouseSelectionEnabled = {
                type : "boolean"
        };
        
    };
    
    MouseSelectionSupport.addMethods = function(oProto, bIsElement){
        
    };
    
    MouseSelectionSupport.onInit = function(oInstance){
      //Start Selection
        var elSelection = document.createElement("div");
        elSelection.className = ItemContainer.createStyleClass("selection");
        elSelection.tabindex = -1;
        
        oInstance.m_elSelection = elSelection;
        
        sap.ui.getCore().getStaticAreaRef().appendChild(elSelection);
        //End selection
        
        oInstance.addEventDelegate(Delegate, oInstance);
    };
    
    MouseSelectionSupport.onExit = function(oInstance){
        if(oInstance.m_elSelection && this.m_elSelection){
            //Selection
            oInstance.m_elSelection.parentNode.removeChild(this.m_elSelection);
            oInstance.m_elSelection = null;
        }
    };
    
    return MouseSelectionSupport;
    
});