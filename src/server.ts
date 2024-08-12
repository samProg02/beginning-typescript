import app from "./index";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import * as path from "path";

dotenv.config({path: path.join(__dirname, 'config.env')});



const db :string= process.env.DB_LINK!.replace('<password>', process.env.DB_PASSWORD as string)
mongoose.connect(db, {

}).then(() => {
    console.log('Database connected successfully')
})



app.listen(process.env.PORT!, () => {
    console.log('app running on port 8000')
})