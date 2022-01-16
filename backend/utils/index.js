
const util_functions = {

    isFutureDate : (toCheck) => {

        let current_date = new Date()
        let day = current_date.getUTCDate()
        let month = current_date.getUTCMonth() + 1
        let year = current_date.getUTCFullYear()

        if(toCheck.year > year) return 1;
        if(toCheck.year == year && toCheck.month > month) return 1;
        if(toCheck.year == year && toCheck.month == month && toCheck.day > day) return 1;
        
        return 0;
    },

    unbundleUTCdate: (dateStr) => {

        let date = dateStr.split("-");
        /* year-month-day format ex: ( 2000-03-01T10:20:30Z )*/
        let day = date[2].substring(0,2);
        let month = date[1]
        let year = date[0]

        return {day: parseInt(day), month: parseInt(month), year: parseInt(year)}
    },

    unbundleUTCTime: (dateStr) => {

        let time = dateStr.split("T")
        time = time[1].split(":")
        
        return {hour: parseInt(time[0]), min: parseInt(time[1]), sec: parseInt(time[2].substring(0,2))}
    }
}

module.exports = { util_functions }