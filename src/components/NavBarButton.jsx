import styled from 'styled-components';
import {StyledButton} from "../themes/SharedStyles.jsx";
import PropTypes from "prop-types";

const StyledNavBarButton = styled(StyledButton)`
    padding: 0.5rem 1rem;
    font-size: 1rem;
`;

const NavBarButton = ({ buttonText, onClick }) => {

    return (
        <StyledNavBarButton onClick={onClick}>
            {buttonText}
        </StyledNavBarButton>
    );
};

NavBarButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default NavBarButton;
