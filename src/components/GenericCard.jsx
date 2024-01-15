import PropTypes from 'prop-types';
import { Card } from "../themes/SharedStyles.jsx"; // Import your Card component

const GenericCard = ({ item, onClick, renderContent }) => {
    return (
        <Card onClick={() => onClick(item)}>
            <Card>
                {renderContent(item)}
            </Card>
        </Card>
    );
};

GenericCard.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    renderContent: PropTypes.func.isRequired
};

export default GenericCard;
