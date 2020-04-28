/*
 * 
 * WinUi5
 *
 * pks.winui5.SplitContainerSegment
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
                visible : {
                    type : "boolean",
                    defaultValue: true
                },
                
                size : {
                    type : "sap.ui.core.CSSSize"
                },
                
                sizeMin : {
                    type : "int",
                    defaultValue: 0
                },
                
                sizeMax : {
                    type : "int",
                    defaultValue: 0
                },
                
                resizable : {
                    type : "boolean",
                    defaultValue : false
                },
                
                containsFlex : {
                    type : "boolean",
                    defaultValue : false
                }
            },
            aggregations : {
                content : {
                    type : "sap.ui.core.Control",
                    multiple : true,
                    singularName : "content"
                }
            },
            defaultAggregation : "content"
        };
    
    /**
     * Constructor for a new Menu instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Control for creating menus.
     * @extends sap.ui.core.Element
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias pks.winui5.SplitContainer
     * 
     */
    var SplitContainerSegment = ElementBase.extend("pks.winui5.SplitContainerSegment", /** @lends pks.winui5.SplitContainerSegment.prototype */ { 
        metadata : oMetadata
    
    }),
    /**
     * @alias pks.winui5.SplitContainer.prototype
     */
    SplitContainerSegmentProto = SplitContainerSegment.prototype;
    
    
    SplitContainerSegmentProto.setSize = function(sNewSize, bSuppressInvalidate){
        var elDomRef = this.getDomRef();
        
        if(elDomRef){
        	/*
            var oParent = this.getParent(),
        		elContainer = oParent.getDomRef(),
            	
        		bHor = sap.ui.core.Orientation.Horizontal === oParent.getOrientation(),
            	iTotal = bHor ? elContainer.offsetWidth : elContainer.offsetHeight,
            	sConvertedSize = this.convertSize(sNewSize, iTotal);
        	*/
        	if(null !== sNewSize){
        	    elDomRef.style.flex = "0 0 " + sNewSize 
        	}
        	else{
        	    elDomRef.style.flex = "1 1 auto";
        	}
        	
            this.setProperty("size", sNewSize, true);
        }
        else{
            this.setProperty("size", sNewSize, bSuppressInvalidate);
        }
        
        return this;
    };
    
    SplitContainerSegmentProto.convertSize = function(sSize, iTotal){
    	var iUnitIndex = sSize.indexOf("px");
    	if(iUnitIndex !== -1){
    		var iValue = parseInt(sSize.substr(0, iUnitIndex), 10);
    		
    		return (0.01 * Math.round(iValue / iTotal * 10000)) + "%";
    	}
    	else{ 
    		iUnitIndex = sSize.indexOf("%");
    		if(sSize.indexOf("%") === -1){
    			throw new Error("Only px and % values are supported!");
	    	}
    	}
    	
    	return sSize;
    };
    
    SplitContainerSegmentProto.applyCurrentSize = function(){
         var iSize = this.getComputedSize();
         
         this.setSize(iSize + "px");
    };
    
    SplitContainerSegmentProto.getComputedSize = function(){
        var elDomRef = this.getDomRef();
        
        if(!elDomRef){
            return null;
        }
        
        var bHor = sap.ui.core.Orientation.Horizontal === this.getParent().getOrientation(),
        $cell = jQuery(elDomRef);
        
        return bHor ? $cell.width() : $cell.height();
    };
    
    return SplitContainerSegment;
});