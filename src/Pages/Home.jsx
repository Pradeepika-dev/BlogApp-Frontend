import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Context/AppContext"
import { Link } from "react-router-dom"

export default function Home() {

    const { name } = useContext(AppContext)
    const [posts, setPosts] = useState([])

    async function getPosts() {
        const res = await fetch('/api/posts')
        const data = await res.json()
        if (res.ok) {
            setPosts(data.results)
        }

    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            <h1 className="text-3xl font-bold underline title">Latest posts {name}</h1>
            {posts.length > 0 ? posts.map(
                (post) => 
                <div key={post.id} 
                    className="mb-4 p-4 border rounded-md border-dashed border-slate-400">
                    <div className="mb-2 flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold">{post.title}</h2>
                            <small className="text-slate-500 text-xs">
                                Create by {post.user.name} on {" "} {new Date(post.user.created_at).toLocaleTimeString()}
                            </small>
                        </div>
                        <Link to={`posts/${post.id}`} className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
                        Read More
                        </Link>
                    </div>
                    <p>{post.body}</p>
                </div>
            ) : <p>There are no posts</p>}
        </>
    )

}