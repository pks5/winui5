/*
 * 
 * WinUi5
 *
 * pks.winui5.ElementHelper
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
    "./library"
], function(winui5Lib) {

    "use strict";

    /**
     * @class Class that provides helper methods for elements and controls.
     * @alias pks.winui5.ElementHelper
     * @author Jan Philipp Knoeller
     * @version 1.0.8-SNAPSHOT
     * @public
     */
    var ElementHelper = {}, Trait = {},

    /*
     * Separators for CSS class names
     */
    OPT_SEP = "opt", FLAG_SEP = "flg";

    /*
     * START Trait Definition
     */

    /**
     * Creates a style flag based on the style prefix.
     * 
     * This method can be executed both from static and instance conntext.
     * 
     * @param {string}
     *            [sFlagType] - The optional type of the flag. If the flag type
     *            is ommitted, "flag" is used.
     * @param {string}
     *            sFlagName - The name of the flag.
     * 
     */
    Trait.createStyleFlag = function() {
        // "this" can point to either Constructor or Instance.
        return this.getStylePrefix() + "-" + (arguments.length === 1 ? FLAG_SEP : arguments[0]) + "-" + (arguments.length === 1 ? arguments[0] : arguments[1]);
    };

    /**
     * Creates a style class based on the style prefix.
     * 
     * This method can be executed in static context only.
     * 
     * @param {string}
     *            sName - The name of the (sub) style class.
     * @static
     * 
     */
    Trait.createStyleClassStatic = function(sName) {
        if (!sName) {
            throw new Error("Parameter must be given when called createStyleClass statically.");
        }

        // "this" points to Constructor
        return this.getStylePrefix() + "-" + sName;
    };

    /**
     * Creates a style class based on the style prefix.
     * 
     * This method can be executed in instance context only.
     * 
     * @param {string}
     *            sName - The name of the (sub) style class.
     * 
     */
    Trait.createStyleClass = function(sName) {
        // "this" points to Instance

        var sStyleClass = "";
        if (sName) {
            sStyleClass = this.getStylePrefix() + "-" + sName;
        }
        else {
            sStyleClass = this.getStylePrefix();

            if (this.getAdditionalStyleClass) {
                var sAdditionalStyleClass = this.getAdditionalStyleClass();

                if (sAdditionalStyleClass) {
                    sStyleClass += " " + sAdditionalStyleClass;
                }
            }

            // TODO
            if (this.getOptions) {
                sStyleClass += this.createOptionsStyleClass();
            }
        }

        return sStyleClass;
    };

    /**
     * This method can be executed in instance context only.
     */
    Trait.createSubId = function(sName) {
        // "this" points to Instance
        return this.getId() + "___" + sName;
    };

    /**
     * This method can be executed in instance context only.
     */
    Trait.getSubDomRef = function(sName) {
        // "this" points to Instance
        return document.getElementById(this.createSubId(sName));
    };

    /*
     * START Options Support
     */

    /**
     * Creates the style class from specified options.
     * 
     * @protected
     */
    Trait.createOptionsStyleClass = function() {
        var aOptions = this.getOptions(), sClass = "";

        if (aOptions) {
            for (var i = 0; i < aOptions.length; i++) {
                sClass += " " + this.getStylePrefix() + "-" + OPT_SEP + "-" + aOptions[i];
            }
        }

        return sClass;
    };

    /**
     * @public
     * @override
     */
    Trait.setOptions = function(newOptions) {
        if (this.getDomRef()) {
            this.setProperty('options', newOptions, true);

            this.updateOptionsStyleClass();
        }
        else {
            this.setProperty('options', newOptions);
        }

        return this;
    };

    /**
     * @protected
     */
    Trait.updateOptionsStyleClass = function() {
        var sClass = "", aOptions = this.getOptions(), aCurrentClasses = this.getDomRef().className.split(' ');

        for (var i = 0; i < aCurrentClasses.length; i++) {
            var sCurrentClass = aCurrentClasses[i];
            if (sCurrentClass && sCurrentClass.indexOf(this.getStylePrefix() + "-" + OPT_SEP + "-") !== 0) {
                sClass += " " + sCurrentClass;
            }

        }

        if (aOptions) {
            for (var i = 0; i < aOptions.length; i++) {
                sClass += " " + this.getStylePrefix() + "-" + OPT_SEP + "-" + aOptions[i];
            }
        }

        this.$().attr('class', sClass.trim());
    };

    /**
     * @public
     */
    Trait.setOptionsEnabled = function(mOptions, bSuppressInvalidate) {
        var aOptions = this.getOptions(), mChanges = {};

        if (!aOptions) {
            aOptions = [];
        }

        for ( var sOptionName in mOptions) {
            var iOptionIndex = jQuery.inArray(sOptionName, aOptions), 
                bOptionEnabled = mOptions[sOptionName];

            if (bOptionEnabled && -1 === iOptionIndex || !bOptionEnabled && -1 !== iOptionIndex) {

                if (bOptionEnabled) {
                    aOptions.push(sOptionName);
                }
                else {
                    aOptions.splice(iOptionIndex, 1);
                }

                mChanges[sOptionName] = bOptionEnabled;
            }
        }

        this.setOptions(aOptions, bSuppressInvalidate);

        if (Object.keys(mChanges).length) {
            this.onOptionsChange(mChanges);
        }

        return this;
    };

    /**
     * @public
     */
    Trait.isOptionEnabled = function(sOptionName) {
        return -1 !== jQuery.inArray(sOptionName, this.getOptions());
    };

    /**
     * @ppublic
     */
    Trait.setOptionEnabled = function(sOptionName, bOptionEnabled, bSuppressInvalidate) {
        var mOptions = {};

        mOptions[sOptionName] = bOptionEnabled;

        this.setOptionsEnabled(mOptions, bSuppressInvalidate);

        return this;
    };

    /**
     * @public
     */
    Trait.toggleOption = function(sOptionName, bSuppressInvalidate) {
        this.setOptionEnabled(sOptionName, !this.isOptionEnabled(sOptionName), bSuppressInvalidate);

        return this;
    };

    /**
     * @protected
     */
    Trait.onOptionsChange = function(mChanges) {

    };

    /*
     * END Options Support
     */

    /*
     * END Trait Definition
     */

    /*
     * START Assign Methods
     */

    /**
     * Adds general helpers to the element class.
     * 
     * @param {sap.ui.core.Element}
     *            ElementConstructor - The element constructor.
     * @param {boolean}
     *            bStaticOnly - Whether only apply the static helpers.
     */
    ElementHelper.addHelpers = function(ElementConstructor, bStaticOnly) {
        if (!ElementConstructor.getStylePrefix) {
            throw new Error("Please define ElementConstructor.getStylePrefix before adding helpers.");
        }

        ElementConstructor.createStyleFlag = Trait.createStyleFlag;

        ElementConstructor.createStyleClass = Trait.createStyleClassStatic;

        if (!bStaticOnly) {
            var oProto = ElementConstructor.prototype;

            oProto.getStylePrefix = ElementConstructor.getStylePrefix;

            oProto.createStyleFlag = Trait.createStyleFlag;

            oProto.createStyleClass = Trait.createStyleClass;

            oProto.createSubId = Trait.createSubId;

            oProto.getSubDomRef = Trait.getSubDomRef;

            /*
             * START Options Support
             */

            oProto.createOptionsStyleClass = Trait.createOptionsStyleClass;

            oProto.setOptions = Trait.setOptions;

            oProto.updateOptionsStyleClass = Trait.updateOptionsStyleClass;

            oProto.setOptionsEnabled = Trait.setOptionsEnabled;

            oProto.isOptionEnabled = Trait.isOptionEnabled;

            oProto.setOptionEnabled = Trait.setOptionEnabled;

            oProto.toggleOption = Trait.toggleOption;

            oProto.onOptionsChange = Trait.onOptionsChange;

            /*
             * END Options Support
             */
        }
    };

    /**
     * Adds the required properties to the Meta Data definition.
     * 
     * @public
     */
    ElementHelper.addMetadata = function(meta) {
        meta.properties.options = {
            type : "string[]"
        };
    };

    // Return Helper
    return ElementHelper;
});