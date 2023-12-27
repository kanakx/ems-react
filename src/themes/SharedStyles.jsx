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

export const PageSubtitle = styled.p`
    margin-bottom: 0;
    color: ${props => props.theme.colors.text};
`;

export const ActionButtonsGroup = styled.div`
    min-width: 5rem;
    width: 25%;
    display: flex;
    justify-content: space-between;
`;

export const ErrorMessage = styled.p`
    color: ${props => props.theme.colors.error};
    font-size: 0.8em;
`;

export const Card = styled.div`
    border: ${props => props.theme.borders.border};
    border-radius: ${props => props.theme.borders.borderRadius};
    padding: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.small} 0;
    background-color: ${props => props.theme.colors.background};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 25rem;
    cursor: pointer;
    text-align: center;
    //width: 100%;
`;