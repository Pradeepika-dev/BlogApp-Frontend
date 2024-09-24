import { useContext, useState } from "react"
import { AppContext } from "../../Context/AppContext"
import { useNavigate } from "react-router-dom"

export default function Create() {
    const navigate = useNavigate()

    const { token } = useContext(AppContext)

    const [formData, setFormData] = useState({
        'title': '',
        'body': ''
    })

    const [errors, setErrors] = useState({})

    async function handleCreate(e) {
        e.preventDefault()
        const res = await fetch('/api/posts', {
            method: 'POST',
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
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline title">Create a Post</h1>
            <form onSubmit={handleCreate} className="w-1/2 space-y-6 mx-auto">
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

                <button className="primary-btn">Create Post</button>
            </form>
        </>
    )

}