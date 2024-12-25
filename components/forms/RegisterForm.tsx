"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"


import React, { use, useState } from 'react'
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldTypes } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"

const RegisterForm = ({ user }: { user: User}) => {
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
            const userData = { name, email, phone };
            const user = await createUser(userData);
            if(user) router.push(`/patients/${user.$id}/register`)
        } catch (error) { 
            console.log(error);
        }
      }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
            <section className="mb-12 space-y-4">
                <h1 className="header">Welcome</h1>
                <p className="text-dark-700">Schedule your first appointment.</p>
            </section>
            <section className="mb-12 space-y-6">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Personal Information</h2>
                </div>
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
            <div className="flex flex-col gap-6 xl:flex-row">
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
            </div>
            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                        fieldType={FormFieldTypes.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Date of Birth"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="dob"
                />
                <CustomFormField
                        fieldType={FormFieldTypes.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup 
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option) => (
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem value={option} id={option}/>
                                            <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder=""
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="occupation"
                    label="Occupation"
                    placeholder=""
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />

            </div> 
            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="emergencyContactName"
                    label="Emergency contact name"
                    placeholder="Guardian's name"
                />
                <CustomFormField
                    fieldType={FormFieldTypes.PHONE_INPUT}
                    control={form.control}
                    name="emergencyContactNumber"
                    label="Emergency contact number"
                    placeholder="(91) 92079 52217"
                />
            </div>

            <section className="mb-12 space-y-6">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Medical Information</h2>
                </div>
            </section>

            <CustomFormField
                    fieldType={FormFieldTypes.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="Primary Physician"
                    placeholder="Select a physician"
            >
                {Doctors.map((doctor) => (
                    <SelectItem key={doctor.name} value={doctor.name}>
                        <div className="flex cursor-pointer items-center gap-2">
                            <Image
                                src={doctor.image}
                                alt={doctor.name}
                                width={32}
                                height={32}
                                className="rounded-full border border-dark-500"
                            />
                            <p>{doctor.name}</p>
                        </div>
                    </SelectItem>
                ))}
            </CustomFormField>


            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="insuranceProvider"
                    label="Insurance provider"
                    placeholder="eg: Carelon Inc."
                />
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="insurancePolicyNumber"
                    label="Insurance Policy Number"
                    placeholder="ABC123456789"
                />
            </div>           

            <SubmitButton isLoading={isLoading} className="bg-purple-700 w-full rounded-lg">Get Started</SubmitButton>
        </form>
    </Form>
    )
}

export default RegisterForm