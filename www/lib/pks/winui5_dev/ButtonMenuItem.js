/*
 * 
 * WinUi5
 *
 * pks.winui5.ButtonMenuItem
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

sap.ui.define(["./library", "./MenuItemBase", "./ElementHelper", "./OverlaySupport", "./ItemContainerOverlaySupport", "./ButtonMenuItemRenderer"], function(winui5Lib, MenuItemBase, ElementHelper, OverlaySupport, ItemContainerOverlaySupport, ButtonMenuItemRenderer){
	
	"use strict";
	
	var oMetadata = {
			library : "pks.winui5",
			
			properties : {
				
			},
			aggregations : {
			    
			},
			events : {
			    
			}
		};
	
	OverlaySupport.addMetadata(oMetadata, true);
	
	/**
	 * Constructor for a new ButtonMenuItem instance.
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
	 * @alias pks.winui5.ButtonMenuItem
	 * 
	 */
	var ButtonMenuItem = MenuItemBase.extend("pks.winui5.ButtonMenuItem", /** @lends pks.winui5.ButtonMenuItem.prototype */ { 
		metadata : oMetadata,
		renderer: ButtonMenuItemRenderer
	}),
	/**
	 * @alias pks.winui5.ButtonMenuItem.prototype
	 */
	ButtonMenuItemProto = ButtonMenuItem.prototype;
	
	/*
	 * START apply helpers
	 */
	
	/**
	 * Returns the style prefix for this control
	 * 
	 * @return {string} - The style class prefix
	 */
	ButtonMenuItem.getStylePrefix = function(){
		return "winui5ButMenIte";
	};
	
	/**
	 * Returns the additional style class(es) for this control.
	 * 
	 * @return {string} - The additional style classes.
	 */
	ButtonMenuItemProto.getAdditionalStyleClass = function(){
		return MenuItemBase.prototype.getAdditionalStyleClass.call(this) + " " + MenuItemBase.getStylePrefix();
	};
	
	//Add the helpers
	ElementHelper.addHelpers(ButtonMenuItem);
	
	OverlaySupport.addMethods(ButtonMenuItemProto, true);
	ItemContainerOverlaySupport.addMethods(ButtonMenuItemProto);
	
	/*
	 * END apply helpers
	 */
	
	/*
	 * START Lifecycle
	 */
	
	/**
	 * Called when the element is initialized.
	 * 
	 * @protected
	 * @override
	 */
	ButtonMenuItemProto.init = function(){
	    OverlaySupport.onInit(this);
	};
	
	/**
	 * Called when the element is destroyed.
	 * 
	 * @protected
	 * @override
	 */
	ButtonMenuItemProto.exit = function(){
	    OverlaySupport.onExit(this);
	};
	
	/*
	 * END Lifecycle
	 */
	
	//Return Constructor
	return ButtonMenuItem;
});