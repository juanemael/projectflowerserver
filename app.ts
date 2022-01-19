import express, {Express} from 'express'
import bodyParser from "body-parser"
import routes from "./routes/routes"
import 'dotenv/config'
import helmet from "helmet";
import cors from "cors";


console.log(process.env.DB_USER)
const app : Express = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

routes(app)

const PORT = 3000


app.listen(PORT, ()=>{
    console.log(`Server is online at port ${PORT}`)
})