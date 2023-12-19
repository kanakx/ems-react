import styled from "styled-components";

const StyledForm = styled.form`
    background-color: ${props => props.theme.colors.background};
    padding: ${props => props.theme.spacing.medium};
    border-radius: ${props => props.theme.borders.borderRadius};
    margin: ${props => props.theme.spacing.medium} auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    min-width: 18rem;
    max-width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledFormInput = styled.input`
    padding: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.small} 0;
    border: ${props => props.theme.borders.border};
    border-radius: ${props => props.theme.borders.borderRadius};
    text-align: center;
    width: 100%;
`;

const StyledFormTextArea = styled.textarea`
    padding: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.small} 0;
    border: ${props => props.theme.borders.border};
    border-radius: ${props => props.theme.borders.borderRadius};
    text-align: center;
    width: 100%;
    height: 10rem;
    resize: vertical;
`;

const StyledFormButton = styled.button`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.buttonTextColor};
    padding: ${props => props.theme.spacing.small};
    border-radius: ${props => props.theme.borders.borderRadius};
    margin-top: ${props => props.theme.spacing.small};
    border: none;
    cursor: pointer;
`;

export {StyledForm, StyledFormInput, StyledFormTextArea, StyledFormButton};
