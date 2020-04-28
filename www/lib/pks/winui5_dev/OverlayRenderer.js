/*
 * 
 * WinUi5
 *
 * pks.winui5.OverlayRenderer
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
    
    var OverlayRenderer = {};
    
    /**
     * Renders a file item.
     */
    OverlayRenderer.render = function(rm, oOverlay){
        rm.write('<div tabindex="0"');
        rm.writeControlData(oOverlay);
        rm.addClass(oOverlay.createStyleClass());
        rm.writeClasses();
        rm.write(">");
        
        rm.write("<div");
        rm.addClass(oOverlay.createStyleClass("content"));
        rm.writeClasses();
        rm.write(">");
        
        rm.renderControl(oOverlay.getContent());
        
        rm.write("</div>");
        
        rm.write("</div>");
    };
    
    return OverlayRenderer;
    
});