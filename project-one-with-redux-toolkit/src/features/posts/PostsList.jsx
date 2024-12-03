import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost } from "./postsSlice";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {Link} from "react-router-dom";
import {Modal} from '../../Components/Modal/Modal'

const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
});

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);
  const [deletePostId,setDeletePostId] = useState(null);

  const { register,handleSubmit,formState:{errors},reset}=useForm({
    resolver: zodResolver(PostSchema),
  });
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleAddPost = (data) => {
    // dispatch action
    dispatch(addPost(data)).then(() => {
      reset();
      toast.success("Post added successfully");
    });
  };

  const handleDeletePost = (id)=>{
    setDeletePostId(id);
  }

  const confirmDeletePost = ()=>{
    dispatch(deletePost(deletePostId).then(()=>{
      toast.success("post deleted successfully");
      setDeletePostId(null);
    }))
  }
  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <h5>
                        {post.id} - {post.title}
                      </h5>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <Link href={`/post/${post.id}`} passHref>
                        <button className="btn btn-primary">
                          <FontAwesomeIcon icon={faEye} /> View
                        </button>
                        </Link>
                        <button className="btn btn-primary">
                          <FontAwesomeIcon icon={faEdit} /> Update
                        </button>
                        <button className="btn btn-danger" onClick={()=>handleDeletePost(post.id)}>
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="col-lg-4">
                <form onSubmit={handleSubmit(handleAddPost)} >
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  {...register("title")}
                />
                {errors.title && <p className="text-danger">{errors.title.message}</p>}
                <textarea
                  className="form-control mb-2"
                  placeholder="Body"
                  rows="4"
                  {...register("body")}
                />
                {errors.body && <p className="text-danger">{errors.body.message}</p>}
                <button className="btn btn-success" type="submit">
                  <FontAwesomeIcon icon={faPlus} /> Add Post
                </button>
                </form>
            </div>
            <Modal 
              show={!!deletePostId} 
              onClose={()=>setDeletePostId(null)} 
              onConfirm={confirmDeletePost} 
              title={'Confirm deletion'} 
              text={'are you sure you want to delete this post'} 
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
export default PostsList;
