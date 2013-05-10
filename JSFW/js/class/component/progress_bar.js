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
    mousemove: false,
    value_changed: false,
    /**
     *
     * @protected
     */
    _rendered: function () {
        this.set_progress_value(this.$value);
        this.mousemove && this.$init_move();
    },
    /**
     * @description Method that allows move progress bar;
     * @private
     */
    $init_move: function () {
        this.render_to.addEventListener('mousedown', function (e) {
            e.preventDefault();
            var mouse_move = function (e) {
                var percent = e.offsetX / this.render_to.offsetWidth;
                this.set_progress_value(this.max_value * percent);
                this.value_changed && this.value_changed();
            }.bind(this);
            mouse_move(e);
            window.addEventListener('mousemove', mouse_move);
            window.addEventListener('mouseup', function (e) {
                window.removeEventListener('mouseup', arguments.callee);
                window.removeEventListener('mousemove', mouse_move);

            })

        }.bind(this));
    },
    /**
     * @description Method that set $value and refresh progress bar
     * @param value
     */
    set_progress_value: function (value) {
        value = Math.max(value, 0);
        value = Math.min(value, this.max_value);
        this.$value = value;
        this.$refresh_progress();
    },
    /**
     * @private
     * @description Method tat refresh progress bar
     */
    $refresh_progress: function () {
        this.root_el.style.width = ((this.$value / this.max_value) * 100) + '%';
    },
    /**
     * @public
     * @description Method that set max_value
     */
    refresh_max_value: function (max_value) {
        this.max_value = max_value;
    }
})