import {Sequelize} from "sequelize-typescript"
import dotenv from "dotenv"
dotenv.config()


//conexión a la base de datos
const db = new Sequelize(process.env.DATABASE_URL! , {
    models : [__dirname + "/../models/**/*"],
    logging : false
})

export default db  