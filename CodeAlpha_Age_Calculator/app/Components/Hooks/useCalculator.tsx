export default function useCalcTime(year:number=-1, month:number=-1, day:number=-1):{days:number,months:number,years:number} {
    if(year === -1){
        return {days:day,months:month,years:year};
    }
    console.log("calc");
    let setFullYear = `${year}-${month}-${day}`;
    let oldDate = new Date(setFullYear);
    console.log(oldDate);
    let dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0)
    console.log(dateNow);
    let y = dateNow.getFullYear() - oldDate.getFullYear();
    let m = (dateNow.getMonth() - oldDate.getMonth());
    let d = dateNow.getDate() - oldDate.getDate();
    m = d < 0 ? --m : m;
    y = m < 0 ? --y : y;
    console.log(m);
    m = m < 0 ? (12 + m) : m;
    console.log(m);
    d = d < 0 ? 30 + d : d;
    let i = y > d ? y : d > m ? d : m > d ? m : d;
    return {days:d,months:m,years:y};
}
export type date = {
    days:number,
    months:number,
    years:number
}