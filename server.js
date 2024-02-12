const express = require('express')
const mongoose = require('mongoose')
const Client = require('./models/clientModel.js')
const app = express()

app.use(express.json())
require('dotenv').config();

//routes

app.get('/', (req, res) => {
  res.send('did you get it')
})

app.get('/clients', async(req, res) =>{
    try {
        const client = await Client.find({});
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
    })

    app.get('/clients/:id', async(req, res ) => {
        try {
            const {id} = req.params;
            const client = await Client.findById(id);
        res.status(200).json(client);
        } catch (error) {
            res.status(500).json({ message: error.message})
        }
    })

app.post('/clients', async(req, res) => {
    try {
    const client = await Client.create(req.body)
    //const {name, email, password} = req.body;
    res.status(200).json(client);

   } catch(error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
   }
})

//update client 
app.put ('/client/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const client = await Client.findByIdAndUpdate(id, req.body);
        //what happed if it cant find client in the database
    if(!client){
        return res.status(404).json({ message :`Cannot Update Client with ID ${id}`});
    }
    const updateClient = await Client.findById(id);
    res.status(200).json(updateClient);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a clinet

app.delete('/client/:id', async(req, res)=> {
try {
    const {id} = req.params;
    const client = await Client.findByIdAndDelete(id);
    if(!client){
        return res.status(404).json({message: `No client with the id of ${id}`})
    }
    res.status(200).json(client);

} catch (error) {
res.status(500).json({message: error.message})
}

})


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('I found water!!!');
    const port = process.env.PORT || 3001; // Use the PORT environment variable
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });