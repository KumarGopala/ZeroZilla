'use strict';
app.service('sharedProperties', function () {

    var hashtable = {};

    return {
        setValue: function (key, value) {
            hashtable[key] = value;
        },
        getValue: function (key) {
            return hashtable[key];
        }
    }
});
