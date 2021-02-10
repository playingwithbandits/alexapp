import { makeStyles } from "@material-ui/core";
import React from "react";
import { Image, Text, Link } from "rebass";
import { RaceTable } from "../../RaceTable";

export interface HorsesInfoSectionProps {
  horses: any;
}
interface dayhorse{
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
interface dayhorsehistory{
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

export const HorsesInfoSection: React.FC<HorsesInfoSectionProps> = (props) => {
  let horses: dayhorse[] = props.horses?.dayhorses;
  let history: dayhorsehistory[] = props.horses?.dayhorseshistory;

  

  const classes = useStyles();

  let horseCols = [
    { 
      id: "silks", 
      numeric: false,
      width: "30px", 
      label: "", 
      returnFunc: (row: any) => {
        return <Image size={20} src={row.silks}/>
      }
    },
    { 
      id: "name", 
      numeric: false,
      width: "120px", 
      label: "Name", 
      returnFunc: (row: any) => {
        console.log(row);
        return <Link className={classes.nav} href={row.profilelink} title={row.name} target="_blank">{row.name}</Link>
      }
    },
    { id: "draw", numeric: true, width:"40px", label: "Draw"}, 
    { id: "or", numeric: true,  width:"40px", label: "or" },
    { id: "rpr", numeric: true,  width:"40px", label: "rpr" },
    { id: "ts", numeric: true,  width:"40px", label: "ts" },
    { id: "rider", numeric: false, width: "120px", label: "Jock", 
      returnFunc: (row: any) => {
        return <Link className={classes.nav} href={row.h_rider_link} title={row.rider} target="_blank">{row.rider}</Link>
      } 
    },
    { id: "trainer", numeric: false, width: "120px", label: "Train", 
      returnFunc: (row: any) => {
        return <Link className={classes.nav} href={row.h_trainer_link} title={row.trainer} target="_blank">{row.trainer}</Link>
      }
    },
    { id: "lastrun", numeric: true,  width:"40px", label: "Last" },
    { id: "age", numeric: true, width:"40px", label: "Age"},
    { id: "headgear", numeric: false, label: "Head" },
    { id: "form", numeric: false, label: "Form" },
  ]

  return <>

      <RaceTable data={horses} columns={horseCols}/>
  </>;
};
