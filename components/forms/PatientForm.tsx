"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

export enum FormFieldTypes {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'

}
 
const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

import React, { useState } from 'react'
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"

const PatientForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
    })  

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
                <h1 className="header">Hi there👋</h1>
                <p className="text-dark-700">Schedule your first appointment.</p>
            </section>
            <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="name"
                label="Full name"
                placeholder="Dia"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"

            />
            <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="email"
                label="Email"
                placeholder="dia@ustr.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"

            />
            <CustomFormField
                fieldType={FormFieldTypes.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone Number"
                placeholder="(91) 92079 52217"
                

            />
            <SubmitButton isLoading={isLoading} className="bg-purple-700 w-full rounded-lg">Get Started</SubmitButton>
        </form>
    </Form>
    )
}

export default PatientForm