 /**
  * Initiate modules
  * @type {moduleDispatcher}
  *
  * let modules = new moduleDispatcher();
  *
  * modules.findModules();
  *
  */
export default class moduleDispatcher {
   /**
    * @param {Object} settings — settings object
    * @param {Object} settings.Library — Library, containing Modules to init
    */
    constructor(settings) {

        this.Library = settings.Library || window;

        this.findModules(document);

    }

   /**
    * Searches for Module settings in <module-settings> tags
    *
    * @param {Object} element — starts to search Module settings inside element
    */
    findModules(element) {

        let modulesRequired;

        modulesRequired = element.querySelectorAll('[data-module]');

        for (let i = 0; i < modulesRequired.length; i++) {

            this.prepareModuleSettings(modulesRequired[i]);

        }

    }

   /**
    * Get Module's name from data attributes
    * Call Module with settings that are defined below on <module-settings> tag
    *
    * Don't forget to add attribute 'hidden' to <module-settings>
    *
    * @example <module-settings hidden>
    *           {
    *               "selector" : ".js-comment-settings",
    *               "items"    : [{
    *                   "title" : "Удалить",
    *                   "handler" : {
    *                       "module": "comments",
    *                       "method": "remove"
    *                   }
    *               }]
    *           }
    *        </module-settings>
    *
    * @param {object} dataModuleNode — HTML element with data-module="" attribute
    */
    prepareModuleSettings(dataModuleNode) {

       /**
        * @type {String} moduleName — name of Module to init
        *
        * @example
        * dataModuleNode: <span data-module="islandSettings">
        * moduleName: islandSettings
        */
        let moduleName = dataModuleNode.dataset.module;
       /**
        * @type {Object} moduleSettings — contents of <module-settings> tag
        */
        let moduleSettings;
       /**
        * @type {Object} parsedModuleSettings — JSON-parsed value of moduleSettings
        */
        let parsedModuleSettings = [];
       /**
        * @type {Boolean} settingsUsedAlready — flag for whether Module was already inited or not
        */
        let settingsUsedAlready = false;

        try {

           /**
            * Split contents of data-module="" into array
            * Of one or more modules to init
            */
            moduleName = moduleName.split(' ');

           /**
            * Find settings values in <module-settings> and parse them
            */
            moduleSettings = dataModuleNode.querySelector('module-settings');

            if (moduleSettings) {

                moduleSettings = moduleSettings.textContent.trim();
                parsedModuleSettings = JSON.parse(moduleSettings);

            }
           /**
            * Call function to init multiple modules
            */

            for (let i = 0; i < moduleName.length; i++) {

                if (parsedModuleSettings instanceof Array) {

                    this.initModule(moduleName[i], parsedModuleSettings[i], dataModuleNode);

                } else if (!settingsUsedAlready) {

                    this.initModule(moduleName[i], parsedModuleSettings, dataModuleNode);
                    settingsUsedAlready = true;

                }

            }

        } catch(e) {

            console.warn('ModuleDispatcher error: ', e);

        }

    };

    /**
     * Calls init method of Module
     */
    initModule(moduleName, parsedModuleSettings, dataModuleNode) {

        try {

           /**
            * Select Module by name from the Library
            *
            * @example
            * Module = this.Library[moduleName];
            *
            * For this.Library
            * See {@link moduleDispatcher#constructor}
            */
            let Module = this.Library[moduleName];

           /**
            * If we have multiple modules to init
            * With multiple parsed settings values
            *
            * @param {HTMLElement} dataModuleNode — HTML element with data-module="" attribute,
            *                                       on which ModuleDispatcher is called
            */
            console.assert(Module.init instanceof Function, 'ModuleDispatcher: Module «' + moduleName + '» should implement init method');

            if (Module.init instanceof Function) {

                Module.init(parsedModuleSettings, dataModuleNode);

            }

        } catch(e) {

            console.log('ModuleDispatcher: Module «' + moduleName + '» was not initialized. ' + e);

        }

    }

};