/*
 * 
 * WinUi5
 *
 * pks.winui5.DropdownMenuItem
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

sap.ui.define(["./library", "./MenuItemBase", "./ElementHelper", "./DropdownMenuItemRenderer"], function(winui5Lib, MenuItemBase, ElementHelper, DropdownMenuItemRenderer){
	
	"use strict";
	
	var oMetadata = {
			library : "pks.winui5",
			
			properties : {
			    /**
                 * Indicates whether the file can be selected.
                 */
                selectable : {
                    type: "boolean", 
                    defaultValue : false
                }
			}
		};
	
	/**
	 * Constructor for a new DropdownMenuItem instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating menu items.
	 * @extends pks.winui5.MenuItem
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.8-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.winui5.DropdownMenuItem
	 * 
	 */
	var DropdownMenuItem = MenuItemBase.extend("pks.winui5.DropdownMenuItem", /** @lends pks.winui5.DropdownMenuItem.prototype */ { 
		metadata : oMetadata,
		renderer: DropdownMenuItemRenderer
	}),
	/**
	 * @alias pks.winui5.DropdownMenuItem.prototype
	 */
	DropdownMenuItemProto = DropdownMenuItem.prototype;
	
	/*
	 * START apply helpers
	 */
	
	/**
	 * Returns the style prefix for this control
	 * 
	 * @return {string} - The style class prefix
	 */
	DropdownMenuItem.getStylePrefix = function(){
		return "winui5DroMenIte";
	};
	
	/**
	 * Returns the additional style class(es) for this control.
	 * 
	 * @return {string} - The additional style classes.
	 */
	DropdownMenuItemProto.getAdditionalStyleClass = function(){
		return MenuItemBase.prototype.getAdditionalStyleClass.call(this) + " " + MenuItemBase.getStylePrefix();
	};
	
	//Add the helpers
	ElementHelper.addHelpers(DropdownMenuItem);
	
	/*
	 * END apply helpers
	 */
	
	//Return Constructor
	return DropdownMenuItem;
});