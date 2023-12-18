import MainRouter from "./routers/MainRouter.jsx";
import {ThemeProvider} from 'styled-components';
import GlobalStyle from "./themes/GlobalStyles.jsx";
import GrayTheme from "./themes/GrayTheme.jsx";

function App() {

    return (
        <>
            <ThemeProvider theme={GrayTheme}>
                <GlobalStyle/>
                <MainRouter/>
            </ThemeProvider>
        </>
    );

}

export default App
