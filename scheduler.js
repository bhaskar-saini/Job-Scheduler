import cron from 'node-cron';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const logFile = path.join(__dirname, 'jobLogs.txt');

function logToFile(log) {
    const timeStamp = new Date().toLocaleString();
    const logMessage = `[${timeStamp}] ${log}\n`;

    fs.appendFile(logFile, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}

export function scheduleJob(job) {
    let cronExpression;

    if (job.type === 'hourly') {
        cronExpression = `0 ${job.minute} * * * *`;
    }
    else if (job.type === 'daily') {
        const [hour, min] = job.time.split(':');
        cronExpression = `0 ${min} ${hour} * * *`;
    }
    else if (job.type === 'weekly') {
        const [hour, min] = job.time.split(':');
        const dayMap = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6
        }

        const day = dayMap[job.day];
        cronExpression = `0 ${min} ${hour} * * ${day}`
    }
    else {
        console.log('invalid job type :',job.type);
        return;
    }

    cron.schedule(cronExpression, () => {
        let logMessage = '';
        if (job.action === 'print_hello') {
            logMessage = `Hello World! from :, ${JSON.stringify(job)}`;
        }
        else {
            logMessage = `Custom action from :, ${JSON.stringify(job)}`;
        }
        console.log(logMessage);
        logToFile(logMessage);
    });

    console.log('scheduled job with cron :', cronExpression);
}