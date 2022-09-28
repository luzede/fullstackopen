import { useSelector, useDispatch } from "react-redux"

const Filter = () => {
  const filter = useSelector( state => state.filter)
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch({type: 'filter/changeFilter', payload: event.target.value})
  }

  return (
    <>
    <p>filter <input value={filter} onChange={handleChange}/></p>
    </>
  )
}

export default Filter