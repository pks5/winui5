/*
 * 
 * WinUi5 Demo App
 *
 * pks.winui5.demo.fiori.controller.FileExplorer
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://pksoftware.de
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * ALL RIGHTS RESERVED
 * 
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "pks/winui5/FileItem",
    "pks/winui5/Uploader",
    
    "sap/ui/model/Filter",
    "pks/winui5/DropdownMenuItem",
    "sap/ui/core/format/FileSizeFormat",
    "pks/winui5/library"
], function (Controller, FileItem, Uploader, Filter, DropdownMenuItem, FileSizeFormat, winui5Lib) {
    "use strict";

    var FileExplorerController =  Controller.extend("pks.winui5.demo.fiori.controller.FileExplorer", {
    	
    	
    
    }),
    FileExplorerControllerProto = FileExplorerController.prototype,
    _fileSizeFormatter = FileSizeFormat.getInstance({
        decimals : 0
    });
    
    FileExplorerControllerProto.onInit = function(){
        
        var oUploader = new Uploader({ uploadUrl : "/upload" });
        
        this.m_oUploader = oUploader;
        
        var oFileExplorer = this.getView().byId("fileExplorer");
        
        /*
        oFileExplorer.getSidebar().bindAggregation("items", {
            path: "FILES>/files",
            
            template : new FileItem({
                name : "{FILES>fileName}",
                description : "{FILES>fileType}",
                icon : {path:'FILES>icon', formatter:this.formatIcon}
            }),
            
            filters : new Filter({
                path : "",
                test : function(oControl){
                    return -1 === oControl.fileName.indexOf(".");
                }
            })
        });
        oFileExplorer.getContent().attachItemChange(function(oEvent){
            var mParam = oEvent.getParameters();
            
            console.log(mParam);
        });
        */
        /*
        this.getView().attachAfterRendering({}, function(){ 
            oFileExplorer.getSidebar().getBinding("items").filter(
                    new Filter({
                        path : "",
                        test : function(oControl){
                            return -1 === oControl.fileName.indexOf(".");
                        }
                    })
                );
        }, this);
        */
        
        
    };
    
    FileExplorerControllerProto.onItemsChange = function(oEvent){
        this.getView().byId("itemsCount").setText(oEvent.getSource().getItems().length + " Items");
    };
    
    FileExplorerControllerProto.onFileMenuPress = function(oEvent){
    	jQuery.sap.log.info("Opening file dialog...");
        this.m_oUploader.openFile();
    };    
    
    FileExplorerControllerProto.onHomeMenuPress = function(oEvent){
        console.log(oEvent.getParameter("item"));
    };  
    
    FileExplorerControllerProto.onDialogTest = function(oEvent){
        var oOverlay = sap.ui.xmlfragment("pks.winui5.demo.fiori.view.Dialog", this);
        
        oOverlay.setPosition("50%", "50%").setOrigin("center", "center").open();
    
        this.m_oOverlay = oOverlay;
    };  
    
    FileExplorerControllerProto.onDialogCancel = function(oEvent){
        this.m_oOverlay.close();
    };
    
    FileExplorerControllerProto.onPress = function(oEvent){
        var sOrigin = oEvent.getParameter("origin");
        
        if(sOrigin === winui5Lib.PressOrigin.PrimaryPress){
            var oItem = oEvent.getParameter("item");
            if(oItem){
                console.log("Item pressed: " + oItem.getId());
            }
            else{
                console.log("Container pressed: " + oEvent.getSource().getId());
            }
        }
        else if(sOrigin === winui5Lib.PressOrigin.EnterKey){
            this.onBrowse(oEvent);
        }
    };
    
    FileExplorerControllerProto.onBeforeMenuOpen = function(oEvent){
        var oContextMenu = oEvent.getSource().getContent()[0];
        
        oContextMenu.removeAllItems();
        
        oContextMenu.addItem(new DropdownMenuItem({ "text" : "Cut", "additionalText" : "Ctrl+X"}));
        oContextMenu.addItem(new DropdownMenuItem({ "text" : "Copy", "additionalText" : "Ctrl+C"}));
        oContextMenu.addItem(new DropdownMenuItem({ "text" : "Paste", "additionalText" : "Ctrl+V", enabled : false}));
        
        var oItemMore = new DropdownMenuItem({ "text" : "Color"});
        
        oItemMore.addItem(new DropdownMenuItem({ "text" : "Blue", "additionalText" : "Ctrl+X", "selectable" : true, "selected" : true}));
        
        oItemMore.addItem(new DropdownMenuItem({ "text" : "Green", "additionalText" : "Ctrl+X"}));
        
        var oItemMore2 = new DropdownMenuItem({ "text" : "More2", "additionalText" : "Ctrl+X"});
        
        oItemMore2.addItem(new DropdownMenuItem({ "text" : "Green2", "additionalText" : "Ctrl+X"}));
        
        oItemMore.addItem(oItemMore2)
        
        oContextMenu.addItem(oItemMore);
    };
    
    FileExplorerControllerProto.onBrowse = function(oEvent){
        var mChanges = oEvent.getParameter("selectedItems"),
            _this = this;
        
        if(mChanges && mChanges.selected.length){
            //Selection change
            var oNode = mChanges.selected[0];
        }
        else if(oEvent.getParameter("item")){
            //Double press
            var oNode = oEvent.getParameter("item");
        }
        
        
        if(oNode && oNode.determineRole() === "Folder"){
            var sPath = "FILES>" + oNode.getBindingContext("FILES").getPath() + "/children",
                oFileList = this.getView().byId("fileList");
            
            if(!this.m_oTemplate){
                var oBindingInfo = oFileList.getBindingInfo("items");
                if(!oBindingInfo){
                    throw new Error("Initial binding required for content container when using browsePath!");
                }
                
                this.m_oTemplate = oBindingInfo.template;
            }
            
            oFileList.bindAggregation("items", {
                path: sPath,
                template : this.m_oTemplate
            });
        }
    };
    
    FileExplorerControllerProto.onUpdateSelection = function(oEvent){
        var aSelectedItems = oEvent.getSource().getSelection(),
            iFileSize = 0,
            oSelectionCount = this.getView().byId("selectionCount"),
            oFileSizeCount = this.getView().byId("fileSizeCount");
        
        oSelectionCount.setText(aSelectedItems.length + " Items selected");
        
        for(var i = 0; i < aSelectedItems.length; i++){
            iFileSize += aSelectedItems[i].getValue() || 0;
        }
        
        oFileSizeCount.setText(_fileSizeFormatter.format(iFileSize));
    };
    
    FileExplorerControllerProto.onChangeViewMode = function(oEvent){
        
        var sNewViewMode = oEvent.getParameter("item").data("viewMode");
        
        console.log(sNewViewMode);
        
        this.getView().byId("fileList").setViewMode(winui5Lib.ListViewMode[sNewViewMode]);
    };
    
    return FileExplorerController;
});