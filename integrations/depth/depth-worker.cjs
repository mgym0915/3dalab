"use strict";
const { parentPort, workerData } = require("node:worker_threads");
const { createDepthEngine } = require("./depth-engine.cjs");
let engine = null;
parentPort.on("message", async ({ id, image, target }) => {
  try {
    const progress = phase => parentPort.postMessage({ id, phase });
    if (!engine) engine = await createDepthEngine(workerData.modelPath, progress);
    const result = await engine.infer(image, target);
    parentPort.postMessage({ id, result }, [result.field.buffer]);
  } catch (error) {
    parentPort.postMessage({ id, error:String(error.message || error).slice(0, 500) });
  }
});
