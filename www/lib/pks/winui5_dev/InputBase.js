/*
 * 
 * WinUi5
 *
 * pks.winui5.InputBase
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

sap.ui.define(["./library", "sap/ui/core/Control", "./ElementHelper"], function(winui5Lib, ControlBase, ElementHelper){
    
    "use strict";
    
    var oMetadata = {
            library : "pks.winui5",
            
            properties : {
                
                
                
            },
            
            events : {
                press : {
                    
                },
                
                change : {
                    
                }
            },
            
            aggregations : {
                
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
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller <pk@pksoftware.de>
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias pks.winui5.InputBase
     * 
     */
    var InputBase = ControlBase.extend("pks.winui5.InputBase", /** @lends pks.winui5.InputBase.prototype */ { 
        metadata : oMetadata,
        renderer: null
    }),
    /**
     * @alias pks.winui5.InputBase.prototype
     */
    InputBaseProto = InputBase.prototype;
    
    /*
     * START apply helpers
     */
    
    /**
     * Returns the style prefix for this control
     * 
     * @return {string} - The style class prefix
     */
    InputBase.getStylePrefix = function(){
        return "winui5InpBas";
    };
    
    //Add the helpers
    ElementHelper.addHelpers(InputBase);
    
    /*
     * END apply helpers
     */
    
    InputBaseProto.onclick = function(oEvent){
        if(this.getEnabled()){
            
            this.firePress();
        }
    };
    
    
    
    //Return Constructor
    return InputBase;
});