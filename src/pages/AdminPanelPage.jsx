import PageLayout from "../components/PageLayout.jsx";
import {PageTitle, StyledButton} from "../themes/SharedStyles.jsx";
import {useNavigate} from "react-router-dom";

const AdminPanelPage = () => {
    const navigate = useNavigate();

    const handleManageEntitiesButton = () => {
        navigate('/admin/entities');
    };

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <PageLayout>
            <PageTitle>Admin Panel</PageTitle>
            <StyledButton onClick={handleManageEntitiesButton}>
                Manage entities
            </StyledButton>

            <StyledButton onClick={handleBackButton}>
                Back
            </StyledButton>
        </PageLayout>
    );
};

export default AdminPanelPage;
