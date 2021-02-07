import { Card, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Box, Flex } from "rebass";
import { EyecatchersUpdater } from "../EyecatchersUpdater";
import { ResultsUpdater } from "../ResultsUpdater";
import { TodayUpdater } from "../TodayUpdater";
import { TomorrowUpdater } from "../TomorrowUpdater";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    
  }
});

export interface UpdatersContainerProps {}

export const UpdatersContainer: React.FC<UpdatersContainerProps> = (props) => {

  const classes = useStyles();


  const [globalDisabledButton, setGlobalDisabledButton] = useState(true);

  return <>
  <Grid container spacing={1}>
        <Grid item md={3} sm={6}  xs={12}>
          <Card className={classes.root}>
              <TodayUpdater globalDisabledButton={globalDisabledButton} setGlobalDisabledButton={setGlobalDisabledButton}/>
          </Card>
        </Grid>
        <Grid item md={3} sm={6}  xs={12}>
          <Card className={classes.root}>
              <TomorrowUpdater globalDisabledButton={globalDisabledButton} setGlobalDisabledButton={setGlobalDisabledButton}/>
          </Card>
        </Grid>
        <Grid item md={3} sm={6}   xs={12}>
          <Card className={classes.root}>
              <ResultsUpdater globalDisabledButton={globalDisabledButton} setGlobalDisabledButton={setGlobalDisabledButton}/>
          </Card>
        </Grid>
        <Grid item md={3} sm={6}   xs={12}>
          <Card className={classes.root}>
              <EyecatchersUpdater globalDisabledButton={globalDisabledButton} setGlobalDisabledButton={setGlobalDisabledButton}/>
          </Card>
        </Grid>
  </Grid>

    
  </>;
};
