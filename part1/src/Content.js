const Content = (props) => {
    const exercises = props.exercises;
    const parts = props.parts;
    const content = [];

    for (let i = 0; i < parts.length; i++) {
        content.push(
            <p>{parts[i]} {exercises[i]}</p>
        );
    }

    return (
        content
    );
}

export default Content;