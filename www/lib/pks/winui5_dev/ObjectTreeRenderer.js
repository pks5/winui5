/*
 * 
 * WinUi5
 *
 * pks.winui5.ObjectTreeRenderer
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
sap.ui.define(['jquery.sap.global', "./library", "./ObjectTree", "./ItemContainerRenderer"], function(jQuery, winui5Lib, ObjectTree, ItemContainerRenderer) {
    
    "use strict";
    
    var FileTreeRenderer = {};
    
    /**
     * Renders the tree.
     */
    FileTreeRenderer.render = function(rm, oFileTree) {
        var sScrollX = oFileTree.getScrollX(),
            sClass = ObjectTree.createStyleFlag("scrollX", sScrollX),
            sChildrenStyle;
        
        sClass += " " + ObjectTree.createStyleFlag("expandIconVisibility", oFileTree.getExpandIconVisibility());
        
		
        
        //TODO This is only relevant for ItemTree
        if(sScrollX === winui5Lib.TreeScrollX.Paginate){
            //margin-left" + ":" + oContainer.getLevelGap() + "px;
            //TODO create/use getter to get level focus
            sChildrenStyle = "left: -" + (oFileTree._iLevelFocus * oFileTree.getLevelGap()) + "px;";
        }
        
        ItemContainerRenderer.startRender(rm, oFileTree, sClass);
     
        ItemContainerRenderer.renderChildren(rm, oFileTree, sChildrenStyle);
        
        ItemContainerRenderer.endRender(rm, oFileTree);
    };
    
    //Return Renderer
    return FileTreeRenderer;
    
}, true);