'use server'

import { revalidatePath } from "next/cache"



export const addContact = async (formData) => {
    const newContact = Object.fromEntries(formData.entries())
    console.log(newContact)
    const modifiedContact = {
        name: newContact.name,
        email: newContact.email,
        phone: parseInt(newContact.phone)
    }
    console.log(modifiedContact)
    const res = await fetch("http://localhost:4000/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modifiedContact)
    })
    const data = await res.json()
    if (!res.ok) {
        return
    }
    revalidatePath("/")
    return data


}

export async function deleteContact(id) {
    const res = await fetch(`http://localhost:4000/contacts/${id}`,
        {
            method: 'DELETE',

        }

    )
    const data = await res.json()
    if (!data) return
    console.log(data)
    revalidatePath("/")
    return data

}


export const editContact = async (id, formData) => {
    const updatedContact = Object.fromEntries(formData.entries())
    const modifiedContact = {
        name: updatedContact.name,
        email: updatedContact.email,
        phone: parseInt(updatedContact.phone)
    }
    console.log(modifiedContact)
    const res = await fetch(`http://localhost:4000/contacts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modifiedContact)
    })
    const data = await res.json()
    if (!res.ok) {
        return
    }
    revalidatePath("/")
    return data
}