import PropTypes from "prop-types";
import styled from "styled-components";
import NavBar from "./NavBar.jsx";

export const StyledPageLayout = styled.div`
    background-color: ${props => props.theme.colors.secondary};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PageLayout = ({children}) => {
    return (
        <StyledPageLayout>
            <NavBar/>
            {children}
        </StyledPageLayout>
    );
};

PageLayout.propTypes = {
    children: PropTypes.node
};

export default PageLayout;
