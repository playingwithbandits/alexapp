export const GET_CURRENT_DATE = () => {
    return "2021-01-21"
}
export const GET_DIFF_DAYS_STRS = (d1:string, d2:string) => {
    const date1 = new Date(d1).getTime();
    const date2 = new Date(d2).getTime();
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
}