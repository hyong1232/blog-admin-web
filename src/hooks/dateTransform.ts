import * as moment from 'moment';

export default function (target: Date, type?: 'format' | 'fromNow' | 'calendar') {
    if(type === 'calendar') {
        return moment(target).calendar();
    } else if(type === 'fromNow') {
        return moment(target).endOf('hour').fromNow();
    } else {
        return moment(target).format('yyyy-MM-DD hh:mm:ss');
    }

}