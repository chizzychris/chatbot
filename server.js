const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/data', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'intents.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading data file' });
        }
        res.json(JSON.parse(data).intents);
    });
});

app.post('/saveData', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'intents.json');
    
    const newData = { intents: req.body };
    const jsonData = JSON.stringify(newData, null, 2);
    
    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving data' });
        }
        res.json({ message: 'Data saved successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
