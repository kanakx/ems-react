import styled, { keyframes } from 'styled-components';

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

const Loading = () => (
    <LoadingContainer>
        <Spinner />
    </LoadingContainer>
);

export default Loading;
