const SortComponent = ({ onChange }) => {
    const handleSortChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <select onChange={handleSortChange}>
            <option value="sort by" disabled={true}>Sort by</option>
            <option value="start date">Start date</option>
            <option value="end date">End date</option>
            <option value="duration">Duration</option>
            <option value="type">Type</option>
        </select>
    );
};

export default SortComponent;
