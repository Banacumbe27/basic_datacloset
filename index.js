const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let users = [];

app.post('/', (req, res) => {
    res.send('Hello! API is running!');
});

app.post('/add', (req, res) => {
    let available=!users.some(u=>u.username===req.body.username);
    if(available) {
    users.push(req.body);
    res.json({ success:true});
    } else {
        res.status(409).json({success:false})
    }

});

app.post('/login/:username/:password', (req, res) => {
    let u_info = users.find(u => u.username === req.params.username && u.password === req.params.password);
    if (u_info) {
        res.json({ success: true});
    } else {
        res.status(404).json({ success: false });
    }
});

app.post('/remove/:username/:password', (req, res) => {
    let index = users.findIndex(u => u.username === req.params.username && u.password === req.params.password);
    if (index === -1) {
        res.status(404).json({ success: false });
    } else {
        users.splice(index, 1);
        res.json({ success: true });
    }
});

app.post('/wipe', (req, res) => {
    users = [];
    res.json({ success: true });
});
app.get('/list',(req,res)=>{
res.json({users});
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
