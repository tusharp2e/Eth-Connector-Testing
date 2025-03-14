const Queue = require("bull");

// Create a Bull queue
const queue = new Queue("myJobQueue", {
  redis: { port: 6379, host: "0.0.0.0" },
});

const getActiveJobs = async () => {
  const existingJobsActive = await queue.getJobs(["active"]);
  const existingJobsWait = await queue.getJobs(["wait"]);
  console.log("Active ", existingJobsActive.map(item=> item.id));
  console.log('Wati', existingJobsWait.map(item=> item.id));
//   return existingJobs;
};

const getJobsById = async (jobId) => {
  const existingJob = await queue.getJob(jobId);
  console.log(existingJob);
};

async function addJobToQueueById(data) {
  try {
    // const jobId = "d15ae000-0524-4607-8028-122119b49152";
    const jobIdGen = "MOCKETH15";

    console.log("JobId ", jobIdGen);
    // Check if a job with the same ID already exists in the queue
    const existingJob = await queue.getJob(jobIdGen);
    console.log("existingJob ", existingJob);
    if (existingJob) {
      console.log(`Job with ID ${jobIdGen} already exists in the queue.`);
      return;
    }

    await queue.add(data, { jobId: jobIdGen });
    console.log(`Job with ID ${jobIdGen} added to queue.`);
  } catch (error) {
    console.error("Error adding job to queue:", error);
  }
}

async function getJobByJobIds(id) {
  console.log("FetchJobByID1")
  const res = await queue.getJob(id);
  console.log(res);
}

async function findExistingJob() {
  // Example: Check if a record with the same data exists in a database
  // const existingJobs = await queue.getJobs(["completed", "delayed", "active", "wait"]);
  const existingJobs = await queue.getJobs(["delayed", "active", "wait"]);
  console.log(existingJobs.length);
  console.log(JSON.stringify(existingJobs));
  console.log(existingJobs.map((item) => item["queue"]));
}

const addToQueue = async () => {
    await queue.add({ queueId: "tushar123" }, {
      attempts: 5, // If job fails it will retry till 5 times
      backoff: 5000 // static 5 sec delay between retry
   });
  };

module.exports = { queue, getActiveJobs, getJobsById, addJobToQueueById, getJobByJobIds, findExistingJob , addToQueue};
