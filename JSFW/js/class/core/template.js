/**
 * Created with JetBrains PhpStorm.
 * User: User
 * Date: 05.05.13
 * Time: 18:22
 * To change this template use File | Settings | File Templates.
 */
X.Class('core.template', {
    $id_counter: 0,
    /**
     *
     * @param object_of_class
     */
    object_templating: function (object_of_class) {
        var i;
        var elements_ids = {};
        var key;
        object_of_class._tpl = object_of_class._tpl.join('');
        if (object_of_class._elements) {
            for (i = 0; i < object_of_class._elements.length; i++) {
                elements_ids[object_of_class._elements[i] + '_el'] = 'id' + this.$id_counter;
                object_of_class._tpl = object_of_class._tpl.replace(
                    this.get_reg_exp(object_of_class._elements[i] + '_id'),
                    'id' + this.$id_counter++
                );
            }
        }
        for (key in object_of_class) {
            if (typeof key == "string") {
                object_of_class._tpl = object_of_class._tpl.replace(
                    this.get_reg_exp(key),
                    object_of_class[key]
                );
            }
        }
        if (object_of_class.dom_id) {
            object_of_class.render_to = document.getElementById(object_of_class.dom_id);
        }
        if (!object_of_class.render_to) {
            object_of_class.render_to = document.body;
        }
        object_of_class.render_to.innerHTML = object_of_class._tpl;
        X.core.DOM.get_elements_by_id(elements_ids, object_of_class);
    },
    /**
     *
     */
    get_reg_exp: function (str) {
        return new RegExp('{' + str + '}', 'g');
    }
});