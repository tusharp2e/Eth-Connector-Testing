const express = require("express");
const router = express.Router();
const { queue, getActiveJobs, getJobsById } = require("./helper.js");
const kalpControllers = require("./kalp/kalpController.js");

router.get("/Read", async (req, res) => {
  getActiveJobs();
  res.send("Reading!");
});

router.post("/Write", kalpControllers.WriteTxToEVMChain);

module.exports = router;
