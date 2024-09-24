import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {

    // TODO: get id from url
    const { id } = useParams();

    const [post, setPost] = useState(null)

    const { user, token } = useContext(AppContext);

    const navigate = useNavigate();

    // TODO: Fetching post from the API
    async function getPost() {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        if (res.ok) {
            setPost(data.results.post)
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
        // TODO: Delete post from the API, if the user is the owner of the post
        if(user.id === post.user_id) { 
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        
            if (res.ok) {
                navigate('/')
            }    
        } 
    }

    // TODO: Fetching post from the API when the component mounts
    useEffect(() => {
        getPost();
    }, []);

    return <>
        {post ? (
            <div key={post.id}
                className="mt-4 p-4 border rounded-md border-dashed border-slate-400">
                <div className="mb-4 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold">{post.title}</h2>
                        <small className="text-slate-500 text-xs">
                            Create by {post.user.name} on {" "} {new Date(post.user.created_at).toLocaleTimeString()}
                        </small>
                    </div>
                </div>
                <p>{post.body}</p>
                {/* TODO: When the user owns the post only, display the Update and Delete buttons*/}
                {user && user?.id === post.user.id &&

                    <div className="flex items-center justify-end mt-4">
                        <Link to={`/posts/update/${post.id}`} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                            Update
                        </Link>
                        <form onSubmit={handleDelete}>
                            <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                                Delete
                            </button>
                        </form>

                    </div>}
            </div >
        )
            : <p className="title">Post not found!</p>
        }

    </>
}