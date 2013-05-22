/**
 * Created with JetBrains PhpStorm.
 * User: andrey
 * Date: 08.05.13
 * Time: 21:16
 * To change this template use File | Settings | File Templates.
 */
X.Class('component.player', {
    _elements: [
        'root',
        'controls_container',
        'play_button',
        'backward',
        'forward',
        'progress_bar',
        'control_container',
        'sound',
        'repeat',
        'element'
    ],
    _tpl: [
        '<div id="{root_id}" class={class_name}>',
            '<{type} id="{element_id}" class="{class_name}-element">Грусть, печаль, тоска (</{type}>',
            '<div id="{control_container_id}" class="{class_name}-{type}-control-container">',
                '<div id="{play_button_id}" state="play" class="{class_name}-blay-button {class_name}-controls">',
                '</div>',
                '<div id="{backward_id}" class="{class_name}-backward {class_name}-controls">',
                '</div>',
                '<div id="{forward_id}" class="{class_name}-forward {class_name}-controls">',
                '</div>',
                '<div id="{repeat_id}" class="{class_name}-repeat {class_name}-controls">',
                '</div>',
                '<div class="{class_name}-sound-logo {class_name}-controls">',
                    '<div id="{sound_id}" class="{class_name}-sound {class_name}-controls"></div>',
                '</div>',
                '<div id="{progress_bar_id}" class="{class_name}-progress-bar {class_name}-controls"></div>',
            '</div>',
        '</div>'
    ],
    class_name: 'Player',
    type: 'video',
    progress_bar: null,
    volume_control: null,
    $volume: 50,
    mix: false,
    repeat: true,
    src: [],
    current_src: null,
    _rendered: function () {
        this.$create_progress_bar();
        this.$create_volume_control();
        this.$add_src();
        this.$set_plaing_src(0);
        this.$init_events();
    },
    /**
     *
     */
    $create_volume_control: function () {
        var set_volume = function (value) {
            this.element_el.volume = value * 0.01;
            this.$volume = value;
        }.bind(this)
        this.volume_control = X.New('component.progress_bar', {
            render_to: this.sound_el,
            max_value: 100,
            class_name: this.class_name + '-component-progress-bar',
            mousemove: true,
            value_changed: set_volume
        });
        this.volume_control.set_progress_value(this.$volume);
        this.sound_el.addEventListener('click', function (e) {
            e.stopPropagation();
        })
    },
    /**
     *
     *
     */
    $create_progress_bar: function () {
        var call_back = function (value) {
            this.element_el.currentTime = value;
        }.bind(this);
        this.progress_bar = X.New('component.progress_bar', {
            render_to: this.progress_bar_el,
            mousemove: true,
            class_name: this.class_name + '-component-progress-bar',
            value_changed: call_back
        });
        this.progress_bar_el.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    },
    /**
     *
     */
    $add_src: function (src) {
        if (typeof src == 'array') {
            this.src = this.src.concat(src);
        } else
        if (typeof src == 'string') {
            this.src.push(src);
        }
    },
    /**
     *
     */
    $set_plaing_src: function (index, play) {
        this.element_el.src = this.src[index];
        this.current_src = index;
        play && this.$play();
        !play && this.play_button_el.setAttribute('state', 'play');
    },
    /**
     *
     */
    $init_events: function () {
        this.render_to.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
        this.play_button_el.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.play_button_el.getAttribute('state') == 'play') {
                this.$play();
            } else
            if (this.play_button_el.getAttribute('state') == 'pause') {
                this.$pause();
            }
        }.bind(this));
        if (this.type = 'video') {
            this.root_el.addEventListener('click', function () {
                this.control_container_el.classList.toggle('Mini');
            }.bind(this));
        }
        this.element_el.addEventListener('loadedmetadata', function (e) {
            this.progress_bar.refresh_max_value(this.element_el.duration);
        }.bind(this));
        this.element_el.addEventListener('timeupdate', function (e) {
            this.progress_bar.set_progress_value(this.element_el.currentTime);
        }.bind(this));
        this.element_el.addEventListener('ended', function (e) {
            this.$song_ended();
        }.bind(this));
        this.backward_el.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            this.$backward();
        }.bind(this));
        this.forward_el.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            this.$forward();
        }.bind(this));

    },
    /**
     *
     */
    $forward: function () {
        if (this.src[++this.current_src]) {
            this.$set_plaing_src(this.current_src, true);
        } else {
            this.$set_plaing_src(0);
        }
    },
    /**
     *
     */
    $backward: function () {
        if (this.src[--this.current_src]) {
            this.$set_plaing_src(this.current_src, true);
        } else {
            this.$set_plaing_src(0);
        }
    },
    /**
     *
     */
    $song_ended: function () {
        if (this.mix) {

        } else {
            if (this.src[++this.current_src]) {
                this.$set_plaing_src(this.current_src, true);
            } else if (this.repeat) {
                console.log('here');
                this.$set_plaing_src(0, true);
            }

        }
    },
    /**
     *
     */
    $pause: function () {
        this.play_button_el.setAttribute('state', 'play');
        this.element_el.pause();
    },
    /**
     *
     */
    $play: function () {
        this.play_button_el.setAttribute('state', 'pause');
        this.element_el.play();
    }
})