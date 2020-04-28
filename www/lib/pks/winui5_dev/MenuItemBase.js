/*
 * 
 * WinUi5
 *
 * pks.winui5.MenuItemBase
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

sap.ui.define(["./library", "./ItemBase", "./ElementHelper"], function(winui5Lib, ItemBase, ElementHelper){
	
	"use strict";
	
	var oMetadata = {
			library : "pks.winui5",
			
			properties : {
			    
                icon : {
                    type : "sap.ui.core.URI"
                },
                
				/**
				 * Item name to be displayed.
				 */
				text : {
					type : "string", 
					group : "Misc"
				},
				
				additionalText : {
				    type : "string"
				}
			}
		};
	
	/**
	 * Constructor for a new MenuItem instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating menu items.
	 * @extends pks.winui5.Item
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.8-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.winui5.MenuItem
	 * 
	 */
	var MenuItemBase = ItemBase.extend("pks.winui5.MenuItemBase", /** @lends pks.winui5.MenuItemBase.prototype */ { 
		metadata : oMetadata,
		renderer: null
	}),
	/**
	 * @alias pks.winui5.MenuItemBase.prototype
	 */
	MenuItemBaseProto = MenuItemBase.prototype;
	
	/*
	 * START apply helpers
	 */
	
	/**
	 * Returns the style prefix for this control
	 * 
	 * @return {string} - The style class prefix
	 */
	MenuItemBase.getStylePrefix = function(){
		return "winui5MenIteBas";
	};
	
	/**
	 * Returns the additional style class(es) for this control.
	 * 
	 * @return {string} - The additional style classes.
	 */
	MenuItemBaseProto.getAdditionalStyleClass = function(){
		return ItemBase.getStylePrefix();
	};
	
	//Add the helpers
	ElementHelper.addHelpers(MenuItemBase);
	
	/*
	 * END apply helpers
	 */
	
	//Return Constructor
	return MenuItemBase;
});