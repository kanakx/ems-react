import PropTypes from "prop-types";
import AuthButton from "./AuthButton.jsx";
import styled from "styled-components";

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
            <AuthButton/>
            {children}
        </StyledPageLayout>
    );
};

PageLayout.propTypes = {
    children: PropTypes.node
};

export default PageLayout;
