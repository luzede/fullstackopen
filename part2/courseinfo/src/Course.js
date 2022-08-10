const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>


const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <>
                {course.parts.map(p => {
                    return (<Part part={p} key={p.id} />)
                })}
            </>
            <Total sum={summation(course.parts)} />
        </>
    )
}

export default Course

function summation(parts) {
    let total = 0;
    for (let i of parts) {
        total += i.exercises
    }
    return total
}