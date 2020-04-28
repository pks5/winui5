/*
 * 
 * WinUi5
 *
 * pks.winui5.ViewModeSupport
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

sap.ui.define(["./library"], function(winui5Lib){
    
    "use strict";
    
    /**
     * @class
     * Class that provides methods to add context menu support to item containers.
     * @alias pks.winui5.OverlaySupport.Trait
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @private
     */
    var Trait = {};
    
    var ViewModeSupport = {};
    
    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    ViewModeSupport.addMetadata = function(oMetadata, mOptions){
        var sType = mOptions.type;
        
        oMetadata.properties.viewMode = {
            type : sType,
            defaultValue : mOptions.defaultValue
        };
        
        oMetadata.properties.viewModePhone = {
            type : sType
        };
        
        oMetadata.properties.viewModeTablet = {
            type : sType
        };
        
        oMetadata.properties.viewModeDesktop = {
            type : sType
        };
    };
    
    ViewModeSupport.createViewModeStyleClass = function(oStyleProducer, oInstance){
        var sAddStyle = oStyleProducer.createStyleFlag("vieMod", oInstance.getViewMode()),
                sViewModePhone = oInstance.getViewModePhone(),
                sViewModeTablet = oInstance.getViewModeTablet(),
                sViewModeDesktop = oInstance.getViewModeDesktop();
            
            if(sViewModePhone){
                sAddStyle += " " + oStyleProducer.createStyleFlag("vieModPho", sViewModePhone);
            }
            
            if(sViewModeTablet){
                sAddStyle += " " + oStyleProducer.createStyleFlag("vieModTab", sViewModeTablet);
            }
            
            if(sViewModeDesktop){
                sAddStyle += " " + oStyleProducer.createStyleFlag("vieModDes", sViewModeDesktop);
            }
            
            return sAddStyle;
    };
    
    
    
    return ViewModeSupport;
});