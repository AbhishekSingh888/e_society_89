const express = require('express'),
    app = express(),
    cors = require('cors'),
    connectMongoDb = require('./db'),
    Status = require('./models/Status'),
    User = require('./models/User'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    { body, validationResult } = require('express-validator');


connectMongoDb();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());

app.post('/createuser', [
    body('name', 'name shoud of min 3 characters').isLength({ min: 3 }), //check using express=validator
    body('email', 'enter a valid email').isEmail(), //check using express=validator
    body('password', 'Minimum 5 characters required').isLength({ min: 5 })], //check using express=validator
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() }); //return error + json
        }
        try {
            let salt = await bcrypt.genSalt(10); //generates salt 
            const secPass = await bcrypt.hash(req.body.password, salt); //generates hashed password
            //user is added to databse using .create()
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            //setting up authToken
            const data = {
                user: {
                    id: user.id
                }
            }
            //auth token is generated using data and secret string
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            success = true;
            res.json({ success, authToken });//here using es6 authtoken is being send
        }
        catch (error) {
            res.status(500).send('some error occured,' + error.message);
        }
    })

router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password is empty').not().isEmpty()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body; //destructuring email and pass from req.body
    try {
        // finding user from req.body.email from database
        let user = await User.findOne({ email });
        if (!user) return res.status(400).send({ success, error: 'Invalid Credentials' });
        //after finding user, we are verifying req.body.password(hash) from password hash from database
        let passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) return res.status(400).json({ success, error: 'Invalid Credentials' });
        //setting up jwt using user id 
        const data = {
            user: {
                id: user.id
            }
        }
        let authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
})

app.post('/create_status', async (req, res) => {
    try {
        const { title, desc } = req.body;
        const addedStatus = Status.create({ title, desc });
        res.send(addedStatus);
    } catch (error) {

    }
});

app.put('/update_status/:statusId', async (req, res) => {
    try {
        const { title, desc } = req.body;
        const updatedSchema = Status.findByIdAndUpdate(req.params.statusId, { title, desc }, { new: true });
        res.send(updatedSchema);
    } catch (error) {

    }
});

app.delete('/delete_status/:statusId', async (req, res) => {
    try {
        const deletedStatus = Status.findByIdAndDelete(req.params.statusId);
        res.send(deletedStatus);
    } catch (error) {

    }
});

app.post('/search_user/:username', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});


app.listen(5000, () => {
    console.log('Up and healthy');
})