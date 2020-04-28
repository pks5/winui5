/*
 * 
 * WinUi5
 *
 * pks.winui5.DialogRenderer
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
sap.ui.define(['jquery.sap.global', "./DialogBase", "./Dialog", "./library"], function(jQuery, DialogBase, Dialog, winui5Lib) {
    
    "use strict";
    
    var DialogRenderer = {};
    
    /**
     * Renders a file item.
     */
    DialogRenderer.render = function(rm, oDialog){
        var aButtons = oDialog.getButtons();
        
        
        rm.write("<div");
        rm.writeControlData(oDialog);
        rm.addClass(oDialog.createStyleClass());
        rm.writeClasses();
        rm.write(">");
        
        rm.write("<div");
        rm.addClass(Dialog.createStyleClass("tex"));
        rm.writeClasses();
        rm.write(">");
        rm.write("Hallo 123");
        rm.write("</div>");
        
        rm.write("<div");
        rm.addClass(Dialog.createStyleClass("addTex"));
        rm.writeClasses();
        rm.write(">");
        rm.write("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.");
        rm.write("</div>");
        
        if(aButtons.length){
            rm.write("<div");
            rm.addClass(DialogBase.createStyleClass("but"));
            rm.writeClasses();
            rm.write(">");
            
            for(var i = 0; i < aButtons.length; i++){
                rm.renderControl(aButtons[i]);
            }
            
            rm.write("</div>");
        }
        
        rm.write("</div>");
    };
    
    return DialogRenderer;
    
}, true);