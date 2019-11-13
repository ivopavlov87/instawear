export const formatCreatedAt = date => {
    let obj = new Date(date);
    let now = new Date();
    let diff = Math.floor((now - obj) / 60000);

    if (diff < 60) {
        if (diff === 0) {
            return "Now";
        } else {
            return diff + 'm';   
        }
    } else if (Math.floor(diff / 60) < 24) {
        return Math.floor(diff / 60) + 'h';
    } else if (Math.floor(diff / 1440) < 7) {
        return Math.floor(diff / 1440) + 'd';
    } else if (Math.floor(diff / 10080) < 4) {
        return Math.floor(diff / 10080) + 'w';
    } else if (Math.floor(diff / 43676.64) < 12) {
        return Math.floor(diff / 43676.64) + ' month';
    } else {
        return Math.floor(diff / 524160) + 'y';
    }
};

export const reformatCreatedAt = date => {
    let formatedDate = formatCreatedAt(date);

    if (formatedDate === "Now") {
        return "Now";
    }

    let d = formatedDate.slice(0, -1);
    let timeUnit = formatedDate.slice(-1);

    // check for month
    if (timeUnit === "h") {
        let mon = formatedDate.slice(-5);
        if (mon === "month") {
            timeUnit = "month";
            let newDate = formatedDate.split("")[0];
            d = newDate;
        }
    }
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    };

    const units = {
        'm': 'minute',
        'h': 'hour',
        'd': 'day',
        'w': 'week',
    };

    if (!(timeUnit in units)) {
        const obj = new Date(date);
        const currentTime = new Date();
        const currentYear = currentTime.getFullYear();

        const month = months[obj.getMonth()];
        const day = obj.getDate();
        const year = obj.getFullYear();

        if (currentYear === year) {
            return `${month} ${day}`;
        } else {
            return `${month} ${day}, ${year}`;
        }
    } else {
        if (d === '1') {
            return d + ' ' + units[timeUnit] + ' ago';
        } else {
            return d + ' ' + units[timeUnit] + 's ago';
        }
    }  
}