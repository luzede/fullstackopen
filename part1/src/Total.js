const Total = (props) => {
    const parts = props.parts;
    let total = 0;

    for (let e of parts) {
        total += e.exercises;
    }

    return (
        <p>Number of exercises {total}</p>
    )
}

export default Total;