import MainRouter from "./routers/MainRouter.jsx";
import {ThemeProvider} from 'styled-components';
import GlobalStyle from "./themes/GlobalStyles.jsx";
import GrayTheme from "./themes/GrayTheme.jsx";
import {UserContextProvider} from "./contexts/UserContext.jsx";

function App() {

    return (
        <>
            <ThemeProvider theme={GrayTheme}>
                <GlobalStyle/>
                <UserContextProvider>
                    <MainRouter/>
                </UserContextProvider>
            </ThemeProvider>
        </>
    );

}

export default App
