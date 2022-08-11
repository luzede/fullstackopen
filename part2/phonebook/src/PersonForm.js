
const PersonForm = ({ newName, handleInputName, newPhoneNumber, handleInputNumber, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newName} onChange={handleInputName} required />
            </div>
            <div>
                phone number: <input value={newPhoneNumber} onChange={handleInputNumber} required />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;