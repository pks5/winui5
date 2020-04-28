/*
 * 
 * WinUi5
 *
 * pks.winui5.ObjectList
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

sap.ui.define(['./library', "./ObjectContainerBase", "./ElementHelper", "./OverlaySupport", "./ItemContainerOverlaySupport", "./MouseSelectionSupport", "./ListNavigationSupport", "./ObjectListRenderer"], function(winui5Lib, ObjectContainerBase, ElementHelper, OverlaySupport, ItemContainerOverlaySupport, MouseSelectionSupport, ListNavigationSupport, ObjectListRenderer){
	
	"use strict";
	
	var oMetadata = {

			library : "pks.winui5",
			
			properties : {
			    
				/**
				 * Defines the view mode.
				 */
				viewMode : {
					type : "pks.winui5.ListViewMode",
					defaultValue : winui5Lib.ListViewMode.MediumItems
				}
			},
			
			aggregations : {},
			
			events : {}
				
		};
	
	OverlaySupport.addMetadata(oMetadata);
	MouseSelectionSupport.addMetadata(oMetadata);
	ListNavigationSupport.addMetadata(oMetadata);
	
	/**
	 * Constructor for a new ObjectList instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating file lists.
	 * @extends pks.winui5.ItemContainer
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.8-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.winui5.ObjectList
	 * 
	 */
	var ObjectList = ObjectContainerBase.extend("pks.winui5.ObjectList", /** @lends pks.winui5.ObjectList.prototype */{ 
		metadata : oMetadata,
		renderer: ObjectListRenderer
	}),
	/**
	 * @alias pks.winui5.ObjectList.prototype
	 */
	ObjectListProto = ObjectList.prototype;
	
	/*
	 * START apply helpers
	 */
	
	/**
	 * Returns the style prefix for this control.
	 * 
	 * @return {string} The style prefix of this control.
	 */
	ObjectList.getStylePrefix = function(){
		return "winui5ObjLis";
	};
	
	/**
	 * Returns the additional style class(es) for this control.
	 * 
	 * @return {string} - The additional style classes.
	 */
	ObjectListProto.getAdditionalStyleClass = function(){
		return ObjectContainerBase.prototype.getAdditionalStyleClass.call(this) + " " + ObjectContainerBase.getStylePrefix();
	};
	
	//Add element helpers
	ElementHelper.addHelpers(ObjectList);
	
	OverlaySupport.addMethods(ObjectListProto);
	ItemContainerOverlaySupport.addMethods(ObjectListProto);
	MouseSelectionSupport.addMethods(ObjectListProto);
	ListNavigationSupport.addMethods(ObjectListProto);
	
	/*
	 * END apply helpers
	 */
	
	
	ObjectListProto.init = function(){
		ObjectContainerBase.prototype.init.call(this);
		
		OverlaySupport.onInit(this);
		MouseSelectionSupport.onInit(this);
		ListNavigationSupport.onInit(this);
	};
	
	ObjectListProto.exit = function(){
		ObjectContainerBase.prototype.exit.call(this);
		
		OverlaySupport.onExit(this);
		MouseSelectionSupport.onExit(this);
	};
	
	/*
	 * START override setters
	 */
	
	/**
     * Returns whether this list is displayed as grid
     * @return {boolean} Whether this list is displayed as a grid.
     */
	ObjectListProto.getLayout = function(){
        var sViewMode = this.getViewMode();
        
        return sViewMode === winui5Lib.ListViewMode.SmallTiles
        || sViewMode === winui5Lib.ListViewMode.MediumTiles
        || sViewMode === winui5Lib.ListViewMode.MediumIcons
        || sViewMode === winui5Lib.ListViewMode.LargeIcons ? "Grid" : "VerticalList";
    };
    
    
	
	/**
	 * Sets the view mode for this list.
	 * 
	 * @param {string} sViewMode - The new view mode.
	 * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation.
	 * 
	 * @return {pks.winui5.ObjectList} - Reference to this for method chaining.
	 */
	ObjectListProto.setViewMode = function(sViewMode, bSuppressInvalidate){
		ObjectContainerBase.prototype.setViewMode.call(this, sViewMode, bSuppressInvalidate, winui5Lib.ListViewMode);
		
		return this;
	};
	
	/*
	 * END override setters
	 */
	
	//Return constructor
	return ObjectList;
});