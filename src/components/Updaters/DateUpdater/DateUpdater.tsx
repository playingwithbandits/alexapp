import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { arrayToSet, distanceToWinnerStrToFloat, GET_CURRENT_DATE, GET_PAGE_DIV, placeToPlaceKey, p_I, queryNode, queryNodeAll, queryNodeAttr, queryNodeHref, queryNodeText, textToFurlong, trackOkay, queryNodeTextAll, GET_P_URL, getJSONFromPHP, realDateToRpHisDate, distanceTodistanceFloat, dateGood, getPreloadedState, isGoodPosFunc, p_F } from "../../../Helpers/HelperFunc";
import { M_Q } from "../../../queries/myQueries";
import { UpdateTablePanel } from "../../UpdateTablePanel";

export interface DateUpdaterProps {
  globalDisabledButton: boolean;
  setGlobalDisabledButton: (update: boolean | ((prevState: boolean) => boolean)) => void;
  date: string;
}

interface jockeyLast14Days{
  runs:any;
  wins:any;
  percent: any;
}

interface dayplaces_insert_input{
  date: string
  id: string
  place: string
  races: string
}
interface dayraces_insert_input{
  date: string
  class: number
  description: string
  distance: string
  distancef: number
  going: string
  id: string
  link: string
  rating: string
  time: string
  title: string
  winnings: number,
  horseIds: string
}

interface dayhorses_insert_input{
  age: number
  breeder: string
  claim: number
  colour_code: string
  comment: string
  dam: string
  dam_sire_avg_flat_win_dist: number 
  dam_sire_avg_win_dist: number 
  dob: string
  draw: number
  form: string
  gelded: string
  h_ltrecords_aw_or: number
  h_ltrecords_c_or: number
  h_ltrecords_f_or: number
  h_ltrecords_h_or: number
  h_ltrecords_nhf_or: number
  h_ltrecords_rs_or: number
  h_rider_blind_stake: number
  h_rider_good_runs: number
  h_rider_good_runs_top_track: string
  h_rider_good_runs_top_trainer: string
  h_rider_link: string
  h_rider_total_prize_money: number
  h_trainer_blind_stake: number
  h_trainer_good_runs: number
  h_trainer_good_runs_top_rider: string
  h_trainer_good_runs_top_track: string
  h_trainer_link: string
  h_trainer_running_to_form: number 
  h_trainer_total_prize_money: number
  headgear: string
  id: string
  jockey_recent_perc: number 
  jockey_recent_runs: number
  jockey_recent_wins: number
  lastrun: number
  name: string
  number: number
  or: number
  owner: string
  previous_owners_amount: number
  previous_owners_info: string
  previous_trainers_amount: number
  previous_trainers_info: string
  profilelink: string
  raceid: string
  rider: string
  riderallowance: number
  rpr: number
  sex_code: string
  silks: string
  sire: string
  sire_avg_flat_win_dist: number 
  sire_avg_win_dist: number 
  stable_tour_quotes: string
  tips: number
  trainer: string
  trainer_recent_perc: number 
  trainer_recent_runs: number
  trainer_recent_wins: number
  trainerrtf: number
  ts: number
  weight: number
}
interface dayhorseshistory_insert_input{
  claim: number
  class: number
  comment: string
  course: string
  date: string
  direction: string
  draw: number
  furlongs: number 
  going: string
  headgear: string
  hisraceid: string
  horseid: string
  lostdist: number 
  or: number
  outof: number
  place: string
  position: string
  prize: number
  racetype: string
  rider: string
  rpr: number
  tatics: string
  ts: number
}

