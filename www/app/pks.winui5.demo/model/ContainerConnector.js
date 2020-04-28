/*
 * 
 * WinUi5 Demo App
 *
 * pks.winui5.demo.fiori.model.ContainerConnector
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
        "sap/ui/base/ManagedObject"
], function(ObjectBase) {
    
    /**
     * Constructor for a new ContainerConnector instance.
     * 
     * @param {string} [sId] ID for the new control, generated automatically if no ID is given
     * @param {object} [mSettings] Initial settings for the new control
     * 
     * @class
     * Class for providing methods to communicate with the Java container.
     * @extends sap.ui.base.ManagedObject
     * 
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * 
     * @constructor
     * @public
     * @alias pks.winui5.demo.fiori.model.ContainerConnector
     * 
     */
    var ContainerConnector = ObjectBase.extend("pks.winui5.demo.fiori.model.ContainerConnector", /** @lends pks.winui5.demo.fiori.model.ContainerConnector.prototype */ {
            metadata : {
                interfaces : [],
                
                properties : {
                    component : {
                        type : "object"
                    },
                    
                    //Other settings
                }
            }
        }
    ),
    /**
     * @alias pks.winui5.demo.fiori.model.ContainerConnector.prototype
     */
    ContainerConnectorProto = ContainerConnector.prototype;
    
    /**
     * Just a test function.
     */
    ContainerConnectorProto.test = function(){
        alert("Hello from ContainerConnector!");
    };
    
    return ContainerConnector;
});