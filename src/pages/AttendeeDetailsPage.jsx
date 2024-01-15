import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useUserContext} from '../contexts/UserContext';
import {ActionButtonsGroup, Card, StyledButton} from "../themes/SharedStyles.jsx";
import Loading from "../components/Loading.jsx";
import styled from "styled-components";
import {FaCheck, FaEdit, FaTimes, FaTrashAlt} from "react-icons/fa";
import PageLayout from "../components/PageLayout.jsx";
import {deleteAttendeeById, getAttendeeById} from "../services/attendeeService.js";
import {toast} from 'react-toastify';

//TODO SAME
const AttendeeName = styled.h3`
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

const AttendeeDetailsPage = () => {
    const navigate = useNavigate();
    const { idAttendee } = useParams();
    const { isAuth, isAdmin } = useUserContext();
    const [attendee, setAttendee] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        getAttendeeById(idAttendee)
            .then(fetchedAttendee => {
                setAttendee(fetchedAttendee);

            })
            .finally(() => setIsLoading(false));

    }, [idAttendee]);

    const handleEdit = () => {
        navigate(`/attendees/edit/${idAttendee}`);
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        setShowDeleteConfirmation(false);
        deleteAttendeeById(idAttendee)
            .then(() => {
                toast.success('Attendee deleted successfully!');
                setTimeout(() => navigate('/attendees'), 2000);
            });
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleBackButton = () => {
        navigate('/attendees');
    };

    if (isLoading || !attendee) return <Loading onBack={handleBackButton}/>;

    return (
        <PageLayout>
            <Card>
                <AttendeeName>{'Attendee' + ' ' + attendee.idAttendee}</AttendeeName>
                <DetailItem>
                    <Label>First name:</Label>
                    <Value>{attendee.firstName}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Last name:</Label>
                    <Value>{attendee.lastName}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Email:</Label>
                    <Value>{attendee.userDto.email}</Value>
                </DetailItem>
                <DetailItem>
                    <Label>Role:</Label>
                    <Value>{attendee.userDto.userRole}</Value>
                </DetailItem>

                {/*//TODO check if this condition works as expected*/}
                {(isAuth && isAdmin) && (
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

export default AttendeeDetailsPage;
