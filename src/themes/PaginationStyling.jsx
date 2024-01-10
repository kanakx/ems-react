import styled from 'styled-components';

export const StyledPaginator = styled.div`
    .pagination-container {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style-type: none;
        gap: 0.2rem;
        padding-inline-start: 0;
    }

    .page-button {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.buttonTextColor};
        border-radius: ${props => props.theme.borders.borderRadius};
        margin-top: ${props => props.theme.spacing.small};
        border: none;
        cursor: pointer;
        padding: 0.2rem;
    }

    .page-link {
        padding: 5px;
        margin: 5px;
        cursor: pointer;
    }

    .active {
        font-weight: bold;
    }
`;
