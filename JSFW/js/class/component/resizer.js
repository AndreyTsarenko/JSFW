/**
 * Created with JetBrains PhpStorm.
 * User: andrey
 * Date: 09.05.13
 * Time: 10:05
 * To change this template use File | Settings | File Templates.
 */
X.Class('component.resizer', {
    _elements: [
        'root',
        'vertices_left',
        'vertices_right',
        'vertices_bottom_left',
        'vertices_bottom_right',
        'sides_left',
        'sides_right',
        'sides_top',
        'sides_buttom',
        'dot9'
    ],
    _tpl: [
        '<div id="{root_id}" class="{class_name} Invisible">',
            '<div id="{vertices_left_id}" class="{class_name}-dot {class_name}-vertices {class_name}-vertices-left"></div>',
            '<div id="{vertices_right_id}" class="{class_name}-dot {class_name}-vertices {class_name}-vertices-right"></div>',
            '<div id="{vertices_bottom_left_id}" class="{class_name}-dot {class_name}-vertices {class_name}-vertices-bottom-left"></div>',
            '<div id="{vertices_bottom_right_id}" class="{class_name}-dot {class_name}-vertices {class_name}-vertices-bottom-right"></div>',
            '<div id="{sides_left_id}" class="{class_name}-dot {class_name}-sides {class_name}-sides-left"></div>',
            '<div id="{sides_right_id}" class="{class_name}-dot {class_name}-sides {class_name}-sides-right"></div>',
            '<div id="{sides_top_id}" class="{class_name}-dot {class_name}-sides {class_name}-sides-top"></div>',
            '<div id="{sides_buttom_id}" class="{class_name}-dot {class_name}-sides {class_name}-sides-bottom"></div>',
        '</div>'
    ],
    class_name: 'Resizer',
    _rendered: function () {
        this.set_position_to_render_to_el();
        this.toggle_resizer();
        this.init_events();
    },
    toggle_resizer: function () {
        this.render_to.setAttribute('tabindex', '1');
        this.render_to.addEventListener('blur', function (e) {
            e.stopPropagation();
            e.preventDefault();
            this.root_el.classList.add('Invisible');
        }.bind(this), true);
        this.render_to.addEventListener('dblclick', function () {
            this.root_el.classList.toggle('Invisible');
        }.bind(this), true);
    },
    set_position_to_render_to_el: function () {
        var pos_left = this.render_to.offsetLeft;
        var pos_top = this.render_to.offsetTop;
        this.render_to.style.left = pos_left + 'px';
        this.render_to.style.top = pos_top + 'px';
        this.render_to.style.position = 'absolute';
    },
    init_events: function () {
        this.vertices_left_el.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var start_left = this.render_to.offsetLeft;
            var start_top = this.render_to.offsetTop;
            var start_width = this.render_to.offsetWidth;
            var start_height = this.render_to.offsetHeight;
            var move = function (ev) {
                var differ_x = ev.pageX - e.pageX;
                var differ_y = ev.pageY - e.pageY;
                var width = start_width - differ_x;
                var height = start_height - differ_y
                if (width > 16) {
                    this.render_to.style.left = start_left + differ_x + 'px';
                    this.render_to.style.width = width + 'px';
                }
                if (height > 16) {
                    this.render_to.style.top = start_top + differ_y + 'px';
                    this.render_to.style.height = height + 'px';
                }
            }.bind(this);
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', function () {
                window.removeEventListener('mouseup', arguments.callee);
                window.removeEventListener('mousemove', move);
            })
        }.bind(this));
        this.vertices_right_el.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var start_top = this.render_to.offsetTop;
            var start_width = this.render_to.offsetWidth;
            var start_height = this.render_to.offsetHeight;
            var move = function (ev) {
                var differ_x = ev.pageX - e.pageX;
                var differ_y = ev.pageY - e.pageY;
                var width = start_width + differ_x;
                var height = start_height - differ_y;
                if (width > 16) {
                    this.render_to.style.width = width + 'px';
                }
                if (height > 16) {
                    this.render_to.style.top = start_top + differ_y + 'px';
                    this.render_to.style.height = height + 'px';
                }
            }.bind(this);
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', function () {
                window.removeEventListener('mouseup', arguments.callee);
                window.removeEventListener('mousemove', move);
            })
        }.bind(this));
        this.vertices_bottom_left_el.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var start_left = this.render_to.offsetLeft;
            var start_bottom = this.render_to.offsetTop + this.render_to.offsetHeight;
            var start_width = this.render_to.offsetWidth;
            var start_height = this.render_to.offsetHeight;
            var move = function (ev) {
                var differ_x = ev.pageX - e.pageX;
                var differ_y = ev.pageY - e.pageY;
                var width = start_width - differ_x;
                var height = start_height + differ_y;
                if (width > 16) {
                    this.render_to.style.left = start_left + differ_x + 'px';
                    this.render_to.style.width = width + 'px';
                }
                if (height > 16) {
                    this.render_to.style.bottom = start_bottom + differ_y + 'px';
                    this.render_to.style.height = height + 'px';
                }
            }.bind(this);
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', function () {
                window.removeEventListener('mouseup', arguments.callee);
                window.removeEventListener('mousemove', move);
            })
        }.bind(this));
        this.vertices_bottom_right_el.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var start_width = this.render_to.offsetWidth;
            var start_height = this.render_to.offsetHeight;
            var move = function (ev) {
                var differ_x = ev.pageX - e.pageX;
                var differ_y = ev.pageY - e.pageY;
                var width = start_width + differ_x;
                var height = start_height + differ_y;
                if (width > 16) {
                    this.render_to.style.width = width + 'px';
                }
                if (height > 16) {
                    this.render_to.style.height = height + 'px';
                }
            }.bind(this);
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', function () {
                window.removeEventListener('mouseup', arguments.callee);
                window.removeEventListener('mousemove', move);
            })
        }.bind(this));
        this.sides_left_el.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var start_left = this.render_to.offsetLeft;
            var start_width = this.render_to.offsetWidth;
            var move = function (ev) {
                var differ_x = ev.pageX - e.pageX;
                var width = start_width - differ_x;
                if (width > 16) {
                    this.render_to.style.width = width + 'px';
                    this.render_to.style.left = start_left + differ_x + 'px';
                }
            }.bind(this);
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', function () {
                window.removeEventListener('mouseup', arguments.callee);
                window.removeEventListener('mousemove', move);
            })
        }.bind(this));
        this.sides_right_el.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var start_width = this.render_to.offsetWidth;
            var move = function (ev) {
                var differ_x = ev.pageX - e.pageX;
                var width = start_width + differ_x;
                if (width > 16) {
                    this.render_to.style.width = width + 'px';
                }
            }.bind(this);
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', function () {
                window.removeEventListener('mouseup', arguments.callee);
                window.removeEventListener('mousemove', move);
            })
        }.bind(this));
        this.sides_top_el.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var start_top = this.render_to.offsetTop;
            var start_height = this.render_to.offsetHeight;
            var move = function (ev) {
                var differ_y = ev.pageY - e.pageY;
                var height = start_height - differ_y
                if (height > 16) {
                    this.render_to.style.top = start_top + differ_y + 'px';
                    this.render_to.style.height = height + 'px';
                }
            }.bind(this);
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', function () {
                window.removeEventListener('mouseup', arguments.callee);
                window.removeEventListener('mousemove', move);
            })
        }.bind(this));
        this.sides_buttom_el.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var start_bottom = this.render_to.offsetTop + this.render_to.offsetHeight;
            var start_height = this.render_to.offsetHeight;
            var move = function (ev) {
                var differ_y = ev.pageY - e.pageY;
                var height = start_height + differ_y;
                if (height > 16) {
                    this.render_to.style.bottom = start_bottom + differ_y + 'px';
                    this.render_to.style.height = height + 'px';
                }
            }.bind(this);
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', function () {
                window.removeEventListener('mouseup', arguments.callee);
                window.removeEventListener('mousemove', move);
            })
        }.bind(this));
        this.root_el.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var left = this.render_to.offsetLeft;
            var top = this.render_to.offsetTop;
            var moving = function (ev) {
                var diff_y = ev.pageY - e.pageY;
                var diff_x = ev.pageX - e.pageX;
                this.render_to.style.top = top + diff_y + 'px';
                this.render_to.style.left = left + diff_x + 'px';
            }.bind(this);
            window.addEventListener('mousemove', moving);
            window.addEventListener('mouseup', function () {
                window.removeEventListener('mousemove', moving);
                window.removeEventListener('mouseup', arguments.callee);
            })

        }.bind(this));
    }
})