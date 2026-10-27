'use client'
import { editContact } from '@/lib/action'
import { Button, FieldError, Form, Input, Label, TextField } from '@heroui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function EditContactForm({ contact }) {
  const { _id, name, email, phone } = contact;
  const router = useRouter()
  const handleForm = async (formData) => {
    const data = await editContact(_id, formData)
    if (data.modifiedCount > 0) {
      router.push("/")
    }

  }
  return (
    <>
      <Form action={handleForm} className="flex w-96 flex-col gap-4 mt-50 border p-5" >
        <TextField
          name="name"
          type="text"
          defaultValue={name}
        >
          <Label>Nmae</Label>
          <Input placeholder="your name" />
          <FieldError />
        </TextField>
        <TextField
          name="email"
          type="email"
          defaultValue={email}
        >
          <Label>Email</Label>
          <Input placeholder="abc@example.com" />
          <FieldError />
        </TextField>
        <TextField
          isRequired="true"
          name="phone"
          type="tel"
          pattern="[0-9+ ]*"
          defaultValue={phone}   >
          <Label>Phone</Label>
          <Input placeholder="" />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            Update
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>

      </Form></>
  )
}
