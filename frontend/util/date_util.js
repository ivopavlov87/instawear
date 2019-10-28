// export const formatDate = date => {
//     const months = {
//         0: 'January',
//         1: 'February',
//         2: 'March',
//         3: 'April',
//         4: 'May',
//         5: 'June',
//         6: 'July',
//         7: 'August',
//         8: 'September',
//         9: 'October',
//         10: 'November',
//         11: 'December',
//     };
//     const daysOfWeek = {
//         0: 'Sunday',
//         1: 'Monday',
//         2: 'Tuesday',
//         3: 'Wednesday',
//         4: 'Thursday',
//         5: 'Friday',
//         6: 'Saturday',
//     };
//     const obj = new Date(date);
//     const month = months[obj.getMonth()];
//     const day = obj.getDate();
//     const year = obj.getFullYear();
//     const dayOfWeek = daysOfWeek[obj.getDay()];
//     return `${month} ${day}, ${year} (${dayOfWeek})`;
// };

// export const formatTime = date => {
//     const obj = new Date(date);
//     const fullHours = obj.getHours();
//     let hours = fullHours % 12;
//     if (hours === 0) hours = 12;
//     const minutes = obj.getMinutes();
//     const tmp = `0${minutes}`;
//     const paddedMinutes = tmp.slice(tmp.length - 2);
//     const ampm = fullHours < 12 || fullHours === 0 ? 'am' : 'pm';
//     return `${hours}:${paddedMinutes}${ampm}`;
// };

// export const formatDateTime = date => (
//     `${formatDate(date)} ${formatTime(date)}`
// );

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

// export const reformatDate = date => {
//     if (date === "Now") {
//         return "Now";
//     }

//     let d = date.slice(0, 1);
//     let unit = date.slice(1);

//     // debugger

//     const unitMap = {
//         'm': 'minute',
//         'h': 'hour',
//         'd': 'day',
//         'w': 'week',
//         ' month': 'month',
//         'y': 'year'
//     };

//     if (unit === ' month' || unit === 'y') {
//         return formatDate(date);
//     }

//     if (d === '1') {
//         return d + ' ' + unitMap[unit] + ' ago';
//     } else {
//         return d + ' ' + unitMap[unit] + 's ago';
//     }
// };
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
        // ' month': 'month',
        // 'y': 'year'
    };

    if (!(timeUnit in units)) { //|| (timeUnit === "w" && d > 1 )) {
        const obj = new Date(date);
        const currentTime = new Date();
        const currentYear = currentTime.getFullYear();

        const month = months[obj.getMonth()];
        const day = obj.getDate();
        const year = obj.getFullYear();
        // const dayOfWeek = daysOfWeek[obj.getDay()];

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