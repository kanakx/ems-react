import styled, { keyframes } from 'styled-components';
import {StyledButton} from "../themes/SharedStyles.jsx";
import PropTypes from "prop-types";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: ${props => props.theme.colors.background};
`;

const Spinner = styled.div`
  border: 4px solid ${props => props.theme.colors.secondary}; 
  border-top: 4px solid ${props => props.theme.colors.primary}; 
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
`;

const Loading = ( {onBack} ) => (
    <LoadingContainer>
        <Spinner />
        <StyledButton onClick={onBack}>
            Back
        </StyledButton>
    </LoadingContainer>
);

Loading.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default Loading;
