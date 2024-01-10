import {useState} from 'react';
import ReactPaginate from "react-paginate";
import EventList from "./EventList.jsx";
import PropTypes from "prop-types";
import styled from "styled-components";
import {StyledPaginator} from "../themes/PaginationStyling.jsx";
import AnimatedRoute from "./AnimatedRoute.jsx";
import WaveAnimation from "./WaveAnimation.jsx";

//TODO DELETE NODE MODULES BEFORE SENDING
const NoEventsMessage = styled.p`
    text-align: center;
    color: ${props => props.theme.colors.text};
    margin-top: ${props => props.theme.spacing.medium};
`;

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
                        <EventList events={currentEvents}/>
                    </WaveAnimation>

                    <StyledPaginator>
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            previousLinkClassName={'page-button'}
                            nextLinkClassName={'page-button'}
                            pageLinkClassName={'page-button'}
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
