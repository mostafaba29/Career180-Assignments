import React from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function PostDetailPage(){
    const {id} = useParams();
    const post = useSelector((state)=>
        state.postsData.posts.find((post)=>post.id===Number(id))
    );

    if(!post){
        return (
            <div className='container'>
                <h1>Post not found</h1>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-3">{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}