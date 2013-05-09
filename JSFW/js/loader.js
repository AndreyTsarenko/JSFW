/**
 * Created with JetBrains PhpStorm.
 * User: User
 * Date: 05.05.13
 * Time: 18:14
 * To change this template use File | Settings | File Templates.
 */
(function () {
    window.src = {
        js: [
            'core/DOM.js',
            'core/template.js',
            'component/resizer.js'

        ],
        css: [
            'css.css',
            'component/component.css'
        ]
    };
    window.X = function (_function) {
        var i;
        if (_function) {
            to_do.push(_function);
        } else {
            for (i = 0; i < to_do.length; i++) {
                to_do[i]();
            }
        }
    }
    X.classes = {};
    var i;
    var css_length = src.css.length;
    var js_length = src.js.length;
    var PATH = document.getElementsByTagName('script');
    var head = document.getElementsByTagName('head')[0];
    var loaded_scripts = 1;
    var to_do = [];
    PATH = PATH[PATH.length - 1].src.replace('loader.js', '');
    for (i = 0; i < css_length; i++) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = PATH +'css/' + src.css[i];
        head.appendChild(link)
    }
    for (i = 0; i < js_length; i++) {
        var script = document.createElement('script');
        script.src = PATH + 'class/' + src.js[i];
        script.addEventListener('load', function () {
            script.removeEventListener('load', arguments.callee);
            if (loaded_scripts++ == js_length) {
                X.extending();
                X();
            }
        });
        head.appendChild(script);
    }
    /**
     *
     * @param name_space
     * @param class_obj
     * @constructor
     */
    X.Class = function (name_space, class_obj) {
        X.classes[name_space] = class_obj;
        var name_space = name_space.split('.');
        var current_space = X;
        var i;
        var key;
        for (i = 0; i < name_space.length; i++) {
            if (i == name_space.length - 1) {
                current_space[name_space[i]] = class_obj;
            } else {
                if (!(name_space[i] in current_space)) {
                    current_space[name_space[i]] = {};
                }
                current_space = current_space[name_space[i]];
            }
        }
        for (key in class_obj) {
            if (typeof class_obj[key] === "function") {
                class_obj[key].$__function_name__ = key;
                class_obj[key].$__class_name__ = name_space.join('.');
            }
        }
    }
    /**
     *
     * @param class_name
     * @param constructor
     * @returns {*}
     * @constructor
     */
    X.New = function (class_name, constructor) {
        constructor.__proto__ = X.classes[class_name];
        constructor._constructing && constructor._constructing();
        constructor._tpl && X.core.template.object_templating(constructor);
        constructor._rendered && constructor._rendered();
        return constructor;

    };

    /**
     *
     */
    Object.prototype.$callParentMethod = function (_arguments) {
        var caller = arguments.callee.caller;
        if (X.classes[caller.$__class_name__].__proto__[caller.$__function_name__]) {
            X.classes[caller.$__class_name__].__proto__[caller.$__function_name__]();
        }
    }
    /**
     *
     */
    X.extending = function () {
        var key;
        for (key in X.classes) {
            if (X.classes[key].$extend) {
                X.classes[key].__proto__ = X.classes[X.classes[key].$extend];
            }
        }
    }
})();