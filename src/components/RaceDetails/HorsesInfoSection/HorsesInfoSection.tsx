import { makeStyles } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { Image, Text, Link, Box } from "rebass";
import { avgFromObj, p_F, p_I } from "../../../Helpers/HelperFunc";
import { RaceTable } from "../../RaceTable";

export interface HorsesInfoSectionProps {
  horses: any;
}

interface dayhorse__parsed {
  
  score?: any
  max_score?:any
  draw__good?: boolean
  or__good?: boolean
  rpr__good?: boolean
  ts__good?: boolean

}

interface dayhorse extends dayhorse__parsed{
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
interface dayhorsehistory {
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



// { id: "h_ltrecords_aw_or", numeric: true,  width:"40px", label: "h_ltrecords_aw_or" },
// { id: "h_ltrecords_c_or", numeric: true,  width:"40px", label: "h_ltrecords_c_or" },
// { id: "h_ltrecords_f_or", numeric: true,  width:"40px", label: "h_ltrecords_f_or" },
// { id: "h_ltrecords_h_or", numeric: true,  width:"40px", label: "h_ltrecords_h_or" },
// { id: "h_ltrecords_nhf_or", numeric: true,  width:"40px", label: "h_ltrecords_nhf_or" },
// { id: "h_ltrecords_rs_or", numeric: true,  width:"40px", label: "h_ltrecords_rs_or" },
// { id: "h_rider_blind_stake", numeric: true,  width:"40px", label: "h_rider_blind_stake" },
// { id: "h_rider_good_runs", numeric: true,  width:"40px", label: "h_rider_good_runs" },
// { id: "h_rider_good_runs_top_track", numeric: false, label: "h_rider_good_runs_top_track",
// width: "100px" },
// { id: "h_rider_good_runs_top_trainer", numeric: false, label: "h_rider_good_runs_top_trainer" },
// { id: "h_rider_total_prize_money", numeric: true,  width:"40px", label: "h_rider_total_prize_money" },
// { id: "h_trainer_blind_stake", numeric: true,  width:"40px", label: "h_trainer_blind_stake" },
// { id: "h_trainer_good_runs", numeric: true,  width:"40px", label: "h_trainer_good_runs" },
// { id: "h_trainer_good_runs_top_rider", numeric: false, label: "h_trainer_good_runs_top_rider" },
// { id: "h_trainer_good_runs_top_track", numeric: false, label: "h_trainer_good_runs_top_track" },
// { id: "h_trainer_running_to_form", numeric: true,  width:"40px", label: "h_trainer_running_to_form" },
// { id: "h_trainer_total_prize_money", numeric: true,  width:"40px", label: "h_trainer_total_prize_money" },
// { id: "jockey_recent_perc", numeric: true,  width:"40px", label: "jockey_recent_perc"  },
// { id: "jockey_recent_runs", numeric: true,  width:"40px", label: "jockey_recent_runs" },
// { id: "jockey_recent_wins", numeric: true,  width:"40px", label: "jockey_recent_wins" },
// { id: "riderallowance", numeric: true,  width:"40px", label: "riderallowance" },
// { id: "trainer_recent_perc", numeric: true,  width:"40px", label: "t_r_%" },
// { id: "trainer_recent_runs", numeric: true,  width:"40px", label: "t_r_r" },
// { id: "trainer_recent_wins", numeric: true,  width:"40px", label: "t_r_w" },
// { id: "trainerrtf", numeric: true,  width:"40px", label: "trainerrtf" },
// { id: "weight", numeric: true,  width:"40px", label: "weight" },

const useStyles = makeStyles((theme) => ({
  nav: {
    color: "rgba(0, 0, 0, 0.87)",
    textDecoration: "none"
  },
}));








const parseHorses = (horses: dayhorse[], setFunc: React.Dispatch<React.SetStateAction<dayhorse[]>>, allowedCols: any, contributingCols:any, weights:any) => {

    let allowedKeys = Object.keys(contributingCols).map(x => contributingCols[x] ? x : false).filter(x => x);
    let max_score = allowedKeys.map((x:any) => weights[x]).reduce((a,b)=>a+b,0);
    let contributingColsCount = Object.values(contributingCols).reduce((a:any,b:any)=> a+b, 0);

    let race_avgs = {
      draw: contributingCols.draw ? avgFromObj(horses, "draw") : 0,
      or: contributingCols.or ? avgFromObj(horses, "or") : 0,
      ts: contributingCols.ts ? avgFromObj(horses, "ts") : 0,
      rpr: contributingCols.rpr ? avgFromObj(horses, "rpr") : 0,
    }


    setFunc(horses.map((horse) => {

      let horse_score = 0;
      let parsedObj:dayhorse__parsed = {};
      allowedKeys.forEach(key => {

        switch(key){
          case "draw":
            let draw__good = horse.draw < race_avgs.draw;
            if(draw__good){
              horse_score += weights.draw
              parsedObj.draw__good = draw__good;
            }
            break;
          case "or":
            let or__good = horse.or >= race_avgs.or;
            if(or__good){
              horse_score += weights.or
              parsedObj.or__good = or__good;
            }
            break;
          case "rpr":
            let rpr__good = horse.rpr >= race_avgs.rpr;
            if(rpr__good){
              horse_score += weights.rpr
              parsedObj.rpr__good = rpr__good;
            }
            break;
          case "ts":
            let ts__good = horse.ts >= race_avgs.ts;
            if(ts__good){
              horse_score += weights.ts
              parsedObj.ts__good = ts__good;
            }
            break;  
        }
        
      })
      console.log(parsedObj);
      return ({
        ...horse,
        ...parsedObj,       
        score: horse_score,
        max_score: max_score
      })
  }));
}


















export const HorsesInfoSection: React.FC<HorsesInfoSectionProps> = (props) => {
  //let horses: dayhorse[] = props.horses?.dayhorses;
  let history: dayhorsehistory[] = props.horses?.dayhorseshistory;
  let tableColumns = [];
  const classes = useStyles();
  const [horses, setHorses] = useState<dayhorse[]>(props.horses?.dayhorses);

  let weights = {
    draw:1.5,
    or:1.25,
    rpr:0.8,
    ts:0.5
  }
  
  let allowedCols = {
    score: (horses.map(x => x.score && ((x.score) > 0)).some((x: any) => x)),
    name: true, 
    silks:  (horses.map(x => (x.silks.length)).some((x: any) => x)),
    draw:  (horses.map(x => (x.draw) > 0).some((x: any) => x)),
    or: (horses.map(x => (x.or) > 0).some((x: any) => x)),
    rpr: (horses.map(x => (x.rpr) > 0).some((x: any) => x)),
    ts: (horses.map(x => (x.ts) > 0).some((x: any) => x)),
    rider: (horses.map(x => (x.rider.length)).some((x: any) => x)),
    trainer: (horses.map(x => (x.trainer.length)).some((x: any) => x)),
    lastrun: (horses.map(x => (x.lastrun) > 0).some((x: any) => x)),
    age: (horses.map(x => (x.age) > 0).some((x: any) => x)),
    headgear: (horses.map(x => (x.headgear.length)).some((x: any) => x)),
    form: (horses.map(x => (x.form.length)).some((x: any) => x)),
  };
  let contributingCols = {
    score: false,
    name: false, 
    silks: false, 
    draw:  allowedCols.draw,
    or: allowedCols.or,
    rpr: allowedCols.rpr,
    ts: allowedCols.ts,
    rider: false, 
    trainer: false, 
    lastrun: false, 
    age: false, 
    headgear: false, 
    form: false, 
  };


  let horseCols = [

    { 
      id: "score", 
      numeric: true,
      width: "40px", 
      label: "Score", 
      displayCol: allowedCols.score,
      contributingCol: contributingCols.score,
      returnFunc: (row: any) => {
        return <Text textAlign="right" width="100%">{row.score}</Text>
      }, 
    },
    { 
      id: "max_score", 
      numeric: true,
      width: "40px", 
      label: "", 
      displayCol: allowedCols.score,
      contributingCol: contributingCols.score,
      returnFunc: (row: any) => {
        return <Text textAlign="right" width="100%">{row.max_score ? p_I((row.score/row.max_score)*100) : 0}</Text>
      }, 
    },


    {
      id: "silks",
      numeric: false,
      width: "30px",
      label: "",
      returnFunc: (row: any) => {
        return <Image size={20} src={row.silks} />
      }, 
      displayCol: allowedCols.silks,
      contributingCol: contributingCols.silks
    },
    {
      id: "name",
      numeric: false,
      width: "120px",
      label: "Name",
      returnFunc: (row: any) => {
        return <Link className={classes.nav} href={row.profilelink} title={row.name} target="_blank">{row.name}</Link>
      }, 
      displayCol: allowedCols.name,
      contributingCol: contributingCols.name
    },
    { 
      id: "draw", 
      numeric: true,
      width: "40px", 
      label: "Draw", 
      displayCol: allowedCols.draw,
      highlight: "draw__good",
      contributingCol: contributingCols.draw
    },
    { 
      id: "or", 
      numeric: true, 
      width: "40px", 
      label: "or", 
      displayCol: allowedCols.or,
      highlight: "or__good",
      contributingCol: contributingCols.or
    },
    {
      id: "rpr", 
      numeric: true, 
      width: "40px", 
      label: "rpr", 
      displayCol: allowedCols.rpr,
      highlight: "rpr__good",
      contributingCol: contributingCols.rpr
    },
    { 
      id: "ts", 
      numeric: true, 
      width: "40px", 
      label: "ts", 
      displayCol: allowedCols.ts,
      highlight: "ts__good",
      contributingCol: contributingCols.ts
    },
    {
      id: "rider", 
      numeric: false,
      width: "120px", 
      label: "Jock",
      returnFunc: (row: any) => {
        return <Link className={classes.nav} href={row.h_rider_link} title={row.rider} target="_blank">{row.rider}</Link>
      }, 
      displayCol: allowedCols.rider,
      contributingCol: contributingCols.rider
    },
    {
      id: "trainer", 
      numeric: false, 
      width: "120px", 
      label: "Train",
      returnFunc: (row: any) => {
        return <Link className={classes.nav} href={row.h_trainer_link} title={row.trainer} target="_blank">{row.trainer}</Link>
      }, 
      displayCol: allowedCols.trainer,
      contributingCol: contributingCols.trainer
    },
    { 
      id: "lastrun", 
      numeric: true, 
      width: "40px", 
      label: "Last", 
      displayCol: allowedCols.lastrun,
      contributingCol: contributingCols.lastrun
    },
    { 
      id: "age", 
      numeric: true, 
      width: "40px", 
      label: "Age", 
      displayCol: allowedCols.age,
      contributingCol: contributingCols.age
    },
    { 
      id: "headgear",
      numeric: false, 
      label: "Head", 
      displayCol: allowedCols.headgear,
      contributingCol: contributingCols.headgear
    },
    { 
      id: "form", 
      numeric: false, 
      label: "Form", 
      displayCol: allowedCols.form,
      contributingCol: contributingCols.form
    },
  ]

  useMemo(()=>{
    parseHorses(horses, setHorses, allowedCols, contributingCols, weights);
  },[])

  return <>
    <RaceTable data={horses} columns={horseCols} />
  </>;
};
