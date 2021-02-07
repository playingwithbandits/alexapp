import React, { createRef, SetStateAction, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Provider from './provider';

import {Box, Flex, Text} from "rebass";
import { UpdatersContainer } from './components/Updaters/UpdatersContainer';
import { DaysContainer } from './components/DaysContainer';
import { Container, ListItem, ListItemText } from '@material-ui/core';
import { Route, Switch } from "react-router-dom";
import { routes } from './routes/Routes/Routes';
import { NavLink } from "react-router-dom";
import { GET_CURRENT_DATE, GET_TOMORROW_DATE } from './Helpers/HelperFunc';
import { Sidebar } from './components/Sidebar';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

let activeRoute = (routeName: string) => {
    return window.location.pathname.indexOf(routeName) > -1 ? "active" : "";
}


const changeName = (name:string, currentDate:string, tomorrow:string) => {
    let changed = name;
    switch(name){
        case "Today":
            changed = currentDate;
            break;
        case "Tomorrow":
            changed = tomorrow;
            break;
    }
    return changed;
};


const drawerWidth = 120;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));


const App: React.FC = () => {
    const currentDate = GET_CURRENT_DATE();
    const tomorrow = GET_TOMORROW_DATE();


    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [tabname, setTabname] = useState("");
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
          <div className={classes.toolbar} />
            <Divider />
            <List>
            {routes.map((prop, key) => (
                <NavLink to={prop.layout + prop.path} className={activeRoute(prop.path)} activeClassName="active" key={key}>
                    <ListItem button>
                        <ListItemText primary={changeName(prop.name, currentDate, tomorrow)} />
                    </ListItem>
                </NavLink>
            ))}
            </List>
        </div>

      );

    const container = undefined; //window !== undefined ? () => window().document.body : undefined;

    return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Racing App 2.0
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Switch>
                {routes.map((prop, key) => {
                    return (
                        <Route
                            path={prop.layout + prop.path}
                            component={prop.component}
                            key={key}
                        />
                    );
                })}
            </Switch>
      </main>
    </div>
)};

export default App;
