/*
 * 
 * WinUi5
 *
 * pks.winui5.Uploader
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

sap.ui.define([
        './library', "sap/ui/base/ManagedObject"
], function(winui5Lib, ObjectBase) {
    
    /**
     * Constructor for a new Uploader instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Class for handling file uploads.
     * @extends sap.ui.base.ManagedObject
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias pks.winui5.Uploader
     * 
     */
    var Uploader = ObjectBase.extend("pks.winui5.Uploader", /** @lends pks.winui5.Uploader.prototype */ {
        metadata : {
            properties : {
                name : {
                    type : "string",
                    defaultValue : "file"
                },

                uploadUrl : {
                    type : "string"
                },

                fileType : {
                    type : "string[]"
                },

                mimeType : {
                    type : "string[]"
                },

                maxFileSize : {
                    type : "int",
                    defaultValue : 0
                },

                queueLength : {
                    type : "int",
                    defaultValue : 0
                },

                filesPerRequest : {
                    type : "int",
                    defaultValue : 3
                },

                maxRequestSize : {
                    type : "int",
                    defaultValue : 0
                }
            },

            aggregations : {
                parameters : {
                    singularName : "parameter",
                    type : "pks.winui5.UploadParameter",
                    multiple : true
                },

                headerParameters : {
                    singularName : "headerParameter",
                    type : "pks.winui5.UploadParameter",
                    multiple : true
                }
            },

            defaultAggregation : "parameters",

            events : {
                fileDenied : {},

                beforeUpload : {},

                uploadProgress : {},

                uploadSuccess : {},
                uploadError : {}
            }
        }
    }), 
    /**
     * @alias pks.winui5.Uploader.prototype
     */
    UploaderProto = Uploader.prototype;

    /**
     * Initializer
     * 
     * @protected
     */
    UploaderProto.init = function() {
        this.m_aQueue = [];

        this.m_bRunning = false;
        
        var elFileInput = document.createElement("input");
        elFileInput.type = "file";
        elFileInput.className = "winui5FileInput";
        elFileInput.tabindex = -1;
        
        this.m_elFileInput = elFileInput;
        
        var _this = this;
        jQuery(elFileInput).on("change", function(oEvent){
        	if(oEvent.target.files){
        		_this.upload(oEvent.target.files);
        	}
        });
        
        sap.ui.getCore().getStaticAreaRef().appendChild(elFileInput);
    };
    
    UploaderProto.exit = function() {
    	this.m_elFileInput.parentNode.removeChild(this.m_elFileInput);
    	this.m_elFileInput = null;
    	this.m_aQueue = null;
    };
    
    UploaderProto.openFile = function(){
        jQuery(this.m_elFileInput).trigger("click");
    };

    /**
     * Adds files for queuing
     * 
     * @param {File[]} aFiles - Array of files to be uploaded
     * 
     * @public
     */
    UploaderProto.upload = function(aFiles) {
        // Check max files
        var iQueueLength = this.getQueueLength();
        if (iQueueLength > 0) {
            if (this.m_aQueue.length + aFiles.length >= iQueueLength) {

                this.fireFileDenied({
                    queueFull : aFiles
                });

                return;
            }
        }

        var iFilesAllowed = 0, iFilesDenied = 0, aFilesTooLarge = [], aFilesWrongFileType = [], aFilesWrongMimeType = [];

        for (var i = 0; i < aFiles.length; i++) {
            var oFile = aFiles[i];

            console.log("Checking ", oFile.name, oFile.type, oFile.size);

            // TODO
            // impl maxFilenameLength

            // Check file size
            var iMaxFileSize = this.getMaxFileSize();
            if ((iMaxFileSize > 0) && (oFile.size > iMaxFileSize)) {

                iFilesDenied++;
                aFilesTooLarge.push(oFile);

                continue;
            }

            var aMimeTypes = this.getMimeType(), aFileTypes = this.getFileType(), bFileValid = true;

            // File Extension
            if (aFileTypes && aFileTypes.length) {
                var sExt = oFile.name.toLowerCase().split('.').pop();

                if (jQuery.inArray(sExt, aFileTypes) < 0) {
                    bFileValid = false;
                }
            }

            // Mime Type
            if (!bFileValid) {
                iFilesDenied++;
                aFilesWrongFileType.push(oFile);

                continue;
            }

            if (aMimeTypes && aMimeTypes.length) {
                for (var i = 0; i < aMimeTypes.length; i++) {
                    if (!oFile.type.match(aMimeTypes[i])) {
                        bFileValid = false;
                        break;
                    }
                }
            }

            if (!bFileValid) {
                iFilesDenied++;
                aFilesWrongMimeType.push(oFile);

                continue;
            }

            this.m_aQueue.push(oFile);
            iFilesAllowed++;

            // this.settings.onFileAllowed.call(index, oFile);
        }

        if (iFilesDenied) {
            this.fireFileDenied({
                fileSize : aFilesTooLarge,
                fileType : aFilesWrongFileType,
                mimeType : aFilesWrongMimeType
            });
        }

        // Only start Queue if we haven't!
        if (this.m_bRunning || !iFilesAllowed) {
            return;
        }

        this.processQueue();
    };

    /**
     * Process the queue
     * @protected
     */
    UploaderProto.processQueue = function() {
        if (!this.m_aQueue.length) {
            this.m_bRunning = false;

            return;
        }
        this.m_bRunning = true;

        var aFiles = [], iFilesPerRequest = this.getFilesPerRequest(), iMaxRequestSize = this.getMaxRequestSize(), iRequestSize = 0;

        while (this.m_aQueue.length) {
            var oFile = this.m_aQueue.shift();

            iRequestSize += oFile.size;

            if ((iMaxRequestSize > 0) && (iRequestSize > iMaxRequestSize)) {
                // Max request size exceed
                break;
            }

            aFiles.push(oFile);

            if ((iFilesPerRequest > 0) && (aFiles.length >= iFilesPerRequest)) {
                // Too many files
                break;
            }
        }

        var aParameters = this.getParameters(), mPostParameters = [];

        for (var i = 0; i < aParameters.length; i++) {
            var oParameter = aParameters[i];
            mPostParameters.push({
                name : oParameter.getName(),
                value : oParameter.getValue()
            });
        }

        var aHeaderParameters = this.getHeaderParameters(), mHeaderParameters = {};

        for (var i = 0; i < aHeaderParameters.length; i++) {
            var oParameter = aHeaderParameters[i];
            mHeaderParameters[oParameter.getName()] = oParameter.getValue();
        }

        this.fireBeforeUpload({
            files : aFiles
        });

        var _this = this;
        Uploader.uploadFiles({
            url : this.getUploadUrl(),

            name : this.getName(),

            files : aFiles,

            headers : mHeaderParameters,

            parameters : mPostParameters,

            progress : function(event) {
                var mParam = {
                    files : aFiles    
                };

                if (event.lengthComputable) {
                    mParam.loaded = event.loaded;
                    mParam.total = event.total;
                    mParam.percent = Math.ceil(mParam.loaded / mParam.total * 100);
                }
                
                jQuery.sap.log.debug(JSON.stringify(mParam));

                _this.fireUploadProgress(mParam);
            },

            success : function(data, message, xhr) {
                _this.fireUploadSuccess({
                    files : aFiles,
                    response : data,
                    message : message
                });
            },

            error : function(xhr, status, errMsg) {
                _this.fireUploadError({
                    files : aFiles,
                    status : status,
                    message : errMsg
                });
            },

            complete : function(xhr, textStatus) {
                _this.processQueue();
            }
        });

    };

    /**
     * Uploads files
     * 
     * @param {object] mSettings - Map with settings
     * 
     * @static
     */
    Uploader.uploadFiles = function(mSettings) {
        var aFiles = mSettings.files;

        if (!jQuery.isArray(aFiles)) {
            aFiles = [
                aFiles
            ];
        }

        // Form Data
        var oFormData = new FormData();

        for (var i = 0; i < aFiles.length; i++) {
            oFormData.append(mSettings.name, aFiles[i]);
        }

        var aParameters = mSettings.parameters;

        for (var i = 0; i < aParameters.length; i++) {
            var oParameter = aParameters[i];
            oFormData.append(oParameter.name, oParameter.value);
        }

        jQuery.ajax({
            url : mSettings.url,

            type : "POST", // Is this fixed?

            dataType : null, // Is this needed?

            data : oFormData,

            cache : false,

            contentType : false,

            processData : false,

            forceSync : false, // What's this?

            headers : mSettings.headers,

            xhr : function() {
                var xhrobj = $.ajaxSettings.xhr();
                if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', mSettings.progress, false);
                }

                return xhrobj;
            },

            success : mSettings.success,

            error : mSettings.error,

            complete : mSettings.complete

        });
    };

    // Return Constructor
    return Uploader;
});