const express = require('express'),
    app = express(),
    cors = require('cors'),
    connectMongoDb = require('./db'),
    Status = require('./models/Status'),
    User = require('./models/User'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    { body, validationResult } = require('express-validator'),
    mid_val = require('./middleware/validation');


connectMongoDb();
require('dotenv').config()

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());

app.post('/createUser', [
    body('name', 'name shoud of min 3 characters').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('username', 'enter a valid username').isLength({ min: 7 }),
    body('password', 'Minimum 5 characters required').isLength({ min: 5 })],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        try {
            let salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                username: req.body.username
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            success = true;
            res.json({ success: true, authToken });
        }
        catch (error) {
            res.status(500).send('some error occured,' + error.message);
        }
    })

app.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password is empty').not().isEmpty()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).send({ success: false, error: 'Invalid Credentials' });
        let passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) return res.status(400).json({ success: false, error: 'Invalid Credentials' });
        const data = {
            user: {
                id: user.id
            }
        }
        let authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ success: true, authToken });
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
})

app.get('/fetchAllStatus', mid_val, async (req, res) => {
    try {
        const fetched_status = [];
        const foundUser = await User.findById(req.user.id);
        console.log(foundUser)
        foundUser.followers.map(async (follower) => {
            const foundStatus = await Status.findOne({ author: follower });
            fetched_status.push(foundStatus);
        });
        res.send(fetched_status);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
});

app.post('/addStatus', mid_val, async (req, res) => {
    try {
        const { title, desc } = req.body;
        const author = req.user.id;
        const addedStatus = await Status.create({ title, desc, author });
        res.send(addedStatus);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
});

app.put('/update_status/:statusId', async (req, res) => {
    try {
        const { title, desc } = req.body;
        const updatedSchema = Status.findByIdAndUpdate(req.params.statusId, { title, desc }, { new: true });
        res.send(updatedSchema);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
});

app.delete('/deleteStatus/:statusId', async (req, res) => {
    try {
        const deletedStatus = Status.findByIdAndDelete(req.params.statusId);
        res.send(deletedStatus);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
});

app.post('/searchUser/:username', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
});


app.listen(5000, () => {
    console.log('Up and healthy');
})