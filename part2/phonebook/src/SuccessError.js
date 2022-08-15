

const SuccessError = ({ successError }) => {

    const errorStyle = {
        color: 'red',
        backgroundColor: 'lightgrey',
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    }
    const successStyle = {
        color: 'green',
        backgroundColor: 'lightgrey',
        borderStyle: 'solid',
        borderColor: 'green',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    }

    
    if (successError['type'] === 'success') {
        return (
            <p style={successStyle}>
                {successError.message}
            </p>
        )
    }
    else if (successError['type'] === 'error') {
        return (
            <p style={errorStyle}>
                {successError.message}
            </p>
        )
    }
}

export default SuccessError;