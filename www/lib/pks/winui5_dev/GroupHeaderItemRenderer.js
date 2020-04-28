/*
 * 
 * WinUi5
 *
 * pks.winui5.GroupHeaderItemRenderer
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
sap.ui.define(['jquery.sap.global', "./library"], function(jQuery, winui5Lib) {
    
    "use strict";
    
    var GroupHeaderItemRenderer = {};
    
    /**
     * Renders the head of the item.
     * 
     * @param {sap.ui.core.RenderManager} rm - The render manager
     * @param {pks.winui5.ItemBase} oItem - The item to render.
     * @param {string} sStyle - Custom css style for the root node.
     */
    GroupHeaderItemRenderer.render = function(rm, oItem){
        
      //Node
        rm.write("<li");
        
        rm.writeControlData(oItem);
        
        rm.addClass(oItem.createStyleClass());
        
        rm.writeClasses();
        
        //rm.writeAttribute("role", bTreeBinding ? "treeitem" : "listitem");
        
        rm.write(">");
        
        
        rm.write('<div id="' + oItem.createSubId("item") + '"');
        rm.addClass(oItem.createStyleClass("item"));
        rm.writeClasses();
        rm.write(">");
        rm.writeEscaped(oItem.getTitle());
        rm.write("</div>");
        
        rm.write("</li>");
    };
    
    return GroupHeaderItemRenderer;
});