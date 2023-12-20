import express, { json, urlencoded } from "express";
import cors from 'cors'
import publicRoutes from './routes/public'
import admimRoutes from './routes/admin'
import { requestInterceptor } from "./utils/requestInterceptor";
import { errorHandler } from "./middlewares/ErrorHandler";

const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended:true }))

app.all('*', requestInterceptor)
app.use('/', publicRoutes)
app.use('/admin', admimRoutes)
app.use(errorHandler)

export { app }