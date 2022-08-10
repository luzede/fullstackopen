const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>


const Course = ({ course }) => {
    return (
        <>
            {course.map(c => {
                return (
                    <div key={c.id}>
                        <Header course={c} />
                        <>
                            {c.parts.map(p => {
                                return (<Part part={p} key={p.id} />)
                            })}
                        </>
                        <Total sum={c.parts.reduce((s, p) => s + p.exercises, 0)} />
                    </div>
                )
            })}
        </>
    )
}

export default Course