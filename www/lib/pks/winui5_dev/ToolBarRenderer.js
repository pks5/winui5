/*
 * 
 * WinUi5
 *
 * pks.winui5.FileExplorerRenderer
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
    
    var ToolBarRenderer = {};
    
    /**
     * Renders a file item.
     */
    ToolBarRenderer.render = function(rm, oToolBar){
        var aContent = oToolBar.getContent();
        
        rm.write("<div");
        rm.writeControlData(oToolBar);
        rm.addClass(oToolBar.createStyleClass());
        rm.writeClasses();
        rm.write(">");
        
        for(var i = 0; i < aContent.length; i++){
            rm.renderControl(aContent[i]);
        }
        
        rm.write("</div>");
    };
    
    //Return Renderer
    return ToolBarRenderer;
});