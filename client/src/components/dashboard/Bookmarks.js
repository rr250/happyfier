import React from 'react'
import {Link} from 'react-router-dom'

const Bookmarks = (props) => {
    const {profile,projects}=props;
    return(
        <div className="col m3 s12 "style={{ position:'fixed', zIndex:0}}>
        <div className="card z-depth-0 purple lighten-5" style={{}}>
            <div className="card-content">
                <span className="card-title">Bookmarks</span>
                <ol>
                {projects && profile.bookMarks && projects.map(project=>{
                    if(profile.bookMarks.includes(project.id))return(
                        <Link to={'/project/' + project.id} key={project.id}>
                                <li className="purple-text text-accent-2"><h6>{project.title}</h6></li>
                        </Link>
                    )
                    else
                        return null
                })}
                </ol>  
            </div>
        </div>   
        </div>
    )
}

export default Bookmarks;