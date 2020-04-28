/*
 * 
 * WinUi5
 *
 * pks.winui5.ObjectContainerBase
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

sap.ui.define(["./library", "./ItemContainerBase", "./ElementHelper"], function(winui5Lib, ItemContainer, ElementHelper){
	
	"use strict";
	
	var oMetadata = {
			library : "pks.winui5",
			
			properties : {
			    
			    checkboxVisibility : {
                    type : "pks.winui5.CheckboxVisibility",
                    defaultValue : winui5Lib.CheckboxVisibility.HoverMultiple
                }
			}
		};
	
	/**
	 * Constructor for a new MenuItem instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating menu items.
	 * @extends pks.winui5.Item
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.8-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.winui5.MenuItem
	 * 
	 */
	var ObjectContainerBase = ItemContainer.extend("pks.winui5.ObjectContainerBase", /** @lends pks.winui5.ObjectContainerBase.prototype */ { 
		metadata : oMetadata,
		renderer: null
	}),
	/**
	 * @alias pks.winui5.ObjectContainerBase.prototype
	 */
	ObjectContainerBaseProto = ObjectContainerBase.prototype;
	
	/*
	 * START apply helpers
	 */
	
	/**
	 * Returns the style prefix for this control
	 * 
	 * @return {string} - The style class prefix
	 */
	ObjectContainerBase.getStylePrefix = function(){
		return "winui5ObjCon";
	};
	
	/**
	 * Returns the additional style class(es) for this control.
	 * 
	 * @return {string} - The additional style classes.
	 */
	ObjectContainerBaseProto.getAdditionalStyleClass = function(){
	    return ItemContainer.prototype.getAdditionalStyleClass.call(this) 
	        + " " + ItemContainer.getStylePrefix() 
	        + " " + ObjectContainerBase.createStyleFlag("checkboxVisibility", this.getCheckboxVisibility());
	};
	
	//Add the helpers
	ElementHelper.addHelpers(ObjectContainerBase);
	
	/*
	 * END apply helpers
	 */
	
	var fnIsCheckboxRendered = function(sSelectionMode, sCheckboxVisibility){
        var CheckboxVisibility = winui5Lib.CheckboxVisibility;
                
                return sCheckboxVisibility === CheckboxVisibility.Visible
                || sCheckboxVisibility === CheckboxVisibility.Touch
                || sCheckboxVisibility === CheckboxVisibility.Hover
                || (
                        (sCheckboxVisibility === CheckboxVisibility.Multiple
                        || sCheckboxVisibility === CheckboxVisibility.TouchMultiple
                        || sCheckboxVisibility === CheckboxVisibility.HoverMultiple)
                        && sSelectionMode === winui5Lib.SelectionMode.Multiple);
    };
	
	/**
     * Sets the checkbox visibility.
     * 
     * @param {pks.winui5.CheckboxVisibility} sCheckboxVisibility - The new checkbox visibility.
     * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation.
     * 
     * @return {pks.winui5.EntityContainer} Reference to the control for method chaining.
     * 
     * @public
     * @override
     */
	ObjectContainerBaseProto.setCheckboxVIsibility = function(sCheckboxVisibility, bSuppressInvalidate){
        var elDomRef = this.getDomRef();
        if(elDomRef){
            var sPreviousCheckboxVisibility = this.getCheckboxVisibility(),
                sSelectionMode = this.getSelectionMode(),
                CheckboxVisibility = winui5Lib.CheckboxVisibility;
            
            if(fnIsCheckboxRendered(sSelectionMode, sPreviousCheckboxVisibility) 
                    && fnIsCheckboxRendered(sSelectionMode, sCheckboxVisibility)){
            
                this.setProperty("checkboxVisibility", sCheckboxVisibility, true);
                
                var sClassesToRemove = "",
                    sClassesToAdd = ObjectContainerBase.createStyleFlag("checkboxVisibility", sCheckboxVisibility);
                
                for(var sFlag in winui5Lib.CheckboxVisibility){
                    if(sFlag !== sCheckboxVisibility){
                        sClassesToRemove += " " + ObjectContainerBase.createStyleFlag("checkboxVisibility", sFlag);
                    }
                }
                
                jQuery(elDomRef)
                    .removeClass(sClassesToRemove)
                    .addClass(sClassesToAdd);
                
                return this;
            }
            
        }
        
        this.setProperty("checkboxVisibility", sCheckboxVisibility, bSuppressInvalidate);
        
        return this;
    };
    
    
    
    ObjectContainerBaseProto.isCheckboxRendered = function(){
        return fnIsCheckboxRendered(this.getSelectionMode(), this.getCheckboxVisibility());
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
    ObjectContainerBaseProto.setSelectionMode = function(sSelectionMode, bSuppressInvalidate){
        var elDomRef = this.getDomRef();
        if(elDomRef){
            var sPreviousSelectionMode = this.getSelectionMode(),
                sCheckboxVisibility = this.getCheckboxVisibility();
            
            if(fnIsCheckboxRendered(sPreviousSelectionMode, sCheckboxVisibility) 
                && fnIsCheckboxRendered(sSelectionMode, sCheckboxVisibility)){
                
                return this.updateSelectionMode(elDomRef, sSelectionMode);
            }
        }
        
        this.setProperty("selectionMode", sSelectionMode, bSuppressInvalidate);
        
        return this;
    };
    
    //Return Constructor
	return ObjectContainerBase;
});