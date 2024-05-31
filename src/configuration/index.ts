import { config } from "dotenv";

config()
export const HOST: string = process.env.HOST || 'localhost'
export const PORT: number = Number(process.env.POST) || 3000
export const MONGODB_URI: string = process.env.MONGODB_URI || ''

