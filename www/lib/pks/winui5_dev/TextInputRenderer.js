/*
 * 
 * WinUi5
 *
 * pks.winui5.TextInputRenderer
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
    
    var TextInputRenderer = {};
    
    /**
     * Renders a file item.
     */
    TextInputRenderer.render = function(rm, oTextInput){
        var aContentBefore = oTextInput.getContentBefore(),
            aContentAfter = oTextInput.getContentAfter();
        
        rm.write("<div");
        rm.writeControlData(oTextInput);
        rm.addClass(oTextInput.createStyleClass());
        rm.writeClasses();
        rm.write(">");
        
        if(aContentBefore.length){
            rm.write("<div");
            rm.addClass(oTextInput.createStyleClass("contentBefore"));
            rm.writeClasses();
            rm.write(">");
            
            rm.write("</div>");
        }
        
        rm.write("<div");
        rm.addClass(oTextInput.createStyleClass("contentInput"));
        rm.writeClasses();
        rm.write(">");
        
        rm.write('<input id="' + oTextInput.createSubId("input") + '" placeholder="' + oTextInput.getPlaceholder() + '"');
        rm.addClass(oTextInput.createStyleClass("input"));
        rm.writeClasses();
        rm.writeAttribute("type", oTextInput.getTypeMapping(oTextInput.getType()));
        if(!oTextInput.getEnabled()){
            rm.writeAttribute("disabled", "disabled");
        }
        if(oTextInput.getReadOnly()){
            rm.writeAttribute("readonly", "readonly");
        }
        rm.writeAttribute("value", oTextInput.getValue());
        rm.write(" />");
        
        rm.write("</div>");
        
        if(aContentAfter.length){
            rm.write("<div");
            rm.addClass(oTextInput.createStyleClass("contentAfter"));
            rm.writeClasses();
            rm.write(">");
            
            rm.write("</div>");
        }
        
        rm.write("</div>");
    };
    
    return TextInputRenderer;
    
});