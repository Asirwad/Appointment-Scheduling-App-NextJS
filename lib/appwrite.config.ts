import * as sdk from 'node-appwrite';

export const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT
} = process.env;


const client = new sdk.Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("676a4a7e001b2cd2556d")
    .setKey("standard_f804a012e1e06583c310fe7d1c5c2e82c25c6e920f701d81d5943545e46de691fddaa25b4e85ccaecebb14d9debe4d6227d4331729b1bdd8e0b7ea5c478b6c59a3b2702e32e71e67577da734e520f592222a23d648c1fc11f51dfa53ce41bedc34a1848f75968a756e3af06e13caaff665b8d8aaff61890c2d20f66ce8331c3b");

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);

