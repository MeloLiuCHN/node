/**
 * Created by admin on 16-4-7.
 */
var moment = require('moment');
var dateUtils = {
    dateFormat:function(obj,format){
        if (format == undefined) {
            format = 'YYYY-MM-DD HH:mm:ss';
        }
        var ret = moment(obj).format(format);
        return ret == 'Invalid date' ? '0000-00-00 00:00:00' : ret;
    }
}

module.exports = dateUtils;