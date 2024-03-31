const express = require('express');
const axios = require('axios');
require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const { RentalServiceClient } = require('./generated/rental_grpc_pb');
const { RentalRequest, RentalGetAllRequest, RentalGetRequest, RentalPutRequest, RentalDeleteRequest } = require('./generated/rental_pb');

const app = express();
const PORT = process.env.PORT;

const grpcClient = new RentalServiceClient(
    'rentalservice:9000',
    grpc.credentials.createInsecure()
);

app.use(express.json());

app.get('/mobile/cars', async (req, res) => {
    try {
        const response = await axios.get(process.env.Service1_URL + '/cars/all');
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Napaka pri pridobivanju podatkov');
    }
});

app.get('/mobile/cars/:id', async (req, res) => {
    try {
        const carId = req.params.id;
        const response = await axios.get(`${process.env.Service1_URL}/cars/${carId}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Napaka pri pridobivanju podatkov');
    }
});

app.get('/mobile/cars/color/:color', async (req, res) => {
    try {
        const color = req.params.color; // Retrieve the color parameter from the URL path
        const response = await axios.get(`${process.env.Service1_URL}/cars/color/${color}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Napaka pri pridobivanju podatkov');
    }
});

app.get('/mobile/cars/brand/:brand', async (req, res) => {
    try {
        const brand = req.params.brand; // Retrieve the color parameter from the URL path
        const response = await axios.get(`${process.env.Service1_URL}/cars/brand/${brand}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Napaka pri pridobivanju podatkov');
    }
});


app.get('/mobile/user', async (req, res) => {
    try {
        const response = await axios.get(process.env.Service3_URL + '/user/all');
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Napaka pri pridobivanju podatkov');
    }
});

app.get('/mobile/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`${process.env.Service3_URL}/user/${id}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Napaka pri pridobivanju podatkov');
    }
});


app.get('/mobile/rentals', (req, res) => {
    const request = new RentalGetAllRequest();
    const rentalStream = grpcClient.allRental(request);
    const rentals = [];

    rentalStream.on('data', (rental) => {
        rentals.push(rental.toObject());
    });

    rentalStream.on('end', () => {
        console.log('Pridobil vse najeme:', rentals);
        res.json(rentals);
    });

    rentalStream.on('error', (error) => {
        console.error('gRPC napaka:', error);
        res.status(500).send("Prišlo je do napake: " + error.message);
    });
});

app.get('/mobile/rentals/:rentalId', (req, res) => {
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
});

app.listen(PORT, () => {
    console.log(`Gateway server teče na: ${PORT}`);
});
