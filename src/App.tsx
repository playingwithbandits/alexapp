import React from 'react';
import logo from './logo.svg';
import './App.css';
import Provider from './provider';

import {Box, Text} from "rebass";
import { Eyecatchers } from './components/Eyecatchers';
import { Results } from './components/Results';


const App: React.FC = () => (
    <Box>
        {/* <Eyecatchers/> */}
        <Results/>
    </Box>
);

export default App;
