/*
 * 
 * WinUi5
 *
 * pks.winui5.FlexLayoutRenderer
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
sap.ui.define(["./library"], function(winui5Lib) {
    
    "use strict";
    
    var FlexLayoutRenderer = {};
    
    /**
     * Renders a file item.
     */
    FlexLayoutRenderer.render = function(rm, oFlexLayout){
        var aItems = oFlexLayout.getItems();
        
        rm.write("<div");
        rm.writeControlData(oFlexLayout);
        rm.addClass(oFlexLayout.createStyleClass());
        rm.writeClasses();
        rm.write(">");
        
        for(var i = 0; i < aItems.length; i++){
        	var oItem = aItems[i],
        		aContentItem = oItem.getContent(),
        		sFlex = oItem.getFlex();
        	
	        rm.write("<div");
	        
	        if(sFlex){
	            rm.write(' style="flex: ' + sFlex + ';"');
	        }
	        
	        rm.writeElementData(oItem);
	        //TODO use static style class!
	        rm.addClass(oItem.createStyleClass());
	        rm.writeClasses();
	        rm.write(">");
	        for(var j = 0; j < aContentItem.length; j++){
	            rm.renderControl(aContentItem[j]);
	        }
	        rm.write("</div>");
        }
        
        rm.write("</div>");
    };
    
    //Return Renderer
    return FlexLayoutRenderer;
});