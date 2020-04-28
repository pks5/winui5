/*
 * 
 * WinUi5
 *
 * pks.winui5.DropdownMenuItemRenderer
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
sap.ui.define(["./library", "./ItemRenderer"], function(winui5Lib, ItemRenderer) {
	
	"use strict";
	
	var DropdownMenuItemRenderer = {};
	
	/**
	 * Renders a file item.
	 */
	DropdownMenuItemRenderer.render = function(rm, oMenuItem){
	    
		var bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility(),
		    oMenu = oMenuItem.getItemContainer(),
		    sIcon = oMenuItem.getIcon(),
		    sText = oMenuItem.getText(),
            sAdditionalText = oMenuItem.getAdditionalText();
		
		ItemRenderer.startRender(rm, oMenuItem, oMenu);
		
		ItemRenderer.startRenderItem(rm, oMenuItem, oMenu);
		
		ItemRenderer.startRenderItemContent(rm, oMenuItem, oMenu);
		
		rm.write('<div class="' + oMenuItem.createStyleClass("first") + '">');
		
		ItemRenderer.renderCheckbox(rm, oMenuItem, oMenu);
		
		//START DropdownMenuItem
		sIcon && rm.write(winui5Lib.createIcon(sIcon, oMenuItem.createStyleClass("icon")));
		
		if(sText){
    		rm.write('<div class="' + oMenuItem.createStyleClass("text") + '" id="' + oMenuItem.createSubId("text") + '">');
    		rm.writeEscaped(sText);
    		rm.write("</div>");
		}
		
		rm.write("</div>");
		
		rm.write('<div class="' + oMenuItem.createStyleClass("last") + '">');
		
		if(sAdditionalText){
		    rm.write('<div class="' + oMenuItem.createStyleClass("additionalText") + '" id="' + oMenuItem.createSubId("additionalText") + '">');
	        rm.writeEscaped(sAdditionalText);
	        rm.write("</div>");
		}
		
		//END DropdownMenuItem
		if(oMenuItem.getItems().length){
		    ItemRenderer.renderExpandIcon(rm, oMenuItem, oMenu);
		}
		
		rm.write("</div>");
		
		ItemRenderer.endRenderItemContent(rm, oMenuItem, oMenu);
		
		ItemRenderer.endRenderItem(rm, oMenuItem, oMenu);
        
		ItemRenderer.renderChildren(rm, oMenuItem, oMenu);
        
		ItemRenderer.endRender(rm, oMenuItem, oMenu);
	};
	
	//Return Renderer
	return DropdownMenuItemRenderer;
});