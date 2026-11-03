
"use strict";
function createReliefCore() {
  const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
  function smoothField(input, w, h, radius) {
    if (!radius) return input;
    const temp = new Float32Array(input.length), out = new Float32Array(input.length);
    const n = radius * 2 + 1;
    for (let y = 0; y < h; y++) {
      let sum = 0;
      for (let k = -radius; k <= radius; k++) sum += input[y * w + clamp(k, 0, w - 1)];
      for (let x = 0; x < w; x++) {
        temp[y * w + x] = sum / n;
        sum += input[y * w + clamp(x + radius + 1, 0, w - 1)] - input[y * w + clamp(x - radius, 0, w - 1)];
      }
    }
    for (let x = 0; x < w; x++) {
      let sum = 0;
      for (let k = -radius; k <= radius; k++) sum += temp[clamp(k, 0, h - 1) * w + x];
      for (let y = 0; y < h; y++) {
        out[y * w + x] = sum / n;
        sum += temp[clamp(y + radius + 1, 0, h - 1) * w + x] - temp[clamp(y - radius, 0, h - 1) * w + x];
      }
    }
    return out;
  }
  function process(pixels, w, h, p) {
    let field = new Float32Array(w * h);
    const contrast = Math.pow(2, p.contrast / 45), brightness = p.brightness / 100;
    for (let i = 0; i < field.length; i++) {
      const j = i * 4, a = pixels[j + 3] / 255;
      const luminance = ((0.2126 * pixels[j] + 0.7152 * pixels[j + 1] + 0.0722 * pixels[j + 2]) / 255) * a + 1 - a;
      field[i] = Math.pow(clamp((luminance - 0.5) * contrast + 0.5 + brightness), 1 / p.gamma);
    }
    field = smoothField(field, w, h, Math.round(p.blur));
    let min = 1, max = 0;
    for (let y = 0; y < h; y++) {
      if (p.mirror) {
        for (let x = 0; x < Math.floor(w / 2); x++) {
          const a = y * w + x, b = y * w + w - 1 - x, v = field[a];
          field[a] = field[b]; field[b] = v;
        }
      }
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        let value = clamp(field[i]);
        if (p.depthMode === "threshold") value = value >= p.threshold / 255 ? 1 : 0;
        if (p.invert) value = 1 - value;
        field[i] = value; min = Math.min(min, value); max = Math.max(max, value);
      }
    }
    return { field, w, h, min, max };
  }
  function processDepth(depth, source, p) {
    const scale = Math.min(1, 1024 / Math.max(source.w, source.h));
    const w = Math.max(1, Math.round(source.w * scale)), h = Math.max(1, Math.round(source.h * scale));
    let field = new Float32Array(w * h);
    const light = new Float32Array(w * h), mask = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x, u = w > 1 ? x / (w - 1) : .5, v = h > 1 ? y / (h - 1) : .5;
      field[i] = sample(depth, u, v);
      const j = (Math.round(v * (source.h - 1)) * source.w + Math.round(u * (source.w - 1))) * 4;
      light[i] = (source.pixels[j] * .2126 + source.pixels[j + 1] * .7152 + source.pixels[j + 2] * .0722) / 255;
      mask[i] = light[i] < .065 || source.pixels[j + 3] < 24 ? 1 : 0;
    }
    const smooth = clamp((p.depthSmooth ?? 25) / 100);
    if (smooth) {
      // Self-guided filtering smooths noise without using photo shading as geometry.
      const radius = Math.max(1, Math.round(Math.max(w, h) / 160));
      const mean = smoothField(field, w, h, radius), squared = Float32Array.from(field, x => x * x);
      const corr = smoothField(squared, w, h, radius), a = new Float32Array(field.length), b = new Float32Array(field.length);
      for (let i = 0; i < field.length; i++) {
        const variance = Math.max(0, corr[i] - mean[i] * mean[i]);
        a[i] = variance / (variance + .0006); b[i] = mean[i] * (1 - a[i]);
      }
      const ma = smoothField(a, w, h, radius), mb = smoothField(b, w, h, radius);
      field = Float32Array.from(field, (x, i) => x * (1 - smooth) + (ma[i] * x + mb[i]) * smooth);
    }
    const detail = clamp((p.depthDetail ?? 8) / 100), blurred = detail ? smoothField(light, w, h, Math.max(1, Math.round(Math.max(w, h) / 200))) : null;
    const background = new Uint8Array(field.length);
    if (p.blackBackground) {
      // Only flood-fill dark pixels connected to the image border; dark interior details remain.
      const queue = new Uint32Array(field.length); let read = 0, write = 0;
      const visit = i => { if (mask[i] && !background[i]) { background[i] = 1; queue[write++] = i; } };
      for (let x = 0; x < w; x++) { visit(x); visit((h - 1) * w + x); }
      for (let y = 0; y < h; y++) { visit(y * w); visit(y * w + w - 1); }
      while (read < write) {
        const i = queue[read++], x = i % w;
        if (x) visit(i - 1); if (x + 1 < w) visit(i + 1);
        if (i >= w) visit(i - w); if (i + w < field.length) visit(i + w);
      }
    }
    const floor = clamp((p.depthFloor ?? 8) / 100, 0, .8), volume = clamp((p.depthVolume ?? 100) / 100, 0, 1.5);
    let min = 1, max = 0;
    for (let i = 0; i < field.length; i++) {
      let value = p.invert ? 1 - field[i] : field[i];
      value = clamp((value - floor) / (1 - floor));
      if (floor) value *= Math.min(1, value / .035);
      value = Math.pow(value, 1 / (p.depthCurve || 1)) * volume;
      if (detail) value += (light[i] - blurred[i]) * detail * Math.min(1, value * 12);
      field[i] = background[i] ? 0 : clamp(value);
      min = Math.min(min, field[i]); max = Math.max(max, field[i]);
    }
    if (p.mirror) for (let y = 0; y < h; y++) for (let x = 0; x < Math.floor(w / 2); x++) {
      const a = y * w + x, b = y * w + w - 1 - x, value = field[a]; field[a] = field[b]; field[b] = value;
    }
    return { field, w, h, min, max };
  }
  function sample(data, u, v, nearest = false) {
    const x = clamp(u) * (data.w - 1), y = clamp(v) * (data.h - 1);
    if (nearest) return data.field[Math.round(y) * data.w + Math.round(x)];
    const x0 = Math.floor(x), y0 = Math.floor(y), x1 = Math.min(x0 + 1, data.w - 1), y1 = Math.min(y0 + 1, data.h - 1);
    const a = x - x0, b = y - y0;
    return (data.field[y0 * data.w + x0] * (1 - a) + data.field[y0 * data.w + x1] * a) * (1 - b)
      + (data.field[y1 * data.w + x0] * (1 - a) + data.field[y1 * data.w + x1] * a) * b;
  }
  function plan(p, resolution = p.density ?? p.quality ?? 192) {
    resolution = clamp(Math.round(resolution), 16, 768);
    if (p.mode === "medal" && p.medalShape === "round") {
      const segments = Math.floor(resolution / 2) * 2, rings = segments / 2;
      const vertices = (1 + segments * rings) * 2, triangles = 4 * segments * rings;
      const quads = segments * (2 * rings - 1);
      return { nx:segments, ny:rings, cols:segments + 1, vertices, triangles, quads, centerTriangles:segments * 2, bytes:84 + triangles * 50, cylinder:false, full:true, width:p.medalDiameter, height:p.medalDiameter, resolution, radial:true, segments, rings };
    }
    const cylinder = p.mode === "cylinder", full = cylinder && p.arc === 360;
    const width = p.mode === "medal" ? p.medalDiameter : cylinder ? Math.PI * p.diameter * p.arc / 360 : p.width;
    const height = p.mode === "medal" ? p.medalDiameter : cylinder ? p.cylinderHeight : p.height;
    const longest = Math.max(width, height);
    const segments = p.mode === "medal" ? Math.floor(resolution / 2) * 2 : resolution;
    const nx = Math.max(cylinder ? (full ? 24 : 8) : 2, Math.round(segments * width / longest));
    const ny = Math.max(2, Math.round(segments * height / longest));
    const cols = full ? nx : nx + 1, vertices = cols * (ny + 1) * 2;
    const triangles = 4 * nx * ny + 4 * nx + (full ? 0 : 4 * ny);
    return { nx, ny, cols, vertices, triangles, quads:triangles / 2, bytes:84 + triangles * 50, cylinder, full, width, height, resolution };
  }
  function surfaceField(data, p) {
    const amount = clamp((p.surfaceSmooth ?? 0) / 100);
    if (!amount) return data;
    const radius = clamp(Math.round(Math.max(data.w, data.h) / 250), 1, 6);
    const blurred = smoothField(data.field, data.w, data.h, radius), field = new Float32Array(data.field.length);
    for (let i = 0; i < field.length; i++) field[i] = data.field[i] * (1 - amount) + blurred[i] * amount;
    return { ...data, field };
  }
  function medalXY(p, u, v) {
    const x = u * 2 - 1, y = v * 2 - 1;
    return p.medalShape === "square" ? [x, y] : [x * Math.sqrt(1 - y * y / 2), y * Math.sqrt(1 - x * x / 2)];
  }
  function smoothStep(a, b, x) { const t = clamp((x - a) / Math.max(1e-8, b - a)); return t * t * (3 - 2 * t); }
  function medalSurface(data, p, x, y) {
    const aspect = data.w / data.h, scale = (p.photoScale ?? 90) / 100;
    const extentX = scale * Math.min(1, aspect), extentY = scale * Math.min(1, 1 / aspect);
    const su = .5 + (x - (p.photoX || 0) / 50) / (2 * extentX);
    const sv = .5 - (y - (p.photoY || 0) / 50) / (2 * extentY);
    let value = su < 0 || su > 1 || sv < 0 || sv > 1 ? 0 : sample(data, su, sv);
    const radius = p.medalShape === "square" ? Math.max(Math.abs(x), Math.abs(y)) : Math.hypot(x, y);
    const distance = Math.max(0, (1 - radius) * p.medalDiameter / 2);
    const rim = Math.min(p.rimWidth || 0, p.medalDiameter * .2), bevel = Math.min(.35, rim / 3);
    value *= smoothStep(rim, rim + .7, distance);
    const border = rim ? (p.rimHeight || 0) * smoothStep(0, bevel, distance) * (1 - smoothStep(rim - bevel, rim + bevel, distance)) : 0;
    return (value * p.relief + border) / Math.max(p.relief, p.rimHeight || 0, 1);
  }
  function surfaceSample(data, p, u, v) {
    if (p.mode === "medal") {
      const [x, y] = medalXY(p, u, v);
      return medalSurface(data, p, x, y);
    }
    const nearest = p.depthMode === "threshold" && !(p.surfaceSmooth > 0);
    let height = sample(data, u, 1 - v, nearest);
    if (p.mode === "cylinder" && p.arc === 360 && p.seam > 0) {
      const extent = p.seam / 100, distance = Math.min(u, 1 - u);
      if (distance < extent) {
        const seam = (sample(data, 0, 1 - v, nearest) + sample(data, 1, 1 - v, nearest)) / 2;
        const t = distance / extent, smooth = t * t * (3 - 2 * t);
        height = seam * (1 - smooth) + height * smooth;
      }
    }
    return height;
  }
  function quantiles(weights, count) {
    const cdf = new Float64Array(weights.length);
    for (let i = 1; i < weights.length; i++) cdf[i] = cdf[i - 1] + (weights[i - 1] + weights[i]) / 2;
    const out = new Float32Array(count + 1), total = cdf[cdf.length - 1];
    out[count] = 1;
    let cell = 1;
    for (let i = 1; i < count; i++) {
      const target = total * i / count;
      while (cell < cdf.length - 1 && cdf[cell] < target) cell++;
      const fraction = (target - cdf[cell - 1]) / (cdf[cell] - cdf[cell - 1]);
      out[i] = (cell - 1 + fraction) / (weights.length - 1);
    }
    return out;
  }
  function parameterGrid(data, p, info) {
    const { nx, ny, cols, width, height } = info;
    const u = new Float32Array(cols * (ny + 1)), v = new Float32Array(ny + 1);
    for (let y = 0; y <= ny; y++) { v[y] = y / ny; for (let x = 0; x < cols; x++) u[y * cols + x] = x / nx; }
    const strength = clamp((p.adaptivity ?? 65) / 100);
    if (p.topology !== "adaptive" || !strength || !p.relief) return { u, v };
    const longest = Math.max(width, height);
    const w = Math.max(24, Math.round(224 * width / longest)), h = Math.max(24, Math.round(224 * height / longest));
    const energy = new Float32Array(w * h);
    let total = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const a = x / (w - 1), b = y / (h - 1), du = 1 / (w - 1), dv = 1 / (h - 1);
      const at = (s, t) => surfaceSample(data, p, clamp(s), clamp(t));
      const center = at(a, b), left = at(a - du, b), right = at(a + du, b), down = at(a, b - dv), up = at(a, b + dv);
      const value = Math.hypot(right - left, up - down) / 2 + 1.5 * Math.abs(left + right + down + up - 4 * center);
      energy[y * w + x] = value; total += value;
    }
    if (total < 1e-7) return { u, v };
    const filtered = smoothField(energy, w, h, 2), average = total / energy.length;
    const importance = { field:new Float32Array(w * h), w, h }, rowWeights = new Float32Array(h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        importance.field[i] = 1 + 6 * strength * Math.min(1, Math.sqrt(filtered[i] / (average * 5 + 1e-9)));
        rowWeights[y] += importance.field[i] / w;
      }
    }
    v.set(quantiles(rowWeights, ny));
    const line = new Float32Array(w);
    for (let y = 0; y <= ny; y++) {
      for (let x = 0; x < w; x++) line[x] = sample(importance, x / (w - 1), v[y]);
      const distribution = quantiles(line, nx);
      for (let x = 0; x < cols; x++) u[y * cols + x] = distribution[x];
    }
    // Relax whole monotone rows. Convex combinations preserve ordering and avoid folded UV cells.
    const iterations = clamp(Math.round(p.relax ?? 4), 0, 12), temp = new Float32Array(u.length);
    for (let pass = 0; pass < iterations; pass++) {
      for (let y = 0; y <= ny; y++) for (let x = 0; x < cols; x++) {
        const i = y * cols + x, up = Math.min(y + 1, ny) * cols + x, down = Math.max(y - 1, 0) * cols + x;
        temp[i] = .58 * u[i] + .21 * (u[up] + u[down]);
      }
      u.set(temp);
    }
    return { u, v };
  }
  function mesh(data, p, resolution = p.density ?? p.quality ?? 192) {
    const info = plan(p, resolution), { nx, ny, cols, vertices, triangles, cylinder, full } = info;
    if (info.radial) return meshRoundMedal(data, p, info);
    const layer = cols * (ny + 1), positions = new Float32Array(vertices * 3), levels = new Float32Array(vertices);
    const indices = new Uint32Array(triangles * 3), quads = new Uint32Array(info.quads * 4), angle = p.arc * Math.PI / 180;
    const bounds = { min:[Infinity, Infinity, Infinity], max:[-Infinity, -Infinity, -Infinity] };
    data = surfaceField(data, p);
    const grid = parameterGrid(data, p, info);
    const get = (x, y, side = 0) => side * layer + y * cols + (x % cols);
    let minThickness = Infinity, maxThickness = 0;
    for (let y = 0; y <= ny; y++) {
      const v = grid.v[y];
      for (let x = 0; x < cols; x++) {
        const u = grid.u[y * cols + x], height = surfaceSample(data, p, u, v);
        const thickness = p.base + (p.mode === "medal" ? Math.max(p.relief, p.rimHeight || 0, 1) : p.relief) * height;
        minThickness = Math.min(minThickness, thickness); maxThickness = Math.max(maxThickness, thickness);
        for (let side = 0; side < 2; side++) {
          const i = get(x, y, side), j = i * 3;
          if (cylinder) {
            const theta = u * angle - angle / 2, r = p.diameter / 2 + (side ? 0 : thickness);
            positions[j] = Math.sin(theta) * r; positions[j + 1] = -Math.cos(theta) * r;
            positions[j + 2] = v * p.cylinderHeight;
          } else {
            if (p.mode === "medal") {
              const xy = medalXY(p, u, v);
              positions[j] = xy[0] * p.medalDiameter / 2; positions[j + 1] = xy[1] * p.medalDiameter / 2;
            } else {
              positions[j] = (u - 0.5) * p.width; positions[j + 1] = (v - 0.5) * p.height;
            }
            positions[j + 2] = side ? 0 : thickness;
          }
          levels[i] = side ? 0.25 : height;
          for (let axis = 0; axis < 3; axis++) {
            bounds.min[axis] = Math.min(bounds.min[axis], positions[j + axis]);
            bounds.max[axis] = Math.max(bounds.max[axis], positions[j + axis]);
          }
        }
      }
    }
    let cursor = 0, quadCursor = 0;
    function tri(a, b, c) { indices[cursor++] = a; indices[cursor++] = b; indices[cursor++] = c; }
    function quad(a, b, c, d, alternate = false) {
      quads[quadCursor++] = a; quads[quadCursor++] = b; quads[quadCursor++] = c; quads[quadCursor++] = d;
      if (alternate) { tri(a, b, c); tri(a, c, d); }
      else { tri(a, b, d); tri(b, c, d); }
    }
    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        const a = get(x, y), b = get(x + 1, y), c = get(x + 1, y + 1), d = get(x, y + 1);
        let alternate = false;
        if (p.topology === "adaptive") {
          const right = x + 1 === nx ? 1 : grid.u[y * cols + x + 1];
          const upperRight = x + 1 === nx ? 1 : grid.u[(y + 1) * cols + x + 1];
          const left = grid.u[y * cols + x], upperLeft = grid.u[(y + 1) * cols + x];
          const t = (right - left) / (right - left + upperRight - upperLeft);
          const center = surfaceSample(data, p, left + (upperRight - left) * t, grid.v[y] + (grid.v[y + 1] - grid.v[y]) * t);
          const acError = Math.abs(levels[a] * (1 - t) + levels[c] * t - center), bdError = Math.abs(levels[b] * (1 - t) + levels[d] * t - center);
          alternate = Math.abs(acError - bdError) < 1e-6 ? (x + y) % 2 === 0 : acError < bdError;
        }
        quad(a, b, c, d, alternate);
        quad(a + layer, d + layer, c + layer, b + layer, alternate);
      }
    }
    function edge(a, b) { quad(a, a + layer, b + layer, b); }
    for (let x = 0; x < nx; x++) { edge(get(x, 0), get(x + 1, 0)); edge(get(x + 1, ny), get(x, ny)); }
    if (!full) {
      for (let y = 0; y < ny; y++) { edge(get(nx, y), get(nx, y + 1)); edge(get(0, y + 1), get(0, y)); }
    }
    if (cursor !== indices.length || quadCursor !== quads.length) throw new Error("模型网格数量校验失败");
    return { positions, indices, quads, levels, bounds, minThickness, maxThickness, info };
  }
  function meshRoundMedal(data, p, info) {
    data = surfaceField(data, p);
    const segments = info.segments, rings = info.rings, layer = 1 + segments * rings;
    const positions = new Float32Array(info.vertices * 3), levels = new Float32Array(info.vertices);
    const indices = new Uint32Array(info.triangles * 3), quads = new Uint32Array(info.quads * 4);
    const objTriangles = new Uint32Array(info.centerTriangles * 3), radius = p.medalDiameter / 2;
    const scale = Math.max(p.relief, p.rimHeight || 0, 1);
    const bounds = { min:[Infinity, Infinity, Infinity], max:[-Infinity, -Infinity, -Infinity] };
    const top = (ring, segment) => ring ? 1 + (ring - 1) * segments + segment % segments : 0;
    const bottom = (ring, segment) => layer + top(ring, segment);
    const put = (i, x, y, z, level) => {
      positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z; levels[i] = level;
      bounds.min[0] = Math.min(bounds.min[0], x); bounds.min[1] = Math.min(bounds.min[1], y); bounds.min[2] = Math.min(bounds.min[2], z);
      bounds.max[0] = Math.max(bounds.max[0], x); bounds.max[1] = Math.max(bounds.max[1], y); bounds.max[2] = Math.max(bounds.max[2], z);
    };
    let minThickness = Infinity, maxThickness = 0;
    const centerHeight = medalSurface(data, p, 0, 0), centerThickness = p.base + scale * centerHeight;
    put(top(0, 0), 0, 0, centerThickness, centerHeight); put(bottom(0, 0), 0, 0, 0, .25);
    minThickness = centerThickness; maxThickness = centerThickness;
    for (let ring = 1; ring <= rings; ring++) {
      const r = radius * ring / rings;
      for (let segment = 0; segment < segments; segment++) {
        const angle = segment / segments * Math.PI * 2, x = Math.cos(angle) * r, y = Math.sin(angle) * r;
        const height = medalSurface(data, p, x / radius, y / radius), thickness = p.base + scale * height;
        minThickness = Math.min(minThickness, thickness); maxThickness = Math.max(maxThickness, thickness);
        put(top(ring, segment), x, y, thickness, height); put(bottom(ring, segment), x, y, 0, .25);
      }
    }
    let cursor = 0, quadCursor = 0, objCursor = 0;
    const tri = (a, b, c) => { indices[cursor++] = a; indices[cursor++] = b; indices[cursor++] = c; };
    const objTri = (a, b, c) => { objTriangles[objCursor++] = a; objTriangles[objCursor++] = b; objTriangles[objCursor++] = c; };
    const quad = (a, b, c, d) => {
      quads[quadCursor++] = a; quads[quadCursor++] = b; quads[quadCursor++] = c; quads[quadCursor++] = d;
      tri(a, b, d); tri(b, c, d);
    };
    for (let segment = 0; segment < segments; segment++) {
      const next = (segment + 1) % segments;
      tri(top(0, 0), top(1, segment), top(1, next)); objTri(top(0, 0), top(1, segment), top(1, next));
      tri(bottom(0, 0), bottom(1, next), bottom(1, segment)); objTri(bottom(0, 0), bottom(1, next), bottom(1, segment));
    }
    for (let ring = 1; ring < rings; ring++) for (let segment = 0; segment < segments; segment++) {
      const next = (segment + 1) % segments;
      quad(top(ring, next), top(ring, segment), top(ring + 1, segment), top(ring + 1, next));
      quad(bottom(ring, segment), bottom(ring, next), bottom(ring + 1, next), bottom(ring + 1, segment));
    }
    const outer = ring => ring === rings ? ring : ring;
    for (let segment = 0; segment < segments; segment++) {
      const next = (segment + 1) % segments;
      quad(top(outer(rings), next), top(outer(rings), segment), bottom(outer(rings), segment), bottom(outer(rings), next));
    }
    if (cursor !== indices.length || quadCursor !== quads.length || objCursor !== objTriangles.length) throw new Error("纪念章网格数量校验失败");
    return { positions, indices, quads, objTriangles, levels, bounds, minThickness, maxThickness, info };
  }
  function stl(model, mode) {
    const count = model.indices.length / 3, buffer = new ArrayBuffer(84 + count * 50), view = new DataView(buffer);
    const header = "Relief Lab | millimeter dimensions | " + mode;
    for (let i = 0; i < Math.min(header.length, 80); i++) view.setUint8(i, header.charCodeAt(i));
    view.setUint32(80, count, true);
    const p = model.positions, idx = model.indices;
    for (let face = 0; face < count; face++) {
      const a = idx[face * 3] * 3, b = idx[face * 3 + 1] * 3, c = idx[face * 3 + 2] * 3;
      const ux = p[b] - p[a], uy = p[b + 1] - p[a + 1], uz = p[b + 2] - p[a + 2];
      const vx = p[c] - p[a], vy = p[c + 1] - p[a + 1], vz = p[c + 2] - p[a + 2];
      const normal = [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];
      const length = Math.hypot(...normal);
      if (!(length > 0)) throw new Error("检测到退化三角形，请调整模型尺寸或精度");
      let offset = 84 + face * 50;
      for (let axis = 0; axis < 3; axis++, offset += 4) view.setFloat32(offset, normal[axis] / length, true);
      for (const point of [a, b, c]) for (let axis = 0; axis < 3; axis++, offset += 4) view.setFloat32(offset, p[point + axis], true);
      view.setUint16(offset, 0, true);
    }
    return buffer;
  }
  function obj(model, p) {
    const parts = ["# Relief Lab | coordinate dimensions in millimeters\n# Quad topology: " + (p.topology === "adaptive" ? "feature-adaptive heightfield" : "uniform") + "\no Relief_Lab\n"];
    let lines = [];
    for (let i = 0; i < model.positions.length; i += 3) {
      lines.push("v " + [0, 1, 2].map(k => Number(model.positions[i + k].toFixed(6))).join(" ") + "\n");
      if (lines.length === 8192) { parts.push(lines.join("")); lines = []; }
    }
    parts.push(lines.join(""), "s 1\n"); lines = [];
    for (let i = 0; i < model.quads.length; i += 4) {
      lines.push(`f ${model.quads[i] + 1} ${model.quads[i + 1] + 1} ${model.quads[i + 2] + 1} ${model.quads[i + 3] + 1}\n`);
      if (lines.length === 8192) { parts.push(lines.join("")); lines = []; }
    }
    if (model.objTriangles) for (let i = 0; i < model.objTriangles.length; i += 3) {
      lines.push(`f ${model.objTriangles[i] + 1} ${model.objTriangles[i + 1] + 1} ${model.objTriangles[i + 2] + 1}\n`);
      if (lines.length === 8192) { parts.push(lines.join("")); lines = []; }
    }
    parts.push(lines.join("")); return parts.join("");
  }
  function rgba(data, limit = 1600, nearest = false) {
    const scale = Math.min(1, limit / Math.max(data.w, data.h)), w = Math.max(1, Math.round(data.w * scale)), h = Math.max(1, Math.round(data.h * scale));
    const pixels = new Uint8ClampedArray(w * h * 4);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const value = Math.round(sample(data, w > 1 ? x / (w - 1) : 0, h > 1 ? y / (h - 1) : 0, nearest) * 255);
      const i = (y * w + x) * 4; pixels[i] = pixels[i + 1] = pixels[i + 2] = value; pixels[i + 3] = 255;
    }
    return { pixels, w, h };
  }
  return { process, processDepth, sample, plan, mesh, stl, obj, rgba };
}
function createTaskProcessor(factory) {
  const core = factory(); let source = null, depth = null, processed = null, signature = "";
  return function(request) {
    if (request.type === "source") {
      source = { pixels:request.pixels, w:request.w, h:request.h }; depth = null; processed = null; signature = "";
      return { type:"source", id:request.id };
    }
    if (request.type === "depth-source") {
      if (!request.field || request.field.length !== request.w * request.h) throw new Error("深度图尺寸无效");
      depth = { field:request.field, w:request.w, h:request.h }; processed = null; signature = "";
      return { type:"depth-source", id:request.id };
    }
    if (!source) throw new Error("请先导入一张图片");
    const p = request.params;
    const key = JSON.stringify([p.brightness, p.contrast, p.gamma, p.blur, p.invert, p.mirror, p.threshold, p.depthMode, p.depthVolume, p.depthCurve, p.depthSmooth, p.depthDetail, p.depthFloor, p.blackBackground]);
    if (signature !== key || !processed) {
      if (p.depthMode === "depth") {
        if (!depth) throw new Error("请先生成或导入形体深度图");
        processed = core.processDepth(depth, source, p);
      } else processed = core.process(source.pixels, source.w, source.h, p);
      signature = key;
    }
    if (request.type === "build") {
      const density = p.density ?? p.quality ?? 192, limit = p.previewLimit || 160;
      return { id:request.id, type:"build", model:core.mesh(processed, p, Math.min(density, limit)), image:core.rgba(processed, 480, p.depthMode === "threshold"), plan:core.plan(p) };
    }
    if (request.type === "depth") return { id:request.id, type:"depth", image:core.rgba(processed, 1600, p.depthMode === "threshold") };
    if (request.type === "export") {
      const model = core.mesh(processed, p);
      const format = request.format === "obj" ? "obj" : "stl";
      const buffer = format === "obj" ? new TextEncoder().encode(core.obj(model, p)).buffer : core.stl(model, p.mode);
      return { id:request.id, type:"export", format, buffer, triangles:model.info.triangles, quads:model.info.quads, centerTriangles:model.info.centerTriangles || 0, bounds:model.bounds, minThickness:model.minThickness, maxThickness:model.maxThickness };
    }
    throw new Error("未知的处理请求");
  };
}
