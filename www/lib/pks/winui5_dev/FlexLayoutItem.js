/*
 * 
 * WinUi5
 *
 * pks.winui5.FlexLayoutItem
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

sap.ui.define(['./library', "sap/ui/core/Element", "./ElementHelper"], function(winui5Lib, ElementBase, ElementHelper){
    
    "use strict";
    
    var oMetadata = {
            library : "pks.winui5",
            
            properties : {
                flex : {
                    type : "string"
                }
            },
            
            aggregations : {
            	content : {
            		type : "sap.ui.core.Control",
            		multiple : true
            	}
            },
            
            defaultAggregation : "content"
        };
    
    ElementHelper.addMetadata(oMetadata);
    
    /**
     * Constructor for a new FlexLayoutItem instance.
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
     * @alias pks.winui5.MenuFlexLayoutItem
     * 
     */
    var FlexLayoutItem = ElementBase.extend("pks.winui5.FlexLayoutItem", /** @lends pks.winui5.FlexLayoutItem.prototype */ { 
        metadata : oMetadata
    }),
    /**
     * @alias pks.winui5.FlexLayoutItem.prototype
     */
    FlexLayoutItemProto = FlexLayoutItem.prototype;
    
    /*
     * START apply helpers
     */
    
    /**
     * Returns the style prefix for this control.
     * 
     * @return {string} The style prefix of this control.
     */
    FlexLayoutItem.getStylePrefix = function(){
        return "winui5FleLayIte";
    };
    
    //Add element helpers
    ElementHelper.addHelpers(FlexLayoutItem);
    
    /*
     * END apply helpers
     */
    
    
    
    return FlexLayoutItem;
    
});