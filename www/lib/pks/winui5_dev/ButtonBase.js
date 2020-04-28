/*
 * 
 * WinUi5
 *
 * pks.winui5.ButtonBase
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

sap.ui.define(["./library", "sap/ui/core/Control", "./ElementHelper", "./SizeSupport"], function(winui5Lib, ControlBase, ElementHelper, SizeSupport){
    
    "use strict";
    
    var oMetadata = {
            library : "pks.winui5",
            
            properties : {

                
                enabled : {
                    type : "boolean",
                    defaultValue : true
                },
                
                selected : {
                    type : "boolean"
                },
                
                selectable : {
                    type : "boolean",
                    defaultValue : false
                }
                
            },
            
            events : {
                press : {
                    
                }
            }
        };
    
    SizeSupport.addMetadata(oMetadata);
    
    /**
     * Constructor for a new MenuItem instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating menu items.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias pks.winui5.ButtonBase
     * 
     */
    var ButtonBase = ControlBase.extend("pks.winui5.ButtonBase", /** @lends pks.winui5.ButtonBase.prototype */ { 
        metadata : oMetadata,
        renderer:null
    
    }),
    /**
     * @alias pks.winui5.ButtonBase.prototype
     */
    ButtonBaseProto = ButtonBase.prototype;
    
    /*
     * START apply helpers
     */
    
    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    ButtonBase.getStylePrefix = function(){
        return "winui5ButBas";
    };
    
    /**
     * Returns the additional style class(es) for this control.
     * 
     * @return {string} - The additional style classes.
     */
    ButtonBaseProto.getAdditionalStyleClass = function(){
        return SizeSupport.createSizeStyleClass(ButtonBase, this);
    };
    
    
    
    //Add the helpers
    ElementHelper.addHelpers(ButtonBase);
    
    /*
     * END apply helpers
     */
    
    ButtonBaseProto.onclick = function(oEvent){
        if(this.getEnabled()){
            
            this.firePress();
        }
    };
    
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
    ButtonBaseProto.setSelected = function(bNewSelected, bSuppressInvalidate){
        if(this.getDomRef()){
            this.setProperty("selected", bNewSelected, true);
            
            var $item = this.$(),
                bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility();
            
            $item
                .toggleClass(ButtonBase.createStyleFlag("Selected"), bNewSelected);
            
            if(bAccessibility){
                $item.attr("aria-selected", bNewSelected ? "true" : "false");
            }
        }
        else{
            this.setProperty("selected", bNewSelected, bSuppressInvalidate);
        }
        
        return this;
    };

    ButtonBaseProto._getHtmlTitle = function(){
		return this.getTooltip_AsString();
	};
    
    //Return Constructor
    return ButtonBase;
});