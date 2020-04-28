/*
 * 
 * WinUi5
 *
 * pks.winui5.TextInput
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

sap.ui.define(['./library', "./InputBase", "./ElementHelper", "./TextInputRenderer", "sap/ui/events/KeyCodes"], function(winui5Lib, InputBase, ElementHelper, TextInputRenderer, KeyCodes){
    
    "use strict";
    
    var oMetadata = {
            library : "pks.winui5",
            
            properties : {
                value : {
                    type : "string",
                    defaultValue : ""
                },

                type : {
                    type : "pks.winui5.TextInputType",
                    defaultValue : pks.winui5.TextInputType.Text
                },
                
                enabled : {
                    type : "boolean",
                    defaultValue : true
                },

                readOnly : {
                    type : "boolean",
                    defaultValue : false
                },
                
                preselected : {
                    type : "boolean",
                    defaultValue : false
                },
                
                placeholder: {
                    type : "string",
                    defaultValue: ""
                    
                },

                liveChangeEnabled: {
                    type : "boolean",
                    defaultValue: false
                }
            },
            events:{
                submit: {

                }
            },
            aggregations : {
                contentBefore : {
                    type : "sap.ui.core.Control",
                    multiple : true
                },
                
                contentAfter : {
                    type : "sap.ui.core.Control",
                    multiple : true
                }
            },
            defaultAggregation : "contentBefore"
    },
    mTypeMapping = {
        "Text": "text",
        "Password": "password"
    };
    
    ElementHelper.addMetadata(oMetadata);
    
    /**
     * Constructor for a new TextInput instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating menus.
     * @extends pks.winui5.ItemContainer
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias pks.winui5.MenuTextInput
     * 
     */
    var TextInput = InputBase.extend("pks.winui5.TextInput", /** @lends pks.winui5.TextInput.prototype */ { 
        metadata : oMetadata,
        renderer: TextInputRenderer
    }),
    /**
     * @alias pks.winui5.TextInput.prototype
     */
    TextInputProto = TextInput.prototype;
    
    /*
     * START apply helpers
     */
    
    /**
     * Returns the style prefix for this control.
     * 
     * @return {string} The style prefix of this control.
     */
    TextInput.getStylePrefix = function(){
        return "winui5TexInp";
    };
    
    //Add element helpers
    ElementHelper.addHelpers(TextInput);
    
    /*
     * END apply helpers
     */

    TextInputProto.onfocusin = function(){
        if(this.getDomRef() && this.getPreselected()){
            this.getSubDomRef("input").select();
        }
    };
    
    TextInputProto.onBeforeRendering = function(oEvent){
        if(this.getDomRef()){
            jQuery(this.getSubDomRef("input")).off("change");
        }
    };
    
    TextInputProto.getInputValue = function(){
        return this.getSubDomRef("input").value;
    };

    TextInputProto.getTypeMapping = function(sType){
        return mTypeMapping[sType];
    };
    
    
    TextInputProto.testChange = function(sChangeType){
        var sOldValue = this.getValue(),
            sNewValue = this.getInputValue();
            
        if(sOldValue !== sNewValue){
            this.setValue(sNewValue, true);
            
            if(sChangeType !== "Submit"){
                this.fireChange({
                    changeType: sChangeType
                });
            }
        }

        if(sChangeType === "Submit"){
            this.fireSubmit();
        }
    };
    
    TextInputProto.onAfterRendering = function(oEvent){
        var that = this;
        jQuery(this.getSubDomRef("input")).on("change", function(){
            that.testChange("Default");
        });
    };
        
    
    
    TextInputProto.setValue = function(sValue, bSuppressInvalidate){
    	if(this.getDomRef()){
    		this.setProperty("value", sValue, true);
    		
    		this.getSubDomRef("input").value = sValue;
    	}
    	else{
    		this.setProperty("value", sValue, bSuppressInvalidate);
    	}
    	
    	return this;
    };
    
    TextInputProto.setEnabled = function(bEnabled, bSuppressInvalidate){
        if(this.getDomRef()){
            this.setProperty("enabled", bEnabled, true);
            
            this.getSubDomRef("input").disabled = bEnabled ? "" : "disabled";
        }
        else{
            this.setProperty("enabled", bEnabled, bSuppressInvalidate);
        }
        
        return this;
    };
    
    /**
     * The handler for key up events.
     * 
     * @param {sap.ui.base.Event} oEvent - The ui5 event object.
     * 
     * @protected
     * @override
     */
    TextInputProto.onkeyup = function(oEvent){
        if(!this.getEnabled()){
            return;
        }

        if(this.getLiveChangeEnabled()){
            this.testChange("Live");       
        }
        
        if(oEvent.keyCode === KeyCodes.ENTER){
            this.testChange("Submit");
        }
    };
    
    return TextInput;
    
});