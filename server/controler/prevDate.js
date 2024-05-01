
const previesDate = (dateCount, nowYear, nowMonth, nowDate) => {
    let newMonth = 0;
    let newDate = 0;
    if ((nowYear % 4 == 0 && nowYear % 100 != 0) || nowYear % 400 == 0) {
        // if current year is leap year and current month is march and preview month is february
        if (nowMonth == 3 && nowDate - dateCount < 1) {
            newMonth = nowMonth - 1;
            newDate = 29 + (nowDate - dateCount); // because, this nowDate-5 is negetive value
        }
        // যদি এখনকার মাস থেকে ৫ বাদ দিলে মান ঋনাত্মক হয়, তাহলে আমাকে পূর্বের মাসে যেতে হবে 
        else if (nowDate - dateCount < 1) {
            // যদি পূর্বের মাস ৩০ দিনে হয় 
            if (nowMonth - 1 % 2 == 0) {
                newMonth = nowMonth - 1;
                newDate = 30 + (nowDate - dateCount); // because, this nowDate-5 is negetive value
            }
            // যদি পূর্বের মাস ৩১ দিনে হয় 
            else if (nowMonth - 1 % 2 != 0) {
                newMonth = nowMonth - 1;
                newDate = 31 + (nowDate - dateCount);
            }
        }
        else {
            newMonth = nowMonth;
            newDate = nowDate - dateCount;
        }
    }
    else {
        if (nowMonth == 3 && nowDate - dateCount < 1) {
            newMonth = nowMonth - 1;
            newDate = 28 + (nowDate - dateCount); // because, this nowDate-5 is negetive value
        }
        // যদি এখনকার মাস থেকে ৫ বাদ দিলে মান ঋনাত্মক হয়, তাহলে আমাকে পূর্বের মাসে যেতে হবে 
        else if (nowDate - dateCount < 1) {
            // যদি পূর্বের মাস ৩০ দিনে হয় 
            if (nowMonth - 1 % 2 == 0) {
                newMonth = nowMonth - 1;
                newDate = 30 + (nowDate - dateCount); // because, this nowDate-5 is negetive value
            }
            // যদি পূর্বের মাস ৩১ দিনে হয় 
            else if (nowMonth - 1 % 2 != 0) {
                newMonth = nowMonth - 1;
                newDate = 31 + (nowDate - dateCount);
            }
        }
        else {
            newMonth = nowMonth;
            newDate = nowDate - dateCount;
        }
    }

    return (`${nowYear}-${newMonth}-${newDate}`)
}

const prevDateList = (req, res, next) => {
    const currentDay = new Date().getDate();
    const currentMonth = (new Date().getMonth()) + 1;
    const currentYear = new Date().getFullYear();
    const dateList = []

    for (let i = 0; i < parseInt(req.params.prevDays); i++) {
        const date = previesDate(i, currentYear, currentMonth, currentDay);
        dateList.unshift(date);
    }
    // return dateList
    req.dateList = dateList
    next();
}

module.exports = {
    prevDateList
}