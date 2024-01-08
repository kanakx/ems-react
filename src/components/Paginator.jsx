import {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {getAllEvents} from "../services/eventService.js";
import EventList from "./EventList.jsx";

const Paginator = ({itemList}) => {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const pageSize = 2;

    const fetchPaginatedData = (pageNo) => {
        getAllEvents(null, pageNo, pageSize)
            .then(eventsPage => {
                setCurrentItems(eventsPage.content);
                setPageCount(eventsPage.totalPages);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchPaginatedData(currentPage);
    }, [currentPage]);

    const handlePageClick = (event) => {
        const newPage = event.selected;
        setCurrentPage(newPage);
        fetchPaginatedData(newPage);
    };

    return (
        <>
            {/* Render your data here */}
            <EventList events={currentItems}/>

            {/* Pagination Component */}
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
    );
};

export default Paginator;
