import  express  from "express";
import colors from "colors"
import cors , {CorsOptions} from "cors"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./config/swagger"
import router from "./router";
import db from "./config/db";


//Conectar a la Base de Datos
export async function connectDB() {
    try {
        await db.authenticate() //db.authenticate() es un método de Sequelize que intenta verificar la conexión con la base de datos.
        db.sync() // es otro método de Sequelize que sincroniza tus modelos con la base de datos. Esto significa que crea las tablas si no existen.
        //console.log(colors.blue.bold("Conexión exitosa a la base de datos"))
    } catch (error) {
        //console.log(error)
        console.log(colors.red.bold("Hubo un error al conectar a la base de datos"))
    }
} 

connectDB()

//Instancia de Express
const server = express() //Aquí se está inicializando la aplicación Express, creando una instancia del servidor.
//La constante server ahora contiene todas las funcionalidades de Express, como definir rutas, middlewares, escuchar peticiones, etc.

//Permitir Conexiones
const corsOptions : CorsOptions = {
    origin : function(origin , callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null , true)
        }else{
            callback(new Error("Error de CORS"))

        }
    }
} 

server.use(cors(corsOptions))

//Leer Datos
server.use(express.json()) //Este middleware de Express se encarga de parsear (convertir) automáticamente las peticiones con cuerpo (body) en formato JSON.

server.use(morgan("dev"))
server.use("/api/products" , router)//Esta línea está diciendo: "Cada vez que llegue una petición a /api/products usa las rutas que están definidas en el objeto router".

//Docs
server.use("/docs" , swaggerUi.serve , swaggerUi.setup(swaggerSpec))

export default server