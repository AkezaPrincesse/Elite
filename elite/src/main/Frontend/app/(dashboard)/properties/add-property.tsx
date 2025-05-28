'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddPropertyPage() {
    const router = useRouter()

    const [property, setProperty] = useState({
        title: '',
        address: '',
        description: '',
        price: '',
        imageUrl: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProperty({ ...property, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch('http://localhost:8080/properties/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(property),
            })

            if (res.ok) {
                router.push('/properties') // navigate to properties listing
            } else {
                const errorText = await res.text()
                console.error('Error:', errorText)
                alert('Failed to add property')
            }
        } catch (err) {
            console.error(err)
            alert('Server error')
        }
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
    <input type="text" name="title" placeholder="Title" onChange={handleChange} required className="border p-2 w-full" />
    <input type="text" name="address" placeholder="Address" onChange={handleChange} required className="border p-2 w-full" />
    <textarea name="description" placeholder="Description" onChange={handleChange} required className="border p-2 w-full" />
    <input type="number" name="price" placeholder="Price" onChange={handleChange} required className="border p-2 w-full" />
    <input type="text" name="imageUrl" placeholder="Image URL" onChange={handleChange} className="border p-2 w-full" />
    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Property</button>
    </form>
    </div>
)
}
