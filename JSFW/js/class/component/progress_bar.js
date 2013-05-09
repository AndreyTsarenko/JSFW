/**
 * Created with JetBrains PhpStorm.
 * User: andrey
 * Date: 10.05.13
 * Time: 0:29
 * To change this template use File | Settings | File Templates.
 */
X.Class('component.progress_bar', {
    _elements: [
        'root',
    ],
    _tpl: [
        '<div id="{root_id}" class="{class_name}"></div>'
    ],
    class_name: 'Progress_bar',
    max_value: 100,
    $value: 0,
    _rendered: function () {
        this.set_progress_value(this.$value);
    },
    set_progress_value: function (value) {
        this.$value = value;
        this.$refresh_progress();
    },
    $refresh_progress: function () {
        this.root_el.style.width = ((this.$value / this.max_value) * 100) + '%';
    }
})