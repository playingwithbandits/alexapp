import React from "react";
import { Text } from "rebass";
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


let horseCols = [
  {
    id: "name",
    numeric: false,
    label: "Name"
  },
  { id: "draw", numeric: true, label: "Draw" },
  { id: "number", numeric: true, label: "Number" },
  { id: "age", numeric: true, label: "age" },
  { id: "form", numeric: false, label: "form" },
  { id: "number", numeric: true, label: "Number" },
  { id: "headgear", numeric: false, label: "headgear" },
  { id: "h_ltrecords_aw_or", numeric: true, label: "headgear" },
  { id: "h_ltrecords_c_or", numeric: true, label: "headgear" },
  { id: "h_ltrecords_f_or", numeric: true, label: "headgear" },
  { id: "h_ltrecords_h_or", numeric: true, label: "headgear" },
  { id: "h_ltrecords_nhf_or", numeric: true, label: "headgear" },
  { id: "h_ltrecords_rs_or", numeric: true, label: "headgear" },
  { id: "h_rider_blind_stake", numeric: true, label: "headgear" },
  { id: "h_rider_good_runs", numeric: true, label: "headgear" },
  { id: "h_rider_good_runs_top_track", numeric: false, label: "headgear" },
  { id: "h_rider_good_runs_top_trainer", numeric: false, label: "headgear" },
  { id: "h_rider_total_prize_money", numeric: true, label: "headgear" },
  { id: "h_trainer_blind_stake", numeric: true, label: "headgear" },
  { id: "h_trainer_good_runs", numeric: true, label: "headgear" },
  { id: "h_trainer_good_runs_top_rider", numeric: false, label: "headgear" },
  { id: "h_trainer_good_runs_top_track", numeric: false, label: "headgear" },
  { id: "h_trainer_running_to_form", numeric: true, label: "headgear" },
  { id: "h_trainer_total_prize_money", numeric: true, label: "headgear" },
  { id: "jockey_recent_perc", numeric: true, label: "headgear"  },
  { id: "jockey_recent_runs", numeric: true, label: "headgear" },
  { id: "jockey_recent_wins", numeric: true, label: "headgear" },
  { id: "lastrun", numeric: true, label: "headgear" },
  { id: "name", numeric: false, label: "headgear" },
  { id: "rider", numeric: false, label: "headgear" },
  { id: "riderallowance", numeric: true, label: "headgear" },
  { id: "rpr", numeric: true, label: "headgear" },
  { id: "trainer", numeric: false, label: "headgear" },
  { id: "trainer_recent_perc", numeric: true, label: "headgear" },
  { id: "trainer_recent_runs", numeric: true, label: "headgear" },
  { id: "trainer_recent_wins", numeric: true, label: "headgear" },
  { id: "trainerrtf", numeric: true, label: "headgear" },
  { id: "ts", numeric: true, label: "headgear" },
  { id: "weight", numeric: true, label: "headgear" },
]

export const HorsesInfoSection: React.FC<HorsesInfoSectionProps> = (props) => {
  let horses: dayhorse[] = props.horses?.dayhorses;
  let history: dayhorsehistory[] = props.horses?.dayhorseshistory;

  console.log(horses);
  return <>

      <RaceTable data={horses} columns={horseCols}/>
  </>;
};
