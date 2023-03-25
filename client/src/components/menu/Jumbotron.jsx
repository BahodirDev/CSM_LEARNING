import React from 'react'

function Jumbotron({title = 'Marhamat',subtitle = 'CSM tizimga'}) {
    return (
        <div className='container mt-5 bg-light rounded  p-4'>
            <div className="row " >
                <div className="col text-center">
                    <h3>{title}</h3>
                    <p className='lead'>{subtitle}</p>
                </div>
            </div>
        </div>
    )
}

export default Jumbotron
