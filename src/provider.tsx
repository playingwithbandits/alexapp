import { ThemeProvider } from 'theme-ui'
import React from 'react'
import { mainTheme } from "././assets/styling/mainTheme";

const Provider:React.FC = (props) =>
<ThemeProvider theme={mainTheme}>
    {props.children}
</ThemeProvider>

export default Provider;