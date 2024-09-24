import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../Context/AppContext"
import { useNavigate, useParams } from "react-router-dom"

export default function Update() {
    const navigate = useNavigate()

    const { token, user } = useContext(AppContext)

    //TODO: Get the id from the url
    const { id } = useParams()

    const [formData, setFormData] = useState({
        'title': '',
        'body': ''
    })

    const [errors, setErrors] = useState({})

    async function getPost() {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        
        if (res.ok) {
            /* TODO: Check if the user is the owner of the post
            * If not, redirect to home page
            */
            if(data.results.post.user.id !== user.id) { 
                navigate('/')
            } 
            //TODO: Set the form data
            setFormData({
                'title' : data.results.post.title,
                'body' : data.results.post.body
            })
        }
    }

    async function handleUpdate(e) {
        e.preventDefault()
        const res = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        if (data.errors) {
            setErrors(data.errors)
        } else {
            navigate('/')
        }
        console.log(data);
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <>
            <h1 className="text-3xl font-bold underline title">Update Post</h1>
            <form onSubmit={handleUpdate} className="w-1/2 space-y-6 mx-auto">
                <div >
                    <input type="text" name="title" placeholder="Title" value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    {errors.title && <span className="error">{errors.title}</span>}
                </div>
                <div>
                    <textarea name="body" rows={6} value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}></textarea>
                    {errors.body && <span className="error">{errors.body}</span>}
                </div>

                <button className="primary-btn">Update</button>
            </form>
        </>
    )

}