import styled from 'styled-components';

export const StyledPaginator = styled.div`
    .pagination-container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        list-style-type: none;
    }

    .page-button {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.buttonTextColor};
        border-radius: ${props => props.theme.borders.borderRadius};
        padding: ${props => props.theme.spacing.xsmall};
        margin-top: ${props => props.theme.spacing.small};
        border: none;
        cursor: pointer;
    }

    .page-link {
        padding: 5px;
        margin: 5px;
        cursor: pointer;
        // additional styles for page links
    }

    .active {
        font-weight: bold;
        // additional styles for the active page link
    }

    // You can add more specific styles for other elements like previous/next buttons
`;
