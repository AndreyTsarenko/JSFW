/**
 * Created with JetBrains PhpStorm.
 * User: User
 * Date: 06.05.13
 * Time: 13:14
 * To change this template use File | Settings | File Templates.
 */
X.Class('component.view_port', {
    _elements: [
        'view_port'
    ],
    /**
     *
     */
    _tpl: [
        '<div id="{view_port_id}" class="{className}"></div>'
    ],
    /**
     *
     */
    className: 'View_port',
    /**
     *
     */
    _constructing: function () {
        console.log('here');
    },
    /**
     *
     */
    _rendered: function () {

    }
})