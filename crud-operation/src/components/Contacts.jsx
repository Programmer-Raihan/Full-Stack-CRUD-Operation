// import { getContact } from '@/lib/data'
// import { Button, Card, Table, TextField } from '@heroui/react'
// import React from 'react'
// import ContactTable from './ContactTable'
// import Link from 'next/link'

// export default async function Contacts() {


//     const contact =await getContact()
//     console.log(contact)
//     return (
//         <div className=' '>
//             <div className='max-w-5xl mx-auto'>
//                 <p className='text-blue-500 font-bold mt-10'>Contacts</p>
//                 <h3 className='text-3xl'>Contact Manager</h3>
//                 <p className='text-gray-500'>Keep your contacts organized and easy to find</p>
//              <Link href="/contacts/add-contact">   <Button className="mt-5">+ Add contact</Button></Link>
//                 <ContactTable contact={contact}/>
//             </div>
//         </div>
//     )
// }
'use client'

import React, { useState, useEffect } from 'react'
import { getContact } from '@/lib/data'
import { Button } from '@heroui/react'
import ContactTable from './ContactTable'
import Link from 'next/link'

export default function Contacts() {
  const [contact, setContact] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContact()
      .then((data) => {
        if (Array.isArray(data)) {
          setContact(data)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className=''>
      <div className='max-w-5xl mx-auto'>
        <p className='text-blue-500 font-bold mt-10'>Contacts</p>
        <h3 className='text-3xl'>Contact Manager</h3>
        <p className='text-gray-500'>Keep your contacts organized and easy to find</p>
        <Link href="/contacts/add-contact">
          <Button className="mt-5">+ Add contact</Button>
        </Link>
        {loading ? (
          <p className="mt-5 text-gray-500">Loading contacts...</p>
        ) : (
          <ContactTable contact={contact} />
        )}
      </div>
    </div>
  )
}