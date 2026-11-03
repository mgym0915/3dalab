"use strict";
const path = require("node:path");
const { Worker } = require("node:worker_threads");
const { validateImage } = require("./depth-engine.cjs");

function createDepthService({ modelPath, onProgress = () => {} }) {
  let worker = null, pending = null;
  function stop(message = "cancelled") {
    const current = worker; worker = null;
    if (pending) { clearTimeout(pending.timer); pending.resolve({ cancelled:true, reason:message }); pending = null; }
    if (current) current.terminate().catch(() => {});
  }
  function ready() {
    if (worker) return;
    const current = worker = new Worker(path.join(__dirname, "depth-worker.cjs"), { workerData:{ modelPath } });
    current.on("message", message => {
      if (worker !== current || !pending || message.id !== pending.id) return;
      if (message.phase) { onProgress({ id:message.id, phase:message.phase }); return; }
      const task = pending; pending = null; clearTimeout(task.timer);
      if (message.error) task.reject(new Error(message.error));
      else task.resolve(message.result);
    });
    current.on("error", error => {
      if (worker !== current) return;
      worker = null;
      if (pending) { clearTimeout(pending.timer); pending.reject(error); pending = null; }
    });
    current.on("exit", code => {
      if (worker !== current) return;
      worker = null;
      if (pending) { clearTimeout(pending.timer); pending.reject(new Error("Depth worker exited: " + code)); pending = null; }
    });
  }
  return {
    estimate({ id, pixels, w, h, target }) {
      validateImage({ pixels, w, h });
      if (typeof id !== "string" || id.length > 100) throw new Error("Invalid depth request");
      if (pending) throw new Error("Depth generation is already running");
      ready();
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => stop("timeout"), 5 * 60 * 1000);
        pending = { id, resolve, reject, timer };
        const bytes = new Uint8ClampedArray(pixels);
        worker.postMessage({ id, image:{ pixels:bytes, w, h }, target }, [bytes.buffer]);
      });
    },
    cancel:() => stop(),
    close:() => stop()
  };
}
module.exports = { createDepthService };
