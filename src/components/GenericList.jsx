import PropTypes from "prop-types";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GenericList = ({items, renderItem}) => {
    return (
        <ListContainer>
            <>
                {items.map((item, index) => (
                    renderItem(item, index)
                ))}
            </>
        </ListContainer>
    );

};

GenericList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    renderItem: PropTypes.func.isRequired
};

export default GenericList;
