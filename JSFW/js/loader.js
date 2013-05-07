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
            'component/view_port.js'

        ],
        css: [
            'css/css.css'
        ]
    };
    window.X = {};
    X.classes = {};
    var i;
    var css_length = src.css.length;
    var js_length = src.js.length;
    var head = document.getElementsByTagName('head')[0];
    var loaded_scripts = 1;
    var to_create = [];
    for (i = 0; i < css_length; i++) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = '../js/' + src.css[i];
        head.appendChild(link)
    }
    for (i = 0; i < js_length; i++) {
        var script = document.createElement('script');
        script.src = '../js/class/' + src.js[i];
        script.addEventListener('load', function () {
            script.removeEventListener('load', arguments.callee);
            if (loaded_scripts++ == js_length) {
                X.create();
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
        constructor.constructing && constructor.constructing();
        X.core.template.object_templating(constructor);
        return constructor;
    };
    /**
     *
     * @param [_function]
     */
    X.create = function (_function) {
        var i;
        if (_function) {
            to_create.push(_function);
        } else {
            for (i = 0; i < to_create.length; i++) {
                to_create[i]();
            }
        }
    }
})();