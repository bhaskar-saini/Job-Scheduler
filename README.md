# Job Scheduler API (Node.js + Express + node-cron)

A simple, file-based job scheduler built with Node.js, Express, and `node-cron`. This app allows you to schedule time-based tasks (hourly, daily, weekly) with persistence using a `jobs.json` file and jobLogs file.

## Features

- Schedule jobs via HTTP `POST` request
- Supports **hourly**, **daily**, and **weekly** scheduling
- Executes simple actions like logging "Hello World!"
- Store all jobs in `jobs.json`
- Logs each job execution to both the console and `job_logs.txt`

---

## Tech Stack

- Node.js
- Express.js
- node-cron
- body-parser
- fs (File System)

---

## Supported JSON API Format (please include based on comments only)
```
{
  "type": "daily",
  "time": "14:30",              // Required for "daily" and "weekly"
  "minute": "15",               // Required only for "hourly"
  "day": "Monday",              // Required only for "weekly"
  "action": "print_hello"
}
```
## How to Run the Project

Clone the repo

```
npm install
cd backend
node server.js 
```
Use Postman for API testing.

