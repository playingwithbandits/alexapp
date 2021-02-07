import React, { useEffect, useMemo, useState } from "react";
import usePromise from "react-promise";

export interface ResultsProps {}

interface ResultsInfo_insert_input {
  h_id: String;
  h_link: String;
  h_lostdist: any;
  h_name: String;
  h_or: any;
  h_pos: String;
  r_code: String;
  r_date: String;
  r_distancef: any;
  r_id: String;
  r_place: String;
  r_requirements: String;
}

export const Results: React.FC<ResultsProps> = (props) => {
  return <div>Results table</div>;
};
