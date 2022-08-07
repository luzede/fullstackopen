const Total = (props) => {
    const exercises = props.exercises;
    let total = 0;

    for (let e of exercises) {
        total += e;
    }

    return (
        <p>Number of exercises {total}</p>
    )
}

export default Total;