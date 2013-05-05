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
            'core/oop',
            'core/template'

        ],
        css: [
            'css/css'
        ]
    };
    window.X = {
        core: {}
    }
    var i;
    var css_length = src.css.length;
    var js_length = src.js.length;
    var head = document.getElementsByTagName('head')[0];
    var loaded_scripts = 1;
    for (i = 0; i < css_length; i++) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.href = '../js/' + src.css[i] + '.css';
        head.appendChild(link)
    }
    for (i = 0; i < js_length; i++) {
        var script = document.createElement('script');
        script.src = '../js/class/' + src.js[i] + '.js';
        script.addEventListener('load', function () {
            script.removeEventListener('load', arguments.callee);
            if (loaded_scripts++ == js_length) {
                console.log('scripts loaded');
            }
        });
        head.appendChild(script);

    }
})();