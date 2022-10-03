

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification