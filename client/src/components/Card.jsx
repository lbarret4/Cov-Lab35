import React from 'react';

const Card = (props) => {

    return (
        < div className="card my-1 " >
            <div className="card-header text-center" >
                {props.header}
            </div>
            <div className="card-body">
               {props.body}
            </div>
            <div className="card-footer">
                {props.footer}
            </div>
        </div >
    );


}

export default Card;