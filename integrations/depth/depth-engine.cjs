"use strict";
const os = require("node:os");

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function validateImage(image) {
  const { w, h, pixels } = image || {};
  if (!Number.isInteger(w) || !Number.isInteger(h) || w < 1 || h < 1 ||
      w > 1600 || h > 1600 || !(pixels instanceof Uint8Array || pixels instanceof Uint8ClampedArray) ||
      pixels.length !== w * h * 4) throw new Error("Invalid source image");
}

function prepareInput(image, target = 518) {
  validateImage(image);
  const { w, h, pixels } = image;
  target = target === 392 ? 392 : 518;
  const scale = Math.min(target / Math.min(w, h), target * 2 / Math.max(w, h));
  const width = Math.max(14, Math.round(w * scale / 14) * 14);
  const height = Math.max(14, Math.round(h * scale / 14) * 14);
  const plane = width * height, input = new Float32Array(plane * 3);
  const mean = [.485, .456, .406], std = [.229, .224, .225];
  for (let y = 0; y < height; y++) {
    const sy = clamp((y + .5) * h / height - .5, 0, h - 1);
    const y0 = Math.floor(sy), y1 = Math.min(y0 + 1, h - 1), fy = sy - y0;
    for (let x = 0; x < width; x++) {
      const sx = clamp((x + .5) * w / width - .5, 0, w - 1);
      const x0 = Math.floor(sx), x1 = Math.min(x0 + 1, w - 1), fx = sx - x0;
      const offsets = [(y0 * w + x0) * 4, (y0 * w + x1) * 4, (y1 * w + x0) * 4, (y1 * w + x1) * 4];
      for (let c = 0; c < 3; c++) {
        const rgb = offsets.map(i => pixels[i + c] / 255 * (pixels[i + 3] / 255) + 1 - pixels[i + 3] / 255);
        const value = (rgb[0] * (1 - fx) + rgb[1] * fx) * (1 - fy) + (rgb[2] * (1 - fx) + rgb[3] * fx) * fy;
        input[c * plane + y * width + x] = (value - mean[c]) / std[c];
      }
    }
  }
  return { input, width, height };
}

function normalizeDepth(values, w, h) {
  if (values.length !== w * h) throw new Error("Unexpected depth output dimensions");
  const sorted = Float32Array.from(values).sort();
  for (const v of sorted) if (!Number.isFinite(v)) throw new Error("Depth output is not finite");
  const low = sorted[Math.floor((sorted.length - 1) * .01)];
  const high = sorted[Math.ceil((sorted.length - 1) * .99)];
  const field = new Float32Array(values.length), range = high - low;
  if (range > 1e-8) for (let i = 0; i < field.length; i++) field[i] = clamp((values[i] - low) / range, 0, 1);
  return { field, w, h };
}

async function createDepthEngine(modelPath, progress = () => {}) {
  progress("loading");
  const ort = require("onnxruntime-node");
  const session = await ort.InferenceSession.create(modelPath, {
    executionProviders:["cpu"],
    graphOptimizationLevel:"all",
    intraOpNumThreads:Math.min(4, Math.max(1, os.availableParallelism?.() || os.cpus().length)),
    interOpNumThreads:1,
    executionMode:"sequential"
  });
  return {
    async infer(image, target) {
      const started = Date.now();
      progress("preparing");
      const { input, width, height } = prepareInput(image, target);
      progress("inference");
      const tensor = new ort.Tensor("float32", input, [1, 3, height, width]);
      let outputs;
      try { outputs = await session.run({ [session.inputNames[0]]:tensor }); }
      finally { tensor.dispose(); }
      progress("finishing");
      const prediction = outputs[session.outputNames[0]];
      const dims = prediction.dims, h = dims[dims.length - 2], w = dims[dims.length - 1];
      try { return { ...normalizeDepth(prediction.data, w, h), elapsedMs:Date.now() - started }; }
      finally { for (const output of Object.values(outputs)) output.dispose(); }
    },
    release:() => session.release()
  };
}

module.exports = { validateImage, prepareInput, normalizeDepth, createDepthEngine };
