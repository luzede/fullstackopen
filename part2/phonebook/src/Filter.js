const Filter = ({ filtered, handleFilter }) => {
    return (
        <div>
                filter shown with <input value={filtered} onChange={handleFilter} />
        </div>
    )
}

export default Filter