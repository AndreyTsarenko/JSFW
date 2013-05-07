/**
 * Created with JetBrains PhpStorm.
 * User: User
 * Date: 05.05.13
 * Time: 18:22
 * To change this template use File | Settings | File Templates.
 */
X.Class('core.DOM', {
    /**
     * @description Method that get elements
     * @param {Object} obj
     * @param {Object} [parent_obj]
     */
    get_elements_by_id: function (obj, parent_obj) {
        var key;
        var buffer;
        var to_return_obj = {};
        for(key in obj) {
            buffer = document.getElementById(obj[key]);
            if (parent_obj) {
                parent_obj[key] = buffer
            }
            to_return_obj[key] = buffer;
        }
        return to_return_obj
    }
});