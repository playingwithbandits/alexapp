export const GET_CURRENT_DATE = () => {
    let today = new Date();
    let todayStr = today.toISOString().split('T')[0];
    return todayStr;
}
export const GET_DIFF_DAYS_STRS = (d1:string, d2:string) => {
    const date1 = new Date(d1).getTime();
    const date2 = new Date(d2).getTime();
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
}

export const GET_DAYS_BETWEEN_INC = (d1:string, d2:string) => {
    let startDateInclucive = d1;
    let endDateInclucive = d2;
    let listOfDates = [];
    let stopDateLoop = false;
    for(let i = 0; i < 10000; i++){
        let date = new Date(startDateInclucive);
        date.setDate(date.getDate() - i);
        let tempEndDateString = date.toISOString().split('T')[0];
        
        if(!stopDateLoop){
            listOfDates.push(tempEndDateString);
        }
        if(tempEndDateString == endDateInclucive){
            stopDateLoop = true;
        }
    }
    return listOfDates as string[]; 
}