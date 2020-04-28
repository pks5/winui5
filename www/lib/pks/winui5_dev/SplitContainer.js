/*
 * 
 * WinUi5
 *
 * pks.winui5.SplitContainer
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

sap.ui.define([
        './library', "sap/ui/core/Control", "./ElementHelper", "./SplitContainerRenderer"
], function(winui5Lib, ControlBase, ElementHelper, SplitContainerRenderer) {

    "use strict";

    var oMetadata = {
        library : "pks.winui5",

        properties : {
            orientation : {
                type : "sap.ui.core.Orientation",
                defaultValue : sap.ui.core.Orientation.Horizontal
            }
        },
        events : {
            resize: {
                
            }
        },
        aggregations : {
            segments : {
                type : "pks.winui5.SplitContainerSegment",
                multiple : true,
                singularName : "segment"
            }
        },
        defaultAggregation : "segments"
    };

    /**
     * Constructor for a new Menu instance.
     * 
     * @param {string}
     *            [sId] ID for the new control, generated automatically if no ID
     *            is given
     * @param {object}
     *            [mSettings] Initial settings for the new control
     * 
     * @class Control for creating menus.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias pks.winui5.SplitContainer
     * 
     */
    var SplitContainer = ControlBase.extend("pks.winui5.SplitContainer", /** @lends pks.winui5.SplitContainer.prototype */
    {
        metadata : oMetadata,
        renderer: SplitContainerRenderer
    }),
    /**
     * @alias pks.winui5.SplitContainer.prototype
     */
    SplitContainerProto = SplitContainer.prototype;

    /*
     * START apply helpers
     */

    /**
     * Returns the style prefix for this control.
     * 
     * @return {string} The style prefix of this control.
     */
    SplitContainer.getStylePrefix = function() {
        return "winui5SplCon";
    };

    // Add element helpers
    ElementHelper.addHelpers(SplitContainer);

    /*
     * END apply helpers
     */
    
    /**
     * Triggered when the user presses the mouse button down.
     * 
     * @param {sap.ui.base.Event}
     *            oEvent - The ui5 event object.
     */
    SplitContainerProto.onmousedown = function(oEvent) {
        if (oEvent.which !== 1 || (window.TouchEvent && (oEvent.originalEvent instanceof window.TouchEvent))) {
            // Event is made by a touch device - ignore
            return;
        }

        var $target = jQuery(oEvent.target);

        if ($target.hasClass(this.createStyleClass("separator"))) {
            oEvent.stopPropagation();
            this.m_iMousePos = null;
            
            this.addStyleClass(this.createStyleFlag("resizing"));
            
            var bHor = this.getOrientation() === sap.ui.core.Orientation.Horizontal, aSegments = this.getSegments(),

            iThisSegIndex = $target.data("segment"), 
            oThisSegment = aSegments[iThisSegIndex], 
            oOtherSegment = null,
            bFoundResizable = false;

            for(var i=0; i < aSegments.length; i++){
                aSegments[i].applyCurrentSize();
            }
            
            for(var i=iThisSegIndex + 1; i < aSegments.length; i++){
                var oSeg = aSegments[i];
                if(oSeg.getResizable()){
                    oOtherSegment = oSeg;
                    oSeg.setSize(null);
                    bFoundResizable = true;
                    break;
                }
            }
            
            if(!bFoundResizable){
                return;
            }
            
            this.m_iMousePos = bHor ? oEvent.clientX : oEvent.clientY;
            this.m_bHor = bHor;

            this.m_thisSegment = {
                segment : oThisSegment,
                size : oThisSegment.getComputedSize(),
                sizeMin : Math.max(oThisSegment.getSizeMin(), 10),
                sizeMax : oThisSegment.getSizeMax(),
                resizable : oThisSegment.getResizable()
            };

            this.m_otherSegment = {
                segment : oOtherSegment,
                size : oOtherSegment.getComputedSize(),
                sizeMin : Math.max(oOtherSegment.getSizeMin(), 10),
                sizeMax : oOtherSegment.getSizeMax(),
                resizable : oOtherSegment.getResizable()
            };

            this.$().on("mousemove", jQuery.proxy(this.onmousemove, this))
                    .on("mouseleave", jQuery.proxy(this.onmouseup, this));
        }

    };

    /**
     * Triggered when the user moves the mouse with pressed mouse button.
     */
    SplitContainerProto.onmousemove = function(oEvent) {
        if (oEvent.which !== 1 || !this.m_iMousePos) {
            return;
        }

        oEvent.stopPropagation();

        var mThisSegment = this.m_thisSegment, iThisSizeMin = mThisSegment.sizeMin, iThisSizeMax = mThisSegment.sizeMax,

        mOtherSegment = this.m_otherSegment, iOtherSizeMin = mOtherSegment.sizeMin, iOtherSizeMax = mOtherSegment.sizeMax;

        if (mThisSegment.resizable) {
                var iDif = (this.m_bHor ? oEvent.clientX : oEvent.clientY) - this.m_iMousePos, 
                    iThisCellSize = mThisSegment.size + iDif, 
                    iOtherCellSize = mOtherSegment.size - iDif;

                if ((!iThisSizeMin || iThisCellSize >= iThisSizeMin) && (!iThisSizeMax || iThisCellSize <= iThisSizeMax)
                        && (!iOtherSizeMin || iOtherCellSize >= iOtherSizeMin) && (!iOtherSizeMax || iOtherCellSize <= iOtherSizeMax)

                ) {
                    mThisSegment.segment.setSize(iThisCellSize + "px");
                }
        }
    };

    /**
     * Triggered when the user releases the mouse button.
     */
    SplitContainerProto.onmouseup = function(oEvent) {
        if (oEvent.which !== 1 || !this.m_iMousePos) {
            return;
        }

        oEvent.stopPropagation();
        
        this.removeStyleClass(this.createStyleFlag("resizing"));
        
        this.$().off("mousemove").off("mouseleave");

        this.m_iMousePos = null;
        
        this.fireResize();
    };

    return SplitContainer;

});