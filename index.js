import express  from "express";
import router from "./routes/index.js";
import db from "./config/db.js"




const app = express()

//conectar la base de datos
db.authenticate()
    .then(()=> console.log("Base de datos conectada"))
    .catch(error=> console.log("error"));

//Definir puerto
const port = process.env.PORT || 4000

//Habilitar pug
app.set('view engine', 'pug');

//Obtener año actual
app.use((req, res,next)=>{
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
})

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

//Definir la carpeta publica
app.use(express.static('public'));
//Agregar Router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}!`)
});