export const DateUpdater: React.FC<DateUpdaterProps> = (props) => {
  const currentDate = props.date || GET_CURRENT_DATE();
  const res1 = useQuery(M_Q.GET_MEETINGS_FOR_DATE, {variables: { date: currentDate }})
  const res2 = useQuery(M_Q.GET_ALL_TRACKS_INFO, {});
  const res3 = useQuery(M_Q.GET_HORSE_HISTORY_DATA_CHECK, {});
  const [
    { loading: meeting_loading, data: meeting_data, error: meeting_error},
    { loading: tracks_loading, data: tracks_data, error: tracks_error },
    { loading: h_history_loading, data: h_history_data, error: h_history_error }
] = [res1, res2, res3];

  const [insertMeeting] = useMutation(M_Q.INSERT_MEETING); 
  const [insertRace] = useMutation(M_Q.INSERT_RACE); 
  const [insertHorse] = useMutation(M_Q.INSERT_HORSE); 
  const [insertHorseHistory] = useMutation(M_Q.INSERT_HORSE_HISTORY); 

  const amount = meeting_data?.dayplaces_aggregate?.aggregate?.count;
  const tracks_info = tracks_data?.TrackInformation;
  const currentHorsesHistoryInfo = h_history_data?.dayhorseshistory;

  

  const updateClick = async () => {
    try{
      
      props.setGlobalDisabledButton(false);

      console.log("updater" + currentDate);
      let rp_picks_url = "https://www.racingpost.com/racecards/" + currentDate;

      let meeting_objects:dayplaces_insert_input[] = [];
      let race_objects:dayraces_insert_input[] = [];
      let horse_objects:dayhorses_insert_input[] = [];
      let horse_history_objects:dayhorseshistory_insert_input[] = [];
      const rp_day_obj = await GET_PAGE_DIV(rp_picks_url);
      let rp_day_node = rp_day_obj.page_div;

      let day_races_nodes = queryNodeAll(rp_day_node, '[data-test-selector="RC-courseCards__raceRow"] a');
        
      let day_races = day_races_nodes.map((race_node: HTMLDivElement) => {
          let raceId = queryNodeAttr(race_node, "data-race-id");
          let place = queryNodeAttr(race_node, "data-racecourse");
          let raceTime = queryNodeAttr(race_node, "data-race-time").split(" ").join(":");
          let raceTitle = queryNodeText(queryNode(race_node, '[data-test-selector="RC-courseCards__info"]'));
          let raceDesc = queryNodeText(queryNode(race_node, '[data-test-selector="RC-courseCards__going"]')).replace(/\s\s+/g, ' ');
          let raceLink = queryNodeHref(race_node);
          return {place,raceId,raceTime,raceTitle,raceDesc,raceLink}
      });
      let places = arrayToSet(day_races, "place", "races");
      let dayPlacesArr: any[] = [];
      places.forEach((place : any) => {
          dayPlacesArr.push({
              "id": placeToPlaceKey(place.place),
              "place": place.place,
              "races": place.races
          });
      });
      
      dayPlacesArr = dayPlacesArr.filter((x) => {
          return x.id && trackOkay(x.id, tracks_info);
      });
      
      for (const place of dayPlacesArr) {
        let placeID = place.id;
        let placeName = place.place;
        let placeRaces = place.races.map((x:any) => x.raceId).join(",");

        meeting_objects.push( { id: placeID, place: placeName, date: currentDate, races: placeRaces });

        for await (const race of place.races) {
                
          let raceUrl = "https://www.racingpost.com" + race.raceLink;
          let raceId = race.raceId;

          let race_obj = await GET_PAGE_DIV(raceUrl);
          let race_node = race_obj.page_div;
          
          let r_prize = queryNodeText(queryNode(race_node, '[data-test-selector="RC-headerBox__winner"] .RC-headerBox__infoRow__content'));
          let distance = queryNodeText(queryNode(race_node, '[data-test-selector="RC-header__raceDistanceRound"]')).replace(/\s/g, '');
          let distancef = textToFurlong(distance);
          let rclass = p_I(queryNodeText(queryNode(race_node, '[data-test-selector="RC-header__raceClass"]')).match(/\d+/g));;
          let winnings = r_prize ? p_I(r_prize.match(/\d+,*\d*/g).join("").replace(",","")) : 0;
          let going = queryNodeText(queryNode(race_node, '[data-test-selector="RC-headerBox__going"] .RC-headerBox__infoRow__content'));
          let rating = queryNodeText(queryNode(race_node, '[data-test-selector="RC-header__rpAges"]'));
          

          let horseIds: any = [];
                
          
          let r_runners_sel =  queryNodeAll(race_node, '.RC-runnerRow.js-RC-runnerRow.js-PC-runnerRow:not(.RC-runnerRow_disabled)');
          let r_runners = [];
          
          for (let h of r_runners_sel) {
              
              let id =   queryNodeAttr(h, "data-ugc-runnerid");
              horseIds.push(id);
              
              let h_name =   queryNodeText( queryNode(h, '[data-test-selector="RC-cardPage-runnerName"]'));
              
              let h_lastRun_str =    queryNodeText( queryNode(h, '[data-test-selector="RC-cardPage-runnerStats-lastRun"]'));
              let h_sire =   queryNodeText( queryNode(h, '[data-test-selector="RC-pedigree__sire"]'));
              let h_dam =   queryNodeText( queryNode(h, '[data-test-selector="RC-pedigree__dam"]'));
              let h_tips_str =   queryNodeTextAll( queryNode(h, '[data-test-selector="RC-cardPage-runnerStats-tips"]'));
              let h_comment =   queryNodeText( queryNode(h, '[data-test-selector="RC-comments__content"]'));
              let h_trainerRtf_str =   queryNodeText( queryNode(h, '[data-test-selector="RC-cardPage-runnerTrainer-rtf"]'));
              let h_riderAllowance_str =   queryNodeText( queryNode(h, '[data-test-selector="RC-cardPage-runnerJockey-allowance"]'));
              let h_form =   queryNodeTextAll( queryNode(h, '[data-test-selector="RC-cardPage-runnerForm"]')); 
              let h_or_str =   queryNodeAttr(  queryNode(h, '[data-test-selector="RC-cardPage-runnerOr"]') , 'data-order-or');
              let h_ts_str =   queryNodeAttr(  queryNode(h, '[data-test-selector="RC-cardPage-runnerTs"]') , 'data-order-ts');
              let h_rpr_str =   queryNodeAttr(  queryNode(h, '[data-test-selector="RC-cardPage-runnerRpr"]') , 'data-order-rpr');
              let h_draw_str =   queryNodeAttr(  queryNode(h, '[data-test-selector="RC-cardPage-runnerNumber-draw"]') , 'data-order-draw');
              let h_number_str =   queryNodeAttr(  queryNode(h, '[data-test-selector="RC-cardPage-runnerNumber-no"]') , 'data-order-no');
              let h_age_str =   queryNodeAttr(  queryNode(h, '[data-test-selector="RC-cardPage-runnerAge"]') , 'data-order-age');
              let h_weight_lbs_str =   queryNodeAttr(  queryNode(h, '[data-test-selector="RC-cardPage-runnerWgt-carried"]') , 'data-order-wgt');
              
              let h_rider =   queryNodeAttr(  queryNode(h, '[data-test-selector="RC-cardPage-runnerJockey-name"]') , 'data-order-jockey');
              
              let h_rider_link = "https://www.racingpost.com"+  queryNodeHref( queryNode(h, '[data-test-selector="RC-cardPage-runnerJockey-name"]'));
              
              let h_trainer =   queryNodeAttr(  queryNode(h, '[data-test-selector="RC-cardPage-runnerTrainer-name"]') , 'data-order-trainer');
              
              let h_trainer_link = "https://www.racingpost.com"+  queryNodeHref( queryNode(h, '[data-test-selector="RC-cardPage-runnerTrainer-name"]'));
              
              let h_profileLink = "https://www.racingpost.com"+   queryNodeHref( queryNode(h, '[data-test-selector="RC-cardPage-runnerName"]'));
                                  
              
              let h_headgear =   queryNodeTextAll( queryNode(h, '[data-test-selector="RC-cardPage-runnerHeadGear"]')); 
              
              let h_or = p_I(h_or_str.match(/\d+/g));
              let h_ts = p_I(h_ts_str.match(/\d+/g));
              let h_rpr = p_I(h_rpr_str.match(/\d+/g));
              let h_draw = p_I(h_draw_str.match(/\d+/g));
              let h_number = p_I(h_number_str.match(/\d+/g));
              let h_lastRun = p_I(h_lastRun_str.match(/\d+/g));
              let h_age = p_I(h_age_str.match(/\d+/g));
              let h_weight_lbs = p_I(h_weight_lbs_str.match(/\d+/g));
              let h_tips = p_I(h_tips_str.match(/\d+/g));
              let h_trainerRtf = p_I(h_trainerRtf_str.match(/\d+/g));
              let h_riderAllowance = p_I(h_riderAllowance_str.match(/\d+/g));
              
              let h_claim =   queryNodeText(  queryNode(h, '[data-test-selector="RC-cardPage-runnerJockey-allowance"]') );
              
              h_claim  = p_I(h_claim.match(/\d+/g));
              if(h_claim){
                    h_or = h_or - h_claim;
              }
              
              
              let h_rider_link_obj = await  GET_PAGE_DIV(h_rider_link);
              let h_rider_link_obj_str = h_rider_link_obj.page_div_str;
              let h_rider_link_obj_str_preloaded =  getPreloadedState(h_rider_link_obj_str);
              
              let h_rider_good_runs = 0;
              let h_rider_good_runs_top_trainer_arr:any[] = [];
              let h_rider_good_runs_top_track_arr:any[] = [];
              let h_rider_total_prize_money = 0;
              let h_rider_blind_stake = 0;
              
              if(h_rider_link_obj_str_preloaded){
                  let h_rider_obj_last14Days = h_rider_link_obj_str_preloaded.last14Days || [];
                  
                  h_rider_obj_last14Days.forEach((x:any) => {
                      
                      let lostdist =  distanceToWinnerStrToFloat(x.winningDistance ? x.winningDistance : x.distanceToWinner);     
                      let isGoodPos = false;    
                      isGoodPos =  isGoodPosFunc(x.raceOutcomeCode, x.noOfRunners, lostdist, x.distanceFurlong);
                      x["isGoodPos"] = isGoodPos;       
                      
                      h_rider_good_runs_top_trainer_arr.push(x.trainerStyleName);
                      h_rider_good_runs_top_track_arr.push(x.courseStyleName);
                  });
                  
                  h_rider_good_runs = h_rider_obj_last14Days.filter((x:any) => x.isGoodPos).length;
                  
                  h_rider_good_runs_top_trainer_arr = Array.from(new Set(h_rider_good_runs_top_trainer_arr.filter((x:any) => x)));
                  h_rider_good_runs_top_track_arr = Array.from(new Set(h_rider_good_runs_top_track_arr.filter((x:any) => x)));
                  
                  
                  let h_rider_obj_statisticalSummary = h_rider_link_obj_str_preloaded.statisticalSummary || [];
                  
                  
                  let h_rider_obj_latest_year_stats = h_rider_obj_statisticalSummary.length ? h_rider_obj_statisticalSummary.sort((a:any,b:any) => new Date(b.seasonEndDate).getTime()  - new Date(a.seasonEndDate).getTime() )[0] : {};
                  
                  h_rider_total_prize_money = p_I(h_rider_obj_latest_year_stats.netTotalPrizeMoney);
                  h_rider_blind_stake = p_I(h_rider_obj_latest_year_stats.stake);
                  
                  
              }
              let h_rider_good_runs_top_trainer = h_rider_good_runs_top_trainer_arr.join(",");
              let h_rider_good_runs_top_track = h_rider_good_runs_top_track_arr.join(",");
              
              let h_trainer_link_obj = await  GET_PAGE_DIV(h_trainer_link);
              let h_trainer_link_obj_str = h_trainer_link_obj.page_div_str;
              let h_trainer_link_obj_str_preloaded =  getPreloadedState(h_trainer_link_obj_str);
              
              let h_trainer_running_to_form = null;
              let h_trainer_good_runs = 0;
              let h_trainer_total_prize_money = 0;
              let h_trainer_blind_stake = 0;
              let h_trainer_good_runs_top_rider_arr:any[] = [];
              let h_trainer_good_runs_top_track_arr:any[] = [];
              
              if(h_trainer_link_obj_str_preloaded){
                  let h_trainer_obj_profile = h_trainer_link_obj_str_preloaded.profile;
                  
                  h_trainer_running_to_form = p_F(h_trainer_obj_profile.runningToForm);
                  
                  let h_trainer_obj_last14Days = h_trainer_link_obj_str_preloaded.last14Days  || [];
                  
                  h_trainer_obj_last14Days.forEach((x:any) => {
                      
                      let lostdist =  distanceToWinnerStrToFloat(x.winningDistance ? x.winningDistance : x.distanceToWinner);     
                      let isGoodPos = false;    
                      isGoodPos =  isGoodPosFunc(x.raceOutcomeCode, x.noOfRunners, lostdist, x.distanceFurlong);
                      x["isGoodPos"] = isGoodPos;       
                      
                      
                      h_trainer_good_runs_top_rider_arr.push(x.jockeyStyleName);
                      h_trainer_good_runs_top_track_arr.push(x.courseStyleName);
                  });
                  
                  h_trainer_good_runs =  h_trainer_obj_last14Days.filter((x:any) => x.isGoodPos).length;
                  
                  h_trainer_good_runs_top_rider_arr = Array.from(new Set(h_trainer_good_runs_top_rider_arr.filter((x:any) => x)));
                  h_trainer_good_runs_top_track_arr = Array.from(new Set(h_trainer_good_runs_top_track_arr.filter((x:any) => x)));
                  
                  
                  let h_trainer_obj_statisticalSummary = h_trainer_link_obj_str_preloaded.statisticalSummary  || [];
                  
                  let h_trainer_obj_latest_year_stats = h_trainer_obj_statisticalSummary.length ? h_trainer_obj_statisticalSummary.sort((a: any,b:any) => new Date(b.seasonEndDate).getTime()  - new Date(a.seasonEndDate).getTime() )[0] : {};
                  
                  h_trainer_total_prize_money = p_I(h_trainer_obj_latest_year_stats.netTotalPrizeMoney);
                  h_trainer_blind_stake = p_I(h_trainer_obj_latest_year_stats.stake);
                                            
              }
              
              let h_trainer_good_runs_top_rider = h_trainer_good_runs_top_rider_arr.join(",");
              let h_trainer_good_runs_top_track = h_trainer_good_runs_top_track_arr.join(",");
              
              let h_form_default_link = h_profileLink.split("#")[0] + "/form";
              let h_form_default_obj = await  GET_PAGE_DIV(h_form_default_link);
              let h_form_default_obj_str = h_form_default_obj.page_div_str;
              
              let h_form_default_obj_str_preloaded =  getPreloadedState(h_form_default_obj_str);
              
              //horses profile info
              
              
              
              let dob = "";
              let silks = "";
              let gelded = "";
              let colour_code = "";
              let sex_code = "";
              
              let owner = "";
              let breeder = "";
              
              
              let trainer_recent_runs = 0;
              let trainer_recent_wins = 0;
              let trainer_recent_perc = 0;
              
              
              let jockey_recent_runs = 0;
              let jockey_recent_wins = 0;
              let jockey_recent_perc = 0;
              
              let previous_trainers_amount = null;
              let previous_trainers_info = "";
              
              let previous_owners_amount = null;
              let previous_owners_info = "";
              
              let sire_avg_flat_win_dist = 0;
              let dam_sire_avg_flat_win_dist = 0;
              let sire_avg_win_dist = 0;
              let dam_sire_avg_win_dist = 0;
              
              let stable_tour_quotes = "";
              let quotes = "";
          
              
              if(h_form_default_obj_str_preloaded){
                  let h_obj_profile = h_form_default_obj_str_preloaded.profile;
                  
                  dob = h_obj_profile.horseDateOfBirth ? h_obj_profile.horseDateOfBirth.split("T")[0] : "";
                  silks = h_obj_profile.silkImagePath ? "https://www.rp-assets.com/png_silks/" + h_obj_profile.silkImagePath + ".png" : "";
                  gelded =  h_obj_profile.dateGelded ? h_obj_profile.dateGelded.split("T")[0] : "";
                  
                  colour_code =  h_obj_profile.horseColourCode ? h_obj_profile.horseColourCode : "";
                  sex_code = h_obj_profile.horseSexCode ? h_obj_profile.horseSexCode : "";
                  
                  owner =  h_obj_profile.ownerName ? h_obj_profile.ownerName : "";
                  breeder = h_obj_profile.breederName ? h_obj_profile.breederName : "";
                  
                  trainer_recent_runs = h_obj_profile.trainerLast14Days.runs ? p_I(h_obj_profile.trainerLast14Days.runs) : 0;
                  trainer_recent_wins = h_obj_profile.trainerLast14Days.wins ? p_I(h_obj_profile.trainerLast14Days.wins) : 0;
                  trainer_recent_perc = h_obj_profile.trainerLast14Days.percent ? p_F(p_F(h_obj_profile.trainerLast14Days.percent).toFixed(2)) : 0;
                  
                  previous_trainers_amount = h_obj_profile.previousTrainers ? h_obj_profile.previousTrainers.length : null;
                  if(previous_trainers_amount){
                      previous_trainers_info = h_obj_profile.previousTrainers.map((x:any) => x.trainerChangeDate.split("T")[0]+":"+x.trainerStyleName).join(",");
                  }
                      
                  previous_owners_amount = h_obj_profile.previousOwners ? h_obj_profile.previousOwners.length : null;
                  if(previous_owners_amount){
                      previous_owners_info = h_obj_profile.previousOwners.map((x:any) => x.ownerChangeDate.split("T")[0]+":"+x.ownerStyleName).join(",");
                  }
                  
                  sire_avg_flat_win_dist = h_obj_profile.sireAvgFlatWinDist ? p_F(p_F(h_obj_profile.sireAvgFlatWinDist).toFixed(2)) : 0;
                  dam_sire_avg_flat_win_dist = h_obj_profile.damSireAvgFlatWinDist ? p_F(p_F(h_obj_profile.damSireAvgFlatWinDist).toFixed(2)) : 0;
                  
                  sire_avg_win_dist = h_obj_profile.sireAvgWinDistance ? p_F(p_F(h_obj_profile.sireAvgWinDistance).toFixed(2)) : 0;
                  dam_sire_avg_win_dist = h_obj_profile.damSireAvgWinDistance ? p_F(p_F(h_obj_profile.damSireAvgWinDistance).toFixed(2)) : 0;
                  
                  
                  stable_tour_quotes = h_form_default_obj_str_preloaded.stableTourQuotes ? h_form_default_obj_str_preloaded.stableTourQuotes.map((x:any)=> "ST: " + x.notes).join(" | ") : "";
                  
                  quotes = h_form_default_obj_str_preloaded.quotes ? h_form_default_obj_str_preloaded.quotes.map((x:any)=> "Q: " + x.notes + "-" +  realDateToRpHisDate(x.raceDate)).join(" | ") : "";
                  
                  stable_tour_quotes = [stable_tour_quotes, quotes].join(" | ");
                  
                  let entries = h_form_default_obj_str_preloaded.entries ? h_form_default_obj_str_preloaded.entries : [];
                  
                  let jockeyLast14Days:jockeyLast14Days = {runs:null,wins:null,percent:null};
                  entries.forEach((x:any) => {
                      if(x.jockeyStyleName && (x.jockeyStyleName.toLowerCase().replace(/[\W_]+/g," ").replace(/'/g, "").trim() == h_rider.toLowerCase().replace(/[\W_]+/g," ").replace(/'/g, "").trim())){
                          jockeyLast14Days = x.jockeyLast14Days;
                      }
                  });                        
                  jockey_recent_runs = jockeyLast14Days.runs ? p_I(jockeyLast14Days.runs) : 0;
                  jockey_recent_wins = jockeyLast14Days.wins ? p_I(jockeyLast14Days.wins) : 0;
                  jockey_recent_perc = jockeyLast14Days.percent ? p_F(p_F(jockeyLast14Days.percent).toFixed(2)) : 0;
                  
              }
              
              
              
              
              
              
              
              
              
              let h_form_link = h_profileLink.split("#")[0].replace("profile","profile/tab") + "/form";
              let h_form_obj = await  getJSONFromPHP( GET_P_URL(h_form_link));
              let h_form_json_res = h_form_obj.json_res  || {};
              let h_form_arr = h_form_json_res.form || [];
              
              Object.keys(h_form_arr).forEach(key => {
                  
                  let hist_obj = h_form_arr[key];
                  let hdate =  realDateToRpHisDate(hist_obj.raceDatetime);
                  let horseid = id;

                  let alreadyInTableCheck = (currentHorsesHistoryInfo != undefined) ? currentHorsesHistoryInfo.filter((x:any) => x.horseid == horseid && x.date == hdate) : [];
                  let dateOkayCheck =  dateGood(hdate, currentDate);
                  
                  if(alreadyInTableCheck.length || !dateOkayCheck){
                      //already in table
                  }else{;
                      
                      let row_pos = hist_obj.raceOutcomeCode;
                        
                      if(!p_I(hist_obj.raceOutcomeCode)){
                          console.log(hist_obj.raceOutcomeCode);
                      }
                      //if(row_pos){
                          
                          let row_pos_outOf = p_I(hist_obj.noOfRunners);
                          let lostdist =  distanceToWinnerStrToFloat(hist_obj.winningDistance ? hist_obj.winningDistance : hist_obj.distanceToWinner);

                          let his_rider = hist_obj.jockeyStyleName;

                          let his_racetype = (hist_obj.raceTypeCode);
                          let his_place = (hist_obj.courseRpAbbrev3).toLowerCase();
                          let his_prize = p_I(hist_obj.prizeSterling);
                          let his_distance =  distanceTodistanceFloat(hist_obj.distanceFurlong);
                          let his_going = hist_obj.goingTypeServicesDesc;
                          let his_class = p_I(hist_obj.raceClass);

                          let his_draw = p_I(hist_obj.draw);

                          let his_rpr = p_I(hist_obj.rpPostmark);
                          let his_or = p_I(hist_obj.officialRatingRanOff);
                          
                          let his_claim = p_I(hist_obj.weightAllowanceLbs);
                          
                          if(his_claim){
                                his_or = his_or - his_claim;
                          }
                              
                          let his_ts = p_I(hist_obj.rpTopspeed);

                          let his_race_info_comment =  hist_obj.courseComments  || "-";
                          let his_direction = "-";
                          if ( ["left", "lh"].some((x:any) => his_race_info_comment.toLowerCase().includes(x)) ) {
                              his_direction = "LH";
                          }
                          if ( ["right", "rh"].some((x:any) => his_race_info_comment.toLowerCase().includes(x)) ) {
                              his_direction = "RH";
                          }
                          
                          

                          let htatics = hist_obj.raceTactics.actual.runnerAttribDescription;
                          
                          let hComment = hist_obj.rpCloseUpComment;
                          let hCourse = hist_obj.courseStyleName;
                          let hHeadGear = hist_obj.horseHeadGear;
                          
                      
                          let hracetype = his_racetype;
                          let hplace = his_place;
                          let hprize = his_prize;
                          let hfurlongs = his_distance;
                          let hgoing = his_going;
                          let hrclass = his_class;
                          let hdraw = his_draw;
                          let hor = his_or;
                          let hclaim = his_claim;
                          let hts = his_ts;
                          let hrpr = his_rpr;
                          let hrider = his_rider;
                          let hposition = row_pos;
                          let hlostdist = lostdist;
                          let houtof = row_pos_outOf;
                          let hdirection = his_direction;



                            let tableHistoryRow: dayhorseshistory_insert_input = {
                                horseid: (horseid ? horseid : "-").replace(/[\W_]+/g," ").replace(/'/g, ""), 
                                hisraceid: (key ? key : "-").replace(/[\W_]+/g," ").replace(/'/g, ""), 
                                date: (hdate ? hdate : "-").replace(/[\W_]+/g," ").replace(/'/g, ""),
                                place: (hplace ? hplace : "-").replace(/[\W_]+/g," ").replace(/'/g, ""),
                                furlongs: hfurlongs ? hfurlongs : 0,
                                going: (hgoing ? hgoing : "-").replace(/[\W_]+/g," ").replace(/'/g, ""),
                                class: hrclass ? hrclass : 0,
                                or: hor ? hor : 0,
                                claim: hclaim ? hclaim : 0,
                                ts: hts ? hts : 0,
                                rpr: hrpr ? hrpr : 0,
                                rider: (hrider ? hrider : "-").replace(/[\W_]+/g," ").replace(/'/g, ""),
                                position: hposition ? hposition : "-",
                                lostdist: hlostdist ? hlostdist : 0,
                                outof: houtof ? houtof : 0,
                                direction: (hdirection  ? hdirection : "-").replace(/[\W_]+/g," ").replace(/'/g, ""),
                                
                                prize: hprize ? hprize : 0,
                                racetype: (hracetype ? hracetype : "-").replace(/[\W_]+/g," ").replace(/'/g, ""),
                                draw: hdraw  ? hdraw : 0,
                                tatics: (htatics ? htatics : "-").replace(/[\W_]+/g," ").replace(/'/g, ""),
                                
                                comment: (hComment ? hComment : "-").replace(/[\W_]+/g," ").replace(/'/g, ""),
                                course: (hCourse ? hCourse : "-").replace(/[\W_]+/g," ").replace(/'/g, ""),
                                headgear: (hHeadGear ? hHeadGear : "-").replace(/[\W_]+/g," ").replace(/'/g, "")
                                
                          };      
                          
                          horse_history_objects.push(tableHistoryRow);
                          
                      //}
                      
                  }
                  
              });
              
              
              let h_records_obj = h_form_json_res.raceRecords || {};
              let h_ltRecords_obj = h_records_obj.lifetimeRecords || {};
              
              let h_ltRecords_AW_or = p_I((h_ltRecords_obj["All-weather"] || {})["or+"]);
              let h_ltRecords_F_or = p_I((h_ltRecords_obj["Flat Turf"] || {})["or+"]);
              let h_ltRecords_NHF_or = p_I((h_ltRecords_obj["NHF"] || {})["or+"]);
              let h_ltRecords_H_or = p_I((h_ltRecords_obj["Hurdle"] || {})["or+"]);
              let h_ltRecords_C_or = p_I((h_ltRecords_obj["Chase"] || {})["or+"]);
              let h_ltRecords_RS_or = p_I((h_ltRecords_obj["Rules Races"] || {})["or+"]);
              

              
              let tableHorseRow: dayhorses_insert_input = { 
                    id: id, 
                    name: h_name,
                    raceid: raceId,
                    lastrun: h_lastRun ? h_lastRun : 0,
                    sire: h_sire,
                    dam: h_dam,
                    tips: h_tips ? h_tips : 0,
                    comment: h_comment,
                    trainerrtf: h_trainerRtf ? h_trainerRtf : 0,
                    riderallowance: h_riderAllowance ? h_riderAllowance : 0,
                    form: h_form,
                    or: h_or ? h_or : 0,
                    claim: h_claim ? h_claim : 0,
                    ts: h_ts ? h_ts : 0,
                    rpr: h_rpr ? h_rpr : 0,
                    draw: h_draw ? h_draw : 0,
                    number: h_number ? h_number : 0,
                    age: h_age ? h_age : 0,
                    weight: h_weight_lbs ? h_weight_lbs : 0,
                    rider: h_rider,
                    trainer: h_trainer,
                    profilelink: h_profileLink,
                    headgear: h_headgear,
                    dob: dob,
                    silks:silks,
                    gelded:gelded,
                    colour_code:colour_code,
                    sex_code:sex_code,

                    owner:owner.replace(/'/g, ""),
                    breeder:breeder.replace(/'/g, ""),

                    trainer_recent_runs:trainer_recent_runs ? trainer_recent_runs : 0,
                    trainer_recent_wins:trainer_recent_wins ? trainer_recent_wins : 0,
                    trainer_recent_perc:trainer_recent_perc ? trainer_recent_perc : 0,

                    previous_trainers_amount:previous_trainers_amount ? previous_trainers_amount : 0,
                    previous_trainers_info:previous_trainers_info.replace(/'/g, ""),

                    previous_owners_amount:previous_owners_amount ? previous_owners_amount : 0,
                    previous_owners_info:previous_owners_info.replace(/'/g, ""),

                    sire_avg_flat_win_dist:sire_avg_flat_win_dist  ? sire_avg_flat_win_dist : 0,
                    dam_sire_avg_flat_win_dist:dam_sire_avg_flat_win_dist  ? dam_sire_avg_flat_win_dist : 0,
                    sire_avg_win_dist:sire_avg_win_dist ? sire_avg_win_dist : 0,
                    dam_sire_avg_win_dist:dam_sire_avg_win_dist ? dam_sire_avg_win_dist : 0,

                    stable_tour_quotes:stable_tour_quotes.replace(/'/g, ""),
                    
                    
                    jockey_recent_runs:jockey_recent_runs ? jockey_recent_runs : 0,
                    jockey_recent_wins:jockey_recent_wins ? jockey_recent_wins : 0,
                    jockey_recent_perc:jockey_recent_perc ? jockey_recent_perc : 0,
                    
                    
                    
                    h_rider_good_runs:h_rider_good_runs ? h_rider_good_runs : 0,
                    h_rider_good_runs_top_trainer:h_rider_good_runs_top_trainer ? h_rider_good_runs_top_trainer.replace(/'/g, "") : "",  
                    h_rider_good_runs_top_track:h_rider_good_runs_top_track ? h_rider_good_runs_top_track.replace(/'/g, "") : "",      
                    
                    h_trainer_good_runs_top_rider:h_trainer_good_runs_top_rider ? h_trainer_good_runs_top_rider.replace(/'/g, "") : "",      
                    h_trainer_good_runs_top_track:h_trainer_good_runs_top_track ? h_trainer_good_runs_top_track.replace(/'/g, "") : "",      
                    
                    h_rider_total_prize_money:h_rider_total_prize_money ? h_rider_total_prize_money : 0,
                    h_rider_blind_stake:h_rider_blind_stake ? h_rider_blind_stake : 0,

                    h_trainer_running_to_form:h_trainer_running_to_form ? h_trainer_running_to_form : 0,
                    h_trainer_good_runs:h_trainer_good_runs ? h_trainer_good_runs : 0,
                    h_trainer_total_prize_money:h_trainer_total_prize_money ? h_trainer_total_prize_money : 0,      
                    h_trainer_blind_stake:h_trainer_blind_stake ? h_trainer_blind_stake : 0,   
                    
                    h_rider_link: h_rider_link,
                    h_trainer_link: h_trainer_link,
                    
                    
                    h_ltrecords_aw_or: h_ltRecords_AW_or ? h_ltRecords_AW_or : 0,
                    h_ltrecords_f_or: h_ltRecords_F_or ? h_ltRecords_F_or : 0,
                    h_ltrecords_nhf_or: h_ltRecords_NHF_or ? h_ltRecords_NHF_or : 0,
                    h_ltrecords_h_or: h_ltRecords_H_or ? h_ltRecords_H_or : 0,
                    h_ltrecords_c_or: h_ltRecords_C_or ? h_ltRecords_C_or : 0,
                    h_ltrecords_rs_or: h_ltRecords_RS_or ? h_ltRecords_RS_or : 0
              };

              horse_objects.push(tableHorseRow);
          }

                
          horseIds = horseIds.join(",");
          race_objects.push({ 
            id: raceId, 
            time: race.raceTime, 
            title: race.raceTitle,
            description: race.raceDesc,
            link: raceUrl,
            distance: distance,
            distancef: distancef ? distancef : 0,
            class: rclass ? rclass : 0,
            winnings: winnings  ? winnings : 0,
            going: going,
            rating: rating,
            date: currentDate,
            horseIds: horseIds
          });
        }

      }
      let size = 200;
      while (race_objects.length > 0){
        await insertRace({
          variables: {objects: race_objects.splice(0, size)},
          refetchQueries: [{
            query: M_Q.GET_MEETINGS_FOR_DATE,
            variables: { date: currentDate }
          }]
        });
      }
      while (meeting_objects.length > 0){
        await insertMeeting({
          variables: {objects: meeting_objects.splice(0, size)},
          refetchQueries: [{
            query: M_Q.GET_MEETINGS_FOR_DATE,
            variables: { date: currentDate }
          }]
        });
      }
      while (horse_objects.length > 0){
        await insertHorse({
          variables: {objects: horse_objects.splice(0, size)},
          refetchQueries: [{
            query: M_Q.GET_MEETINGS_FOR_DATE,
            variables: { date: currentDate }
          }]
        });
      }
      while (horse_history_objects.length > 0){
        await insertHorseHistory({
          variables: {objects: horse_history_objects.splice(0, size)},
          refetchQueries: [{
            query: M_Q.GET_MEETINGS_FOR_DATE,
            variables: { date: currentDate }
          }]
        });
      }
      

      

      


    } catch (err) {
      console.log(err);
    } finally {
      props.setGlobalDisabledButton(true);
    }
  };
  
  return <>
        <UpdateTablePanel loading={meeting_loading} title={currentDate} count={amount} onClick={updateClick} globalDisabledButton={props.globalDisabledButton}/>
      </>;
};
