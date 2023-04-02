function secondsToTime(secs) {
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    if (seconds === 60) {
        minutes += 1
        seconds = 0
    }

    var obj = {
        "m": minutes,
        "s": seconds
    };

    const getString = (obj) => {

        let str = ''
        if (obj.m.toString().length === 1) {
            str += '0' + obj.m + ':'
        } else {
            str += obj.m + ':'
        }

        if (obj.s.toString().length === 1) {
            str += '0' + obj.s
        } else {
            str += obj.s
        }

        return str
    }
    return getString(obj)
}


export const utilService = {
    secondsToTime,
}