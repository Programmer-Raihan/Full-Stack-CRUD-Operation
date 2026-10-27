'use client'
import { Button, Card, Table, TextField } from '@heroui/react'
import React, { useState } from 'react'
import DeleteContact from './DeleteContact'
import Link from 'next/link'

export default function ContactTable({ contact = [] }) {
  const [search, setSearch] = useState('')

  const searchTerm = search.toLowerCase()
  const filterContacts = contact.filter((c) => {
    return (

      c.name?.toLowerCase().includes(searchTerm) ||
      c.email?.toLowerCase().includes(searchTerm) ||
      String(c.phone || '').includes(searchTerm)
    )

  })

  return (

    <Card className='mt-5 border'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-xl font-bold'>All contacts</p>
          <p>{filterContacts?.length || 0} people in the contact list</p>
        </div>
        <TextField>
          <input type="text" placeholder='search your contacts' className='border rounded-2xl pl-2 '
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </TextField>

      </div>
      <Table className='mt-5 '>
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="min-w-[600px]">
            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Phone</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {filterContacts.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center py-4 text-gray-500">
                    No contacts found
                  </Table.Cell>
                </Table.Row>
              ) : (
                filterContacts.map((c) => (
                  <Table.Row key={c._id}>
                    <Table.Cell>{c.name}</Table.Cell>
                    <Table.Cell>{c.email}</Table.Cell>
                    <Table.Cell>{c.phone}</Table.Cell>
                    <Table.Cell className="flex justify-between items-center">
                      <Link href={`/contacts/${c._id}/edit`}>
                        <Button variant="primary">Edit</Button>
                      </Link>
                      <DeleteContact id={c._id} />
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </Card>


  )
}
