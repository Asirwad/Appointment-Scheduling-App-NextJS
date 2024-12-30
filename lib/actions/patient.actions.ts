
import { ID as appWrite_ID, Query } from "node-appwrite"
import {  BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils"

import { InputFile } from 'node-appwrite/file'

export const createUser = async (user: CreateUserParams) => {
    try {
        console.log("tyying to create new user2")
        const newUser = await users.create(
            appWrite_ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        )
        console.log({newUser})
        return parseStringify(newUser);
    } catch (error) {
        // @ts-expect-error("")
        if(error && error?.code === 409){
            const documents = await users.list([
                Query.equal('email', [user.email])
            ])
            return documents?.users[0]
        }
        console.log(error);
    }
}

export const getUser = async(userId: string) => {
    try {
        const user = await users.get(userId);
        return parseStringify(user);
    } catch (error) {
        console.log(error);
    }
}

export const registerPatient = async ( { identificationDocument, ...patient}: RegisterUserParams)=> {
    try {
        let file;
        if(identificationDocument){
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('fileName') as string,
            )

            file = await storage.createFile(BUCKET_ID!, appWrite_ID.unique(), inputFile)
        }

        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            appWrite_ID.unique(),
            {
                identificationDocumentId: file?.$id ? file.$id : null,
                identificationDocumentUrl: file?.$id
                  ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
                  : null,
                ...patient,
            }
        )
        return parseStringify(newPatient);
    } catch (error) {
        console.log(error);
    }
}