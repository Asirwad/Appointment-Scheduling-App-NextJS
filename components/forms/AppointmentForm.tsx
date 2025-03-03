"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
 

import React, { useState } from 'react'
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { getAppointmentSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { FormFieldTypes } from "./PatientForm"
import Image from "next/image"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions"
import { Appointment } from "@/types/appwrite.types"

const AppointmentForm = ({ userId, patientId, type, appointment, setOpen }: {
        userId: string;
        patientId: string;
        type: "create" | "cancel" | "schedule";
        appointment?: Appointment;
        setOpen: (open: boolean) => void;
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const AppointmentFormValidation = getAppointmentSchema(type);

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
          primaryPhysician: appointment ? appointment.primaryPhysician : '',
          schedule: appointment ? new Date(appointment?.schedule) : new Date(Date.now()),
          reason: appointment?.reason || '',
          note: appointment?.note || '',
          cancellationReason: appointment?.cancellationReason || '',
        },
    })  

    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
        setIsLoading(true);
        let status;
        switch (type) {
            case 'schedule':
                status = 'scheduled';
                break;
            case 'cancel':
                status = 'cancelled';
                break;
            default:
                status = 'pending';
                break;
        }

        try {
            if(type === 'create' && patientId){
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    note: values.note,
                    status: status as Status,
                }
                const appointment = await createAppointment(appointmentData);
                if(appointment){
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
                }
            } else{
                const appointmentToUpdate = {
                    userId,
                    /* eslint-disable */
                    appointmentId: appointment?.$id!,
                    appointment: {
                        primaryPhysician: values?.primaryPhysician,
                        schedule: new Date(values?.schedule),
                        status: status as Status,
                        cancellationReason: values?.cancellationReason,
                    },
                    type
                }
                const updatedAppointment = await updateAppointment(appointmentToUpdate);

                if(updatedAppointment){
                    setOpen(false);
                    form.reset();
                }
            }
        } catch (error) {
            console.log(error);
        }
      }

    let buttonLabel;
    switch (type) {
        case 'cancel':
            buttonLabel = 'Cancel Appointment'
            break;
        case 'create':
            buttonLabel = 'Create Appointment'
            break;
        case 'schedule':
            buttonLabel = 'Schedule Appointment'
            break;
        default:
            break;
    }
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            {type === 'create' && <section className="mb-12 space-y-4">
                <h1 className="header">New Appointment</h1>
                <p className="text-dark-700">Schedule your first appointment in 10 seconds.</p>
            </section>}
            
            {type !== "cancel" && (
                <>
                    <CustomFormField
                        fieldType={FormFieldTypes.SELECT}
                        control={form.control}
                        name="primaryPhysician"
                        label="Doctor"
                        placeholder="Select a doctor"
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
                    <CustomFormField
                        fieldType={FormFieldTypes.DATE_PICKER}
                        control={form.control}
                        name="schedule"
                        label="Expected appointment date"
                        showTimeSelect
                        dateFormat="MM/dd/yyyy - h:mm aa"
                    />

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldTypes.TEXTAREA}
                            control={form.control}
                            name="reason"
                            label="Reason for appointment"
                            placeholder="eg: I have been feeling unwell and need to see a doctor."
                        />
                        <CustomFormField
                            fieldType={FormFieldTypes.TEXTAREA}
                            control={form.control}
                            name="note"
                            label="Notes"
                            placeholder="eg: Been taking medications"
                        />
                    </div>
                </>
            )}

            {type === "cancel" && (
                <CustomFormField
                    fieldType={FormFieldTypes.TEXTAREA}
                    control={form.control}
                    name="reason"
                    label="Reason for cancellation"
                    placeholder="eg: I have been feeling unwell and need to see a doctor."
                />
            )}

            <SubmitButton 
                isLoading={isLoading} 
                className={`${type === 'cancel' ? 'shad-danger-btn': 'shad-primary-btn bg-purple-700'} w-full rounded-lg`}
            >
                {buttonLabel}
            </SubmitButton>
        </form>
    </Form>
    )
}

export default AppointmentForm