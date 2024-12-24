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
 

import React, { use, useState } from 'react'
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"

const PatientForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
          name: "",
          email: "",
          phone: "",
        },
    })  

    async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);
        try {
            // const userData = { name, email, phone };
            // const user = await createUser(userData);
            // if(user) router.push(`/patients/${user.$id}/register`)

        } catch (error) {
            console.log(error);
        }
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