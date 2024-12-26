import * as sdk from 'node-appwrite';

export const {
    PROJECT_ID = '676a4a7e001b2cd2556d',
    API_KEY = 'standard_f804a012e1e06583c310fe7d1c5c2e82c25c6e920f701d81d5943545e46de691fddaa25b4e85ccaecebb14d9debe4d6227d4331729b1bdd8e0b7ea5c478b6c59a3b2702e32e71e67577da734e520f592222a23d648c1fc11f51dfa53ce41bedc34a1848f75968a756e3af06e13caaff665b8d8aaff61890c2d20f66ce8331c3b',
    DATABASE_ID = '676a4bb30024f1b0275f',
    PATIENT_COLLECTION_ID = '676a4be000246466c363',
    DOCTOR_COLLECTION_ID = '676a4c04002318d53af1',
    APPOINTMENT_COLLECTION_ID = '676a4c3d00307ea2215f',
    BUCKET_ID = '676a4c9100134fa0888b',
    ENDPOINT = 'https://cloud.appwrite.io/v1'
} = process.env;



const client = new sdk.Client();

client
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);

