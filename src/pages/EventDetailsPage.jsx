import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {deleteEventById, getEventById} from "../services/eventService.js";
import {useUserContext} from '../contexts/UserContext';
import {ActionButtonsGroup, Card, StyledButton} from "../themes/SharedStyles.jsx";
import Loading from "../components/Loading.jsx";
import styled from "styled-components";
import {FaCheck, FaEdit, FaTimes, FaTrashAlt} from "react-icons/fa";
import PageLayout from "../components/PageLayout.jsx";
import {toast} from 'react-toastify';

const EventName = styled.h3`
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.small};
    font-size: ${props => props.theme.typography.header};
`;

const DetailItem = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    align-items: center;
    padding: ${props => props.theme.spacing.xsmall} 0;
`;

const Label = styled.span`
    font-weight: bold;
`;

const Value = styled.span`
    
`;

const EventDetailsPage = () => {
    const navigate = useNavigate();
    const { idEvent } = useParams();
    const { isAuth, isAdmin, attendee } = useUserContext();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        getEventById(idEvent)
            .then(eventData => {
                setEvent(eventData);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [idEvent, attendee, isAuth]);

    const handleEdit = () => {
        navigate(`/events/edit/${idEvent}`);
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        setShowDeleteConfirmation(false);
        deleteEventById(idEvent)
            .then(() => {
                toast.success('Event deleted successfully!');
                setTimeout(() => navigate('/events'), 2000);
            });
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleBackButton = () => {
        navigate('/events');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    if (isLoading || !event) return <Loading onBack={handleBackButton}/>;

    return (
        <PageLayout>
            <Card>
                <EventName>{event.name}</EventName>
                <DetailItem>
                    <Label>Start:</Label>
                    <Value>{formatDate(event.startTimestamp)}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>End:</Label>
                    <Value>{formatDate(event.endTimestamp)}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Location:</Label>
                    <Value>{event.locationName}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Type:</Label>
                    <Value>{event.type}</Value>
                </DetailItem>
                <DetailItem>
                    <Value>{event.description}</Value>
                </DetailItem>

                {(isAuth || isAdmin) && (
                    <ActionButtonsGroup>
                        {showDeleteConfirmation ? (
                            <>
                                <StyledButton onClick={cancelDelete}>
                                    <FaTimes />
                                </StyledButton>
                                <StyledButton onClick={confirmDelete}>
                                    <FaCheck />
                                </StyledButton>
                            </>
                        ) : (
                            <>
                                <StyledButton onClick={handleDeleteClick}>
                                    <FaTrashAlt />
                                </StyledButton>
                                <StyledButton onClick={handleEdit}>
                                    <FaEdit />
                                </StyledButton>
                            </>
                        )}
                    </ActionButtonsGroup>
                )}

                <StyledButton onClick={handleBackButton}>
                    Back
                </StyledButton>
            </Card>
        </PageLayout>
    );
};

export default EventDetailsPage;
