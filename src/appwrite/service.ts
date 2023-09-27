import { ID, Account, Client } from "appwrite";
import Config from "react-native-config";

import Snackbar from "react-native-snackbar";

const appwriteClient = new Client()

// const API_ENDPOINT: string = Config.API_ENDPOINT!;
// const PROJECT_ID: string = Config.PROJECT_ID!;

const API_ENDPOINT = 'https://cloud.appwrite.io/v1';
const PROJECT_ID = '64afca80c8a7e76770b4'

type CreateUserAccount = {
    email: string
    password: string,
    name: string
}

type LoginUserAccount = {
    email: string,
    password: string
}

// const client = new Client()
//     .setEndpoint(API_ENDPOINT)
//     .setProject(PROJECT_ID)

// const account = new Account(client);

// const createAccount = async ({ email, password, name }: CreateUserAccount) => {
//     try {
//         const userAccount = await account.create(
//             ID.unique(),
//             email,
//             password,
//             name
//         )
//         if (userAccount) {
//             //TODO: 
//             return login({ email, password })
//         } else {
//             return userAccount
//         }
//     } catch (error) {
//         Snackbar.show({
//             text: String(error),
//             duration: Snackbar.LENGTH_LONG,
//         });
//         console.log("Appwrite service :: createAccount() :: " + error);
//     }
// }

// const login = async ({ email, password }: LoginUserAccount) => {
//     try {
//         return await account.createEmailSession(email, password);
//     } catch (error) {
//         Snackbar.show({
//             text: String(error),
//             duration: Snackbar.LENGTH_LONG,
//         });
//         console.log("AppWrite service :: LoginAccount() :: " + error);
//     }
// }

// const getCurrentUserDetails = async () => {
//     try {
//         return await account.get()
//     } catch (error) {
//         console.log("AppWrite service :: getCurrentUserDetails() :: " + error);
//     }
// }

// const logout = async () => {
//     try {
//         return await account.deleteSession('current')
//     } catch (error) {
//         console.log("AppWrite service :: getCurrentUserDetails() :: " + error);
//     }
// }

class AppwriteService {
    account;

    constructor(){
        appwriteClient
        .setEndpoint(API_ENDPOINT)
        .setProject(PROJECT_ID)

        this.account = new Account(appwriteClient)
    }

    //create a new record of user inside appwrite

    async createAccount({email, password, name}: CreateUserAccount){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccount) {
                //TODO: create login feature
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite service :: createAccount() :: " + error);
            
        }
    }

    async login({email, password}: LoginUserAccount){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite service :: loginAccount() :: " + error);
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentAccount() :: " + error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("Appwrite service :: getCurrentAccount() :: " + error);
        }
    }
}

export default AppwriteService