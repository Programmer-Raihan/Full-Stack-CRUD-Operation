import AddContact from "@/components/AddContactForm";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

import React from 'react'

export default function AddContactPage() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen items-center justify-center">
     <AddContact/>
    </div>
  )
}
