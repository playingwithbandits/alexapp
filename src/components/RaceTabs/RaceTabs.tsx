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

export interface RaceTabsProps {
  races: string[];
}


const TabPanel = (props: { [x: string]: any; children: any; value: any; index: any; }) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export const RaceTabs: React.FC<RaceTabsProps> = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const races = props.races || [];

  return (
    <Flex className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={(event: any, newValue: React.SetStateAction<number>) => setValue(newValue)}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >


        {races?.map((race_id, index) => {
          let race_time = GET_RACE_TIME(race_id);
          return (
          <Tab label={race_time} {...a11yProps(index)} />
          )
        })}

      </Tabs>
      {races?.map((race_id, index) => (
        <TabPanel value={value} index={index}>
          <RaceDetails race_id={race_id}/>
        </TabPanel>
      ))}
    </Flex>
  );
};
