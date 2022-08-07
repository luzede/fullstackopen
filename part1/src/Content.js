import Part from './Part'

const Content = (props) => {
    const e = props.exercises;
    const parts = props.parts;
    const content = [];

    for (let i = 0; i < parts.length; i++) {
        content.push(
            <Part part={parts[i]} exercises={e[i]} />
        );
    }

    return (
        content
    );
}

export default Content;