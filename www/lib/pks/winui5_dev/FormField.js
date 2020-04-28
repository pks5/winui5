/*
 * 
 * WinUi5
 *
 * pks.winui5.FormField
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

sap.ui.define(['./library', "sap/ui/core/Control", "./ElementHelper"], function(lib, ControlBase, ElementHelper){
	
	"use strict";

	var oMetadata = {

		library : "pks.winui5",
		defaultAggregation : "input",
		
		properties : { 
			label: {
				type: "string"
			}
		},
		
		aggregations : {
			input : {
				multiple : false
			}
		},
		
		events : {
			
		}
	};

	ElementHelper.addMetadata(oMetadata);
	
	/**
	 * Constructor for a new FormField instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating static overlays.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.FormField
	 * 
	 */
	var FormField = ControlBase.extend("pks.winui5.FormField", /** @lends pks.winui5.FormField.prototype */ {
		metadata : oMetadata,
		
		renderer: function(rm, oControl) {
			var oInput = oControl.getInput();
            
            rm.write("<div");
	        rm.writeControlData(oControl);
			rm.addClass(oControl.createStyleClass());
			if(oControl.isLabelVisible()){
				rm.addClass(oControl.createStyleFlag("labelVisible"));
			}
			rm.writeClasses();
	        rm.write(">");
	        
			rm.write('<label class="' + oControl.createStyleClass("label") + '" id="' + oControl.createSubId("label") + '">');
			rm.writeEscaped(oControl.getLabelText());
			rm.write('</label>');
			
			rm.write('<div class="' + oControl.createStyleClass("input") + '">');
	        
	        rm.renderControl(oInput);
	        
	        rm.write("</div></div>");
	    }
	}),
	/**
	 * @alias pks.winui5.FormField.prototype
	 */
	FormFieldProto = FormField.prototype;
	
	/**
     * Returns the style prefix for this control.
     * 
     * @return {string} The style prefix of this control.
     */
	FormField.getStylePrefix = function(){
        return "winui5ForFie";
    };
    
    ElementHelper.addHelpers(FormField);
	
	FormFieldProto.exit = function(){
		
	};

	FormFieldProto.setLabelVisible = function(bVisible){
		if(bVisible){
			this.addStyleClass(this.createStyleFlag("labelVisible"));
		}
		else{
			this.removeStyleClass(this.createStyleFlag("labelVisible"));
		}
	};

	FormFieldProto.isLabelVisible = function(){
		var oInput = this.getInput();
		return oInput && (!oInput.getPlaceholder || (oInput.getValue && oInput.getValue()) || (oInput.getSelectedKey && oInput.getSelectedKey()));
	};

	FormFieldProto.getLabelText = function(sPlaceholder){
		var sLabel,
			sOwnLabel = this.getLabel();
		
		if(sOwnLabel){
			sLabel = sOwnLabel;
		}
		else if(sPlaceholder){
			sLabel = sPlaceholder
		}
		else{
			var oInput = this.getInput();
			if(oInput.getPlaceholder){
				sLabel = oInput.getPlaceholder();
			}
		}

		return sLabel;
	};

	FormFieldProto.updateLabelText = function(sPlaceholder){
		var elLabel = document.getElementById(this.createSubId("label"));
		if(elLabel){
			elLabel.innerHTML = this.getLabelText(sPlaceholder);
		}
	};

	FormFieldProto.newValue = function(sNewValue){
		if(sNewValue !== this.m_sInputValue){
			this.setLabelVisible(sNewValue || this.m_sInputSelectedKey);
			this.m_sInputValue = sNewValue;
		}
	};

	FormFieldProto.newSelectedKey = function(sNewSelectedKey){
		if(sNewSelectedKey !== this.m_sInputSelectedKey){
			this.setLabelVisible(sNewSelectedKey || this.m_sInputValue);
			this.m_sInputSelectedKey = sNewSelectedKey;
		}
	};
	
	FormFieldProto.setInput = function(oInput, bSuppressInvalidate){
	    if(oInput.getPlaceholder){
			var oOldInput = this.getInput(),
				that = this;
				
			if(oOldInput && oInput !== oOldInput){
				if(oOldInput.oldSetPlaceholder){
					oOldInput.setPlaceholder = oOldInput.oldSetPlaceholder;
				}
				
				if(oOldInput.detachChange){
					oOldInput.detachChange(this.m_fnChange);
				}

				if(oOldInput.detachSelectionChange){
					oOldInput.detachSelectionChange(this.m_fnSelectionChange);
				}

				if(oOldInput.oldSetValue){
					oOldInput.setValue = oOldInput.oldSetValue;
				}

				if(oOldInput.oldSetSelectedKey){
					oOldInput.setSelectedKey = oOldInput.oldSetSelectedKey;
				}

				if(oOldInput.setOptionEnabled){
					oOldInput.setOptionEnabled("FormField", false);
				}
			}
			
			if(oInput && oInput !== oOldInput){
				oInput.oldSetPlaceholder = oInput.setPlaceholder;
				oInput.setPlaceholder = function(sPlaceholder, bSuppressInvalidate){
					that.updateLabelText(sPlaceholder);
					this.oldSetPlaceholder(sPlaceholder, bSuppressInvalidate);
				};

				if(oInput.attachChange){
					this.m_fnChange = function(){
						that.newValue(oInput.getValue());
					};
					oInput.attachChange(this.m_fnChange);
				}

				if(oInput.attachSelectionChange){
					this.m_fnSelectionChange = function(){
						that.newSelectedKey(oInput.getSelectedKey());
					};
					oInput.attachSelectionChange(this.m_fnSelectionChange);
				}

				if(oInput.setValue){
					oInput.oldSetValue = oInput.setValue;
					oInput.setValue = function(sValue, bSuppressInvalidate){
						that.newValue(sValue);
						this.oldSetValue(sValue, bSuppressInvalidate);
					}
				}

				if(oInput.setSelectedKey){
					oInput.oldSetSelectedKey = oInput.setSelectedKey;
					oInput.setSelectedKey = function(sKey, bSuppressInvalidate){
						that.newSelectedKey(sKey);
						this.oldSetSelectedKey(sKey, bSuppressInvalidate);
					}
				}

				if(oInput.setOptionEnabled){
					oInput.setOptionEnabled("FormField", true, true);
				}
			}
		}
	    
	    this.setAggregation("input", oInput, bSuppressInvalidate);
	};
	
	return FormField;
});