/**
 * Created with JetBrains PhpStorm.
 * User: andrey
 * Date: 08.05.13
 * Time: 21:16
 * To change this template use File | Settings | File Templates.
 */
X.Class('component.audio', {
    $extend: 'component.view_port',
    class_name: 'audio',
    _constructing: function () {
        this.$callParentMethod();
        console.log('audio');
    }
})