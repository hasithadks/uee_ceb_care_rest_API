const express =  require('express');

const app = express();

const  mongoClient = require('mongodb').MongoClient

const user = require('./model/UserAccountModel');
const aList = require('./model/producList');

app.use(express.json());

app.listen(3000, () => {
    console.log("Listening on port 3000...")

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://Admin:Admin123@cluster0.yc6qa.mongodb.net/cebcare?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true ,  useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("cebcare").collection("cebUsers");
        const collection_access_list = client.db("cebcare").collection("productList");
        if(err){
            console.log("Error while Connecting mongo client");
        } else {
            console.log("Successfully Connected");
            app.post('/signup', (req, res) => {

                console.log("in post route");

                const newUser = new user({
                    email: req.body.email,
                    name:req.body.name,
                    nic:req.body.nic,
                    phoneNo:req.body.phoneNo,
                    userName:req.body.userName,
                    password:req.body.password,

                });

                console.log(JSON.stringify(newUser))
                const query = {userName: newUser.userName}

                collection.findOne(query, (err, result) => {
                    if(result == null){
                        collection.insertOne(newUser, (err, result) => {

                            res.status(200).send()
                        })
                    } else {
                        res.status(400).send()
                    }
                })

            })

            app.post('/login', (req, res) => {
                const query = {
                    userName : req.body.userName,
                    password : req.body.password
                }

                console.log(query);

                collection.findOne(query, (err, result) => {

                    console.log(result);
                    if(result != null){
                        console.log("send 200");
                        res.status(200).send()
                    } else {
                        res.status(404).send()
                    }

                })

            })


            app.post('/getAccessByCensus', (req, res) => {

                collection_access_list.find().toArray(function(err, result) {
                    if(result != null){
                        console.log(result);

                        res.status(200).send(JSON.stringify(result))

                    } else {
                        res.status(400).send()
                    }
                })

            })

            app.post('/addAccessByCensus', (req, res) => {

                const newList = new aList({
                    device: req.body.device,
                    qty:req.body.qty,
                    hours:req.body.hours,
                    power:req.body.power,
                    kDay:req.body.kDay

                });
                collection_access_list.insertOne(newList, (err, result) => {

                    res.status(200).send(JSON.stringify(result))
                })

            })


        }

    });




});

