/*
 * 
 * WinUi5
 *
 * pks.winui5.SizeSupport
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
    
    var SizeSupport = {};
    
    /**
     * Adds the required metadata to the given metadata definition.
     * 
     * @param {object} oMetadata - The metadata definition.
     */
    SizeSupport.addMetadata = function(oMetadata){
      
        oMetadata.properties.size = {
            type : "pks.winui5.Size",
            defaultValue : winui5Lib.Size.MD
        };
        
        oMetadata.properties.sizePhone = {
            type : "pks.winui5.Size"
        };
        
        oMetadata.properties.sizeTablet = {
            type : "pks.winui5.Size"
        };
        
        oMetadata.properties.sizeDesktop = {
            type : "pks.winui5.Size"
        };
    };
    
    SizeSupport.createSizeStyleClass = function(oStyleProducer, oInstance){
        var sAddStyle = oStyleProducer.createStyleFlag("siz", oInstance.getSize()),
                sSizePhone = oInstance.getSizePhone(),
                sSizeTablet = oInstance.getSizeTablet(),
                sSizeDesktop = oInstance.getSizeDesktop();
            
            if(sSizePhone){
                sAddStyle += " " + oStyleProducer.createStyleFlag("sizPho", sSizePhone);
            }
            
            if(sSizeTablet){
                sAddStyle += " " + oStyleProducer.createStyleFlag("sizTab", sSizeTablet);
            }
            
            if(sSizeDesktop){
                sAddStyle += " " + oStyleProducer.createStyleFlag("sizDes", sSizeDesktop);
            }
            
            return sAddStyle;
    };
    
    
    
    return SizeSupport;
});