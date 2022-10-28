
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  description: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  description: string;
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase {
  type: "special",
  description: string,
  requirements: string[]
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


const Content = ({courseParts}: {courseParts: CoursePart[]}): JSX.Element => {
  return (
    <div>
      {
        courseParts.map(c => {
          switch(c.type) {
            case "normal":
              return (
                <div key={c.name}>
                  <h2>{c.name}</h2>
                  <p>{c.description}</p>
                  <p>Exercise count: {c.exerciseCount}</p>
                </div>
              )
            case "groupProject":
              return (
                <div key={c.name}>
                  <h2>{c.name}</h2>
                  <p>Group project count: {c.groupProjectCount}</p>
                  <p>Exercise count: {c.exerciseCount}</p>
                </div>
              )
            case "submission":
              return (
                <div key={c.name}>
                  <h2>{c.name}</h2>
                  <p>{c.description}</p>
                  <p>{c.exerciseSubmissionLink}</p>
                  <p>Exercise count: {c.exerciseCount}</p>
                </div>
              )
            case "special":
              return (
                <div key={c.name}>
                  <h2>{c.name}</h2>
                  <p>{c.description}</p>
                  <p>Requirements: {c.requirements.reduce((a,b) => a + ' / ' + b)}</p>
                  <p>Exercise count: {c.exerciseCount}</p>
                </div>
              )
            default:
              return (function assertNever(value: never): never {
                throw new Error(`Unhandled discriminated union member ${JSON.stringify(value)}`)
              })(c)
          }
        })
      }
    </div>
    )
}

export default Content