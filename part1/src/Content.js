import Part from './Part'

const Content = (props) => {
    const parts = props.parts;
    const content = [];

    for (let i = 0; i < parts.length; i++) {
        content.push(
            <Part part={parts[i].name} exercises={parts[i].exercises} />
        );
    }

    return (
        content
    );
}

export default Content;