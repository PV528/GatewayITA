const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const { RentalServiceClient } = require('./generated/rental_grpc_pb');
const { RentalRequest, RentalGetAllRequest, RentalGetRequest, RentalPutRequest} = require('./generated/rental_pb');

const app = express();
const PORT = process.env.PORT;

const grpcClient = new RentalServiceClient(
    'rentalservice:9000', //tukaj mora biti url moje grpc mikrostoritve 
    grpc.credentials.createInsecure()
);

app.use(express.json());
app.use(cors());


app.all('/cars/*', async (req, res) => {
    try {
        const url = process.env.Service1_URL + req.url;

        let response;
        switch (req.method) {
            case 'GET':
                response = await axios.get(url);
                break;
            case 'POST':
                response = await axios.post(url, req.body);
                break;
            case 'PUT':
                response = await axios.put(url, req.body);
                break;
            case 'DELETE':
                response = await axios.delete(url);
                break;
            default:
                throw new Error('Nepodprta HTTP metoda');
        }

        res.send(response.data);
    } catch (error) {
        res.status(500).send('Napaka pri posredovanju zahteve');
    }
});

app.all('/user/*', async (req, res) => {
    try {
        const url = process.env.Service3_URL + req.url;

        let response;
        switch (req.method) {
            case 'GET':
                response = await axios.get(url);
                break;
            case 'POST':
                response = await axios.post(url, req.body);
                break;
            case 'PUT':
                response = await axios.put(url, req.body);
                break;
            case 'DELETE':
                response = await axios.delete(url);
                break;
            default:
                throw new Error('Nepodprta HTTP metoda');
        }

        res.send(response.data);
    } catch (error) {
        res.status(500).send('Napaka pri posredovanju zahteve');
    }
});
//GRPC POST
app.post('/api/rentals/create', (req, res) => {
    try {
        const request = new RentalRequest();
        request.setRentstart(req.body.rentStart);// Tukaj navedem setterje in geterje (morajo biti v RentalRequest, ki se nahaja v rental_pb.js)
        request.setRentend(req.body.rentEnd);
        request.setPrice(req.body.price);
        request.setCarid(req.body.carId);
        grpcClient.createRental(request, (error, response) => {
            if (error) {
                console.error('gRPC napaka:', error);
                res.status(500).send("Prišlo je do napake: " + error.message);
            } else {
                res.json(response.toObject());
            }
        });
    } catch (error) {
        console.error('Napaka pri obdelavi zahteve', error);
        res.send('Napaka pri obdelavi zahteve');
    }
});

//GRPC GET_ALL
app.get('/api/rentals', (req, res) => {
    try {
        const request = new RentalGetAllRequest();
        const rentalStream = grpcClient.allRental(request);
        const rentals = [];//rabim polje, ker je odziv tok
        rentalStream.on('data', (rental) => {
            rentals.push(rental.toObject());//vsak rental vstavim v polje
        });
        rentalStream.on('end', () => {
            console.log('Pridobil vse najeme:', rentals); //na koncu vrne celo polje
            res.json(rentals);
        });
        rentalStream.on('Napaka', (error) => {
            console.error('gRPC napaka:', error);
            res.status(500).send("Prišlo je do napake: " + error.message);
        });
    } catch (error) {
        console.error('Napaka pri obdelavi zahteve', error);
        res.send('Napaka pri obdelavi zahteve');
    }
});

//GRPC GET_BY_ID
app.get('/api/rentals/:rentalId', (req, res) => {
    try {
        const rentalId = req.params.rentalId;
        const request = new RentalGetRequest();
        request.setRentalid(rentalId);
        grpcClient.getRental(request, (error, response) => {
            if (error) {
                console.error('gRPC napaka:', error);
                res.status(500).send("Prišlo je do napake: " + error.message);
            } else {
                res.json(response.toObject());
            }
        });
    } catch (error) {
        console.error('Napaka pri obdelavi zahteve', error);
        res.send('Napaka pri obdelavi zahteve');
    }
});

//GRPC DELETE
app.delete('/api/rentals/:rentalId', (req, res) => {
    try {
        const rentalId = req.params.rentalId;
        const request = new RentalGetRequest();
        request.setRentalid(rentalId);
        grpcClient.deleteRental(request, (error, response) => {
            if (error) {
                console.error('gRPC napaka:', error);
                res.status(500).send("Prišlo je do napake: " + error.message);
            } else {
                res.json(response.toObject());
            }
        });
    } catch (error) {
        console.error('Napaka pri obdelavi zahteve', error);
        res.send('Napaka pri obdelavi zahteve');
    }
});
//GRPC PUT
app.put('/api/rentals/:rentalId', (req, res) => {
    try {
        const rentalId = req.params.rentalId;
        const request = new RentalPutRequest();
        request.setRentalid(rentalId);
        request.setRentstart(req.body.rentStart);
        request.setRentend(req.body.rentEnd);
        request.setPrice(req.body.price);
        request.setCarid(req.body.carId);
        
        grpcClient.updateRental(request, (error, response) => {
            if (error) {
                console.error('gRPC napaka:', error);
                res.status(500).send("Prišlo je do napake: " + error.message);
            } else {
                res.json(response.toObject());
            }
        });
    } catch (error) {
        console.error('Napaka pri obdelavi zahteve', error);
        res.send('Napaka pri obdelavi zahteve');
    }
});

app.listen(PORT, () => {
    console.log(`Gateway server teče na: ${PORT}`);
});
