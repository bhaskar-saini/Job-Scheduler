import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import {scheduleJob} from './scheduler.js';

const app = express();
app.use(bodyParser.json());

const __dirname = path.resolve();
const jobsFile = path.join(__dirname, 'jobs.json');

fs.readFile(jobsFile, 'utf-8', (err, data)=>{
    if (err) {
        console.error('Error reading job file:',err);
        return;
    }
    try {
        const jobs = JSON.parse(data);
        if (Array.isArray(jobs)) {
            jobs.forEach(job => scheduleJob(job));
        }
        else {
            console.error('file must contain array');
        }
    } 
    catch (parseErr) {
        console.error("Error parsing job file:",parseErr);
    }
});

app.get('/', (req,res)=> {
    res.send("server is running");
});

app.post('/schedule', (req, res) => {
    
    const job = req.body;

    fs.readFile(jobsFile, 'utf-8', (err, data) => {
        if (err) {
            console.log('failed to read jobs.json', err);
            return res.status(500).send('failed to read the file');
        }
        
        let jobs = [];
        jobs = JSON.parse(data);
        jobs.push(job);

        fs.writeFile(jobsFile, JSON.stringify(jobs, null, 2), (err) => {
            if(err) {
                console.log('Error saving jobs:', err);
                return res.status(500).send('failed to save job.');
            }

            scheduleJob(job);

            res.send('job scheduled and saved');
        });
    });
});

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});