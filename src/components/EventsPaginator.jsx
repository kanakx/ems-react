import {useState} from 'react';
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import styled from "styled-components";
import {StyledPaginator} from "../themes/PaginationStyling.jsx";
import WaveAnimation from "./WaveAnimation.jsx";
import GenericList from "./GenericList.jsx";
import EventCard from "./EventCard.jsx";

//TODO DELETE NODE MODULES BEFORE SENDING
const NoEventsMessage = styled.p`
    text-align: center;
    color: ${props => props.theme.colors.text};
    margin-top: ${props => props.theme.spacing.medium};
`;

//TODO potentially to delete
const EventsPaginator = ({events, pageSize}) => {
    const [currentPage, setCurrentPage] = useState(0);

    const currentEvents = events
        .slice(currentPage * pageSize, currentPage*pageSize + pageSize);
    const pageCount = Math.ceil(events.length / pageSize);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <>
            {currentEvents && currentEvents.length > 0 ? (
                <>
                    <WaveAnimation key={currentPage}>
                        <GenericList
                            items={events}
                            renderItem={(event) => (
                                <EventCard key={event.idEvent} event={event} />
                            )}
                        />
                    </WaveAnimation>

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
                </>
            ) : (
                <NoEventsMessage>No events available</NoEventsMessage>
            )}
        </>
    );
};

EventsPaginator.propTypes = {
    events: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired
};

export default EventsPaginator;
