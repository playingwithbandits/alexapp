import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { RaceDetails } from '../RaceDetails';
import { Flex } from 'rebass';
import { GET_RACE_TIME } from '../RaceTime/RaceTime';
import { AppBar } from '@material-ui/core';

export interface RaceTabsProps {
  races: string[];
}


const TabPanel = (props: { [x: string]: any; children: any; value: any; index: any; }) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


export const RaceTabs: React.FC<RaceTabsProps> = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const races = props.races || [];
  
  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {races?.map((race_id, index) => {
            let race_time = GET_RACE_TIME(race_id);
            return (
            <Tab label={race_time} {...a11yProps(index)} />
            )
          })}
        </Tabs>
      </AppBar>
      {races?.map((race_id, index) => (
        <TabPanel value={value} index={index}>
          <RaceDetails race_id={race_id}/>
        </TabPanel>
      ))}
    </div>
  );
};
