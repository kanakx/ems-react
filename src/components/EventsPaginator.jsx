import {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {getAllEvents} from "../services/eventService.js";
import EventList from "./EventList.jsx";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loading from "./Loading.jsx";
import {useNavigate} from "react-router-dom";

const NoEventsMessage = styled.p`
    text-align: center;
    color: ${props => props.theme.colors.text};
    margin-top: ${props => props.theme.spacing.medium};
`;

const EventsPaginator = ({pageSize}) => {
    const navigate = useNavigate();
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPaginatedData = (pageNo) => {
        getAllEvents(null, pageNo, pageSize)
            .then(eventsPage => {
                setCurrentItems(eventsPage.content);
                setPageCount(eventsPage.totalPages);
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchPaginatedData(currentPage);
    }, [currentPage]);

    const handlePageClick = (event) => {
        const newPage = event.selected;
        setCurrentPage(newPage);
        fetchPaginatedData(newPage);
    };

    const handleBackButton = () => {
        navigate('/');
    };

    if (isLoading) return <Loading onBack={handleBackButton}/>

    return (
        <>
            {currentItems && currentItems.length > 0 ? (
                <>
                    <EventList events={currentItems}/>

                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </>
            ) : (
                <NoEventsMessage>No events available</NoEventsMessage>
            )}
        </>
    );
};

EventsPaginator.propTypes = {
    pageSize: PropTypes.number.isRequired
};

export default EventsPaginator;
