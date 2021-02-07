export const p_I = (x:any) => {
    if(x == null){
        return 0;
    }
    let o = parseInt(x);
    if (isNaN(o)) {
        return 0;
    }
    return o;
  };
  export const p_F = (x:any) => {
    if(x == null){
        return 0;
    }
    let o = parseFloat(x);
    if (isNaN(o)) {
      return 0;
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

export const GET_TOMORROW_DATE = () => {
    let today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() + 1)
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

export const getJSONFromPHP = async (page_url:string) => {
    let json_res = []
    try{
        json_res = await(fetch(page_url)).then(x => x.json());
    } catch (err) {
        console.log(err);
    } finally {
        return {page_url, json_res};
    }
}
export const GET_P_URL = (page_url:string) => {
    return "/phps/getP.php?q=" + encodeURIComponent(page_url);
}

export const GET_PAGE_DIV = async (page_url:string) => {
    let page_div = document.createElement("div");
    let page_div_str = "";
    try {
        page_div_str = await fetch(GET_P_URL(page_url)).then(x => x.text());
        page_div.innerHTML = page_div_str;
    } catch (err) {
        console.log(err);
    } finally {
        return ({page_div, page_div_str});
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
        let results_objs = await Promise.all(urlArr.map(x => GET_PAGE_DIV(x)));
        results = results_objs.map((x:any)=> x.page_div);                
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
export const arrayToSet = (a :any,b :any,c :any) => {
    let arrOfb = a.map((x:any)=>x[b]);
    let set_pre:Set<any> = new Set(arrOfb);
    let set_a:any[] = Array.from(set_pre);
    return set_a.map(y=>{
        let temp:any={};
        temp[b]=y;
        temp[c]=a.filter((c:any)=>c[b]===y);
        return temp
    })
};
export const applySentenceCase = (str :any) => {return(str)?str.replace(/\w\S*/g,(txt: string)=>txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase()):""};
export const textToFurlong = (input :any) => {
    let output=null;
    if(input){
        let td_v_parts:string[]=input.split("m");
        let td_v_split:string[][]=td_v_parts.map((x: string)=>x.split("f"));
        if(td_v_split !== null){
            if(td_v_split.length==1){
                output=(p_I(td_v_split[0][0]))
            }
            if(td_v_split.length==2){
                output=(p_I(td_v_split[0][0])*8);
                if(td_v_split[1].length==2){
                    output+=(p_I(td_v_split[1][0]))
                }
            }
        }
    }
    return output
};
export const distanceToWinnerStrToFloat = (code: string) => {
    let result = 0;
    if(code && code != "undefined" && code != "null"){
        code = ""+code;
        let evalStr = code.replace("snse", "+0.05").replace("nse", "+0.1").replace("shd", "+0.2").replace("shd", "+0.2").replace("snk", "+0.25").replace("hd", "+0.25").replace("nk", "+0.3").replace("½", "+0.5").replace("⅓", "+0.33").replace("⅔", "+0.66").replace("¼", "+0.25").replace("¾", "+0.75").replace("⅕", "+0.20").replace("⅖", "+0.40").replace("⅗", "+0.60").replace("⅘", "+0.80").replace("L","").replace("dht","+0");        
        let evaled = null;
        try {
            evaled = eval(evalStr)
        } catch (e) {
            console.log(e, evalStr)
        }
        result = p_F(evaled);
    }
    return result;
};

// export const avgFromObj = (arr :any,key :any,amount :any) => {let tempAvg=0;for(let i=0;i<amount;i++){tempAvg=(arr.reduce(((s,c)=>(a: any,x: { [x: string]: string | number; })=>(x[key]!=null&&x[key]>=tempAvg)?(s+=+x[key])/++c:a)(0,0),0))}
// return tempAvg.toFixed(2)};
export const isGoodDraw = (draw :any,max_draw :any,drawBias :any) => {let drawGood=!0;if(max_draw>5){let avg_draw=max_draw/2;let lower_bound_draw=avg_draw/2;let higher_bound_draw=avg_draw+(avg_draw/2);switch(drawBias){case "low":drawGood=(draw<=avg_draw);break;case "high":drawGood=(draw>=avg_draw);break;case "not-middle":drawGood=((draw<=lower_bound_draw)||(draw>=higher_bound_draw));break;case "not stall 1":drawGood=(draw!=1);break;case "not1&Low":drawGood=(draw<=avg_draw)&&(draw!=1);break}}
return drawGood};
export const horseNameToKey = (horse_name :any) => {
    let input = (horse_name).trim();
    let output = (input).toLowerCase().replace(/[(]*nap[)]*$/gi, "").replace(/'/gi, "").trim();
    return output;
};
export const placeToPlaceKey = (m_place :any) => {
    let place_out = m_place;
    if(m_place){
        place_out = (m_place).toLowerCase().trim().replace("(aw)", "-aw").replace("-city", "").replace(/\s+/g, '-').trim();
    }
    return place_out
};

export const trackOkay = (track :any, meetingMappings :any) => {
    let findablePlace = placeToPlaceKey(track);

    let foundObj = meetingMappings.filter((x:any) => !(["ireland","dubai","france"].includes(x["location"].toLowerCase()))).find((x:any) => placeToPlaceKey(x["namelower"]) === findablePlace);

    return foundObj;
};

export const dateGood = (dateStr :any, currentDate:any) => {
    let hisDate = rpHisDateToRealDate(dateStr);
        
    let todayDateStr = realDateToRpHisDate(currentDate);
    
    let firstJune = new Date("2019 01 01");

    return hisDate && (hisDate >= firstJune) && (dateStr != todayDateStr);

};

export const rpHisDateToRealDate = (dateStr :any) => {
    
    let date = null;
    
    if(dateStr.length == 7){
        let day = dateStr.substring(0, 2);
        let month = dateStr.substring(2, 5);
        let year = "20" + dateStr.substring(5, 7);
        date = new Date(day + " " + month + " " + year);
    }
   
    return date;     
};

export const realDateToRpHisDate = (dateS :any) => {
    let dateStr = null;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    let dateObj = new Date(dateS);
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();
    let output = day  + ''+ month  + '' + year.toString().slice(2,4);
    return output;  
};

export const distanceTodistanceFloat = (code :any) => {
    let result = 0;
    
    if(code && code != "undefined" && code != "null"){
        code = ""+code;

        let evalStr = code.replace("½", "+0.5").replace("⅓", "+0.33").replace("⅔", "+0.66").replace("¼", "+0.25").replace("¾", "+0.75").replace("⅕", "+0.20").replace("⅖", "+0.40").replace("⅗", "+0.60").replace("⅘", "+0.80").replace("F","").replace("f","");

        let evaled = null;
        try {
            evaled = eval(evalStr)
        } catch (e) {
            console.log(e, evalStr)
        }
        
        result = p_F(evaled);
    }
    return result;
};

export const getPreloadedState = (str :any) => {
    let matchedStr = null;
    let startStr = "window.PRELOADED_STATE = ";
    let endStr = ";\n    })();";
    let start = str.indexOf(startStr);
    if(start > 0){
        let newStr = str.slice(start + startStr.length, str.length);
        let end = newStr.indexOf(endStr);
        matchedStr = newStr.slice(0, end);

        matchedStr = JSON.parse(matchedStr);
    }
    return matchedStr;
}


export const isGoodPosFunc = (pos:any, out:any, dist:any, furlong:any) => {

    let position = p_I(pos);
    let outof = p_I(out);
    let lostDistance = distanceToWinnerStrToFloat(dist);
    let furlongs = distanceTodistanceFloat(furlong);
    
    
    if(position == 1){
        return true;
    }   
    
    if(position == 0){
        return false;
    }
        
    let race_distanceLost_good_amount = 12;
    if(furlongs <= 24) {
        race_distanceLost_good_amount = 10;
    }
    if(furlongs <= 20) {
        race_distanceLost_good_amount = 8;
    }
    if(furlongs <= 16) {
        race_distanceLost_good_amount = 7;
    }
    if(furlongs <= 14) {
        race_distanceLost_good_amount = 6;
    }
    if(furlongs <= 12) {
        race_distanceLost_good_amount = 5;
    }
    if(furlongs <= 8) {
        race_distanceLost_good_amount = 4;
    }
    if(furlongs <= 6) {
        race_distanceLost_good_amount = 3;
    }

    let lostDistanceCheck = (lostDistance <= (race_distanceLost_good_amount));

    return (lostDistanceCheck);
}