const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      //useCreateIndex: true,
      useNewUrlParser: true,
      //useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("DB conectada");
  } catch (err) {
    console.log(err);
    process.exit(1); //Detener la app
  }
};

module.exports = conectarDB;
