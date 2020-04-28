/*
 * 
 * WinUi5
 *
 * pks.winui5.FileItem
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

sap.ui.define(["./library", "./ObjectItemBase", "./ElementHelper", "sap/ui/core/format/DateFormat", "./FileItemRenderer"], function(winui5Lib, ObjectItemBase, ElementHelper, DateFormat, FileItemRenderer){
	
	"use strict";
	
	var oMetadata = {
			library : "pks.winui5",
			
			properties : {
				/*
				 * START pks.ui5.IFile
				 */
				
				/**
				 * The role of this file.
				 */
				role : {
					type : "pks.winui5.FileItemRole",
					defaultValue : winui5Lib.FileItemRole.Auto
				},
				
				/**
				 * Icon to be displayed left to the file name.
				 */
				icon : {
					type : "sap.ui.core.URI"
				},
				
				/**
				 * Name of the file
				 */
				name : {
					type : "string"
				},
				
				/**
				 * Additional info
				 */
				description : {
					type : "string"
				},
				
				/**
				 * The value (e.g. file size)
				 */
				value : {
					type : "any"
				},

				valueType : {
					type : "pks.winui5.FileItemValueType",
					defaultValue : winui5Lib.FileItemValueType.Plain
				},
				
				/**
				 * The value date (e.g. date modified)
				 */
				valueDate : {
					type : "any"
				}
				
				/*
				 * END pks.ui5.IFile
				 */
			}
		};
	
	/**
	 * Constructor for a new FileItem instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating file items.
	 * @extends pks.winui5.Item
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.8-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.winui5.FileItem
	 * 
	 */
	var FileItem = ObjectItemBase.extend("pks.winui5.FileItem", /** @lends pks.winui5.FileItem.prototype */ { 
		metadata : oMetadata,
		renderer: FileItemRenderer
	}),
	/**
	 * @alias pks.winui5.FileItem.prototype
	 */
	FileItemProto = FileItem.prototype,
	_dateFormatter = DateFormat.getDateTimeInstance({
		//style: "full"
		//pattern: "yyyy-MM-dd"
	});
	
	/*
	 * START apply helpers
	 */
	
	/**
	 * Returns the style prefix for this control
	 * 
	 * @return {string} - The style class prefix
	 */
	FileItem.getStylePrefix = function(){
		return "winui5FileItem";
	};
	
	/**
	 * Returns the additional style class(es) for this control.
	 * 
	 * @return {string} - The additional style classes.
	 */
	FileItemProto.getAdditionalStyleClass = function(){
		return ObjectItemBase.prototype.getAdditionalStyleClass.call(this) + " " + ObjectItemBase.getStylePrefix();
	};
	
	//Add the helpers
	ElementHelper.addHelpers(FileItem);
	
	/*
	 * END apply helpers
	 */
	
	/*
	 * START pks.ui5.IFile
	 */
	
	/**
	 * Sets the file name of this file.
	 *
	 * @param {string} sNewName - The new file name.
	 * @param {boolean} bSuppressInvalidate - Whether to invalidate the element.
	 * 
	 * @return {pks.winui5.FileItem} The reference to this element for method chaining.
	 * 
	 * @public
	 * @override
	 */
	FileItemProto.setName = function(sNewName, bSuppressInvalidate){
		var elDomRef = this.getDomRef();
		if(elDomRef){
			this.setProperty("name", sNewName, true);
			
			this.getSubDomRef("name").innerHTML = sNewName;
		}
		else{
			this.setProperty("name", sNewName, bSuppressInvalidate);
		}
		
		return this;
	};
	
	/**
	 * Sets the file type of this file.
	 * 
	 * @param {string} sNewDescription - The new description.
	 * @param {boolean} bSuppressInvalidate - Whether to invalidate the element.
	 * 
	 * @return {pks.winui5.FileItem} The reference to this element for method chaining.
	 * 
	 * @public
	 * @override
	 */
	FileItemProto.setDescription = function(sNewDescription, bSuppressInvalidate){
		var elDomRef = this.getDomRef();
		if(elDomRef){
			this.setProperty("description", sNewDescription, true);
			
			this.getSubDomRef("description").innerHTML = sNewDescription;
			
			if(sNewDescription){
			    jQuery(elDomRef).addClass(FileItem.createStyleFlag("WithDescription"));
			}
			else{
			    jQuery(elDomRef).removeClass(FileItem.createStyleFlag("WithDescription"));
			}
		}
		else{
			this.setProperty("description", sNewDescription, bSuppressInvalidate);
		}
		
		return this;
	};
	
	/**
	 * Sets the role of this file.
	 * 
	 * @param {pks.winui5.FileItemRole} sNewRole - The new item role.
	 * @param {boolean} bSuppressInvalidate - Whether to invalidate the element.
	 * 
	 * @return {pks.winui5.FileItem} The reference to this element for method chaining.
	 * 
	 * @public
	 * @override
	 */
	FileItemProto.setRole = function(sNewRole, bSuppressInvalidate){
		var elDomRef = this.getDomRef();
		if(elDomRef){
			this.setProperty("role", sNewRole, true);
			
			this.getSubDomRef("icon").src = this.determineIcon(this.getIcon(), sNewRole);
		}
		else{
			this.setProperty("role", sNewRole, bSuppressInvalidate);
		}
		
		return this;
	};
	
	/**
	 * Sets the icon of this file.
	 * 
	 * @param {sap.ui.core.URI} sNewIcon - The new icon URI.
	 * @param {boolean} bSuppressInvalidate - Whether to invalidate the element.
	 * 
	 * @return {pks.winui5.FileItem} The reference to this element for method chaining.
	 * 
	 * @public
	 * @override
	 */
	FileItemProto.setIcon = function(sNewIcon, bSuppressInvalidate){
		var elDomRef = this.getDomRef();
		if(elDomRef){
			this.setProperty("icon", sNewIcon, true);
			
			this.getSubDomRef("icon").src = this.determineIcon(sNewIcon, this.getRole());
		}
		else{
			this.setProperty("icon", sNewIcon, bSuppressInvalidate);
		}
		
		return this;
	};
	
	/**
	 * Determines the item role.
	 * 
	 * @return {pks.winui5.FileItemRole} The resulting role.
	 * 
	 * @public
	 */
	FileItemProto.determineRole = function(){
		var sRole = this.getRole();
		
		if(sRole === winui5Lib.FileItemRole.Auto){
			var oParent = this.getParent(),
				sName = this.getName(),
				sParentRole = winui5Lib.FileItemRole.Folder;
			
			if(oParent && oParent.getMetadata().isInstanceOf("pks.ui5.IItem")){
				sParentRole = oParent.determineRole();
			}
			
			sRole = winui5Lib.FileItemRole.Node;
			
			if(sName && sParentRole === winui5Lib.FileItemRole.Folder){
				if(-1 !== sName.indexOf(".")){
					sRole = winui5Lib.FileItemRole.File;
				}
				else{
					sRole = winui5Lib.FileItemRole.Folder;
				}
			}
		}
		
		return sRole;
	};
	
	/**
	 * Determines the icon. 
	 * 
	 * @param {string} sIcon - The reference icon.
	 * @param {pks.winui5.FileItemRole} sRole - The reference role.
	 * 
	 * @return {sap.ui.core.URI} The resulting icon URI.
	 * 
	 * @public
	 */
	FileItemProto.determineIcon = function(sIcon, sRole){
		if(!sIcon){
			var sBasePath = jQuery.sap.getModulePath("pks.winui5", "/themes/base/img/");
			
			sIcon = sBasePath + sRole.toLowerCase() + ".png";
		}
		
		return sIcon;
	};
	
	/**
	 * Resolves the value date using the dateFormatter
	 */
	FileItemProto.resolveValueDate = function(){
		var oDate = this.getValueDate(),
			oDateResolved = oDate;
		
		if("string" === typeof oDate){
			oDateResolved = new Date(oDate);//_dateFormatter.parse(oDate);
		}
		
		return oDateResolved;
	};
	
	/*
	 * END pks.ui5.IFile
	 */
	
	//Return Constructor
	return FileItem;
});