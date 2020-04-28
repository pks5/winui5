/*
 * 
 * WinUi5
 *
 * pks.winui5.FlexLayout
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

sap.ui.define(['./library', "sap/ui/core/Control", "./ElementHelper", "./FlexLayoutRenderer"], function(winui5Lib, ControlBase, ElementHelper, FlexLayoutRenderer){
    
    "use strict";
    
    var oMetadata = {
            library : "pks.winui5",
            
            properties : {
                orientation : {
                    type : "sap.ui.core.Orientation",
                    defaultValue : sap.ui.core.Orientation.Horizontal
                }
            },
            events:{
                
            },
            aggregations : {
                items : {
                    type : "pks.winui5.FlexLayoutItem",
                    multiple : true
                }
            },
            defaultAggregation : "items"
        };
    
    ElementHelper.addMetadata(oMetadata);
    
    /**
     * Constructor for a new FlexLayout instance.
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
     * @alias pks.winui5.MenuFlexLayout
     * 
     */
    var FlexLayout = ControlBase.extend("pks.winui5.FlexLayout", /** @lends pks.winui5.FlexLayout.prototype */ { 
        metadata : oMetadata,
        renderer: FlexLayoutRenderer
    }),
    /**
     * @alias pks.winui5.FlexLayout.prototype
     */
    FlexLayoutProto = FlexLayout.prototype;
    
    /*
     * START apply helpers
     */
    
    /**
     * Returns the style prefix for this control.
     * 
     * @return {string} The style prefix of this control.
     */
    FlexLayout.getStylePrefix = function(){
        return "winui5FleLay";
    };
    
    FlexLayoutProto.getAdditionalStyleClass = function(){
        return FlexLayout.createStyleFlag("ori", this.getOrientation());
    };
    
    //Add element helpers
    ElementHelper.addHelpers(FlexLayout);
    
    /*
     * END apply helpers
     */
    
    
    
    return FlexLayout;
    
});