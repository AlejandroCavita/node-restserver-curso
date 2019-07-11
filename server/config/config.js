//========================
//Puerto
//========================

process.env.PORT = process.env.PORT || 3000;


//========================
//Entorno
//========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


//========================
//Base de datos
//========================

let urlDB = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/cafe' : process.env.MONGO_URI;

// urlDB = 'mongodb+srv://alejandrocavita:OnePiece92@cluster0-s99xg.mongodb.net/cafe';

process.env.URLDB = urlDB;