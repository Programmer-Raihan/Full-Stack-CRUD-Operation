'use server'

import { revalidatePath } from "next/cache"


export const addContact = async (formData) => {
    try {
        const newContact = Object.fromEntries(formData.entries())
        console.log("Incoming form data:", newContact)

        const modifiedContact = {
            name: newContact.name,
            email: newContact.email,
            phone: newContact.phone // সামনের '0' বজায় রাখতে স্ট্রিং রাখাই নিরাপদ
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modifiedContact)
        })

        if (!res.ok) {
            console.error("Backend error status:", res.status)
            return null
        }

        const data = await res.json()
        revalidatePath("/")
        return data
    } catch (error) {
        console.error("Error in addContact:", error)
        return null
    }
}

export async function deleteContact(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/contacts/${id}`, {
            method: 'DELETE',
        })

        if (!res.ok) {
            console.error("Delete failed status:", res.status)
            return null
        }

        const data = await res.json()
        revalidatePath("/")
        return data
    } catch (error) {
        console.error("Error in deleteContact:", error)
        return null
    }
}

export const editContact = async (id, formData) => {
    try {
        const updatedContact = Object.fromEntries(formData.entries())

        const modifiedContact = {
            name: updatedContact.name,
            email: updatedContact.email,
            phone: updatedContact.phone // newContact এর জায়গায় updatedContact
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/contacts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modifiedContact)
        })

        if (!res.ok) {
            console.error("Edit failed status:", res.status)
            return null
        }

        const data = await res.json()
        revalidatePath("/")
        return data
    } catch (error) {
        console.error("Error in editContact:", error)
        return null
    }
}