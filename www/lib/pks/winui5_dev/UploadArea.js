/*
 * 
 * WinUi5
 *
 * pks.winui5.UploadArea
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

sap.ui.define(['./library', "sap/ui/core/Control", "./ElementHelper", "./Uploader"], function(winui5Lib, ControlBase, ElementHelper, Uploader){
	
    /**
     * Constructor for a new UploadArea instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Area for uploading.
     * @extends sap.ui.core.Control
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias pks.winui5.UploadArea
     * 
     */
	var UploadArea = ControlBase.extend("pks.winui5.UploadArea", /** @lends pks.winui5.UploadArea.prototype */{
		metadata : {

			defaultAggregation : "content",
			
			library : "pks.winui5",
			
			properties : { 
				title : {
					type : "string",
					defaultValue : ""
				},
				
				multiple : {
					type : "boolean",
					defaultValue : true
				}
				
				/*
				dropEnabled : {
					type : "boolean",
					defaultValue : false
				},
				*/
			},
			
			aggregations : { 
				content : {
					multiple:true
				},
				
				uploader : {
					multiple:false,
					type : "pks.winui5.Uploader"
				}
			},
			
			defaultAggregation : "content",
			
			events : {
				
				change : {}
				
			}

		}
	}),
	/**
     * @alias pks.winui5.UploadArea.prototype
     */
	UploadAreaProto = UploadArea.prototype;
	
	/*
	 * START apply helpers
	 */
	
	/**
	 * Returns the style prefix for this control
	 * 
	 * @return {string} - The style class prefix
	 */
	UploadArea.getStylePrefix = function(){
		return "winui5UploadArea";
	};
	
	ElementHelper.addHelpers(UploadArea);
	
	/*
	 * END apply helpers
	 */
	
	UploadAreaProto.init = function(){
		
	};
	
	UploadAreaProto.exit = function(){
		this.m_oUploader = null;
	};
	
	UploadAreaProto.setUploader = function(oUploader){
		this.setAggregation("uploader", oUploader, true);
		
		return this;
	};
	
    UploadAreaProto.onAfterRendering = function(){
		var _this = this;
    	
		//TODO use sub id
		this.$().find('input[type=file]').on('change', function(evt){ 
	    	_this.getUploader().upload(evt.target.files);
	    	
	    	this.value = '';
	    	
	    	_this.fireChange();
	    });
	};
	
	/*
	UploadArea.ondrop = function(oEvent){
		if(this.getDropEnabled()){
			oEvent.preventDefault();
			oEvent.stopPropagation();
		    var files = oEvent.originalEvent.dataTransfer.files;
	
		    this.m_oUploader.queueFiles(files);
		}
	};
	*/
	
	return UploadArea;
});