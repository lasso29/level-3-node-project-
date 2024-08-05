const express = require('express')
const app = express()
const mongoose= require('mongoose')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors')
const env = require("dotenv").config()
const allRoutes = require("./Routes/vans.route")
URI = process.env.URI
port = process.env.port || 3000;
app.get('/', (req, res) => res.send('Hello World!'))

app.use(bodyParser.json());
mongoose.connect(URI)
.then(()=>{
    console.log("Db has been connected successfully");
}).catch((err)=>{
    console.log(err);
})
// const express = require('express');
// const app = express();

app.use(cors())

const vans = [
    { id: 1, color: '#e07754', name: "Modest Explorer", price: 60, description: "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", type: "simple", hostId: "123" },
    { id: 2, color: '#115f58', name: "Beach Bum", price: 80, description: "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png", type: "rugged", hostId: "123" },
    { id: 3, color: '#161616', name: "Reliable Red", price: 100, description: "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", type: "luxury", hostId: "456" },
    { id: 4, color: '#115f58', name: "Dreamfinder", price: 65, description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple",  },
    { id: 5, color: '#161616', name: "The Cruiser", price: 120, description: "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", type: "luxury", hostId: "789" },
    { id: 6, color: '#e07754', name: "Green Wonder", price: 70, description: "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", type: "rugged", hostId: "123" }
];

app.get('/api/vans', (req, res) => {
    res.send(vans);
});

app.get('/api/vans/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const van = vans.find(van => van.id === id);
    if (!van) {
        res.status(404).json({ error: 'Van not found' });
    } else {
        res.send(van);
    }
});

app.get('/api/host/vans', (req, res) => {
    
    const hostVans = vans.filter(van => van.hostId === '123');
    res.send(hostVans);
});

app.get('/api/host/vans/:id', (req, res) => {
    const id = req.params.id;
    const van = vans.find(van => van.id == id && van.hostId == '123');
    if (!van) {
        res.status(404).json({ error: 'Van not found' });
    } else {
        res.send(van);
    }
});


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

app.use("/van", allRoutes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))