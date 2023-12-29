import styled from "styled-components";

export const StyledForm = styled.form`
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

export const StyledFormInput = styled.input`
    padding: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.small} 0;
    border: ${props => props.theme.borders.border};
    border-radius: ${props => props.theme.borders.borderRadius};
    text-align: center;
    width: 100%;
`;

export const StyledFormSelect = styled.select`
    padding: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.small} 0;
    border: ${props => props.theme.borders.border};
    border-radius: ${props => props.theme.borders.borderRadius};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    text-align: center;
    width: 100%;
    font-size: ${props => props.theme.typography.text};

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
    }
`;

export const StyledFormTextArea = styled.textarea`
    padding: ${props => props.theme.spacing.small};
    margin: ${props => props.theme.spacing.small} 0;
    border: ${props => props.theme.borders.border};
    border-radius: ${props => props.theme.borders.borderRadius};
    text-align: center;
    width: 100%;
    height: 10rem;
    resize: vertical;
`;

export const StyledFormButton = styled.button`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.buttonTextColor};
    padding: ${props => props.theme.spacing.small};
    border-radius: ${props => props.theme.borders.borderRadius};
    margin-top: ${props => props.theme.spacing.small};
    border: none;
    cursor: pointer;
`;

export const FormLabel = styled.label`
    margin-top: ${props => props.theme.spacing.small};
    color: ${props => props.theme.colors.text};
    display: block;
    font-size: ${props => props.theme.typography.label};
`;
