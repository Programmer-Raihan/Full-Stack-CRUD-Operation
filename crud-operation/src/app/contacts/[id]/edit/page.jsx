import EditContactForm from '@/components/EditContactForm'
import { contactPersonById } from '@/lib/data'
import React from 'react'

export default async function Editpage({params}) {
    const {id} = await params
    const contact = await contactPersonById(id)
    console.log(contact)
  return (
  <div className="max-w-7xl mx-auto min-h-screen items-center justify-center">
       <EditContactForm 
       contact={contact}/>
      </div>
  )
}
