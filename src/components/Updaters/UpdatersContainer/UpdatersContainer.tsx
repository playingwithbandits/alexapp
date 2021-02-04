import { Card } from "@material-ui/core";
import React, { useState } from "react";
import { Box, Flex } from "rebass";
import { EyecatchersUpdater } from "../EyecatchersUpdater";
import { ResultsUpdater } from "../ResultsUpdater";
import { TodayUpdater } from "../TodayUpdater";
import { TomorrowUpdater } from "../TomorrowUpdater";

export interface UpdatersContainerProps {}

export const UpdatersContainer: React.FC<UpdatersContainerProps> = (props) => {

  const [globalDisabledButton, setGlobalDisabledButton] = useState(true);

  return <>

  <Card>
    <Flex flexDirection={["column", "row"]}>
      <Box sx={{borderRight:[undefined,"1px solid grey"], borderBottom:["1px solid grey", "none"]}}>
        <TodayUpdater globalDisabledButton={globalDisabledButton} setGlobalDisabledButton={setGlobalDisabledButton}/>
      </Box>
      <Box sx={{borderRight:[undefined,"1px solid grey"], borderBottom:["1px solid grey", "none"]}}>
        <TomorrowUpdater globalDisabledButton={globalDisabledButton} setGlobalDisabledButton={setGlobalDisabledButton}/>
      </Box>
      <Box sx={{borderRight:[undefined,"1px solid grey"], borderBottom:["1px solid grey", "none"]}}>
        <ResultsUpdater globalDisabledButton={globalDisabledButton} setGlobalDisabledButton={setGlobalDisabledButton}/>
      </Box>
      <Box>
        <EyecatchersUpdater globalDisabledButton={globalDisabledButton} setGlobalDisabledButton={setGlobalDisabledButton}/>
      </Box>
    </Flex>
  </Card>
    
  
  </>;
};
