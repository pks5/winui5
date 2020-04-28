/*
 * 
 * WinUi5
 *
 * pks.winui5.ObjectTree
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

sap.ui.define(["./library", "./ObjectContainerBase", "./ElementHelper", "./OverlaySupport", "./ItemContainerOverlaySupport", "./MouseSelectionSupport", "./TreeNavigationSupport"], function(winui5Lib, ObjectContainerBase, ElementHelper, OverlaySupport, ItemContainerOverlaySupport, MouseSelectionSupport, TreeNavigationSupport){
	
	"use strict";
	
	var mMetadata = {

			interfaces : ["pks.ui5.IExpandableItemContainer"],
			
			library : "pks.winui5",
			
			properties : {
				levelGap : {
					type : "int",
					defaultValue : 22
				},
				
				scrollX : {
					type : "pks.winui5.TreeScrollX",
					defaultValue : winui5Lib.TreeScrollX.Paginate
				},
				
				expandIconVisibility : {
                    type : "pks.winui5.ExpandIconVisibility",
                    defaultValue : winui5Lib.ExpandIconVisibility.Hover
                },
				
				/**
				 * Defines the view mode.
				 */
				viewMode : {
					type : "pks.winui5.TreeViewMode",
					defaultValue : winui5Lib.TreeViewMode.MediumItems
				}
			},
			
			aggregations : {
				
			},
			
			events : {
				
			}
		};
	
	OverlaySupport.addMetadata(mMetadata);
	MouseSelectionSupport.addMetadata(mMetadata);
	TreeNavigationSupport.addMetadata(mMetadata);
	
	/**
	 * Constructor for a new ObjectTree instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating file trees.
	 * @extends pks.winui5.ObjectContainerBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.8-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.winui5.ObjectTree
	 * 
	 */
	var ObjectTree = ObjectContainerBase.extend("pks.winui5.ObjectTree", /** @lends pks.winui5.ObjectTree.prototype */{ 
		metadata : mMetadata
	}),
	/**
	 * @alias pks.winui5.ObjectTree.prototype
	 */
	ObjectTreeProto = ObjectTree.prototype;
	
	ObjectTreeProto.ROOT_LEVEL = 0;
	
	/*
	 * START apply helpers
	 */
	
	/**
	 * Returns the style prefix for this control.
	 * 
	 * @return {string} The style prefix of this control.
	 */
	ObjectTree.getStylePrefix = function(){
		return "winui5ObjTre";
	};
	
	/**
	 * Returns the additional style class(es) for this control.
	 * 
	 * @return {string} - The additional style classes.
	 */
	ObjectTreeProto.getAdditionalStyleClass = function(){
		return ObjectContainerBase.prototype.getAdditionalStyleClass.call(this) + " " + ObjectContainerBase.getStylePrefix();
	};
	
	//Add element helpers
	ElementHelper.addHelpers(ObjectTree);
	
	OverlaySupport.addMethods(ObjectTreeProto);
	ItemContainerOverlaySupport.addMethods(ObjectTreeProto);
    
	MouseSelectionSupport.addMethods(ObjectTreeProto);
	TreeNavigationSupport.addMethods(ObjectTreeProto);
	/*
	 * END apply helpers
	 */
	
	/*
	 * START Lifecycle
	 */
	
	/**
	 * Called when the control is initialized.
	 * 
	 * @override
	 * @protected
	 */
	ObjectTreeProto.init = function(){
		ObjectContainerBase.prototype.init.call(this);
		
		this._iLevelFocus = this.ROOT_LEVEL;
		
		//Call OverlaySupport initializer
		OverlaySupport.onInit(this);
		MouseSelectionSupport.onInit(this);
		TreeNavigationSupport.onInit(this);
	};
	
	ObjectTreeProto.exit = function(){
		ObjectContainerBase.prototype.exit.call(this);
		
		OverlaySupport.onExit(this);
		MouseSelectionSupport.onExit(this);
		TreeNavigationSupport.onExit(this);
	};
	
	/**
	 * Returns whether the given aggregation uses tree binding.
	 * 
	 * @param {string} sName - The aggregation name.
	 * 
	 * @return {boolean} Whether to use tree binding for the given aggregation.
	 * 
	 * @protected
	 * @override
	 */
	ObjectTreeProto.isTreeBinding = function(sName) {
		return sName === "items";
	};
	
	/*
	 * END Lifecycle
	 */
	
	
	/*
	 * START Helpers
	 */
	
	/**
	 * Sets the view
	 * 
	 * @param {string} sViewMode - The new view mode.
	 * @param {boolean} bSuppressInvalidate - Whether to suppress invalidation.
	 * 
	 * @return {pks.winui5.ObjectTree} - Reference to this for method chaining.
	 */
	ObjectTreeProto.setViewMode = function(sViewMode, bSuppressInvalidate){
		ObjectContainerBase.prototype.setViewMode.call(this, sViewMode, bSuppressInvalidate, winui5Lib.TreeViewMode);
		
		return this;
	};
	
	/**
	 * Sets the current level focus.
	 * 
	 * @param {pks.winui5.Item} oitem - The item to set the focus to.
	 * 
	 * @return {pks.winui5.ObjectTree} Reference to this for method chaining.
	 * 
	 * @protected
	 */
	ObjectTreeProto.setLevelFocus = function(oItem) {
		if(winui5Lib.TreeScrollX.Paginate === this.getScrollX()){
			var iNewLevelFocus = this.determineItemLevel(oItem);
			
			if(this.getDomRef()){
				this.getSubDomRef("children").style.left = (-iNewLevelFocus * this.getLevelGap()) + "px";
			}
			
			this._iLevelFocus = iNewLevelFocus;
		}
		
		return this;
	};
	
	/**
	 * Sets the current item.
	 * 
	 * @param {pks.winui5.Item} oNode - The node to set as current node.
	 * 
	 * @return {pks.winui5.ObjectTree} Reference to this for method chaining.
	 * 
	 * @public
	 * @override
	 */
	ObjectTreeProto.setActiveItem = function(oNode, mOptions){
		ObjectContainerBase.prototype.setActiveItem.call(this, oNode, mOptions);
		
		this.setLevelFocus(oNode);
		
		return this;
	};
	
	/**
	 * Sets the expanded state of the given node.
	 * 
	 * @param {pks.winui5.Item} oNode - The node to set the collapse state for.
	 * @param {boolean} bExpanded - The new expanded state.
	 * 
	 * @return {pks.winui5.ObjectTree} Reference to this for method chaining.
	 * 
	 * @public
	 */
	ObjectTreeProto.setNodeExpanded = function(oNode, bExpanded, bSuppressChangeEvent){
		var bOldExpanded = oNode.getExpanded(),
			aChildNodes = oNode.getItems(),
			bNewExpanded = !!aChildNodes.length && bExpanded;
		
		if(bOldExpanded && !bNewExpanded){
			//Node has been closed
			
			//Remove selections in children.
			var mChanges = this.changeSelection(oNode, "ALL", "remove", this.getDefaultSelectionGroup(), bSuppressChangeEvent),
				oActiveItem = this.getActiveItem();
			
			//If the current node is within the children, set it to the parent node.
			if(oActiveItem && oActiveItem !== oNode && -1 !== jQuery.inArray(oActiveItem, mChanges.tested)){
				//TODO
				this.setActiveItem(oNode);
			}
			else{
				this.setLevelFocus(oNode);
			}
		}
		
		oNode.setExpanded(bNewExpanded);
		
		//Make sure all child nodes are visible if the node has been expanded.
		if(!bOldExpanded && bNewExpanded){
			//Node has been opened
			
			//First set scrolling to last child node
			this.scrollToItem(aChildNodes[aChildNodes.length - 1], oNode);
			
			this.setLevelFocus(oNode);
		}
		
		return this;
	};
	
	
	/*
	 * END Helpers
	 */
	
	//Return constructor
	return ObjectTree;
});