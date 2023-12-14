import EventList from '../components/EventList';
import {useEffect, useState} from "react";
import mockEvents from '../data/events.json';

const EventsPage = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        setEvents(mockEvents);
    }, []);

    return (
        <>
            <EventList events={events} />
        </>
    );

};

export default EventsPage;
