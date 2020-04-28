/*
 * 
 * WinUi5
 *
 * pks.winui5.FileItemRenderer
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
sap.ui.define(["./library", "./ItemRenderer", "sap/ui/core/format/FileSizeFormat", "sap/ui/core/format/DateFormat"], function(winui5Lib, ItemRenderer, FileSizeFormat, DateFormat) {
	
	"use strict";
	
	var FileItemRenderer = {},
		_dateFormatter = DateFormat.getDateTimeInstance({
			style : "short"
		});
	
	/**
	 * Renders a file item.
	 */
	FileItemRenderer.render = function(rm, oFileItem){
		var bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility(),
		    oContainer = oFileItem.getItemContainer(),
		    bTreeBinding = oContainer.isTreeBinding("items"),
		    fnLevelGap = oContainer.getLevelGap,
        
            sFileName = oFileItem.getName(),
			sDescription = oFileItem.getDescription(),
			sValue = oFileItem.getValue(),
			sValueType = oFileItem.getValueType(),
			oValueDate = oFileItem.resolveValueDate(),
			sClasses = null,
			sItemStyle,
			sChildrenStyle,
			sExpandIconStyle,
			
			sRole = oFileItem.determineRole(),
            sIconUrl = oFileItem.determineIcon(oFileItem.getIcon(), sRole);
        
        if(sDescription){
			sClasses = oFileItem.createStyleFlag("WithDescription");
		}

		if(sValue){
			if(sValueType === winui5Lib.FileItemValueType.FileSize){
				sValue = FileSizeFormat.getInstance({
					decimals : 0
				}).format(sValue);
			}
		}
        
        if(bTreeBinding && fnLevelGap){
            var sGap = fnLevelGap.call(oContainer);
            sItemStyle = "padding-left:" + sGap + "px";
            sChildrenStyle = "margin-left:" + sGap + "px";
            sExpandIconStyle = "width:" + sGap + "px";
        }
        
        ItemRenderer.startRender(rm, oFileItem, oContainer, sClasses);
        
        ItemRenderer.startRenderItem(rm, oFileItem, oContainer, sItemStyle);
		
		if(bTreeBinding && oFileItem.getItems().length){
		    ItemRenderer.renderExpandIcon(rm, oFileItem, oContainer, sExpandIconStyle);
		}
		
		ItemRenderer.startRenderItemContent(rm, oFileItem, oContainer);
		
		
        
        //START file
		
		//Icon
		rm.write('<img class="' + oFileItem.createStyleClass("icon") + '" id="' + oFileItem.createSubId("icon") + '" draggable="false"');
		rm.writeAttributeEscaped("src", sIconUrl);
		rm.writeAttributeEscaped("alt", sRole);
		rm.write("/>");
		
		ItemRenderer.renderCheckbox(rm, oFileItem, oContainer);
		
		//Name
		rm.write('<div class="' + oFileItem.createStyleClass("name") + '" id="' + oFileItem.createSubId("name") + '">');
		rm.writeEscaped(sFileName);
		rm.write("</div>");
		
		
		
		//Description
		rm.write('<div class="' + oFileItem.createStyleClass("description") + '" id="' + oFileItem.createSubId("description") + '">');
		sDescription && rm.writeEscaped(sDescription);
		rm.write("</div>");
		
		//Value
		rm.write('<div class="' + oFileItem.createStyleClass("value") + '" id="' + oFileItem.createSubId("value") + '">');
		sValue && rm.writeEscaped(sValue);
		rm.write("</div>");
		
		//Value Date
		rm.write('<div class="' + oFileItem.createStyleClass("valueDate") + '" id="' + oFileItem.createSubId("valueDate") + '">');
		oValueDate && rm.write(_dateFormatter.format(oValueDate));
		rm.write("</div>");

		//END file
		
		ItemRenderer.endRenderItemContent(rm, oFileItem, oContainer);
		
		ItemRenderer.endRenderItem(rm, oFileItem, oContainer);
		
		ItemRenderer.renderChildren(rm, oFileItem, oContainer, sChildrenStyle);
		
		ItemRenderer.endRender(rm, oFileItem, oContainer);
	};
	
	//Return Renderer
	return FileItemRenderer;
});