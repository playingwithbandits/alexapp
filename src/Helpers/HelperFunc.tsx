export const p_I = (x:any) => {
    let o = parseInt(x);
    if (isNaN(o)) {
        return null;
    }
    return o;
  };
  export const p_F = (x:any) => {
    let o = parseFloat(x);
    if (isNaN(o)) {
      return null;
    }
    return o;
  }
  

export const GET_CURRENT_DATE = () => {
    let today = new Date();
    let todayStr = today.toISOString().split('T')[0];
    return todayStr;
}

export const GET_YESTERDAY_DATE = () => {
    let today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1)
    let yesterdayStr = yesterday.toISOString().split('T')[0];
    return yesterdayStr;
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

export const GET_P_URL = (page_url:string) => {
    return "/phps/getP.php?q=" + encodeURIComponent(page_url);
}

export const GET_PAGE_DIV = async (page_url:string) => {
    let page_div = document.createElement("div");
    try {
        const page_div_str = await fetch(GET_P_URL(page_url)).then(x => x.text());
        page_div.innerHTML = page_div_str;
    } catch (err) {
        console.log(err);
    } finally {
        return page_div;
    }
}

export const queryNodeAll = (x: any, q: any) => x ? [...(x.querySelectorAll(q) || [])] : [];
export const queryNode = (x: any, q: any) => x ? x.querySelector(q) : null;
export const queryNodeText = (x : any) => (((x && x.childNodes && x.childNodes.length) ? x.childNodes[0] : null) || {"textContent": "-"}).textContent.replace(/[^a-zA-Z0-9\/ ]+/g," ").replace(/'/g, "").replace(/  +/g, ' ').trim();
export const queryNodeTextNoEdits = (x : any) => (((x && x.childNodes && x.childNodes.length) ? x.childNodes[0] : null) || {"textContent": "-"}).textContent.trim();
export const queryNodeTextAll = (x : any) => (x || {"textContent": "-"}).textContent.replace(/[^a-zA-Z0-9\/ ]+/g," ").replace(/'/g, "").replace(/  +/g, ' ').trim();

export const queryNodeHref = (x : any) => ((x || {"attributes": {"href": {"value": "-" }}}).attributes['href'] || {"value":"-"}).value.replace(/'/g, "").trim();

export const getAllRaces = async (urlArr: string[]) => {
    let results: HTMLDivElement[] = [];
    try {
        results = await Promise.all(urlArr.map(x => GET_PAGE_DIV(x)));                
    } catch (err) {
        console.log(err);
    } finally {
        return {urlArr, results};
    }
};

export const queryNodeAttr = (x : HTMLDivElement, y : string) => {
    let attr = x?.getAttribute(y);
    if(attr){
        return attr.replace(/[^a-zA-Z0-9\/ ]+/g," ").replace(/'/g, "").replace(/  +/g, ' ').trim();
    }else{
        return "-";
    }
};
// export const timeToDecimal = (t :any) => {let arr = t.split(':');let dec = p_I((arr[1] / 6) * 10, 10); return p_F(p_I(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);};
// export const sortJSONBy2Keys = (a :any,b :any,c :any,desc :any) => {let d=(b,c)=>b>c?1:b<c?-1:0;if(desc){return a.sort((a,e) => {let f=a[b],g=e[b],h=a[c],i=e[c];return d([d(g,f),d(i,h)],[d(f,g),d(h,i)])})}else{return a.sort((a,e) => {let f=a[b],g=e[b],h=a[c],i=e[c];return d([d(f,g),d(h,i)],[d(g,f),d(i,h)])})}};
// export const arrayToSet = (a :any,b :any,c :any) => {let set_a=[...new Set(a.map(x=>x[b]))];return set_a.map(y=>{let temp={};temp[b]=y;temp[c]=a.filter(c=>c[b]===y);return temp})};
export const applySentenceCase = (str :any) => {return(str)?str.replace(/\w\S*/g,(txt: string)=>txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase()):""};
// export const textToFurlong = (input :any) => {let output=null;let td_v_parts=input.split("m");let td_v_split=td_v_parts.map((x: string)=>x.split("f"));if(td_v_split.length==1){output=(p_I(td_v_split[0][0]))}if(td_v_split.length==2){output=(p_I(td_v_split[0][0])*8);if(td_v_split[1].length==2){output+=(p_I(td_v_split[1][0]))}}return output};
// export const avgFromObj = (arr :any,key :any,amount :any) => {let tempAvg=0;for(let i=0;i<amount;i++){tempAvg=(arr.reduce(((s,c)=>(a: any,x: { [x: string]: string | number; })=>(x[key]!=null&&x[key]>=tempAvg)?(s+=+x[key])/++c:a)(0,0),0))}
// return tempAvg.toFixed(2)};
export const isGoodDraw = (draw :any,max_draw :any,drawBias :any) => {let drawGood=!0;if(max_draw>5){let avg_draw=max_draw/2;let lower_bound_draw=avg_draw/2;let higher_bound_draw=avg_draw+(avg_draw/2);switch(drawBias){case "low":drawGood=(draw<=avg_draw);break;case "high":drawGood=(draw>=avg_draw);break;case "not-middle":drawGood=((draw<=lower_bound_draw)||(draw>=higher_bound_draw));break;case "not stall 1":drawGood=(draw!=1);break;case "not1&Low":drawGood=(draw<=avg_draw)&&(draw!=1);break}}
return drawGood};
export const horseNameToKey = (horse_name :any) => {
        let input = (horse_name).trim();
        let output = (input).toLowerCase().replace(/[(]*nap[)]*$/gi, "").replace(/'/gi, "").trim();
        return output;
    };