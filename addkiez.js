const mongoose = require("mongoose");
const Kiez = require("./models/Kiez.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kiez_local-backend";

mongoose.connect(MONGO_URI)
    .then(() => {
        const kieze = [
            { kiezName: 'Pankow', description: 'Description for Pankow' },
            { kiezName: 'Mitte', description: 'Description for Mitte' },
            { kiezName: 'Reinickendorf', description: 'Description for Reinickendorf' },
            { kiezName: 'Spandau', description: 'Description for Spandau' },
            { kiezName: 'Charlottenburg-Wilmersdorf', description: 'Description for Charlottenburg-Wilmersdorf' },
            { kiezName: 'Steglitz-Zehlendorf', description: 'Description for Steglitz-Zehlendorf' },
            { kiezName: 'Tempelhof-Schöneberg', description: 'Description for Tempelhof-Schöneberg' },
            { kiezName: 'Neukölln', description: 'Description for Neukölln' },
            { kiezName: 'Friedrichshain-Kreuzberg', description: 'Description for Friedrichshain-Kreuzberg' },
            { kiezName: 'Lichtenberg', description: 'Description for Lichtenberg' },
            { kiezName: 'Marzahn-Hellersdorf', description: 'Description for Marzahn-Hellersdorf' },
            { kiezName: 'Treptow-Köpenick', description: 'Description for Treptow-Köpenick' }
        ];

        return Kiez.insertMany(kieze);
    })
    .then(() => {
        console.log('Kiez added successfully');
        return mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error adding kiez', err);
    });
