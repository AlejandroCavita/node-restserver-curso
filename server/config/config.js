//========================
//Puerto
//========================

process.env.PORT = process.env.PORT || 3000;


//========================
//Entorno
//========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//========================
//Vencimiento del Token
//========================
//60 segundos
//60 minutos 
//24 horas 
//30 días 

process.env.CADOCIDAD_TOKEN = '48h';

//========================
//SEED de autenticación
//========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'


//========================
//Base de datos
//========================

let urlDB = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/cafe' : process.env.MONGO_URI;

// urlDB = 'mongodb+srv://alejandrocavita:OnePiece92@cluster0-s99xg.mongodb.net/cafe';

process.env.URLDB = urlDB;

//========================
//Google ClientID
//========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '646786917462-jtvbhlaksk344e3uo7fuoreg699ppa6l.apps.googleusercontent.com';