import React from "react";
import { useQuery } from '@apollo/client';

import { M_Q } from '../../queries/myQueries';

export interface TrainersProps {}

export const Trainers: React.FC<TrainersProps> = (props) => {

  const { data, loading, error } = useQuery(M_Q.GET_TRAINER_LOCATIONS, {});

  
  return <div>asdsa</div>;
};
