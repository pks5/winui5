/*
 * 
 * WinUi5
 *
 * pks.winui5.ButtonRenderer
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
    
    var ButtonRenderer = {};
    
    /**
     * Renders a file item.
     */
    ButtonRenderer.render = function(rm, oButton){
        var sItemTitle = oButton._getHtmlTitle(),
            bAccessibility = sap.ui.getCore().getConfiguration().getAccessibility(),
            sIcon = oButton.getIcon(),
            sText = oButton.getText();
        
        rm.write("<button");
        rm.writeControlData(oButton);
        rm.addClass(oButton.createStyleClass());
        rm.writeClasses();
        
        if(sItemTitle){
            rm.writeAttribute("title", sItemTitle);
        }

        if(!oButton.getEnabled()){
            rm.writeAttribute("disabled", "disabled");
        }
        
        rm.write(">");
        
        sIcon && rm.write(winui5Lib.createIcon(sIcon, oButton.createStyleClass("icon")));
        
        if(sText){
            rm.write('<div class="' + oButton.createStyleClass("text") + '" id="' + oButton.createSubId("text") + '">');
            rm.writeEscaped(sText);
            rm.write("</div>");
        }
        
        rm.write("</button>");
    };
    
    return ButtonRenderer;
    
});