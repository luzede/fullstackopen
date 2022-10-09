const Notification = ({ notification }) => {
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


  if (notification['type'] === 'success') {
    return (
      <p style={successStyle}>
        {notification.message}
      </p>
    )
  }
  else if (notification['type'] === 'error') {
    return (
      <p style={errorStyle}>
        {notification.message}
      </p>
    )
  }
}

export default Notification