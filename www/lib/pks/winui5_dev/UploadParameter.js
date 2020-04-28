/*
 * 
 * WinUi5
 *
 * pks.winui5.UploadParameter
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

sap.ui.define(['./library', "sap/ui/core/Element"], function(winui5Lib, ElementBase){
	
    /**
     * Constructor for a new UploadParameter instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Key / Value 
     * @extends sap.ui.core.Element
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias pks.winui5.UploadParameter
     * 
     */
	var UploadParameter = ElementBase.extend("pks.winui5.UploadParameter", /** @lends pks.winui5.UploadParameter.prototype */ { 
		metadata : {
			library : "pks.winui5",
			
			properties : {
				
				name : {
					type : "string"
				},
				
				value : {
					type : "string"
				}
				
			}
		}
	
	});
	
	return UploadParameter;
	
});