import React from 'react';
import { Link } from "react-router-dom";

export default function Content(props) {
    return props.posts.map((item, idx) => (
        <Link to={`/post/${item._id}`} key={idx} >
            <div className="card mt-3">
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.body}</p>
                </div>
            </div>
        </Link>
    ))
};