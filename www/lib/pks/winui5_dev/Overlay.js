/*
 * 
 * WinUi5
 *
 * pks.winui5.Overlay
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
sap.ui.define(['./library', "sap/ui/core/Control", "sap/ui/core/Popup","./ElementHelper", "sap/ui/events/KeyCodes", "./OverlayRenderer"], function(winui5Lib, ControlBase, Popup, ElementHelper, KeyCodes, OverlayRenderer){
    
    "use strict";
    
    var oMetadata = {
            interfaces : ["pks.ui5.IOwnedElement"],    
            library : "pks.winui5",
            
            properties : {
                closeMode : {
                    type : "pks.winui5.OverlayCloseMode",
                    defaultValue : winui5Lib.OverlayCloseMode.Manual
                },
                
                fullScreen : {
                    type : "boolean",
                    defaultValue: false
                }
            },
            
            events : {
                beforeOpen : {},
                
                beforeClose : {},
                
                afterOpen : {},
                
                afterClose : {}
            },
            
            aggregations : {
                content : {
                    type : "sap.ui.core.Control",
                    multiple : false
                }
            },
            
            defaultAggregation : "content",
            
            associations : {
                focusItem : {
                    type : "sap.ui.core.Control",
                    multiple: false
                },
                owner : {
                    type : "sap.ui.core.Control",
                    multiple: false
                }
            }
        };
    
    /**
     * Constructor for a new Overlay instance.
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
     * @alias pks.winui5.Overlay
     * 
     */
    var Overlay = ControlBase.extend("pks.winui5.Overlay", /** @lends pks.winui5.Overlay.prototype */ { 
        metadata : oMetadata,
        renderer: OverlayRenderer
    }),
    /**
     * @alias pks.winui5.Overlay.prototype
     */
    OverlayProto = Overlay.prototype;
    
    Overlay.zValue = 5;
    
    /*
     * START apply helpers
     */
    
    /**
     * Returns the style prefix for this control.
     * 
     * @return {string} The style prefix of this control.
     */
    Overlay.getStylePrefix = function(){
        return "winui5Ove";
    };
    
    //Add element helpers
    ElementHelper.addHelpers(Overlay);
    
    /*
     * END apply helpers
     */
    
    OverlayProto.init = function(){
        this.m_vOriginX = "left";
        this.m_vOriginY = "top";
    };
    
    OverlayProto.exit = function(){
        this.m_elAnchor = null;
    };
    
    /*
    OverlayProto.onBeforeRendering = function(oEvent){
        var elDomRef = this.getDomRef();
        
        if(elDomRef){
            this.m_sStyle = elDomRef.style.cssText;
        }
    };
    */
    
    OverlayProto.onAfterRendering = function(oEvent){
        var elDomRef = this.getDomRef(),
            oContent = this.getContent(),
            sFocusItemId = this.getFocusItem(),
            oFocusItem;
        
        if(sFocusItemId){
            oFocusItem = sap.ui.getCore().byId(sFocusItemId);
        }
        else{
            oFocusItem = this;
        }
        /*
        else if(oContent){
            //Put focus on first item inside overlay.
            oFocusItem = oContent;
        }
        */
        
        oFocusItem && oFocusItem.focus();
        
        this.moveOverlay(elDomRef);
        
        if(this.m_bOpening){
            this.fireAfterOpen();
            
            this.m_bOpening = false;
            this.m_bOpen = true;
        }
        
        //jQuery.sap.log.error("Overlay rendered.");
    };
    
    /**
     * Moves the overlay to the previously defined position.
     * 
     */
    OverlayProto.moveOverlay = function(elDomRef){
        if(!elDomRef){
            elDomRef = this.getDomRef();
        }
        
        var oStyle = elDomRef.style;
        
        if(!this.getFullScreen()){
            oStyle.right = "auto";
            oStyle.bottom = "auto";
            
            var vPosX = this.m_vPosX,
                vPosY = this.m_vPosY,
                vOriginX = this.m_vOriginX,
                vOriginY = this.m_vOriginY,
                
                iPosXCandidate = vPosX,
                iPosYCandidate = vPosY;
            
            if(this.m_elAnchor){
                //Get the anchor position
                var mPos = winui5Lib.resolvePosition(vPosX, vPosY, this.m_elAnchor, 0, 0, false);
                
                iPosXCandidate = mPos.x;
                iPosYCandidate = mPos.y;
            }
            
            //Get the overlay related position
            var mOriginPos = winui5Lib.resolvePosition(vOriginX, vOriginY, elDomRef, 0,0, true);
            
            var iOriginXCandidate = mOriginPos.x,
                iOriginYCandidate = mOriginPos.y,
                iOverlayWidth = mOriginPos.width,
                iOverlayHeight = mOriginPos.height;
            
            //Check fit X
            if("number" === typeof iPosXCandidate){
                var iPosRight = iPosXCandidate - iOriginXCandidate + iOverlayWidth;
                
                if(iPosRight >= window.innerWidth){
                    
                    if("right" === vPosX){
                        var mPos = winui5Lib.resolvePosition("left", vPosY, this.m_elAnchor, 0, 0, false);
                        iPosXCandidate = mPos.x;
                    }
                    
                    if("left" === vOriginX){
                        mOriginPos = winui5Lib.resolvePosition("right", vOriginY, elDomRef, 0,0, true);
                        iOriginXCandidate = mOriginPos.x;
                    }
                }
                
                iPosXCandidate += "px";
            }
            
            //Check fit Y
            if("number" === typeof iPosYCandidate){
                var iPosBottom = iPosYCandidate - iOriginYCandidate + iOverlayHeight;
                
                if(iPosBottom >= window.innerHeight){
                    
                    if("bottom" === vPosY){
                        var mPos = winui5Lib.resolvePosition(vPosX, "top", this.m_elAnchor, 0, 0, false);
                        iPosYCandidate = mPos.y;
                    }
                    
                    if("top" === vOriginY){
                        mOriginPos = winui5Lib.resolvePosition(vOriginX, "bottom", elDomRef, 0,0, true);
                        iOriginYCandidate = mOriginPos.y;
                    }
                }
                
                iPosYCandidate += "px";
            }
            
            
            
            
            
            if(-1 === iPosXCandidate.indexOf("%") && -1 === iPosXCandidate.indexOf("px")){
                iPosXCandidate += "px";
            }
            
            if(-1 === iPosYCandidate.indexOf("%") && -1 === iPosYCandidate.indexOf("px")){
                iPosYCandidate += "px";
            }
            
            //Apply position
            
            oStyle.left = iPosXCandidate;
            oStyle.top = iPosYCandidate;
            
            oStyle.marginLeft = (-iOriginXCandidate) + "px";
            oStyle.marginTop = (-iOriginYCandidate) + "px";
        }
        
        oStyle.zIndex = this.m_iZValue;
        oStyle.opacity = 1;
    };
    
    OverlayProto.onkeyup = function(oEvent){
        if(oEvent.keyCode === KeyCodes.ESCAPE){
            //We don't want the default behaviour of the space bar within this control.
            this.close(winui5Lib.OverlayCloseReason.Cancel);
            
        }
    };
    
    OverlayProto.retrieveOwner = function(){
        var sOwner = this.getOwner();
        
        if(sOwner){
            return sap.ui.getCore().byId(sOwner);
        }
        
        return null;
    };
    
    OverlayProto.onsapfocusleave = function(oEvent){ 
    	var sCloseMode = this.getCloseMode(),
    		OverlayCloseMode = winui5Lib.OverlayCloseMode;
    	
    	if(sCloseMode === OverlayCloseMode.Manual){
    	    return;
    	}
    	
    	var sRelatedControlId = oEvent.relatedControlId,
    		oRelatedControl = sap.ui.getCore().byId(sRelatedControlId);
    	
    	if(!oRelatedControl){
    	    //Simple case: overlay closes whenever the focus has been lost to an outer element.
            this.close(winui5Lib.OverlayCloseReason.Cancel);
            
            return;
    	}
    	
        if(winui5Lib.containsControl(this, oRelatedControl)){
            //The control with new focus is inside the overlay or the overlay itself. Do nothing.
            return;
        }
        
        if(sCloseMode === OverlayCloseMode.FocusLoose){
    		//Simple case: overlay closes whenever the focus has been lost to an outer element.
    		this.close(winui5Lib.OverlayCloseReason.Cancel);
    	}
    	else if(sCloseMode === OverlayCloseMode.ForeignFocus){
	    	var oOwner = this.retrieveOwner();
	        
	        if(oOwner){
    	        if(oOwner.getMetadata().isInstanceOf("pks.ui5.IItem")){
    	        	//On moder browsers (all except MSIE), items do not gain the focus.
    	        	//So we have to check against the container, if the owner of the overlay is an item.
    	            oOwner = oOwner.getItemContainer();
    	        }
    	        
    	        if(winui5Lib.containsControl(oOwner, oRelatedControl)){
    	            //The control with new focus is inside the owner or the owner itself. Do nothing.
    	            return;
    	        }
    	    }
	        
	        //console.log(oEvent, oEvent.relatedControlId, oOwner.getId());
        	this.close(winui5Lib.OverlayCloseReason.Cancel);
        }
    };
    
    /**
     * Sets the CloseMode for this Overlay.
     * 
     * Never invalidate when the CloseMode is set.
     * 
     * @override
     */
    OverlayProto.setCloseMode = function(sCloseMode, bSuppressInvalidate){
        this.setProperty("closeMode", sCloseMode, true);
        
        return this;
    };
    
    /**
     * Sets the owner for this Overlay.
     * 
     * Never invalidate when the owner is set.
     * 
     * @override
     */
    OverlayProto.setOwner = function(oOwner, bSuppressInvalidate){
        this.setAssociation("owner", oOwner, true);
        
        return this;
    };
    
    
    
    
    /**
     * 
     */
    OverlayProto.setPosition = function(vPosX, vPosY, elAnchor, bAutoPosition){
        this.m_vPosX = vPosX;
        this.m_vPosY = vPosY;
        this.m_elAnchor = elAnchor;
        this.m_bAutoPosition = bAutoPosition;
        
        return this;
    };
    
    /**
     * 
     */
    OverlayProto.setOrigin = function(vOriginX, vOriginY){
        this.m_vOriginX = vOriginX;
        this.m_vOriginY = vOriginY;
        
        return this;
    };
    
    /**
     * 
     */
    OverlayProto.open = function(){
        if(this.m_bOpening){
            jQuery.sap.log.warning("Cannot open overlay: still opening!");
            return;
        }

        if(this.m_bOpen){
            jQuery.sap.log.warning("Cannot open overlay: already open!");
            return;
        }
        
        //Make sure the old reference is gone
        setTimeout(function(){
            if(this.getDomRef()){
                throw new Error("Cannot open overlay: dom reference still exists!");   
                /*
                if(this.getParent()){
                    this.moveOverlay(elDomRef);
                    
                    this.m_bOpening = false;
                    
                    return;
                }
                else{
                    //throw new Error("Dom reference exists but no parent is set.");
                }
                */
            }
            
            
            this.m_bOpening = true;
            
            this.m_iZValue = Popup.getNextZIndex();
            
            Overlay.zValue ++;
            
            this.fireBeforeOpen();
            
            this.placeAt(sap.ui.getCore().getStaticAreaRef());
        }.bind(this), 0);

        return this;
    };
    
    OverlayProto.isOpen = function(){
        return this.m_bOpen;
    };
    
    OverlayProto.close = function(sReason){
        if(this.m_bOpening){
            jQuery.sap.log.warning("Cannot close overlay. Currently opening!");
            return;
        }

        if(!this.m_bOpen){
            jQuery.sap.log.warning("Cannot close overlay: not open!");
            return;
        }
        
        var oParent = this.getParent();
        
        if(!this.getDomRef()){
            //If a parent is set, remove the overlay from the parent.
            //This should normally not happen.
            oParent && oParent.removeContent(this);
            this.m_bOpen = false;
            
            jQuery.sap.log.warning("Cannot close menu: already closed!");
        }
        else{
        	var mParam = {
    	        reason : sReason
    	    };
                    
            this.fireBeforeClose(mParam);
            
            oParent && oParent.removeContent(this);
            this.m_bOpen = false;

            this.fireAfterClose(mParam);
        }
        
        return this;
    };
    
    //Return Constructor
    return Overlay;
    
});