
const util_functions = {

    isFutureDate : (toCheck) => {

        let current_date = new Date()
        let day = current_date.getUTCDay()
        let month = current_date.getUTCMonth()
        let year = current_date.getUTCFullYear()

        if(toCheck.year > year) return 1;
        if(toCheck.year == year && toCheck.month > month) return 1;
        if(toCheck.year == year && toCheck.month == month && toCheck.day > day) return 1;
        
        return 0;
    }
}

module.exports = { util_functions }