const express = require("express");
const app = express();

const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const { queue, getActiveJobs, getJobsById, addJobToQueueById, getJobByJobIds, findExistingJob, addToQueue } = require("./helper.js");

const { Agent, setGlobalDispatcher } = require("undici");
const agent = new Agent({
  connect: {
    rejectUnauthorized: false,
  },
});

const testPromiseError = async () => {
  try {
    return new Promise((resolve, reject) => {
      try {
        if (1 != 1) {
          throw Error("Condidtion did not match");
        }
        resolve("Resolved well");
      } catch (err) {
        console.log("Reached catch block!");
        reject(err);
      }
    });
  } catch (err) {
    console.log("Another error block!");
  }
};

// testPromiseError()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err)
//     console.log(err.message);
//   });

const addMultiQueue = () => {
  console.log("Inside add multiQueue!");
  addToQueue();
  // addToQueue();
  // findExistingJob()
  // getJobByJobIds("randomJob123");
  // addJobToQueueById({data: 'tusahr'});
};

queue.process(async (job) => {
  console.log("Inside queue ", job.data.queueId);
  console.log("Job Id ", job.id);
  console.log("attempt ", job.attemptsMade);
  return new Promise(async (resolve, reject) => {
    try {
      const value = await fetchDataWithRetry(job.id);
      if (value == true) {
        console.log("Resolved!");
        resolve();
      }
    } catch (err) {
      console.error("Error processing job:", err);
      reject(err);
    }
  });
});

async function fetchDataWithRetry(id, attempt = 1) {
  if (attempt < 7) {
    const delay = 5000; // Every 7 seconds
    console.log(`Desired result not found  for ${id}. Retrying in ${delay}ms (attempt ${attempt}/20)...`);
    return await new Promise((resolve) => setTimeout(resolve, delay)).then(() => fetchDataWithRetry(id, attempt + 1));
  } else {
    console.log("Complete! ", id);
    return true;
  }
}
setGlobalDispatcher(agent);

app.use(express.json());
app.use(cors());
app.use(session({ secret: "Secret_Key" }));
require("dotenv").config();

app.use(bodyParser.text());
const route = require("./route.js");
app.use("/", route);

app.listen(3000, () => {
  addMultiQueue();
  console.log("app.js is listening on port 3000");
});
