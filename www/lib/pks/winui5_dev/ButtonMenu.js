/*
 * 
 * WinUi5
 *
 * pks.winui5.ButtonMenu
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

sap.ui.define(['./library', "./MenuBase", "./ElementHelper", "./OverlaySupport", "./ItemContainerOverlaySupport", "./ListNavigationSupport"], function(winui5Lib, MenuBase, ElementHelper, OverlaySupport, ItemContainerOverlaySupport, ListNavigationSupport){
	
	"use strict";
	
	var oMetadata = {
			library : "pks.winui5",
			
			properties : {
				/*
			    selectionMode : {
				    type : "pks.winui5.SelectionMode",
                    defaultValue : winui5Lib.SelectionMode.Single
				},
				
				activateAction : {
                    type : "pks.winui5.ActivateAction",
                    defaultValue : winui5Lib.ActivateAction.Toggle
                }
                */
			    
			    viewMode : {
			        type : "pks.winui5.ButtonMenuViewMode",
			        defaultValue : winui5Lib.ButtonMenuViewMode.ListHor
			    }
			},
			events:{
			    
			},
			aggregations : {
			    
			}
		};
	
	OverlaySupport.addMetadata(oMetadata);
	ListNavigationSupport.addMetadata(oMetadata);
	
	/**
	 * Constructor for a new Menu instance.
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
	 * @alias pks.winui5.ButtonMenu
	 * 
	 */
	var ButtonMenu = MenuBase.extend("pks.winui5.ButtonMenu", /** @lends pks.winui5.ButtonMenu.prototype */ { 
		metadata : oMetadata,
		
		renderer : "pks.winui5.ItemContainerRenderer"
	
	}),
	/**
	 * @alias pks.winui5.ButtonMenu.prototype
	 */
	ButtonMenuProto = ButtonMenu.prototype;
	
	/*
	 * START apply helpers
	 */
	
	/**
	 * Returns the style prefix for this control.
	 * 
	 * @return {string} The style prefix of this control.
	 */
	ButtonMenu.getStylePrefix = function(){
		return "winui5ButMen";
	};
	
	/**
	 * Returns the additional style class(es) for this control.
	 * 
	 * @return {string} - The additional style classes.
	 */
	ButtonMenuProto.getAdditionalStyleClass = function(){
		return MenuBase.prototype.getAdditionalStyleClass.call(this) + " " + MenuBase.getStylePrefix()
		
		    + " " + ButtonMenu.createStyleFlag("viewMode", this.getViewMode());
	};
	
	//Add element helpers
	ElementHelper.addHelpers(ButtonMenu);
	
	OverlaySupport.addMethods(ButtonMenuProto);
	ItemContainerOverlaySupport.addMethods(ButtonMenuProto);
	ListNavigationSupport.addMethods(ButtonMenuProto);
	/*
	 * END apply helpers
	 */
	
	ButtonMenuProto.init = function(){
        MenuBase.prototype.init.call(this);
        
        OverlaySupport.onInit(this);
        ListNavigationSupport.onInit(this);
    };
    
    ButtonMenuProto.exit = function(){
        MenuBase.prototype.exit.call(this);
        
        OverlaySupport.onExit(this);
        ListNavigationSupport.onExit(this);
    };
    
    ButtonMenuProto.getLayout = function(){
        return "HorizontalList";
    };
	
    return ButtonMenu;
	
});