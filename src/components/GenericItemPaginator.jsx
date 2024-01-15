import { useState } from 'react';
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import styled from "styled-components";
import { StyledPaginator } from "../themes/PaginationStyling.jsx";
import WaveAnimation from "./WaveAnimation.jsx";
import GenericList from "./GenericList.jsx";

const NoItemsMessage = styled.p`
    text-align: center;
    color: ${props => props.theme.colors.text};
    margin-top: ${props => props.theme.spacing.medium};
`;

const GenericItemPaginator = ({ items, pageSize, renderItem, noItemsMessage }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const currentItems = items
        .slice(currentPage * pageSize, currentPage * pageSize + pageSize);
    const pageCount = Math.ceil(items.length / pageSize);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <>
            {currentItems && currentItems.length > 0 ? (
                <WaveAnimation key={currentPage}>
                    <GenericList
                        items={currentItems}
                        renderItem={renderItem}
                    />
                    <StyledPaginator>
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            previousLinkClassName={'page-prev-next-button'}
                            nextLinkClassName={'page-prev-next-button'}
                            pageLinkClassName={'page-number-button'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination-container'}
                            activeClassName={'active'}
                        />
                    </StyledPaginator>
                </WaveAnimation>
            ) : (
                <NoItemsMessage>{noItemsMessage}</NoItemsMessage>
            )}
        </>
    );
};

GenericItemPaginator.propTypes = {
    items: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
    renderItem: PropTypes.func.isRequired,
    noItemsMessage: PropTypes.string
};

export default GenericItemPaginator;
