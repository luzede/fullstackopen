import {connect } from "react-redux"
import { changeFilter } from "../reducers/fitlerReducer"

const Filter = (props) => {
  const handleChange = (event) => {
    props.changeFilter(event.target.value)
  }

  return (
    <>
    <p>filter <input value={props.filter} onChange={handleChange}/></p>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    changeFilter: (value) => {
      dispatch(changeFilter(value))
    }
  }
}

const connectedFilter = connect(mapStateToProps, mapDispatchToState)(Filter)

export default connectedFilter