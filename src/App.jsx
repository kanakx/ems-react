import MainRouter from "./routers/MainRouter.jsx";
import {ThemeProvider} from 'styled-components';
import GlobalStyle from "./themes/GlobalStyles.jsx";
import GrayTheme from "./themes/GrayTheme.jsx";
import {UserContextProvider} from "./contexts/UserContext.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

    return (
        <>
            <ThemeProvider theme={GrayTheme}>
                <GlobalStyle/>
                <UserContextProvider>
                    <MainRouter/>
                </UserContextProvider>
            </ThemeProvider>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );

}

export default App
