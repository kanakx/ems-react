import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.buttonTextColor};
    border-radius: ${props => props.theme.borders.borderRadius};
    padding: ${props => props.theme.spacing.small};
    margin-top: ${props => props.theme.spacing.small};
    border: none;
    cursor: pointer;
`;

export const PageTitle = styled.h1`
    margin-bottom: 0;
    color: ${props => props.theme.colors.text};
`;

export const PageContainer = styled.div`
    background-color: ${props => props.theme.colors.background};
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${props => props.theme.spacing.medium};
`;

export const PageLayout = styled.div`
    background-color: ${props => props.theme.colors.secondary};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Header = styled.header`
    color: ${props => props.theme.colors.text};
`;