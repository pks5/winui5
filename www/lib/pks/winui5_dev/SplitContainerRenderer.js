/*
 * 
 * WinUi5
 *
 * pks.winui5.SplitContainerRenderer
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
    
    var SplitContainerRenderer = {};
    
    /**
     * Renders a file item.
     */
    SplitContainerRenderer.render = function(rm, oSplitContainer){
        var aSegments = oSplitContainer.getSegments(),
            bHor = oSplitContainer.getOrientation() === sap.ui.core.Orientation.Horizontal;
        
        rm.write("<div");
        rm.writeControlData(oSplitContainer);
        rm.addClass(oSplitContainer.createStyleClass());
        rm.addClass(oSplitContainer.createStyleFlag("orient", oSplitContainer.getOrientation()));
        rm.writeClasses();
        rm.write(">");
        
        for(var i = 0; i < aSegments.length; i++){
            var oSegment = aSegments[i],
                aContent = oSegment.getContent(),
                sSize = oSegment.getSize(),
                bResizable = oSegment.getResizable(),
                bUseCellContainer = oSegment.getContainsFlex()
                    || (aContent.length === 1 && aContent[0].getMetadata().getElementName() === oSplitContainer.getMetadata().getElementName());
            
            if(!oSegment.getVisible()){
                continue;
            }
            
            rm.write("<div");
            if(sSize){
                rm.write(' style="flex:0 0 ' + sSize + '"');
            }
            else{
                rm.write(' style="flex:1 1 auto"');
            }
            rm.writeElementData(oSegment);
            rm.addClass(oSplitContainer.createStyleClass("cell"));
            
            rm.writeClasses();
            rm.write(">");
            
            if(bUseCellContainer){
                rm.write('<div class="' + oSplitContainer.createStyleClass("cellContent") + '">');
            }

            for(var j = 0; j < aContent.length; j++){
                rm.renderControl(aContent[j]);
            }
            
            if(bUseCellContainer){
                rm.write("</div>");
            }
            
            if(bResizable && (i < aSegments.length - 1)){
                bResizable = false;
                for(var j=i+1; j < aSegments.length; j++){
                    if(aSegments[j].getResizable()){
                        bResizable = true;
                        break;
                    }
                }
                
                if(bResizable){
                    rm.write('<div draggable="false" data-segment="' + i + '" class="' + oSplitContainer.createStyleClass("separator") + '"></div>');
                }
            }
            
            rm.write("</div>");
            
            
        }
        
        rm.write("</div>");

        jQuery.sap.log.info(oSplitContainer.getId() + " rendered.");
    };
    
    //Return Renderer
    return SplitContainerRenderer;
});