import { Card } from "@material-ui/core";
import React, { useState } from "react";
import { Box, Flex } from "rebass";
import { Eyecatchers } from "../../Eyecatchers";
import { Results } from "../../Results";

export interface HomeProps {}

export const Home: React.FC<HomeProps> = (props) => {

  const [globalDisabledButton, setGlobalDisabledButton] = useState(true);

  return <>

  <Card>
    <Flex flexDirection={["column", "row"]}>
      <Box sx={{borderRight:[undefined,"1px solid grey"], borderBottom:["1px solid grey", "none"]}}>
        <Results globalDisabledButton={globalDisabledButton} setGlobalDisabledButton={setGlobalDisabledButton}/>
      </Box>
      <Box>
        <Eyecatchers globalDisabledButton={globalDisabledButton} setGlobalDisabledButton={setGlobalDisabledButton}/>
      </Box>
    </Flex>
  </Card>
    
  
  </>;
};
