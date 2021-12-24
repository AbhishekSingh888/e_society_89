const express = require('express'),
    app = express(),
    cors = require('cors'),
    connectMongoDb = require('./db'),
    Status = require('./models/Status'),
    User = require('./models/User');


connectMongoDb();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());

app.post('/login', async (req, res) => {

});

app.post('/signup', async (req, res) => {

});

app.post('/create_status', async (req, res) => {
    const { title, desc } = req.body;
    const addedStatus = Status.create({ title, desc });
    res.send(addedStatus);
});

app.put('/update_status/:statusId', async (req, res) => {
    const { title, desc } = req.body;
    const updatedSchema = Status.findByIdAndUpdate(req.params.statusId, { title, desc }, { new: true });
    res.send(updatedSchema);
});

app.delete('/delete_status/:statusId', async (req, res) => {
    const deletedStatus = Status.findByIdAndDelete(req.params.statusId);
    res.send(deletedStatus);
});

app.post('/search_user/:username', async (req, res) => {

});


app.listen(5000, () => {
    console.log('Up and healthy');
})