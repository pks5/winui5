/*
 * 
 * WinUi5
 *
 * pks.winui5.library
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
sap.ui.define(['jquery.sap.global', 'sap/ui/Device',
	'sap/ui/core/library', "sap/ui/core/IconPool"],
	function(jQuery, Device, coreLib, IconPool) {

	"use strict";
	
	/**
	 * The ui5strap library.
	 * 
	 * @namespace
	 * @name pks.winui5
	 * @author Jan Philipp Knoeller
	 * @version 1.0.8-SNAPSHOT
	 * @public
	 */
	sap.ui.getCore().initLibrary({
		name : "pks.winui5",
		version: "1.0.8-SNAPSHOT",
		dependencies : ["sap.ui.core"],
		types: [
		    "pks.winui5.CheckboxVisibility",
		    "pks.winui5.FileItemRole",
		    "pks.winui5.SelectionMode",
		    "pks.winui5.TreeViewMode",
		    "pks.winui5.ListViewMode",
		    "pks.winui5.TreeScrollX"
		],
		interfaces: [
		    "pks.ui5.IItemContainer", 
		    "pks.ui5.ISelectionProvider", 
		    "pks.ui5.IDraggableItemContainer",
		    "pks.ui5.IExpandableItemContainer",
		    "pks.ui5.IItem", 
		    "pks.ui5.ISelectableItem", 
		    "pks.ui5.IExpandableItem", 
		    "pks.ui5.IDraggableItem", 
		    "pks.ui5.IDropZone"
		],
		controls: [
		    "pks.winui5.DropdownMenu",
		    "pks.winui5.DropdownMenuItem",
		    "pks.winui5.FileItem",
		    "pks.winui5.Item",
			"pks.winui5.ItemContainer",
			"pks.winui5.ObjectList",
			"pks.winui5.ObjectTree",
			"pks.winui5.Menu",
		    "pks.winui5.MenuItem",
		    "pks.winui5.Overlay",
		    "pks.winui5.SplitContainer",
		    "pks.winui5.ToolBar"
            
		],
		elements: [
			
		]
	});
	
	/**
	 * @alias pks.winui5
	 */
	var winui5Lib = pks.winui5;
	
	//Rename to ActivateAction??
	
	/**
     * Defines the action when an item is activated.
     *
     * @enum {string}
     * @public
     */
	winui5Lib.ActivateAction = {
        None : "None",
        Select : "Select",
        Toggle : "Toggle"
    };
	
	/**
     * View modes for ButtonMenu.
     *
     * @enum {string}
     * @public
     */
	winui5Lib.ButtonMenuViewMode = {
	    ListHor : "ListHor",
	    ListVer : "ListVer",
	    Icons : "Icons"
	};
	
	/**
	 * Visibility for checkboxes.
	 *
	 * @enum {string}
	 * @public
	 */
	winui5Lib.CheckboxVisibility = {
		/**
		 * Checkboxes are hidden.
		 * @public
		 */
		"Hidden" : "Hidden",
		/**
		 * Checkboxes are visible when selectionMode is multiple.
		 * @public
		 */
		"Multiple" : "Multiple",
		/**
		 * Checkboxes are visible on touch devices, and visible on hover on desktop systems.
		 * @public
		 */
		"Hover" : "Hover",
		/**
		 * Checkboxes are visible on touch devices, and visible on hover on desktop systems - but only when selectionMode is multiple.
		 * @public
		 */
		"HoverMultiple" : "HoverMultiple",
		/**
		 * Checkboxes are visible only on touch devices.
		 */
		"Touch" : "Touch",
		/**
		 * Checkboxes are visible on touch devices whien selection mode is multiple.
		 * @public
		 */
		"TouchMultiple" : "TouchMultiple",
		/**
		 * Checkboxes are always visible.
		 * @public
		 */
		"Visible" : "Visible"
	};
	
	/**
     * Visibility for expand icon.
     *
     * @enum {string}
     * @public
     */
    winui5Lib.ExpandIconVisibility = {
        /**
         * Expand icon is hidden.
         * @public
         */
        Hidden : "Hidden",
        Hover : "Hover",
        Visible : "Visible"
    };
	
	/**
	 * The role of a file item.
	 *
	 * @enum {string}
	 * @public
	 */
	winui5Lib.FileItemRole = {
		/**
		 * Automatic role determination depending on file extension and parent.
		 * @public
		 */
		Auto : "Auto",
		/**
		 * The item is a file.
		 * @public
		 */
		File : "File",
		/**
		 * The item is a folder.
		 * @public
		 */
		Folder : "Folder",
		/**
		 * The item is something else.
		 * @public
		 */
		Node : "Node"
	};

	/**
	 * The type of the value of a file item.
	 *
	 * @enum {string}
	 * @public
	 */
	winui5Lib.FileItemValueType = {
		Plain: "Plain",
		FileSize: "FileSize"
	};
	
	/**
     * The view mode for item lists.
     *
     * @enum {string}
     * @public
     */
    winui5Lib.ListViewMode = {
        
        /**
         * Display small tiles in a grid.
         * @public
         */
        SmallTiles : "SmallTiles",
        
        /**
         * Display medium tiles in a grid.
         * @public
         */
        MediumTiles : "MediumTiles",
        
        /**
         * Display medium icons in a grid.
         * @public
         */
        MediumIcons : "MediumIcons",
        
        /**
         * Display large icons in a grid.
         * @public
         */
        LargeIcons : "LargeIcons",
        
        /**
         * Display small items in a list.
         * @public
         */
        SmallItems : "SmallItems",
        
        /**
         * Display medium items in a list.
         * @public
         */
        MediumItems : "MediumItems",
        
        /**
         * Displays small items in a detailed list.
         */
        Details : "Details"
    };
	
	/**
     * Defines the action for an 
     *
     * @enum {string}
     * @public
     */
    winui5Lib.OverlayCloseMode = {
         Manual : "Manual",
         FocusLoose : "FocusLoose",
         ForeignFocus : "ForeignFocus"
    };
    
    /**
     * Defines the action for an 
     *
     * @enum {string}
     * @public
     */
    winui5Lib.OverlayCloseReason = {
         Cancel : "Cancel",
         Submit : "Submit",
         Switch : "Switch"
    };
    
    /**
     * Defines the action for an 
     *
     * @enum {string}
     * @public
     */
    winui5Lib.OverlayTrigger = {
         Manual : "Manual",
         
         PrimaryPress : "PrimaryPress",
         SecondaryPress : "SecondaryPress",
         
         DoublePress : "DoublePress",
         
         SelectionChange : "SelectionChange"
    };
    
    /**
     * Position 
     *
     * @enum {string}
     * @public
     */
    winui5Lib.Position = {
         Top : "Top",
         Right : "Right",
         Bottom : "Bottom",
         Left : "Left"
    };
    
    /**
     * Origin of press event.
     *
     * @enum {string}
     * @public
     */
    winui5Lib.PressOrigin = {
         Manual : "Manual",
         
         PrimaryPress : "PrimaryPress",
         SecondaryPress : "SecondaryPress",
         
         SpaceKey : "SpaceKey",
         EnterKey : "EnterKey",
         
         PointerEnter : "PointerEnter",
         PointerLeave : "PointerLeave"
    };
    
	/**
	 * Selection mode.
	 *
	 * @enum {string}
	 * @public
	 */
	winui5Lib.SelectionMode = {
		/**
		 * No selection.
		 * @public
		 */
		None : "None",
		/**
		 * Only one item can be selected at the same time.
		 * @public
		 */
		Single : "Single",
		/**
		 * Multiple items can be selected.
		 * @public
		 */
		Multiple : "Multiple"
	};
	
	/**
     * Size
     *
     * @enum {string}
     * @public
     */
	winui5Lib.Size = {
	    XS : "XS",
	    SM : "SM",
	    MD : "MD",
	    LG : "LG",
	    XL : "XL"
	};
	
	winui5Lib.TextInputType = {
        Text : "Text",
        Password : "Password"
    };
	
	/**
     * The view mode for item trees.
     *
     * @enum {string}
     * @public
     */
    winui5Lib.TreeScrollX = {
        None : "None",
        Scroll : "Scroll",
        Paginate : "Paginate"
    };
    
	/**
	 * The view mode for item trees.
	 *
	 * @enum {string}
	 * @public
	 */
	winui5Lib.TreeViewMode = {
		
		/**
		 * Display files as medium items.
		 * @public
		 */
		MediumItems : "MediumItems",
		
		/**
		 * Display files as small items.
		 * @public
		 */
		SmallItems : "SmallItems"
	};
	
	
	/*
	 * START IconUtils
	 */
	
	/**
	 * 
	 */
	winui5Lib.resolveIcon = function(sIconPath){
	    var mInfo = {};
	    if(0 === sIconPath.indexOf("sap-icon://")){
	        var mIconInfo = IconPool.getIconInfo(sIconPath) || {};
	        
	        mInfo.image = false;
            mInfo.fontFamily = mIconInfo.fontFamily;
            mInfo.content = mIconInfo.content;
            
            //console.log(mInfo);
	    }
	    else{
	        mInfo.image = true;
	        mInfo.src = sIconPath;
	    }
	    
	    return mInfo;
	};
	
	/**
	 * 
	 */
	winui5Lib.createIcon = function(sIconPath, sClass, sId, sCustomStyle){
	    var mInfo = winui5Lib.resolveIcon(sIconPath),
	        sHtml = "";
	    if(mInfo.image){
	        sHtml = '<span ';
            
            if(sClass){
                sHtml += 'class="' + sClass + '" ';
            }
            
            if(sId){
                sHtml += 'id="' + sId + '"';
            }
            
            if(sCustomStyle){
                sHtml += 'style="' + sCustomStyle + '"';
            }
            
            sHtml += '>';
            
            sHtml += '<img src="' + mInfo.src + '" />';
            
            sHtml += '</span>';
	    }
	    else{
	        var sStyle = "font-family:'" + mInfo.fontFamily + "';";
	        
	        sHtml = '<span ';
	        
	        if(sClass){
	            sHtml += 'class="' + sClass + '" ';
	        }
	        
	        if(sId){
	            sHtml += 'id="' + sId + '"';
	        }
	        
	        if(sCustomStyle){
                sStyle += sCustomStyle;
            }
	        
	        sHtml += 'style="' + sStyle + '"';
            
            sHtml += '>' + mInfo.content + '</span>';
	    }
	    return sHtml;  
	};
	
	/**
	 * TODO Not working ATM
	 */
	winui5Lib.updateIcon = function(elIcon, sIconPath){
	    
	    if(!elIcon){
	        //Should not happen
	        
	        //TODO fix
	        jQuery.sap.log.warning("Cannot update icon: undefined.");
	        return;
	    }
	    
	    var mInfo = winui5Lib.resolveIcon(sIconPath);
	    
	    if(mInfo.image){
	        elIcon.style.backgroundImage = "url('" + sIconPath + "')";
	    }
	    else{
	        elIcon.innerHTML = mInfo.content;
	    }
	};
	
	/*
	 * END IconUtils
	 */
	
	/*
	 * START AlignmentUtils
	 */
	
	winui5Lib.resolvePosition = function(vPosX, vPosY, elRef, iOffsetX, iOffsetY, bRelative){
        var mPos = elRef.getBoundingClientRect(),
                iPosLeft = mPos.left,
                iPosTop = mPos.top;
                
            
        if(bRelative){
            iPosLeft = 0;
            iPosTop = 0;
        }
        
        if(vPosX === "left"){
            vPosX = iPosLeft;
        }
        else if(vPosX === "center"){
            vPosX = iPosLeft + 0.5 * mPos.width;
        }
        else if(vPosX === "right"){
            vPosX = iPosLeft + mPos.width;
        }
        else{
            //TODO what is the origin for relative pixe values?
            //Currently its the left side for X values.
            vPosX = iPosLeft + vPosX;
        }
        
        if(vPosY === "top"){
            vPosY = iPosTop;
        }
        else if(vPosY === "center"){
            vPosY = iPosTop + 0.5 * mPos.height;
        }
        else if(vPosY === "bottom"){
            vPosY = iPosTop + mPos.height;
        }
        else{
            //TODO what is the origin for relative pixe values?
            //Currently its the top side for Y values.
            vPosY = iPosTop + vPosY;
        }
        
        
        if(iOffsetX){
            vPosX += iOffsetX;
        }
        
        if(iOffsetY){
            vPosY += iOffsetY;
        }
        
        mPos.x = vPosX;
        mPos.y = vPosY;
        
        return mPos;
    };
    
    /**
     * TODO Make more efficient
     */
    winui5Lib.arrayIntersect = function(arr1, arr2, bNot) {
        var r = [], o = {}, l = arr2.length, i, v;
        for (i = 0; i < l; i++) {
            o[arr2[i]] = arr2[i];
        }
        l = arr1.length;
        for (i = 0; i < l; i++) {
            v = arr1[i];
            if (v in o) {
                if(!bNot){
                	r.push(v);
                }
                else{
                	delete o[v];
                }
            }
            else{
            	if(bNot){
                	r.push(v);
                }
            }
        }
        
        if(bNot){
        	var aKeys = Object.keys(o);
        	l = aKeys.length;
        	for(var i = 0; i < l; i++){
        		r.push(o[aKeys[i]]);
        	}
        }
        //console.log(r);
        return r;
    }
	
	/*
	 * END AlignmentUtils
	 */
    
    /**
     * Tests whether control oSearch contains the control oControl
     */
    winui5Lib.containsControl = function(oSearch, oControl){
        while(oControl){
            if(oControl === oSearch){
                return true;
			}
			if(oControl.isA("pks.ui5.IOwnedElement")){
				oControl = oControl.retrieveOwner();
			}
			else{
				oControl = oControl.getParent();
			}
        }
        
        return false;
    };
	
	//Return constructor
	return winui5Lib;
});