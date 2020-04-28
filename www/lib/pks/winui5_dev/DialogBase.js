/*
 * 
 * WinUi5
 *
 * pks.winui5.DialogBase
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
                
                
            },
            
            aggregations : {
                buttons : {
                    type : "pks.winui5.Button",
                    multiple : true
                }
            },
            
            defaultAggregation : "buttons"
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
     * @alias pks.winui5.DialogBase
     * 
     */
    var DialogBase = ControlBase.extend("pks.winui5.DialogBase", /** @lends pks.winui5.DialogBase.prototype */ { 
        metadata : oMetadata
    
    }),
    /**
     * @alias pks.winui5.DialogBase.prototype
     */
    DialogBaseProto = DialogBase.prototype;
    
    /*
     * START apply helpers
     */
    
    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    DialogBase.getStylePrefix = function(){
        return "winui5DiaBas";
    };
    
    DialogBaseProto.getAdditionalStyleClass = function(){
        return SizeSupport.createSizeStyleClass(DialogBase, this) + " " + DialogBase.createStyleFlag("but", this.getButtons().length);
    };
    
    //Add the helpers
    ElementHelper.addHelpers(DialogBase);
    
    /*
     * END apply helpers
     */
    
    //Return Constructor
    return DialogBase;
});