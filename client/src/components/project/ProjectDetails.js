import React from 'react'

const ProjectDetails = (props) => {
  const id = props.match.params.id;  
  return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
            <div className="title">Project Title {id}</div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolorem eius, itaque facere nisi voluptatem magnam consectetur deleniti officia? Eos, voluptates magni assumenda nobis consequatur asperiores deserunt amet molestiae excepturi.</p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
            <div>Posted by RR7</div>
            <div>2nd Sep 2am</div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
