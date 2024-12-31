'use server'

import { ID as appwrite_ID} from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";


export const createAppointment = async (appointmentData: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appwrite_ID.unique(),
            appointmentData
        );
        return parseStringify(newAppointment);
    } catch (error) {
        console.log(error);
    }
}