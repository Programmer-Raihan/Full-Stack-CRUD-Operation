// 'use client'
// import { addContact } from '@/lib/action'
// import { Button, FieldError, Form, Input, Label, TextField } from '@heroui/react'
// import { useRouter } from 'next/navigation'
// import React from 'react'

// export default function AddContactForm() {
//   const router = useRouter()
//   const handleForm = async (formData) => {
//     const data = await addContact(formData)
//     if (data) {
//       router.push("/")
//     }
//   }
//   return (
//     <>
//       <Form action={handleForm} className="flex w-96 flex-col gap-4 mt-50 border p-5" >
//         <TextField
//           name="name"
//           type="text"
//         >
//           <Label>Nmae</Label>
//           <Input placeholder="your name" />
//           <FieldError />
//         </TextField>
//         <TextField
//           name="email"
//           type="email"
//         >
//           <Label>Email</Label>
//           <Input placeholder="abc@example.com" />
//           <FieldError />
//         </TextField>
//         <TextField
//           isRequired="true"
//           name="phone"
//           type="tel"
//           pattern="[0-9+ ]*"        >
//           <Label>Phone</Label>
//           <Input placeholder="" />
//           <FieldError />
//         </TextField>

//         <div className="flex gap-2">
//           <Button type="submit">
//             Submit
//           </Button>
//           <Button type="reset" variant="secondary">
//             Reset
//           </Button>
//         </div>

//       </Form></>
//   )
// }

'use client'

import { addContact } from '@/lib/action'
import { Button, FieldError, Form, Input, Label, TextField } from '@heroui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AddContactForm() {
  const router = useRouter()

  const handleForm = async (formData) => {
    const data = await addContact(formData)
    if (data) {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <>
      <Form action={handleForm} className="flex w-96 flex-col gap-4 mt-50 border p-5">
        <TextField
          name="name"
          type="text"
        >
          <Label>Name</Label>
          <Input placeholder="your name" />
          <FieldError />
        </TextField>

        <TextField
          name="email"
          type="email"
        >
          <Label>Email</Label>
          <Input placeholder="abc@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="phone"
          type="tel"
          pattern="[0-9+ ]*"
        >
          <Label>Phone</Label>
          <Input placeholder="" />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </>
  )
}