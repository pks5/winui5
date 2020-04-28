/*
 * 
 * WinUi5
 *
 * pks.winui5.ToolBar
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

sap.ui.define(['./library', "sap/ui/core/Control", "./ElementHelper", "./ToolBarRenderer"], function(winui5Lib, ControlBase, ElementHelper, ToolBarRenderer){
    
    "use strict";
    
    var oMetadata = {
            library : "pks.winui5",
            
            properties : {
                orientation : {
                    type : "sap.ui.core.Orientation",
                    defaultValue : sap.ui.core.Orientation.Horizontal
                },
                
                orientationPhone : {
                    type : "sap.ui.core.Orientation"
                },
                
                orientationTablet : {
                    type : "sap.ui.core.Orientation"
                },
                
                orientationDesktop : {
                    type : "sap.ui.core.Orientation"
                }
            },
            events:{
                
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
     * Constructor for a new ToolBar instance.
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
     * @alias pks.winui5.MenuToolBar
     * 
     */
    var ToolBar = ControlBase.extend("pks.winui5.ToolBar", /** @lends pks.winui5.ToolBar.prototype */ { 
        metadata : oMetadata,
        renderer: ToolBarRenderer
    }),
    /**
     * @alias pks.winui5.ToolBar.prototype
     */
    ToolBarProto = ToolBar.prototype;
    
    /*
     * START apply helpers
     */
    
    /**
     * Returns the style prefix for this control.
     * 
     * @return {string} The style prefix of this control.
     */
    ToolBar.getStylePrefix = function(){
        return "winui5TooBar";
    };
    
    ToolBarProto.getAdditionalStyleClass = function(){
        return ToolBar.createStyleFlag("ori", this.getOrientation())
                + " " + ToolBar.createStyleFlag("oriPho", this.getOrientationPhone())
                 + " " + ToolBar.createStyleFlag("oriTab", this.getOrientationTablet())
                 + " " + ToolBar.createStyleFlag("oriDes", this.getOrientationDesktop());
    };
    
    //Add element helpers
    ElementHelper.addHelpers(ToolBar);
    
    /*
     * END apply helpers
     */
    
    
    
    return ToolBar;
    
});