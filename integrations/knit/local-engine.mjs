var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/spark-md5@3.0.2/node_modules/spark-md5/spark-md5.js
var require_spark_md5 = __commonJS({
  "node_modules/.pnpm/spark-md5@3.0.2/node_modules/spark-md5/spark-md5.js"(exports, module) {
    (function(factory) {
      if (typeof exports === "object") {
        module.exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define(factory);
      } else {
        var glob;
        try {
          glob = window;
        } catch (e) {
          glob = self;
        }
        glob.SparkMD5 = factory();
      }
    })(function(undefined2) {
      "use strict";
      var add32 = function(a, b) {
        return a + b & 4294967295;
      }, hex_chr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
      function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32(a << s | a >>> 32 - s, b);
      }
      function md5cycle(x, k) {
        var a = x[0], b = x[1], c = x[2], d = x[3];
        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[10] - 42063 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b ^ c ^ d) + k[5] - 378558 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        x[0] = a + x[0] | 0;
        x[1] = b + x[1] | 0;
        x[2] = c + x[2] | 0;
        x[3] = d + x[3] | 0;
      }
      function md5blk(s) {
        var md5blks = [], i;
        for (i = 0; i < 64; i += 4) {
          md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
      }
      function md5blk_array(a) {
        var md5blks = [], i;
        for (i = 0; i < 64; i += 4) {
          md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
        }
        return md5blks;
      }
      function md51(s) {
        var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
        for (i = 64; i <= n; i += 64) {
          md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        length = s.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
          tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
        }
        tail[i >> 2] |= 128 << (i % 4 << 3);
        if (i > 55) {
          md5cycle(state, tail);
          for (i = 0; i < 16; i += 1) {
            tail[i] = 0;
          }
        }
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;
        tail[14] = lo;
        tail[15] = hi;
        md5cycle(state, tail);
        return state;
      }
      function md51_array(a) {
        var n = a.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
        for (i = 64; i <= n; i += 64) {
          md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
        }
        a = i - 64 < n ? a.subarray(i - 64) : new Uint8Array(0);
        length = a.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
          tail[i >> 2] |= a[i] << (i % 4 << 3);
        }
        tail[i >> 2] |= 128 << (i % 4 << 3);
        if (i > 55) {
          md5cycle(state, tail);
          for (i = 0; i < 16; i += 1) {
            tail[i] = 0;
          }
        }
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;
        tail[14] = lo;
        tail[15] = hi;
        md5cycle(state, tail);
        return state;
      }
      function rhex(n) {
        var s = "", j;
        for (j = 0; j < 4; j += 1) {
          s += hex_chr[n >> j * 8 + 4 & 15] + hex_chr[n >> j * 8 & 15];
        }
        return s;
      }
      function hex(x) {
        var i;
        for (i = 0; i < x.length; i += 1) {
          x[i] = rhex(x[i]);
        }
        return x.join("");
      }
      if (hex(md51("hello")) !== "5d41402abc4b2a76b9719d911017c592") {
        add32 = function(x, y) {
          var lsw = (x & 65535) + (y & 65535), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return msw << 16 | lsw & 65535;
        };
      }
      if (typeof ArrayBuffer !== "undefined" && !ArrayBuffer.prototype.slice) {
        (function() {
          function clamp5(val, length) {
            val = val | 0 || 0;
            if (val < 0) {
              return Math.max(val + length, 0);
            }
            return Math.min(val, length);
          }
          ArrayBuffer.prototype.slice = function(from, to) {
            var length = this.byteLength, begin = clamp5(from, length), end = length, num, target, targetArray, sourceArray;
            if (to !== undefined2) {
              end = clamp5(to, length);
            }
            if (begin > end) {
              return new ArrayBuffer(0);
            }
            num = end - begin;
            target = new ArrayBuffer(num);
            targetArray = new Uint8Array(target);
            sourceArray = new Uint8Array(this, begin, num);
            targetArray.set(sourceArray);
            return target;
          };
        })();
      }
      function toUtf8(str) {
        if (/[\u0080-\uFFFF]/.test(str)) {
          str = unescape(encodeURIComponent(str));
        }
        return str;
      }
      function utf8Str2ArrayBuffer(str, returnUInt8Array) {
        var length = str.length, buff = new ArrayBuffer(length), arr = new Uint8Array(buff), i;
        for (i = 0; i < length; i += 1) {
          arr[i] = str.charCodeAt(i);
        }
        return returnUInt8Array ? arr : buff;
      }
      function arrayBuffer2Utf8Str(buff) {
        return String.fromCharCode.apply(null, new Uint8Array(buff));
      }
      function concatenateArrayBuffers(first, second, returnUInt8Array) {
        var result = new Uint8Array(first.byteLength + second.byteLength);
        result.set(new Uint8Array(first));
        result.set(new Uint8Array(second), first.byteLength);
        return returnUInt8Array ? result : result.buffer;
      }
      function hexToBinaryString(hex2) {
        var bytes = [], length = hex2.length, x;
        for (x = 0; x < length - 1; x += 2) {
          bytes.push(parseInt(hex2.substr(x, 2), 16));
        }
        return String.fromCharCode.apply(String, bytes);
      }
      function SparkMD52() {
        this.reset();
      }
      SparkMD52.prototype.append = function(str) {
        this.appendBinary(toUtf8(str));
        return this;
      };
      SparkMD52.prototype.appendBinary = function(contents) {
        this._buff += contents;
        this._length += contents.length;
        var length = this._buff.length, i;
        for (i = 64; i <= length; i += 64) {
          md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
        }
        this._buff = this._buff.substring(i - 64);
        return this;
      };
      SparkMD52.prototype.end = function(raw) {
        var buff = this._buff, length = buff.length, i, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ret;
        for (i = 0; i < length; i += 1) {
          tail[i >> 2] |= buff.charCodeAt(i) << (i % 4 << 3);
        }
        this._finish(tail, length);
        ret = hex(this._hash);
        if (raw) {
          ret = hexToBinaryString(ret);
        }
        this.reset();
        return ret;
      };
      SparkMD52.prototype.reset = function() {
        this._buff = "";
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];
        return this;
      };
      SparkMD52.prototype.getState = function() {
        return {
          buff: this._buff,
          length: this._length,
          hash: this._hash.slice()
        };
      };
      SparkMD52.prototype.setState = function(state) {
        this._buff = state.buff;
        this._length = state.length;
        this._hash = state.hash;
        return this;
      };
      SparkMD52.prototype.destroy = function() {
        delete this._hash;
        delete this._buff;
        delete this._length;
      };
      SparkMD52.prototype._finish = function(tail, length) {
        var i = length, tmp, lo, hi;
        tail[i >> 2] |= 128 << (i % 4 << 3);
        if (i > 55) {
          md5cycle(this._hash, tail);
          for (i = 0; i < 16; i += 1) {
            tail[i] = 0;
          }
        }
        tmp = this._length * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;
        tail[14] = lo;
        tail[15] = hi;
        md5cycle(this._hash, tail);
      };
      SparkMD52.hash = function(str, raw) {
        return SparkMD52.hashBinary(toUtf8(str), raw);
      };
      SparkMD52.hashBinary = function(content, raw) {
        var hash2 = md51(content), ret = hex(hash2);
        return raw ? hexToBinaryString(ret) : ret;
      };
      SparkMD52.ArrayBuffer = function() {
        this.reset();
      };
      SparkMD52.ArrayBuffer.prototype.append = function(arr) {
        var buff = concatenateArrayBuffers(this._buff.buffer, arr, true), length = buff.length, i;
        this._length += arr.byteLength;
        for (i = 64; i <= length; i += 64) {
          md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
        }
        this._buff = i - 64 < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);
        return this;
      };
      SparkMD52.ArrayBuffer.prototype.end = function(raw) {
        var buff = this._buff, length = buff.length, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i, ret;
        for (i = 0; i < length; i += 1) {
          tail[i >> 2] |= buff[i] << (i % 4 << 3);
        }
        this._finish(tail, length);
        ret = hex(this._hash);
        if (raw) {
          ret = hexToBinaryString(ret);
        }
        this.reset();
        return ret;
      };
      SparkMD52.ArrayBuffer.prototype.reset = function() {
        this._buff = new Uint8Array(0);
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];
        return this;
      };
      SparkMD52.ArrayBuffer.prototype.getState = function() {
        var state = SparkMD52.prototype.getState.call(this);
        state.buff = arrayBuffer2Utf8Str(state.buff);
        return state;
      };
      SparkMD52.ArrayBuffer.prototype.setState = function(state) {
        state.buff = utf8Str2ArrayBuffer(state.buff, true);
        return SparkMD52.prototype.setState.call(this, state);
      };
      SparkMD52.ArrayBuffer.prototype.destroy = SparkMD52.prototype.destroy;
      SparkMD52.ArrayBuffer.prototype._finish = SparkMD52.prototype._finish;
      SparkMD52.ArrayBuffer.hash = function(arr, raw) {
        var hash2 = md51_array(new Uint8Array(arr)), ret = hex(hash2);
        return raw ? hexToBinaryString(ret) : ret;
      };
      return SparkMD52;
    });
  }
});

// src/local-slicer.js
import { readFile, writeFile, readdir, mkdir, stat, access } from "node:fs/promises";
import { join, dirname, resolve, basename } from "node:path";
import { spawn } from "node:child_process";
import { randomUUID, createHash } from "node:crypto";
import { Worker as Worker2, isMainThread, parentPort, workerData } from "node:worker_threads";

// node_modules/.pnpm/fflate@0.8.2/node_modules/fflate/esm/index.mjs
import { createRequire } from "module";
var require2 = createRequire("/");
var Worker;
try {
  Worker = require2("worker_threads").Worker;
} catch (e) {
}
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new i32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b.b;
var revfd = _b.r;
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var x;
var i;
var hMap = (function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le = new u16(mb);
  for (i = 1; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
      }
    }
  }
  return co;
});
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flm = /* @__PURE__ */ hMap(flt, 9, 0);
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  return new u8(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var inflt = function(dat, st, buf, dict) {
  var sl = dat.length, dl = dict ? dict.length : 0;
  if (!sl || st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf;
  var resize = noBuf || st.i != 2;
  var noSt = st.i;
  if (noBuf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (resize)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b = fleb[i];
          add = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
        if (!d)
          err(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + 131072);
        var end = bt + add;
        if (bt < dt) {
          var shift = dl - dt, dend = Math.min(dt, end);
          if (shift + bt < 0)
            err(3);
          for (; bt < dend; ++bt)
            buf[bt] = dict[shift + bt];
        }
        for (; bt < end; ++bt)
          buf[bt] = buf[bt - dt];
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
};
var wbits = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
};
var wbits16 = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
  d[o + 2] |= v >> 16;
};
var hTree = function(d, mb) {
  var t = [];
  for (var i = 0; i < d.length; ++i) {
    if (d[i])
      t.push({ s: i, f: d[i] });
  }
  var s = t.length;
  var t2 = t.slice();
  if (!s)
    return { t: et, l: 0 };
  if (s == 1) {
    var v = new u8(t[0].s + 1);
    v[t[0].s] = 1;
    return { t: v, l: 1 };
  }
  t.sort(function(a, b) {
    return a.f - b.f;
  });
  t.push({ s: -1, f: 25001 });
  var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
  t[0] = { s: -1, f: l.f + r.f, l, r };
  while (i1 != s - 1) {
    l = t[t[i0].f < t[i2].f ? i0++ : i2++];
    r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
    t[i1++] = { s: -1, f: l.f + r.f, l, r };
  }
  var maxSym = t2[0].s;
  for (var i = 1; i < s; ++i) {
    if (t2[i].s > maxSym)
      maxSym = t2[i].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (; i < s; ++i) {
      var i2_1 = t2[i].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>= lft;
    while (dt > 0) {
      var i2_2 = t2[i].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i;
    }
    for (; i >= 0 && dt; --i) {
      var i2_3 = t2[i].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return { t: new u8(tr), l: mbt };
};
var ln = function(n, l, d) {
  return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w = function(v) {
    cl[cli++] = v;
  };
  for (var i = 1; i <= s; ++i) {
    if (c[i] == cln && i != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w(32754);
        if (cls > 2) {
          w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w(cln), --cls;
        for (; cls > 6; cls -= 6)
          w(8304);
        if (cls > 2)
          w(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w(cln);
      cls = 1;
      cln = c[i];
    }
  }
  return { c: cl.subarray(0, cli), n: s };
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i = 0; i < cl.length; ++i)
    l += cf[i] * cl[i];
  return l;
};
var wfblk = function(out, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out[o] = s & 255;
  out[o + 1] = s >> 8;
  out[o + 2] = out[o] ^ 255;
  out[o + 3] = out[o + 1] ^ 255;
  for (var i = 0; i < s; ++i)
    out[o + i + 4] = dat[i];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
  var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
  var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
  var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
  var lcfreq = new u16(19);
  for (var i = 0; i < lclt.length; ++i)
    ++lcfreq[lclt[i] & 31];
  for (var i = 0; i < lcdt.length; ++i)
    ++lcfreq[lcdt[i] & 31];
  var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
  if (bs >= 0 && flen <= ftlen && flen <= dtlen)
    return wfblk(out, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p, nlc - 257);
    wbits(out, p + 5, ndc - 1);
    wbits(out, p + 10, nlcc - 4);
    p += 14;
    for (var i = 0; i < nlcc; ++i)
      wbits(out, p + 3 * i, lct[clim[i]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it = 0; it < 2; ++it) {
      var clct = lcts[it];
      for (var i = 0; i < clct.length; ++i) {
        var len = clct[i] & 31;
        wbits(out, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i = 0; i < li; ++i) {
    var sym = syms[i];
    if (sym > 255) {
      var len = sym >> 18 & 31;
      wbits16(out, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out, p, sym >> 23 & 31), p += fleb[len];
      var dst = sym & 31;
      wbits16(out, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out, p, lm[sym]), p += ll[sym];
    }
  }
  wbits16(out, p, lm[256]);
  return p + ll[256];
};
var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = /* @__PURE__ */ new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, st) {
  var s = st.z || dat.length;
  var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
  var w = o.subarray(pre, o.length - post);
  var lst = st.l;
  var pos = (st.r || 0) & 7;
  if (lvl) {
    if (pos)
      w[0] = st.r >> 3;
    var opt = deo[lvl - 1];
    var n = opt >> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i2) {
      return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
    };
    var syms = new i32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
    for (; i + 2 < s; ++i) {
      var hv = hsh(i);
      var imod = i & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i) {
        var rem = s - i;
        if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
          pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
          li = lc_1 = eb = 0, bs = i;
          for (var j = 0; j < 286; ++j)
            lf[j] = 0;
          for (var j = 0; j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i - dif)) {
          var maxn = Math.min(n, rem) - 1;
          var maxd = Math.min(32767, i);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i + l] == dat[i + l - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0; j < mmd; ++j) {
                  var ti = i - dif + j & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod & 32767;
          }
        }
        if (d) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
          var lin = revfl[l] & 31, din = revfd[d] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
      }
    }
    for (i = Math.max(i, wi); i < s; ++i) {
      syms[li++] = dat[i];
      ++lf[dat[i]];
    }
    pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
    if (!lst) {
      st.r = pos & 7 | w[pos / 8 | 0] << 3;
      pos -= 7;
      st.h = head, st.p = prev, st.i = i, st.w = wi;
    }
  } else {
    for (var i = st.w || 0; i < s + lst; i += 65535) {
      var e = i + 65535;
      if (e >= s) {
        w[pos / 8 | 0] = lst;
        e = s;
      }
      pos = wfblk(w, pos + 1, dat.subarray(i, e));
    }
    st.i = s;
  }
  return slc(o, 0, pre + shft(pos) + post);
};
var crct = /* @__PURE__ */ (function() {
  var t = new Int32Array(256);
  for (var i = 0; i < 256; ++i) {
    var c = i, k = 9;
    while (--k)
      c = (c & 1 && -306674912) ^ c >>> 1;
    t[i] = c;
  }
  return t;
})();
var crc = function() {
  var c = -1;
  return {
    p: function(d) {
      var cr = c;
      for (var i = 0; i < d.length; ++i)
        cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
      c = cr;
    },
    d: function() {
      return ~c;
    }
  };
};
var dopt = function(dat, opt, pre, post, st) {
  if (!st) {
    st = { l: 1 };
    if (opt.dictionary) {
      var dict = opt.dictionary.subarray(-32768);
      var newDat = new u8(dict.length + dat.length);
      newDat.set(dict);
      newDat.set(dat, dict.length);
      dat = newDat;
      st.w = dict.length;
    }
  }
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
};
var mrg = function(a, b) {
  var o = {};
  for (var k in a)
    o[k] = a[k];
  for (var k in b)
    o[k] = b[k];
  return o;
};
var b2 = function(d, b) {
  return d[b] | d[b + 1] << 8;
};
var b4 = function(d, b) {
  return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
};
var b8 = function(d, b) {
  return b4(d, b) + b4(d, b + 4) * 4294967296;
};
var wbytes = function(d, b, v) {
  for (; v; ++b)
    d[b] = v, v >>>= 8;
};
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
function inflateSync(data, opts) {
  return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
var fltn = function(d, p, t, o) {
  for (var k in d) {
    var val = d[k], n = p + k, op = o;
    if (Array.isArray(val))
      op = mrg(o, val[1]), val = val[0];
    if (val instanceof u8)
      t[n] = [val, op];
    else {
      t[n += "/"] = [new u8(0), op];
      fltn(val, n, t, o);
    }
  }
};
var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
var dutf8 = function(d) {
  for (var r = "", i = 0; ; ) {
    var c = d[i++];
    var eb = (c > 127) + (c > 223) + (c > 239);
    if (i + eb > d.length)
      return { s: r, r: slc(d, i - 1) };
    if (!eb)
      r += String.fromCharCode(c);
    else if (eb == 3) {
      c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
    } else if (eb & 1)
      r += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
    else
      r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
  }
};
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i = 0; i < str.length; ++i)
      ar_1[i] = str.charCodeAt(i);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      var n = new u8(ai + 8 + (l - i << 1));
      n.set(ar);
      ar = n;
    }
    var c = str.charCodeAt(i);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
function strFromU8(dat, latin1) {
  if (latin1) {
    var r = "";
    for (var i = 0; i < dat.length; i += 16384)
      r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
    return r;
  } else if (td) {
    return td.decode(dat);
  } else {
    var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
    if (r.length)
      err(8);
    return s;
  }
}
var slzh = function(d, b) {
  return b + 30 + b2(d, b + 26) + b2(d, b + 28);
};
var zh = function(d, b, z) {
  var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
  var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
  return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
};
var z64e = function(d, b) {
  for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
    ;
  return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
};
var exfl = function(ex) {
  var le = 0;
  if (ex) {
    for (var k in ex) {
      var l = ex[k].length;
      if (l > 65535)
        err(9);
      le += l + 4;
    }
  }
  return le;
};
var wzh = function(d, b, f, fn, u, c, ce, co) {
  var fl2 = fn.length, ex = f.extra, col = co && co.length;
  var exl = exfl(ex);
  wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
  if (ce != null)
    d[b++] = 20, d[b++] = f.os;
  d[b] = 20, b += 2;
  d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
  d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
  var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
  if (y < 0 || y > 119)
    err(10);
  wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
  if (c != -1) {
    wbytes(d, b, f.crc);
    wbytes(d, b + 4, c < 0 ? -c - 2 : c);
    wbytes(d, b + 8, f.size);
  }
  wbytes(d, b + 12, fl2);
  wbytes(d, b + 14, exl), b += 16;
  if (ce != null) {
    wbytes(d, b, col);
    wbytes(d, b + 6, f.attrs);
    wbytes(d, b + 10, ce), b += 14;
  }
  d.set(fn, b);
  b += fl2;
  if (exl) {
    for (var k in ex) {
      var exf = ex[k], l = exf.length;
      wbytes(d, b, +k);
      wbytes(d, b + 2, l);
      d.set(exf, b + 4), b += 4 + l;
    }
  }
  if (col)
    d.set(co, b), b += col;
  return b;
};
var wzf = function(o, b, c, d, e) {
  wbytes(o, b, 101010256);
  wbytes(o, b + 8, c);
  wbytes(o, b + 10, c);
  wbytes(o, b + 12, d);
  wbytes(o, b + 16, e);
};
function zipSync(data, opts) {
  if (!opts)
    opts = {};
  var r = {};
  var files = [];
  fltn(data, "", r, opts);
  var o = 0;
  var tot = 0;
  for (var fn in r) {
    var _a2 = r[fn], file = _a2[0], p = _a2[1];
    var compression = p.level == 0 ? 0 : 8;
    var f = strToU8(fn), s = f.length;
    var com = p.comment, m = com && strToU8(com), ms = m && m.length;
    var exl = exfl(p.extra);
    if (s > 65535)
      err(11);
    var d = compression ? deflateSync(file, p) : file, l = d.length;
    var c = crc();
    c.p(file);
    files.push(mrg(p, {
      size: file.length,
      crc: c.d(),
      c: d,
      f,
      m,
      u: s != fn.length || m && com.length != ms,
      o,
      compression
    }));
    o += 30 + s + exl + l;
    tot += 76 + 2 * (s + exl) + (ms || 0) + l;
  }
  var out = new u8(tot + 22), oe = o, cdl = tot - o;
  for (var i = 0; i < files.length; ++i) {
    var f = files[i];
    wzh(out, f.o, f, f.f, f.u, f.c.length);
    var badd = 30 + f.f.length + exfl(f.extra);
    out.set(f.c, f.o + badd);
    wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
  }
  wzf(out, o, files.length, cdl, oe);
  return out;
}
function unzipSync(data, opts) {
  var files = {};
  var e = data.length - 22;
  for (; b4(data, e) != 101010256; --e) {
    if (!e || data.length - e > 65558)
      err(13);
  }
  ;
  var c = b2(data, e + 8);
  if (!c)
    return {};
  var o = b4(data, e + 16);
  var z = o == 4294967295 || c == 65535;
  if (z) {
    var ze = b4(data, e - 12);
    z = b4(data, ze) == 101075792;
    if (z) {
      c = b4(data, ze + 32);
      o = b4(data, ze + 48);
    }
  }
  var fltr = opts && opts.filter;
  for (var i = 0; i < c; ++i) {
    var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
    o = no;
    if (!fltr || fltr({
      name: fn,
      size: sc,
      originalSize: su,
      compression: c_2
    })) {
      if (!c_2)
        files[fn] = slc(data, b, b + sc);
      else if (c_2 == 8)
        files[fn] = inflateSync(data.subarray(b, b + sc), { out: new u8(su) });
      else
        err(14, "unknown compression type " + c_2);
    }
  }
  return files;
}

// src/colors.js
var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
var SLOT_NAMES = ["A", "B", "C", "D"];
var isHexColor = (value) => typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);
function normalizeColorSettings(input, palette) {
  const fallback = [palette[0], palette[1] === palette[0] ? "#42654c" : palette[1], "#edb678", "#b59acb"];
  const colors = fallback.map((color, i) => isHexColor(input.filamentColors?.[i]) ? input.filamentColors[i].toLowerCase() : color);
  const sequence = typeof input.layerSequence === "string" ? input.layerSequence.toUpperCase().replace(/[^ABCD]/g, "").slice(0, 32) : "AB";
  const number2 = (value, fallback2, min, max2) => Number.isFinite(Number(value)) ? clamp(Math.round(Number(value)), min, max2) : fallback2;
  const overrides = {};
  if (input.layerOverrides && typeof input.layerOverrides === "object" && !Array.isArray(input.layerOverrides)) for (const [key, value] of Object.entries(input.layerOverrides)) {
    const layer = Number(key), slot = Number(value);
    if (Number.isInteger(layer) && layer >= 1 && layer <= 3750 && Number.isInteger(slot) && slot >= 0 && slot < 4) overrides[layer] = slot;
  }
  return { colorMode: input.colorMode === "layers" ? "layers" : "bands", filamentColors: colors, layerSequence: sequence || "AB", layersPerColor: number2(input.layersPerColor, 1, 1, 100), layerOffset: number2(input.layerOffset, 0, 0, 31), layerOverrides: overrides };
}
function layerCount(p) {
  return Math.max(1, Math.ceil(p.height / p.layer - 1e-8));
}
function slotAtLayer(p, layer) {
  const l = clamp(Math.floor(layer), 1, layerCount(p));
  if (Object.hasOwn(p.layerOverrides, l)) return p.layerOverrides[l];
  const i = (Math.floor((l - 1) / p.layersPerColor) + p.layerOffset) % p.layerSequence.length;
  return SLOT_NAMES.indexOf(p.layerSequence[i]);
}

// src/pattern.js
var TAU = Math.PI * 2;
var clamp2 = (v, a, b) => Math.max(a, Math.min(b, v));
var number = (v, f, a, b) => Number.isFinite(Number(v)) ? clamp2(Number(v), a, b) : f;
var integer = (v, f, a, b) => Math.round(number(v, f, a, b));
var PATTERN_PALETTE = ["#285744", "#eee6cd", "#d6a5ca", "#dfbb51"];
function patternSettings(input = {}) {
  const cols = integer(input.cols, 48, 8, 192), rows = integer(input.rows, 24, 2, 128);
  const pixels = Array.from({ length: cols * rows }, (_, i) => {
    const n = input.pixels?.[i];
    return Number.isInteger(n) && n >= -1 && n < 4 ? n : Math.abs((i % cols / cols * 4 % 1 - 0.5) * 2) + Math.abs((Math.floor(i / cols) / rows * 3 % 1 - 0.5) * 2) < 0.65 ? 0 : 1;
  });
  const palette = PATTERN_PALETTE.map((c, i) => /^#[0-9a-f]{6}$/i.test(input.palette?.[i]) ? input.palette[i].toLowerCase() : c);
  return { enabled: input.enabled === true, cols, rows, pixels, palette, depth: number(input.depth, 0.09, 0, 0.6), transition: number(input.transition, 0.35, 0.1, 0.5), rotation: number(input.rotation, 0, -360, 360), repeat: integer(input.repeat, 1, 1, 8), mirror: input.mirror === true, layersPerRow: integer(input.layersPerRow, 6, 2, 100), sequence: (typeof input.sequence === "string" ? input.sequence.toUpperCase().replace(/[^ABCD]/g, "").slice(0, 32) : "AB") || "AB" };
}
function patternTools(p, row) {
  return [...new Set(p.pixels.slice(row * p.cols, (row + 1) * p.cols).filter((x) => x >= 0))].sort();
}
function patternRow(layer, start, p) {
  return Math.floor((layer - start) / p.layersPerRow);
}
function patternU(theta, p) {
  const turn = (theta / TAU - p.rotation / 360) * p.repeat;
  return ((p.mirror ? -turn : turn) % 1 + 1) % 1;
}
function patternRelief(theta, layer, tool, start, p) {
  const row = patternRow(layer, start, p);
  if (!p.enabled || row < 0 || row >= p.rows) return 0;
  const x = patternU(theta, p) * p.cols, col = Math.min(p.cols - 1, Math.floor(x)), f = x - col;
  const value = (c) => {
    const target = p.pixels[row * p.cols + (c % p.cols + p.cols) % p.cols];
    return target < 0 ? 0 : target === tool ? p.depth : -p.depth;
  };
  const smooth = (t) => t * t * (3 - 2 * t), s = p.transition;
  if (f < s) {
    const blend = 0.5 + 0.5 * smooth(f / s);
    return value(col - 1) * (1 - blend) + value(col) * blend;
  }
  if (f > 1 - s) {
    const blend = 0.5 * smooth((f - 1 + s) / s);
    return value(col) * (1 - blend) + value(col + 1) * blend;
  }
  return value(col);
}
function validatePatternPlan(parsed, p, start, end) {
  const last = Math.min(end, start + p.rows * p.layersPerRow - 1), byLayer = /* @__PURE__ */ new Map();
  for (const run of parsed.runs) {
    if (run.layer < start || run.layer > last) continue;
    if (!byLayer.has(run.layer)) byLayer.set(run.layer, /* @__PURE__ */ new Set());
    byLayer.get(run.layer).add(run.tool);
  }
  const bands = [], errors = [];
  for (let row = 0; row < p.rows; row++) {
    const a = start + row * p.layersPerRow, b = a + p.layersPerRow - 1;
    if (a > end) break;
    const counts = {}, tools = patternTools(p, row), missingLayers = [];
    for (let layer = a; layer <= Math.min(b, end); layer++) {
      const slots = byLayer.get(layer);
      if (!slots) {
        missingLayers.push(layer);
        continue;
      }
      if (slots.size !== 1) errors.push(`\u7B2C ${layer} \u5C42\u5899\u4F53\u4F7F\u7528\u591A\u4E2A\u8272\u69FD\uFF1B\u9010\u5C42\u7F16\u7EC7\u8981\u6C42\u6BCF\u5C42\u5899\u4F53\u53EA\u6709\u4E00\u79CD\u989C\u8272\u3002`);
      for (const t of slots) counts[t] = (counts[t] || 0) + 1;
    }
    const missing = tools.filter((t) => !counts[t]);
    if (missing.length) errors.push(`\u56FE\u6848\u7B2C ${row + 1} \u884C\uFF08${a}\u2013${Math.min(b, end)} \u5C42\uFF09\u7F3A\u5C11 ${missing.map((t) => "T" + t).join("\u3001")}\u3002\u8BF7\u5728\u62D3\u7AF9\u5207\u7247\u65F6\u52A0\u5165\u8FD9\u4E9B\u9010\u5C42\u989C\u8272\uFF0C\u6216\u589E\u52A0\u6BCF\u56FE\u6848\u884C\u5C42\u6570\u3002`);
    if (missingLayers.length) errors.push(`\u56FE\u6848\u7B2C ${row + 1} \u884C\u7F3A\u5C11\u5899\u4F53\u8DEF\u5F84\uFF1A\u7B2C ${missingLayers.slice(0, 4).join("\u3001")} \u5C42\u3002`);
    bands.push({ row: row + 1, startLayer: a, endLayer: Math.min(b, end), requestedEndLayer: b, tools, counts, complete: b <= end, minRepeats: tools.length ? Math.min(...tools.map((t) => counts[t] || 0)) : 0 });
  }
  if (errors.length) throw Error(errors.slice(0, 3).join(" "));
  return { coordinateSystem: "fixed-object-angle / fixed-print-layer-bands", startLayer: start, endLayer: last, cols: p.cols, rows: p.rows, visibleRows: bands.length, clippedRows: p.rows - bands.length, layerSpan: p.layersPerRow, rotation: p.rotation, repeat: p.repeat, depth: p.depth, bands, physicalPrintTested: false };
}

// src/toolpath.js
var PATH_DEFAULTS = { stitches: 64, amplitude: 0.12, phase: 0.5, flow: 1, maxSpeed: 30, maxFlow: 8, lineWidth: 0.45, filament: 1.75, startLayer: 8, endLayer: 0, bedSize: 256 };
var TAU2 = Math.PI * 2;
var clamp3 = (v, a, b) => Math.max(a, Math.min(b, v));
function pathSettings(input = {}) {
  const p = { ...PATH_DEFAULTS };
  for (const [key, [a, b]] of Object.entries({ stitches: [8, 192], amplitude: [0, 1.5], phase: [0, 1], flow: [0.6, 1.4], maxSpeed: [5, 100], maxFlow: [1, 30], lineWidth: [0.2, 1.2], filament: [1.5, 3], startLayer: [1, 1e4], endLayer: [0, 1e4], bedSize: [120, 400] })) {
    const v = Number(input[key]);
    if (Number.isFinite(v)) p[key] = clamp3(v, a, b);
  }
  for (const k of ["stitches", "startLayer", "endLayer"]) p[k] = Math.round(p[k]);
  p.pattern = patternSettings(input.pattern);
  p.localPrinter = typeof input.localPrinter === "string" ? input.localPrinter.slice(0, 100) : "Bambu Lab A1 0.4 nozzle";
  p.localMaterial = typeof input.localMaterial === "string" ? input.localMaterial.slice(0, 100) : "Bambu PLA Basic";
  p.autoColors = input.autoColors !== false;
  return p;
}
function phaseAtLayer(layer, p) {
  return (layer - 1) % 2 * p.phase;
}
function pathPhase(layer, p, tool = 0) {
  return p.pattern?.enabled ? tool % 2 * p.phase : phaseAtLayer(layer, p);
}
function displacement(theta, layer, p, tool = 0) {
  return p.amplitude * Math.cos(p.stitches * theta - TAU2 * pathPhase(layer, p, tool)) + (p.pattern?.enabled ? patternRelief(theta, layer, tool, p.startLayer, p.pattern) : 0);
}
function command(line) {
  const code = line.split(";", 1)[0].replace(/\([^)]*\)/g, "").trim();
  if (!code) return null;
  const c = /^([GMT]\d+(?:\.\d+)?)\b/i.exec(code);
  if (!c) return { cmd: "?", v: {}, code };
  const v = {};
  for (const m of code.slice(c[0].length).matchAll(/([A-Z])\s*([-+]?(?:\d*\.\d+|\d+\.?\d*))/gi)) v[m[1].toUpperCase()] = Number(m[2]);
  return { cmd: c[1].toUpperCase().replace(/^G0([0-9])$/, "G$1"), v, code };
}
var distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
var deltaAngle = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));
function arcGeometry(a, b, c) {
  if (!["G2", "G3"].includes(c.cmd)) return null;
  const { v } = c;
  if (!("I" in v || "J" in v) || "R" in v) throw Error("\u5706\u5F27\u9700\u8981 G17 \u5E73\u9762\u3001\u76F8\u5BF9 I/J \u5706\u5FC3\u683C\u5F0F\uFF1B\u8BF7\u5173\u95ED\u5706\u5F27\u62DF\u5408\u540E\u91CD\u65B0\u5BFC\u51FA\u3002");
  const cx = a.x + (v.I || 0), cy = a.y + (v.J || 0), r = Math.hypot(a.x - cx, a.y - cy), r2 = Math.hypot(b.x - cx, b.y - cy);
  if (r < 0.01 || Math.abs(r - r2) > 0.08) throw Error("\u5706\u5F27\u534A\u5F84\u4E0D\u4E00\u81F4\uFF0C\u65E0\u6CD5\u53EF\u9760\u6539\u5199\u3002");
  const t0 = Math.atan2(a.y - cy, a.x - cx);
  let sweep = Math.atan2(b.y - cy, b.x - cx) - t0;
  if (c.cmd === "G2") {
    while (sweep >= -1e-8) sweep -= TAU2;
  } else while (sweep <= 1e-8) sweep += TAU2;
  return { cx, cy, r, t0, sweep, length: Math.hypot(r * sweep, b.z - a.z) };
}
function parseGCode(text) {
  if (typeof text !== "string" || !text.trim()) throw Error("\u8BF7\u9009\u62E9\u5DF2\u5207\u7247\u7684\u6587\u672C G-code\u3002");
  if (text.length > 80 * 1024 * 1024) throw Error("\u6587\u4EF6\u8D85\u8FC7 80 MB\uFF0C\u8BF7\u5148\u5BFC\u51FA\u4E00\u4E2A\u5C0F\u6837\u3002");
  if (text.includes("; KNITFORM_PATH_ENGINE:")) throw Error("\u8BE5\u6587\u4EF6\u5DF2\u7ECF\u8FC7\u8DEF\u5F84\u6539\u5199\u3002\u8BF7\u5BFC\u5165\u539F\u59CB\u5207\u7247\u7ED3\u679C\uFF0C\u907F\u514D\u91CD\u590D\u53E0\u52A0\u3002");
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/), moves = [], runs = [], layers = /* @__PURE__ */ new Map(), objects = /* @__PURE__ */ new Set(), warnings = [];
  let state = { x: NaN, y: NaN, z: NaN, e: 0, f: 1800, relative: false, eRelative: false, tool: 0 }, layer = 0, feature = "", run = null, plane = "G17", absoluteArc = false, layerZ = 0, layerHeight = 0, lineWidth = 0, executable2 = true;
  const flush = () => {
    if (run?.moves.length) runs.push(run);
    run = null;
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m;
    if (/CONFIG_BLOCK_START/.test(line)) executable2 = false;
    if (/CONFIG_BLOCK_END/.test(line)) {
      executable2 = true;
      continue;
    }
    if (!executable2) continue;
    if (m = /^;\s*layer num\/total_layer_count:\s*(\d+)\/(\d+)/i.exec(line)) {
      flush();
      layer = +m[1];
      layers.set(layer, { number: layer, z: layerZ, height: layerHeight });
    }
    if ((m = /^;\s*LAYER:\s*(-?\d+)/i.exec(line)) && !text.includes("layer num/total_layer_count:")) {
      flush();
      layer = +m[1] + 1;
      layers.set(layer, { number: layer, z: 0, height: 0 });
      feature = "";
    }
    if (m = /^;\s*Z_HEIGHT:\s*([\d.]+)/i.exec(line)) layerZ = +m[1];
    if (m = /^;\s*LAYER_HEIGHT:\s*([\d.]+)/i.exec(line)) layerHeight = +m[1];
    if (m = /^;\s*(?:LINE_WIDTH|WIDTH):\s*([\d.]+)/i.exec(line)) lineWidth = +m[1];
    if (/MACHINE_END_GCODE_START/.test(line)) {
      flush();
      layer = 0;
      feature = "Custom";
    }
    if (m = /^;\s*(?:FEATURE|TYPE):\s*(.*)/i.exec(line)) {
      if (feature !== m[1].trim()) flush();
      feature = m[1].trim();
    }
    if ((m = /^;\s*OBJECT_ID:\s*(-?\d+)/i.exec(line)) && +m[1] >= 0) objects.add(+m[1]);
    if (/^\s*N\d+\s|\*\d+\s*$/.test(line)) throw Error("\u4E0D\u652F\u6301\u5E26\u884C\u53F7\u6821\u9A8C\u548C\u7684\u4E32\u53E3 G-code\uFF0C\u8BF7\u5BFC\u51FA\u666E\u901A\u6587\u4EF6\u3002");
    const c = command(line);
    if (!c) continue;
    const { cmd, v } = c;
    if (cmd === "G20") throw Error("\u4EC5\u652F\u6301\u6BEB\u7C73\u5355\u4F4D G-code\u3002");
    if (cmd === "G90" || cmd === "G91") {
      flush();
      state.relative = cmd === "G91";
      state.eRelative = state.relative;
      continue;
    }
    if (cmd === "M82" || cmd === "M83") {
      flush();
      state.eRelative = cmd === "M83";
      continue;
    }
    if (["G17", "G18", "G19"].includes(cmd)) {
      flush();
      plane = cmd;
      continue;
    }
    if (cmd === "G90.1" || cmd === "G91.1") {
      flush();
      absoluteArc = cmd === "G90.1";
      continue;
    }
    if (cmd === "G92") {
      flush();
      for (const k of ["X", "Y", "Z", "E"]) if (k in v) state[k.toLowerCase()] = v[k];
      continue;
    }
    if (/^T\d+$/.test(cmd)) {
      flush();
      if (+cmd.slice(1) < 255) state.tool = +cmd.slice(1);
      continue;
    }
    if (!["G0", "G1", "G2", "G3"].includes(cmd)) {
      if (!["M204", "M205", "M73", "M991", "M106"].includes(cmd)) flush();
      if (cmd === "G28") {
        state.x = NaN;
        state.y = NaN;
        state.z = NaN;
      }
      continue;
    }
    const a = { ...state };
    for (const k of ["X", "Y", "Z"]) if (k in v) state[k.toLowerCase()] = state.relative ? state[k.toLowerCase()] + v[k] : v[k];
    const de = "E" in v ? state.eRelative ? v.E : v.E - state.e : 0;
    if ("E" in v) state.e = state.eRelative ? state.e + v.E : v.E;
    if ("F" in v) state.f = v.F;
    const b = { ...state }, wall = /^(?:Outer wall|Inner wall|External perimeter|Perimeter)$/i.test(feature), xy = Number.isFinite(a.x) && Number.isFinite(a.y) && Math.hypot(b.x - a.x, b.y - a.y) > 1e-5;
    if (layer > 0 && wall && de > 0 && state.relative) throw Error("\u5899\u4F53\u4F7F\u7528 G91 \u76F8\u5BF9\u5750\u6807\uFF1B\u8BF7\u6539\u4E3A G90 \u7EDD\u5BF9 XYZ \u540E\u5BFC\u51FA\u3002");
    if (!xy && !(wall && de > 0 && ["G2", "G3"].includes(cmd))) {
      if (wall && de > 0 && de < 0.05 && ("X" in v || "Y" in v) && Math.abs(b.z - a.z) < 2e-3) {
        if (!state.eRelative && run?.moves.length) throw Error("\u7EDD\u5BF9\u6324\u51FA\u5899\u73AF\u5305\u542B\u505C\u70B9\u8865\u6599\uFF0C\u65E0\u6CD5\u539F\u6837\u4FDD\u7559 E \u5750\u6807\u3002\u8BF7\u6539\u7528\u76F8\u5BF9\u6324\u51FA M83 \u91CD\u65B0\u5207\u7247\u3002");
        continue;
      }
      if ("E" in v || "X" in v || "Y" in v || "Z" in v) flush();
      continue;
    }
    const move = { i, a, b, de, layer, feature, tool: state.tool, c, wall, width: lineWidth, arc: null };
    if (de > 0 && layer > 0 && wall) {
      if (state.relative) throw Error("\u5899\u4F53\u4F7F\u7528 G91 \u76F8\u5BF9\u5750\u6807\uFF1B\u8BF7\u6539\u4E3A G90 \u7EDD\u5BF9 XYZ \u540E\u5BFC\u51FA\u3002");
      if (plane !== "G17" || absoluteArc) throw Error("\u4EC5\u652F\u6301 G17\u3001\u76F8\u5BF9 I/J \u5706\u5FC3\u7684\u5E73\u9762\u8DEF\u5F84\u3002");
      move.arc = arcGeometry(a, b, c);
      if (!Number.isFinite(a.z) || Math.abs(b.z - a.z) > 2e-3) throw Error("\u5899\u4F53\u5305\u542B\u8FDE\u7EED\u62AC Z \u6216\u659C\u7F1D\u8DEF\u5F84\u3002\u8BF7\u5173\u95ED\u87BA\u65CB\u82B1\u74F6\u3001\u659C\u62FC\u63A5/Scarf seam\u3002");
      if (!run) run = { layer, feature, tool: state.tool, moves: [] };
      run.moves.push(move);
      if (!layers.get(layer).z) layers.get(layer).z = b.z;
    } else flush();
    if (de > 0 && layer > 0) {
      if (!move.arc && ["G2", "G3"].includes(cmd) && plane === "G17" && !absoluteArc) move.arc = arcGeometry(a, b, c);
      moves.push(move);
    }
  }
  flush();
  if (!layers.size || !runs.length) throw Error("\u672A\u627E\u5230\u5E26\u5C42\u53F7\u548C\u5899\u4F53\u6807\u8BB0\u7684\u8DEF\u5F84\u3002\u8BF7\u4F7F\u7528 Bambu Studio \u5BFC\u51FA\u7684 G-code\uFF0C\u4FDD\u7559 FEATURE \u6CE8\u91CA\u3002");
  if (objects.size > 1) throw Error("\u68C0\u6D4B\u5230\u591A\u4E2A\u6253\u5370\u5BF9\u8C61\u3002\u8BF7\u4EC5\u4FDD\u7559\u4E00\u4E2A\u706F\u7F69/\u82B1\u74F6\uFF0C\u64E6\u6599\u5854\u53EF\u4EE5\u4FDD\u7559\u3002");
  const ordered = [...layers.values()].sort((a, b) => a.number - b.number);
  for (let i = 0; i < ordered.length; i++) if (!ordered[i].height) ordered[i].height = ordered[i].z - (ordered[i - 1]?.z || 0);
  const filamentColors = (/^;\s*filament_colour\s*=\s*(.*)$/m.exec(text)?.[1] || "").split(";").map((x) => x.trim()).filter((x) => /^#[0-9a-f]{6}$/i.test(x));
  return { text, lines, moves, runs, layers: ordered, objects: [...objects], warnings, filamentColors, totalLayers: ordered.at(-1).number, bambu: /BambuStudio/.test(text) };
}
function runGeometry(run) {
  const points = run.moves.flatMap((m) => {
    if (!m.arc) return [m.a, m.b];
    const n = Math.max(16, Math.ceil(Math.abs(m.arc.sweep) / 0.05)), ts = Array.from({ length: n + 1 }, (_, i) => i / n);
    for (let k2 = -8; k2 <= 8; k2++) {
      const t = (k2 * Math.PI / 2 - m.arc.t0) / m.arc.sweep;
      if (t > 0 && t < 1) ts.push(t);
    }
    return ts.map((t) => ({ x: m.arc.cx + m.arc.r * Math.cos(m.arc.t0 + m.arc.sweep * t), y: m.arc.cy + m.arc.r * Math.sin(m.arc.t0 + m.arc.sweep * t), z: m.a.z }));
  });
  const xs = points.map((p) => p.x), ys = points.map((p) => p.y), cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  let winding = 0, minR = Infinity;
  for (const m of run.moves) {
    const n = m.arc ? Math.max(1, Math.ceil(Math.abs(m.arc.sweep) / 0.1)) : 1;
    let a = m.a;
    for (let j = 1; j <= n; j++) {
      const t = j / n, b = m.arc ? { x: m.arc.cx + m.arc.r * Math.cos(m.arc.t0 + m.arc.sweep * t), y: m.arc.cy + m.arc.r * Math.sin(m.arc.t0 + m.arc.sweep * t) } : m.b;
      winding += deltaAngle(Math.atan2(a.y - cy, a.x - cx), Math.atan2(b.y - cy, b.x - cx));
      minR = Math.min(minR, Math.hypot(b.x - cx, b.y - cy));
      a = b;
    }
  }
  const length = run.moves.reduce((s, m) => s + (m.arc?.length ?? distance(m.a, m.b)), 0), gap = distance(run.moves[0].a, run.moves.at(-1).b);
  const polar = points.map((p) => ({ theta: (Math.atan2(p.y - cy, p.x - cx) + TAU2) % TAU2, r: Math.hypot(p.x - cx, p.y - cy) })).sort((a, b) => a.theta - b.theta), radial = [];
  let k = 0;
  for (let j = 0; j < 384; j++) {
    const theta = j / 384 * TAU2;
    while (k < polar.length - 1 && polar[k + 1].theta < theta) k++;
    let a = polar[k], b = polar[k + 1] || { theta: polar[0].theta + TAU2, r: polar[0].r };
    if (theta < a.theta) a = { theta: polar.at(-1).theta - TAU2, r: polar.at(-1).r };
    const f = clamp3((theta - a.theta) / Math.max(1e-9, b.theta - a.theta), 0, 1);
    radial.push(a.r + (b.r - a.r) * f);
  }
  return { cx, cy, minR, length, gap, winding, radial, closed: Math.abs(Math.abs(winding) - TAU2) < 0.22 && gap < Math.max(1.5, length * 0.02) };
}
function samplingStep(geom, p) {
  return Math.min(0.45, TAU2 * geom.minR / p.stitches / 16, p.pattern.enabled ? TAU2 * geom.minR / (p.pattern.cols * p.pattern.repeat) * p.pattern.transition / 4 : Infinity);
}
var round = (v, d = 4) => Number(v.toFixed(d));
function rewriteGCode(input, settings = {}) {
  const parsed = typeof input === "string" ? parseGCode(input) : input, p = pathSettings(settings), replacements = /* @__PURE__ */ new Map(), segments = [], original = [], report = { engine: "KNITFORM_PATH_ENGINE:3.0", settings: p, layers: parsed.totalLayers, changedLayers: [], changedLoops: 0, changedMoves: 0, segments: 0, oldFilament: 0, newFilament: 0, pathLength: 0, maxFlow: 0, minOverlap: Infinity, maxLayerShift: 0, toolChanges: (parsed.text.match(/^T\d+\s*$/gm) || []).length, warnings: [], bounds: { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] } };
  const end = p.endLayer || parsed.totalLayers, changed = /* @__PURE__ */ new Set(), centers = [], layerRuns = /* @__PURE__ */ new Map(), geometries = /* @__PURE__ */ new Map();
  let minSourceWidth = Infinity;
  if (end < p.startLayer) throw Error("\u7ED3\u675F\u5C42\u5FC5\u987B\u4E0D\u5C0F\u4E8E\u8D77\u59CB\u5C42\u3002");
  if (p.pattern.enabled) report.pattern = validatePatternPlan(parsed, p.pattern, p.startLayer, end);
  for (const run of parsed.runs) {
    if (run.layer < p.startLayer || run.layer > end) continue;
    const g = runGeometry(run);
    if (g.closed) {
      geometries.set(run, g);
      centers.push([g.cx, g.cy]);
    }
  }
  if (!centers.length) throw Error("\u6240\u9009\u5C42\u8303\u56F4\u5185\u6CA1\u6709\u53EF\u6539\u5199\u7684\u95ED\u5408\u5899\u73AF\u3002");
  const median = (values) => {
    const sorted = [...values].sort((a, b) => a - b), mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  };
  const origin = [median(centers.map((c) => c[0])), median(centers.map((c) => c[1]))];
  let estimatedSegments = 0;
  for (const [run, g] of geometries) for (const m of run.moves) estimatedSegments += Math.ceil((m.arc?.length ?? distance(m.a, m.b)) / samplingStep(g, p));
  if (estimatedSegments > 2e6) throw Error("\u9884\u8BA1\u8DEF\u5F84\u8D85\u8FC7 200 \u4E07\u6BB5\uFF0C\u8BF7\u51CF\u5C11\u73AF\u5411\u683C\u6570\u3001\u91CD\u590D\u6B21\u6570\u6216\u9488\u6570\uFF0C\u6216\u5148\u7F29\u77ED\u7F16\u8F91\u5C42\u8303\u56F4\u3002");
  if (centers.some((c) => Math.hypot(c[0] - origin[0], c[1] - origin[1]) > 1)) throw Error("\u5404\u5899\u73AF\u7684\u4E2D\u5FC3\u4E0D\u4E00\u81F4\u3002\u5F53\u524D\u8DEF\u7EBF\u4EC5\u652F\u6301\u5355\u4E2A\u540C\u5FC3\u65CB\u8F6C\u4F53\u3002");
  for (const run of parsed.runs) {
    if (run.layer < p.startLayer || run.layer > end) continue;
    const geom = geometries.get(run) || runGeometry(run);
    if (!geom.closed) {
      if (p.pattern.enabled || /Outer|External/i.test(run.feature)) throw Error(`\u7B2C ${run.layer} \u5C42\u5916\u5899\u4E0D\u662F\u5355\u4E2A\u8FD1\u95ED\u5408\u73AF\u3002\u8BF7\u5173\u95ED\u659C\u7F1D\u3001\u6A21\u7CCA\u8868\u9762\u3001\u65AD\u7EED\u5899\u53CA\u652F\u6491\u3002`);
      report.warnings.push(`\u7B2C ${run.layer} \u5C42\u6709\u975E\u95ED\u5408\u5185\u5899\uFF0C\u672A\u6539\u5199\u3002`);
      continue;
    }
    if (geom.minR < 3) throw Error("\u5899\u73AF\u534A\u5F84\u8FC7\u5C0F\uFF0C\u8BF7\u4F7F\u7528\u7A7A\u5FC3\u65CB\u8F6C\u4F53\u5C0F\u6837\u3002");
    geometries.set(run, geom);
    for (const m of run.moves) if (m.width > 0.1) minSourceWidth = Math.min(minSourceWidth, m.width);
    layerRuns.set(run.layer, (layerRuns.get(run.layer) || 0) + 1);
    const step = samplingStep(geom, p), ramp = Math.min(geom.length / 8, Math.max(1, TAU2 * geom.minR / p.stitches)), height = parsed.layers.find((l) => l.number === run.layer).height;
    if (!(height > 0 && height <= 1)) throw Error(`\u7B2C ${run.layer} \u5C42\u7684\u5C42\u9AD8\u65E0\u6CD5\u89E3\u6790\u3002`);
    let progress = 0, last = { ...run.moves[0].a }, absoluteE = last.e, eDelta = 0, restoredF = last.f;
    for (let k = 0; k < run.moves.length; k++) {
      const m = run.moves[k], oldLength = m.arc?.length ?? distance(m.a, m.b), n = Math.max(1, Math.ceil(oldLength / step)), ratio = m.de / oldLength * p.flow, rows = [];
      absoluteE = m.a.e + eDelta;
      if (k === 0) rows.push(`; KNITFORM_LOOP L${run.layer} phase=${pathPhase(run.layer, p, run.tool)} tool=${run.tool} pattern=${p.pattern.enabled ? "registered" : "off"} stitches=${p.stitches} amplitude=${p.amplitude}`);
      for (let j = 1; j <= n; j++) {
        const t = j / n, source = m.arc ? { x: m.arc.cx + m.arc.r * Math.cos(m.arc.t0 + m.arc.sweep * t), y: m.arc.cy + m.arc.r * Math.sin(m.arc.t0 + m.arc.sweep * t), z: m.b.z } : { x: m.a.x + (m.b.x - m.a.x) * t, y: m.a.y + (m.b.y - m.a.y) * t, z: m.b.z };
        if (j === n) {
          source.x = m.b.x;
          source.y = m.b.y;
        }
        const s = progress + oldLength * t, fade = clamp3(Math.min(s, geom.length - s) / ramp, 0, 1), theta = Math.atan2(source.y - origin[1], source.x - origin[0]), d = displacement(theta, run.layer, p, run.tool) * fade, rad = Math.hypot(source.x - origin[0], source.y - origin[1]), point2 = { x: round(origin[0] + (rad + d) * Math.cos(theta)), y: round(origin[1] + (rad + d) * Math.sin(theta)), z: m.b.z };
        if (k === run.moves.length - 1 && j === n) {
          point2.x = m.b.x;
          point2.y = m.b.y;
        }
        const len = distance(last, point2), de = len * ratio, fa = Math.PI * (p.filament / 2) ** 2, speed = Math.min(m.b.f / 60, p.maxSpeed, p.maxFlow / (ratio * fa)), f = Math.max(1, Math.floor(speed * 60));
        absoluteE += de;
        rows.push(`G1 X${point2.x.toFixed(4)} Y${point2.y.toFixed(4)} E${(m.b.eRelative ? de : absoluteE).toFixed(6)} F${f}`);
        segments.push({ a: [last.x, last.y, last.z], b: [point2.x, point2.y, point2.z], layer: run.layer, tool: m.tool, de, modified: true, feature: run.feature, width: m.width || p.lineWidth, height });
        for (let v = 0; v < 3; v++) {
          const val = [point2.x, point2.y, point2.z][v];
          report.bounds.min[v] = Math.min(report.bounds.min[v], val);
          report.bounds.max[v] = Math.max(report.bounds.max[v], val);
        }
        report.pathLength += len;
        report.newFilament += de;
        report.maxFlow = Math.max(report.maxFlow, ratio * fa * f / 60);
        last = point2;
      }
      eDelta = absoluteE - m.b.e;
      progress += oldLength;
      report.oldFilament += m.de;
      restoredF = m.b.f;
      if (k === run.moves.length - 1) {
        if (!m.b.eRelative) rows.push(`G92 E${m.b.e.toFixed(6)} ; restore source E coordinate`);
        rows.push(`G1 F${restoredF} ; restore source feedrate`, "; KNITFORM_LOOP_END");
      }
      replacements.set(m.i, rows.join("\n"));
      report.changedMoves++;
    }
    report.changedLoops++;
    changed.add(run.layer);
    const shift = 2 * p.amplitude * Math.abs(Math.sin(Math.PI * p.phase)) + (p.pattern.enabled ? 2 * p.pattern.depth : 0);
    report.maxLayerShift = Math.max(report.maxLayerShift, shift);
    report.minOverlap = Math.min(report.minOverlap, p.lineWidth - shift);
  }
  if (!report.changedLoops) throw Error("\u6240\u9009\u5C42\u8303\u56F4\u5185\u6CA1\u6709\u53EF\u6539\u5199\u7684\u5899\u73AF\u3002");
  const mean = origin;
  if (report.bounds.min[0] < 1 || report.bounds.min[1] < 1 || report.bounds.max[0] > p.bedSize - 1 || report.bounds.max[1] > p.bedSize - 1) throw Error("\u6539\u5199\u5899\u4F53\u8D85\u51FA\u6240\u8BBE\u5E73\u53F0\u8FB9\u754C\uFF0C\u8BF7\u68C0\u67E5\u5E73\u53F0\u5C3A\u5BF8\u548C\u6A21\u578B\u4F4D\u7F6E\u3002");
  const heights = parsed.layers.filter((l) => changed.has(l.number)).map((l) => l.height);
  if (Math.max(...heights) - Math.min(...heights) > 5e-3) throw Error("\u7F16\u8F91\u8303\u56F4\u5B58\u5728\u81EA\u9002\u5E94\u5C42\u9AD8\u3002\u8BF7\u5173\u95ED\u81EA\u9002\u5E94\u5C42\u9AD8\u540E\u91CD\u65B0\u5207\u7247\u3002");
  const sourceByLayer = /* @__PURE__ */ new Map();
  for (const r of parsed.runs) {
    if (!sourceByLayer.has(r.layer)) sourceByLayer.set(r.layer, []);
    sourceByLayer.get(r.layer).push(r);
  }
  let maxBaseShift = 0;
  const boundaries = /* @__PURE__ */ new Set([...changed, ...[...changed].map((l) => l + 1)]);
  for (const l of boundaries) {
    const prev = sourceByLayer.get(l - 1), cur = sourceByLayer.get(l);
    if (prev && cur) {
      const outermost = (runs) => runs.map((r) => geometries.get(r) || runGeometry(r)).filter((g) => g.closed).sort((a2, b3) => b3.minR - a2.minR)[0], a = outermost(prev), b = outermost(cur);
      if (!a || !b) continue;
      for (let i = 0; i < a.radial.length; i++) maxBaseShift = Math.max(maxBaseShift, Math.abs(a.radial[i] - b.radial[i]) + Math.hypot(a.cx - b.cx, a.cy - b.cy));
    }
  }
  report.maxLayerShift += maxBaseShift;
  report.effectiveLineWidth = Math.min(p.lineWidth, minSourceWidth);
  report.minOverlap = report.effectiveLineWidth - report.maxLayerShift;
  if (report.minOverlap < report.effectiveLineWidth * 0.15) throw Error(`\u5C42\u95F4\u642D\u63A5\u4E0D\u8DB3\uFF1A\u4F30\u7B97\u6700\u5927\u504F\u79FB ${report.maxLayerShift.toFixed(3)} mm\uFF0C\u7EBF\u5BBD ${report.effectiveLineWidth.toFixed(3)} mm\u3002\u8BF7\u51CF\u5C0F\u632F\u5E45/\u8F6E\u5ED3\u659C\u7387\uFF0C\u6216\u589E\u5927\u5B9E\u9645\u5207\u7247\u7EBF\u5BBD\u3002`);
  report.warnings.push("\u642D\u63A5\u4E3A\u5F84\u5411\u4E2D\u5FC3\u7EBF\u7684\u4FDD\u5B88\u4F30\u7B97\uFF1B\u6324\u51FA\u622A\u9762\u3001\u6750\u6599\u9ECF\u7ED3\u53CA\u5B9E\u7269\u8D28\u611F\u4ECD\u9700\u5C0F\u6837\u9A8C\u8BC1\u3002");
  if (report.minOverlap < p.lineWidth * 0.45) report.warnings.push("\u5C42\u95F4\u642D\u63A5\u5C11\u4E8E\u7EBF\u5BBD\u7684 45%\uFF0C\u5EFA\u8BAE\u51CF\u5C0F\u632F\u5E45\u3002");
  for (const m of parsed.moves) {
    if (replacements.has(m.i)) continue;
    const n = m.arc ? Math.max(1, Math.ceil(m.arc.length / 0.6)) : 1;
    let a = m.a;
    for (let j = 1; j <= n; j++) {
      const t = j / n, b = m.arc ? { x: m.arc.cx + m.arc.r * Math.cos(m.arc.t0 + m.arc.sweep * t), y: m.arc.cy + m.arc.r * Math.sin(m.arc.t0 + m.arc.sweep * t), z: m.b.z } : m.b;
      original.push({ a: [a.x, a.y, a.z], b: [b.x, b.y, b.z], layer: m.layer, tool: m.tool, de: m.de / n, modified: false, feature: m.feature, width: m.width || p.lineWidth, height: parsed.layers.find((l) => l.number === m.layer)?.height || 0.2 });
      a = b;
    }
  }
  report.changedLayers = [...changed].sort((a, b) => a - b);
  report.segments = segments.length;
  report.center = mean;
  report.extraFilament = report.newFilament - report.oldFilament;
  report.warnings = [...new Set(report.warnings)];
  if (report.pattern) {
    report.pattern.origin = origin;
    report.pattern.seamPolicy = "original endpoints with one-stitch fade";
    report.warnings.push("\u63D0\u82B1\u901A\u8FC7\u5B9E\u9645\u8272\u69FD\u7684\u5916\u51F8/\u5185\u6536\u5BF9\u9F50\uFF1B\u5185\u6536\u989C\u8272\u4ECD\u53EF\u80FD\u9732\u51FA\uFF0C\u6548\u679C\u53D6\u51B3\u4E8E\u6324\u51FA\u622A\u9762\u3001\u89C6\u89D2\u548C\u6750\u6599\u3002\u63A5\u7F1D\u6E10\u53D8\u533A\u57DF\u4E0D\u4FDD\u8BC1\u5B8C\u6574\u56FE\u6848\u3002");
    if (report.pattern.clippedRows) report.warnings.push(`\u6A21\u578B\u9AD8\u5EA6\u4EC5\u5BB9\u7EB3 ${report.pattern.visibleRows} \u884C\uFF0C\u9876\u90E8 ${report.pattern.clippedRows} \u884C\u672A\u6253\u5370\u3002`);
    if (report.pattern.bands.some((b) => !b.complete)) report.warnings.push("\u6700\u540E\u4E00\u884C\u56FE\u6848\u88AB\u7ED3\u675F\u5C42\u622A\u65AD\u3002");
    if (report.pattern.bands.some((b) => b.tools.length && b.minRepeats < 2)) report.warnings.push("\u90E8\u5206\u56FE\u6848\u884C\u6BCF\u79CD\u989C\u8272\u53EA\u51FA\u73B0\u4E00\u6B21\uFF1B\u589E\u52A0\u6BCF\u683C\u5C42\u6570\u53EF\u5F62\u6210\u8FDE\u7EED\u540C\u8272\u5806\u53E0\u3002");
  }
  const header = ["; KNITFORM_PATH_ENGINE:3.0", "; Edited planar walls; original start/end/AMS blocks retained. Do not re-slice.", "; Original time/filament statistics below are stale after editing.", `; KNITFORM_SETTINGS ${JSON.stringify(p)}`, `; KNITFORM_DELTA_FILAMENT_MM ${report.extraFilament.toFixed(3)}`].join("\n");
  const output = header + "\n" + parsed.lines.map((line, i) => replacements.get(i) ?? line).join("\n");
  return { text: output, report, segments: [...original, ...segments].sort((a, b) => a.layer - b.layer), layers: parsed.layers, replacements };
}

// src/core.js
var DEFAULTS = { name: "\u67D4\u5149 \xB7 \u73CD\u73E0\u7EC7\u7F69", shape: "orb", kind: "lamp", height: 168, diameter: 156, top: 0.46, base: 0.58, belly: 1, lobes: 8, flute: 0, twist: 0, texture: "knit", amplitude: 0.65, stitches: 88, rowHeight: 1.6, wall: 0.8, bottom: 1.2, hole: 40, palette: "pearl", bands: 5, layer: 0.2, nozzle: 0.4, lineWidth: 0.5, speed: 30, temperature: 210, bedTemperature: 55, bedSize: 256, bedHeight: 256, filament: 1.75, density: 1.24, quality: "standard", exportMode: "shell" };
var PALETTES = { pearl: ["#eae4d7", "#eae4d7"], lilac: ["#dcbce7", "#efdc6b"], moss: ["#233f35", "#a4c96c"], clay: ["#c58668", "#e4bd99"], ocean: ["#779fa5", "#d0e3db"], ink: ["#344148", "#738992"] };
var PRESETS = [
  { id: "pearl", label: "\u67D4\u5149\u7EC7\u7F69", tag: "\u706F\u7F69", description: "\u73CD\u73E0\u767D \xB7 \u7EC6\u5BC6\u4EBA\u5B57\u9488", params: { ...DEFAULTS } },
  { id: "lilac", label: "\u6625\u65E5\u7EC7\u74F6", tag: "\u82B1\u74F6", description: "\u4E01\u9999\u7D2B \xD7 \u5976\u6CB9\u9EC4", params: { ...DEFAULTS, name: "\u6625\u65E5 \xB7 \u7F57\u7EB9\u7EC7\u74F6", kind: "vase", shape: "waist", height: 195, diameter: 132, top: 0.91, base: 0.64, belly: 0.9, lobes: 8, flute: 0.06, hole: 0, palette: "lilac", texture: "seed", amplitude: 0.55, bands: 7 } },
  { id: "moss", label: "\u82D4\u7EFF\u7F16\u7BEE", tag: "\u88C5\u9970", description: "\u82D4\u7EFF\u8272 \xB7 \u68CB\u76D8\u7EC7\u6CD5", params: { ...DEFAULTS, name: "\u82D4\u7EFF \xB7 \u68CB\u76D8\u7F16\u7BEE", shape: "orb", kind: "vase", height: 116, diameter: 150, top: 0.76, base: 0.66, hole: 0, palette: "moss", texture: "basket", amplitude: 0.5, stitches: 72 } },
  { id: "clay", label: "\u8D64\u9676\u65CB\u7EB9", tag: "\u82B1\u74F6", description: "\u6696\u8D64\u9676 \xB7 \u626D\u8F6C\u9EBB\u82B1", params: { ...DEFAULTS, name: "\u8D64\u9676 \xB7 \u65CB\u7EB9\u82B1\u74F6", shape: "gourd", kind: "vase", height: 205, diameter: 122, top: 0.5, base: 0.67, hole: 0, palette: "clay", texture: "cable", twist: 45, amplitude: 0.55 } },
  { id: "ocean", label: "\u6F6E\u6C50\u6CE2\u7EB9", tag: "\u706F\u7F69", description: "\u96FE\u84DD\u8272 \xB7 \u6CE2\u6D6A\u7EB9\u7406", params: { ...DEFAULTS, name: "\u6F6E\u6C50 \xB7 \u6CE2\u7EB9\u706F\u7F69", shape: "cylinder", height: 160, diameter: 132, top: 0.86, base: 0.84, hole: 40, palette: "ocean", texture: "wave", amplitude: 0.5 } },
  { id: "ink", label: "\u58A8\u8272\u7F57\u7EB9", tag: "\u82B1\u74F6", description: "\u77F3\u58A8\u7070 \xB7 \u7EB5\u5411\u7EC7\u7EB9", params: { ...DEFAULTS, name: "\u58A8\u8272 \xB7 \u7F57\u7EB9\u82B1\u74F6", shape: "waist", kind: "vase", height: 186, diameter: 118, top: 0.85, base: 0.62, hole: 0, palette: "ink", texture: "rib", flute: 0.05, amplitude: 0.45 } }
];
var clamp4 = (x, a, b) => Math.min(b, Math.max(a, x));
function normalize(input = {}) {
  const p = { ...DEFAULTS, ...input };
  const ranges = { height: [30, 300], diameter: [30, 260], top: [0.2, 1.2], base: [0.25, 1.1], belly: [0.55, 1.15], lobes: [3, 24], flute: [0, 0.15], twist: [-180, 180], amplitude: [0, 1.5], stitches: [16, 144], rowHeight: [0.6, 5], wall: [0.4, 3], bottom: [0.6, 4], hole: [0, 80], bands: [1, 12], layer: [0.08, 0.4], nozzle: [0.2, 0.8], lineWidth: [0.25, 1.2], speed: [10, 100], temperature: [170, 270], bedTemperature: [0, 110], bedSize: [120, 400], bedHeight: [120, 400], filament: [1.5, 3], density: [0.9, 1.5] };
  for (const [k, [a, b]] of Object.entries(ranges)) {
    const n = Number(p[k]);
    p[k] = clamp4(Number.isFinite(n) ? n : DEFAULTS[k], a, b);
  }
  for (const k of ["lobes", "stitches", "bands"]) p[k] = Math.round(p[k]);
  for (const [key, values] of Object.entries({ shape: ["orb", "waist", "gourd", "cylinder"], kind: ["lamp", "vase"], texture: ["knit", "seed", "basket", "cable", "wave", "rib", "none"], palette: Object.keys(PALETTES), quality: ["draft", "standard", "fine"], exportMode: ["shell", "solid"] })) if (!values.includes(p[key])) p[key] = DEFAULTS[key];
  p.name = typeof p.name === "string" ? p.name.trim().slice(0, 60) || DEFAULTS.name : DEFAULTS.name;
  if (p.kind === "vase") p.hole = 0;
  Object.assign(p, normalizeColorSettings(p, PALETTES[p.palette]));
  p.pathConfig = pathSettings(p.pathConfig);
  return p;
}
function interp(points, t) {
  const x = clamp4(t, 0, 1) * (points.length - 1), i = Math.min(points.length - 2, Math.floor(x)), f = x - i;
  const d = points[i + 1] - points[i], before = i > 0 ? points[i] - points[i - 1] : d, after = i + 2 < points.length ? points[i + 2] - points[i + 1] : d;
  const tangent = (a, b) => a * b <= 0 ? 0 : 2 * a * b / (a + b);
  const m0 = tangent(before, d), m1 = tangent(d, after), f2 = f * f, f3 = f2 * f;
  return (2 * f3 - 3 * f2 + 1) * points[i] + (f3 - 2 * f2 + f) * m0 + (-2 * f3 + 3 * f2) * points[i + 1] + (f3 - f2) * m1;
}
function profile(p, t) {
  const b = p.belly;
  const profiles = { orb: [p.base, 0.83 * b, 0.98 * b, b, 0.96 * b, 0.8 * b, p.top], waist: [p.base, 0.94 * b, b, 0.83 * b, 0.72 * b, 0.79 * b, p.top], gourd: [p.base, 0.94 * b, b, 0.82 * b, 0.57 * b, 0.48 * b, p.top], cylinder: [p.base, 0.95 * b, b, b, b, 0.96 * b, p.top] };
  return p.diameter / 2 * interp(profiles[p.shape], t);
}
function relief(p, theta, z) {
  const t = z / p.height, a = theta + p.twist * Math.PI / 180 * t;
  const repeatUnit = { basket: 6, cable: 3, wave: 3, rib: 2 }[p.texture] || 1;
  const periodicStitches = Math.max(repeatUnit, Math.round(p.stitches / repeatUnit) * repeatUnit);
  const u = a * periodicStitches / (2 * Math.PI), v = z / p.rowHeight;
  let q = 0;
  switch (p.texture) {
    case "knit": {
      const f = (u % 1 + 1) % 1;
      q = Math.cos(2 * Math.PI * (v - 0.85 * Math.abs(f - 0.5))) * 0.44 + Math.cos(2 * Math.PI * u) * 0.32;
      break;
    }
    case "seed":
      q = 0.68 * Math.cos(2 * Math.PI * (u + 0.24 * Math.sin(Math.PI * v))) * Math.cos(Math.PI * v);
      break;
    case "basket": {
      const c = Math.sin(2 * Math.PI * u / 6) * Math.sin(2 * Math.PI * v / 6), blend = 0.5 + 0.5 * Math.tanh(c * 4);
      q = 0.56 * (blend * Math.cos(2 * Math.PI * u) + (1 - blend) * Math.cos(2 * Math.PI * v));
      break;
    }
    case "cable":
      q = 0.65 * Math.cos(2 * Math.PI * (u / 3 + 0.34 * Math.sin(v * Math.PI / 4)));
      break;
    case "wave":
      q = 0.65 * Math.sin(2 * Math.PI * (u / 3 + 0.25 * Math.sin(v)));
      break;
    case "rib":
      q = 0.7 * Math.cos(2 * Math.PI * u / 2);
      break;
  }
  const fade = clamp4(z / 2, 0, 1) * clamp4((p.height - z) / 1.4, 0, 1);
  return p.amplitude * q * fade;
}
function radius(p, theta, z, textured = true) {
  const t = clamp4(z / p.height, 0, 1), a = theta + p.twist * Math.PI / 180 * t;
  const r = profile(p, t) * (1 + p.flute * Math.cos(a * p.lobes));
  return Math.max(p.wall + 1, r + (textured ? relief(p, theta, z) : 0));
}
function resolution(p, preview = false) {
  const factor = p.quality === "fine" ? 1.5 : p.quality === "draft" ? 0.65 : 1;
  return { n: Math.min(preview ? 320 : 768, Math.max(128, Math.ceil(p.stitches * (preview ? 4 : 6) * factor / 8) * 8)), m: Math.min(preview ? 480 : 1400, Math.max(60, Math.ceil(p.height / Math.min(preview ? 0.48 : 0.3, p.rowHeight / 6) * factor))) };
}
function createMesh(input, options = {}) {
  const p = normalize(input), res = resolution(p, options.preview), n = options.n || res.n, m = options.m || res.m;
  const mode = options.mode || p.exportMode, positions = [], indices = [];
  const ring = (z, fn) => {
    const ids = [];
    for (let j = 0; j < n; j++) {
      const theta = j / n * 2 * Math.PI, r = fn(theta);
      ids.push(positions.length / 3);
      positions.push(r * Math.cos(theta), r * Math.sin(theta), z);
    }
    return ids;
  };
  const connect = (a, b, reverse = false) => {
    for (let j = 0; j < n; j++) {
      const k = (j + 1) % n;
      const tris = [a[j], a[k], b[j], a[k], b[k], b[j]];
      if (reverse) {
        indices.push(tris[0], tris[2], tris[1], tris[3], tris[5], tris[4]);
      } else indices.push(...tris);
    }
  };
  const disk = (r, z, up) => {
    const c = positions.length / 3;
    positions.push(0, 0, z);
    for (let j = 0; j < n; j++) {
      const k = (j + 1) % n;
      indices.push(c, up ? r[j] : r[k], up ? r[k] : r[j]);
    }
  };
  let outerFirst, outerPrev;
  for (let i = 0; i <= m; i++) {
    const z = i / m * p.height, current = ring(z, (t) => radius(p, t, z));
    if (i === 0) outerFirst = current;
    else connect(outerPrev, current);
    outerPrev = current;
  }
  const outerCount = indices.length;
  let innerCount = 0;
  if (mode === "solid") {
    disk(outerFirst, 0, false);
    disk(outerPrev, p.height, true);
  } else {
    const innerM = Math.max(2, Math.ceil(m * (p.height - p.bottom) / p.height));
    let innerFirst, innerPrev;
    for (let i = 0; i <= innerM; i++) {
      const z = p.bottom + i / innerM * (p.height - p.bottom), current = ring(z, (t) => radius(p, t, z) - p.wall);
      if (i === 0) innerFirst = current;
      else connect(innerPrev, current, true);
      innerPrev = current;
    }
    innerCount = indices.length - outerCount;
    connect(outerPrev, innerPrev);
    if (p.hole > 0) {
      const holeR = p.hole / 2;
      const hb = ring(0, () => holeR), ht = ring(p.bottom, () => holeR);
      connect(hb, outerFirst);
      connect(hb, ht, true);
      connect(innerFirst, ht);
    } else {
      disk(outerFirst, 0, false);
      disk(innerFirst, p.bottom, true);
    }
  }
  return { positions: new Float32Array(positions), indices: new Uint32Array(indices), n, m, params: p, outerCount, innerCount };
}
function metrics(p) {
  let area = 0, volume = 0, maxR = 0, minR = Infinity, maxShift = 0;
  const m = 160, n = 96, dz = p.height / m, dt = 2 * Math.PI / n;
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {
    const z = (i + 0.5) * dz, t = j * dt, r = radius(p, t, z), rz = (radius(p, t, Math.min(p.height, z + dz / 2)) - radius(p, t, Math.max(0, z - dz / 2))) / dz, rt = (radius(p, t + dt / 2, z) - radius(p, t - dt / 2, z)) / dt;
    area += Math.sqrt(r * r * (1 + rz * rz) + rt * rt) * dt * dz;
    volume += r * r * 0.5 * dt * dz;
    maxR = Math.max(maxR, r);
    minR = Math.min(minR, r);
  }
  const baseR = profile(p, 0) * (1 + p.flute), floor = Math.max(0, Math.PI * (baseR * baseR - p.hole * p.hole / 4) * p.bottom);
  const plastic = area * p.wall + floor, grams = plastic / 1e3 * p.density;
  for (let i = 0; i < 100; i++) for (let j = 0; j < 128; j++) {
    const z = i / 100 * (p.height - p.layer), t = j / 128 * 2 * Math.PI;
    maxShift = Math.max(maxShift, Math.abs(radius(p, t, z + p.layer) - radius(p, t, z)));
  }
  return { area, volume: volume / 1e3, grams, maxR, minR, maxShift, layers: Math.ceil(p.height / p.layer), minutes: plastic / (p.lineWidth * p.layer * p.speed * 60) * 1.15, filament: plastic / (Math.PI * (p.filament / 2) ** 2) / 1e3 };
}
function validate(input) {
  const p = normalize(input), s = metrics(p), issues = [];
  if (2 * s.maxR + 10 > p.bedSize) issues.push({ level: "error", text: `\u6A21\u578B\u52A0\u8FB9\u8DDD\u9700 ${(2 * s.maxR + 10).toFixed(1)} mm\uFF0C\u8D85\u8FC7 ${p.bedSize} mm \u5E73\u53F0\u3002` });
  if (p.height > p.bedHeight) issues.push({ level: "error", text: `\u9AD8\u5EA6\u8D85\u8FC7 ${p.bedHeight} mm \u6253\u5370\u7A7A\u95F4\u3002` });
  if (p.hole > 0 && p.hole / 2 + p.wall + 2 > Math.min(profile(p, 0), profile(p, p.bottom / p.height)) * (1 - p.flute)) issues.push({ level: "error", text: "\u5B89\u88C5\u5B54\u8FC7\u5927\uFF0C\u8BF7\u51CF\u5C0F\u5B54\u5F84\u6216\u589E\u5927\u5E95\u90E8\u6BD4\u4F8B\u3002" });
  if (p.layer > p.nozzle * 0.75) issues.push({ level: "error", text: "\u5C42\u9AD8\u8D85\u8FC7\u55B7\u5634\u76F4\u5F84\u7684 75%\uFF0C\u8BF7\u964D\u4F4E\u5C42\u9AD8\u3002" });
  if (p.lineWidth < p.nozzle * 0.9 || p.lineWidth > p.nozzle * 1.8) issues.push({ level: "error", text: "\u7EBF\u5BBD\u5E94\u5728\u55B7\u5634\u76F4\u5F84\u7684 0.9\u20131.8 \u500D\u4E4B\u95F4\u3002" });
  if (s.maxShift > p.lineWidth * 0.65) issues.push({ level: "warning", text: `\u5C40\u90E8\u5C42\u95F4\u504F\u79FB\u7EA6 ${s.maxShift.toFixed(2)} mm\uFF0C\u5EFA\u8BAE\u51CF\u5C0F\u7EB9\u7406\u8D77\u4F0F\u3001\u52A0\u5927\u9488\u8DDD\u6216\u4F7F\u7528\u5C0F\u6837\u8BD5\u6253\u3002` });
  if (p.wall < p.lineWidth * 0.9) issues.push({ level: "warning", text: "\u8584\u58C1\u539A\u5EA6\u5C0F\u4E8E\u5F53\u524D\u7EBF\u5BBD\uFF0C\u5EFA\u8BAE\u589E\u52A0\u58C1\u539A\u6216\u51CF\u5C0F\u7EBF\u5BBD\u3002" });
  if (p.kind === "lamp" && p.hole > 0) issues.push({ level: "info", text: `\u5E95\u90E8\u9884\u7559 \xD8${p.hole} mm \u5B89\u88C5\u5B54\uFF1B\u8BF7\u6309\u5B9E\u9645\u706F\u5EA7\u5C3A\u5BF8\u6838\u5BF9\u3002` });
  return { params: p, stats: s, issues, valid: !issues.some((x) => x.level === "error") };
}
function exportSTL(mesh) {
  const count = mesh.indices.length / 3, buf = new ArrayBuffer(84 + count * 50), v = new DataView(buf);
  new Uint8Array(buf, 0, 80).set(new TextEncoder().encode("KNITFORM binary STL | millimeter units | z up"));
  v.setUint32(80, count, true);
  const p = mesh.positions, idx = mesh.indices;
  let o = 84;
  for (let i = 0; i < idx.length; i += 3) {
    let a = idx[i] * 3, b = idx[i + 1] * 3, c = idx[i + 2] * 3;
    const ux = p[b] - p[a], uy = p[b + 1] - p[a + 1], uz = p[b + 2] - p[a + 2], vx = p[c] - p[a], vy = p[c + 1] - p[a + 1], vz = p[c + 2] - p[a + 2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz) || 1;
    for (const value of [nx / len, ny / len, nz / len, p[a], p[a + 1], p[a + 2], p[b], p[b + 1], p[b + 2], p[c], p[c + 1], p[c + 2]]) {
      v.setFloat32(o, value, true);
      o += 4;
    }
    o += 2;
  }
  return new Uint8Array(buf);
}

// src/bambu-package.js
var import_spark_md5 = __toESM(require_spark_md5(), 1);
function readSlicedPackage(bytes) {
  let expanded = 0, count = 0;
  if (bytes.byteLength > 80 * 1024 * 1024) throw Error("\u6587\u4EF6\u8D85\u8FC7 80 MB\uFF0C\u8BF7\u4F7F\u7528\u5C0F\u6837\u3002");
  const files = unzipSync(bytes, { filter: (entry) => {
    expanded += entry.originalSize;
    if (expanded > 250 * 1024 * 1024 || ++count > 5e3) throw Error("\u89E3\u538B\u6587\u4EF6\u8D85\u8FC7 250 MB \u6216\u5305\u542B\u8FC7\u591A\u6761\u76EE\uFF0C\u8BF7\u4F7F\u7528\u5C0F\u6837\u3002");
    return true;
  } });
  const keys = Object.keys(files).filter((n) => /^Metadata\/plate_\d+\.gcode$/.test(n));
  if (keys.length !== 1) throw Error("\u8BF7\u9009\u62E9\u53EA\u542B\u4E00\u4E2A\u5DF2\u5207\u7247\u5E73\u53F0\u7684 3MF\u3002");
  if (Object.values(files).reduce((s, v) => s + v.byteLength, 0) > 250 * 1024 * 1024) throw Error("\u89E3\u538B\u6587\u4EF6\u8D85\u8FC7 250 MB\uFF0C\u8BF7\u4F7F\u7528\u5C0F\u6837\u3002");
  return { files, key: keys[0], text: strFromU8(files[keys[0]]) };
}
function packEditedGCode(sourceArchive, result) {
  const { files, key } = readSlicedPackage(sourceArchive);
  if (!/^; KNITFORM_PATH_ENGINE:(?:2|3)\.0/m.test(result.text)) throw Error("\u6CA1\u6709\u53EF\u5C01\u88C5\u7684\u6539\u5199\u8DEF\u5F84\u3002");
  const bytes = strToU8(result.text);
  files[key] = bytes;
  files[key + ".md5"] = strToU8(import_spark_md5.default.ArrayBuffer.hash(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)).toUpperCase());
  updateMachineIdentity(files, result.report.nativeSlicer);
  const index = /plate_(\d+)/.exec(key)[1], jsonKey = `Metadata/plate_${index}.json`;
  if (files[jsonKey]) {
    const meta = JSON.parse(strFromU8(files[jsonKey])), b = result.report.bounds, margin = result.report.effectiveLineWidth / 2, box = [b.min[0] - margin, b.min[1] - margin, b.max[0] + margin, b.max[1] + margin], union = (old) => Array.isArray(old) && old.length === 4 ? [Math.min(old[0], box[0]), Math.min(old[1], box[1]), Math.max(old[2], box[2]), Math.max(old[3], box[3])] : box;
    meta.bbox_all = union(meta.bbox_all);
    if (meta.bbox_objects?.length === 1) meta.bbox_objects[0].bbox = union(meta.bbox_objects[0].bbox);
    files[jsonKey] = strToU8(JSON.stringify(meta));
  }
  files["Metadata/knitform-path-report.json"] = strToU8(JSON.stringify({ ...result.report, statisticsStale: true, thumbnailShowsOriginalBody: true, physicalPrintTested: false }, null, 2));
  makePrintOnly(files);
  return zipSync(files, { level: 6 });
}
function updateMachineIdentity(files, identity) {
  if (identity?.modelId) {
    const config = JSON.parse(strFromU8(files["Metadata/project_settings.config"]));
    if (config.printer_settings_id !== identity.printer || config.printer_model !== identity.model) throw Error("\u5207\u7247\u673A\u578B\u914D\u7F6E\u4E0E\u6253\u5370\u5305\u8EAB\u4EFD\u4E0D\u4E00\u81F4\u3002");
    if (!/^[A-Za-z0-9-]+$/.test(identity.modelId)) throw Error("\u65E0\u6548\u7684\u673A\u578B\u7F16\u53F7\u3002");
    const infoKey = "Metadata/slice_info.config";
    if (!files[infoKey]) throw Error("\u5207\u7247\u5305\u7F3A\u5C11\u6253\u5370\u53D1\u9001\u5143\u6570\u636E\u3002");
    let info = strFromU8(files[infoKey]), updated = false;
    info = info.replace(/<metadata\b[^>]*\/>/g, (tag) => {
      if (!/\bkey="printer_model_id"/.test(tag)) return tag;
      updated = true;
      return tag.replace(/\bvalue="[^"]*"/, `value="${identity.modelId}"`);
    });
    if (!updated) info = info.replace("<plate>", `<plate>
    <metadata key="printer_model_id" value="${identity.modelId}"/>`);
    if (!info.includes(`key="printer_model_id" value="${identity.modelId}"`)) throw Error("\u672A\u80FD\u5199\u5165\u6253\u5370\u53D1\u9001\u673A\u578B\u7F16\u53F7\u3002");
    files[infoKey] = strToU8(info);
  }
}
function stampSlicedMachineIdentity(sourceArchive, identity) {
  const { files } = readSlicedPackage(sourceArchive);
  updateMachineIdentity(files, identity);
  makePrintOnly(files);
  return zipSync(files, { level: 6 });
}
function makePrintOnly(files) {
  const modelKey = "3D/3dmodel.model";
  if (files[modelKey]) {
    let model = strFromU8(files[modelKey]);
    model = model.replace(/<resources\b[^>]*>[\s\S]*?<\/resources>/g, "<resources/>").replace(/<build\b[^>]*>[\s\S]*?<\/build>/g, "<build/>");
    files[modelKey] = strToU8(model);
  }
  for (const key of Object.keys(files)) if (key.startsWith("3D/Objects/") || key === "3D/_rels/3dmodel.model.rels") delete files[key];
  const configKey = "Metadata/model_settings.config";
  if (files[configKey]) {
    let config = strFromU8(files[configKey]);
    config = config.replace(/<object\b[^>]*>[\s\S]*?<\/object>/g, "").replace(/<model_instance\b[^>]*>[\s\S]*?<\/model_instance>/g, "").replace(/<assemble\b[^>]*>[\s\S]*?<\/assemble>/g, "");
    files[configKey] = strToU8(config);
  }
}

// src/mesh-import.js
var decode = (s) => s.replace(/&(?:amp|lt|gt|quot|apos);/g, (m) => ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'" })[m]);
function attrs(text) {
  const out = {};
  for (const m of text.matchAll(/([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) out[m[1]] = decode(m[2] ?? m[3]);
  return out;
}
var ID = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
function transform(value) {
  if (!value) return ID;
  const a = value.trim().split(/\s+/).map(Number);
  if (a.length !== 12 || a.some((v) => !Number.isFinite(v))) throw Error("3MF \u5305\u542B\u65E0\u6548\u53D8\u6362\u77E9\u9635\u3002");
  return a;
}
function point(a, m) {
  return [a[0] * m[0] + a[1] * m[3] + a[2] * m[6] + m[9], a[0] * m[1] + a[1] * m[4] + a[2] * m[7] + m[10], a[0] * m[2] + a[1] * m[5] + a[2] * m[8] + m[11]];
}
function safePath(value, current) {
  if (/^[a-z]+:|\\|\.\./i.test(value)) throw Error("3MF \u90E8\u4EF6\u8DEF\u5F84\u4E0D\u53D7\u652F\u6301\u3002");
  return value.startsWith("/") ? value.slice(1) : current.slice(0, current.lastIndexOf("/") + 1) + value;
}
function meshFrom3MF(files) {
  const cache = /* @__PURE__ */ new Map(), read = (path) => {
    if (cache.has(path)) return cache.get(path);
    const bytes = files[path];
    if (!bytes) throw Error("\u5207\u7247\u5305\u6CA1\u6709\u539F\u59CB 3MF \u6A21\u578B\u3002\u8BF7\u5BFC\u5165\u542B\u6A21\u578B\u7684 3MF\uFF0C\u6216\u9009\u62E9\u201C\u5F53\u524D\u9020\u578B\u201D\u751F\u6210\u3002");
    const xml = new TextDecoder().decode(bytes);
    if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw Error("3MF \u5305\u542B\u4E0D\u652F\u6301\u7684\u6587\u6863\u5B9E\u4F53\u3002");
    const root = attrs(/<(?:\w+:)?model\b([^>]*)>/.exec(xml)?.[1] || ""), unit = { millimeter: 1, micron: 1e-3, centimeter: 10, meter: 1e3, inch: 25.4, foot: 304.8 }[root.unit || "millimeter"];
    if (!unit) throw Error("3MF \u957F\u5EA6\u5355\u4F4D\u4E0D\u53D7\u652F\u6301\u3002");
    const objects = /* @__PURE__ */ new Map();
    for (const m of xml.matchAll(/<(?:\w+:)?object\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?object\s*>/g)) {
      const a = attrs(m[1]);
      objects.set(a.id, { attributes: a, body: m[2] });
    }
    const model = { xml, unit, objects };
    cache.set(path, model);
    return model;
  };
  const topPath = "3D/3dmodel.model", top = read(topPath), build = /<(?:\w+:)?build\b[^>]*>([\s\S]*?)<\/(?:\w+:)?build\s*>/.exec(top.xml)?.[1] || "", items = [...build.matchAll(/<(?:\w+:)?item\b([^>]*)\/?\s*>/g)].map((m) => attrs(m[1])).filter((a) => a.printable !== "0");
  if (items.length !== 1) throw Error("\u81EA\u52A8\u914D\u8272\u4EC5\u652F\u6301\u5355\u4E2A\u6253\u5370\u6A21\u578B\uFF1B\u8BF7\u4F7F\u7528\u5355\u6A21\u578B 3MF\uFF0C\u64E6\u6599\u5854\u7531\u8F6F\u4EF6\u751F\u6210\u3002");
  const positions = [], indices = [];
  let vertices = 0;
  function visit(path, id, chain, parents = []) {
    const key = path + "#" + id;
    if (parents.includes(key) || parents.length > 16) throw Error("3MF \u5305\u542B\u5FAA\u73AF\u6216\u8FC7\u6DF1\u90E8\u4EF6\u5F15\u7528\u3002");
    const model = read(path), obj = model.objects.get(id);
    if (!obj) throw Error("3MF \u6A21\u578B\u5F15\u7528\u4E0D\u5B58\u5728\u3002");
    const components = [...obj.body.matchAll(/<(?:\w+:)?component\b([^>]*)\/?\s*>/g)];
    if (components.length) {
      for (const m of components) {
        const a = attrs(m[1]), external = Object.entries(a).find(([k]) => k === "path" || k.endsWith(":path"))?.[1];
        visit(external ? safePath(external, path) : path, a.objectid, [transform(a.transform), ...chain], [...parents, key]);
      }
      return;
    }
    const local = [];
    for (const m of obj.body.matchAll(/<(?:\w+:)?vertex\b([^>]*)\/?\s*>/g)) {
      const a = attrs(m[1]);
      let v = [+a.x, +a.y, +a.z];
      if (v.some((n) => !Number.isFinite(n))) throw Error("3MF \u9876\u70B9\u4E0D\u662F\u6709\u9650\u6570\u503C\u3002");
      v = v.map((x) => x * model.unit);
      for (const matrix of chain) v = point(v, matrix);
      local.push(v);
      if (++vertices > 12e5) throw Error("\u6A21\u578B\u8D85\u8FC7 120 \u4E07\u9876\u70B9\uFF0C\u8BF7\u964D\u4F4E\u7F51\u683C\u7CBE\u5EA6\u3002");
    }
    const base = positions.length / 3;
    for (const v of local) positions.push(...v);
    for (const m of obj.body.matchAll(/<(?:\w+:)?triangle\b([^>]*)\/?\s*>/g)) {
      const a = attrs(m[1]), tri = [+a.v1, +a.v2, +a.v3];
      if (tri.some((i) => !Number.isInteger(i) || i < 0 || i >= local.length)) throw Error("3MF \u4E09\u89D2\u9762\u7D22\u5F15\u65E0\u6548\u3002");
      indices.push(...tri.map((i) => i + base));
      if (indices.length > 36e5) throw Error("\u6A21\u578B\u8D85\u8FC7 120 \u4E07\u4E09\u89D2\u9762\uFF0C\u8BF7\u964D\u4F4E\u7F51\u683C\u7CBE\u5EA6\u3002");
    }
  }
  visit(topPath, items[0].objectid, [transform(items[0].transform)]);
  if (indices.length < 12) throw Error("3MF \u4E2D\u6CA1\u6709\u53EF\u5207\u7247\u7684\u4E09\u89D2\u7F51\u683C\u3002");
  const bounds = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  for (let i = 0; i < positions.length; i++) {
    const axis = i % 3;
    bounds.min[axis] = Math.min(bounds.min[axis], positions[i]);
    bounds.max[axis] = Math.max(bounds.max[axis], positions[i]);
  }
  return { positions: new Float32Array(positions), indices: new Uint32Array(indices), bounds, source: "original-3mf-mesh" };
}
function stlFrom3MF(files) {
  const mesh = meshFrom3MF(files);
  return { bytes: exportSTL(mesh), bounds: mesh.bounds, source: mesh.source };
}
function readModelPackage(bytes) {
  if (bytes.byteLength > 80 * 1024 * 1024) throw Error("3MF \u8D85\u8FC7 80 MB\uFF0C\u8BF7\u4F7F\u7528\u5C0F\u6837\u3002");
  let expanded = 0, count = 0;
  return unzipSync(bytes, { filter: (entry) => {
    expanded += entry.originalSize;
    if (expanded > 250 * 1024 * 1024 || ++count > 5e3) throw Error("3MF \u89E3\u538B\u540E\u8FC7\u5927\uFF0C\u8BF7\u964D\u4F4E\u6A21\u578B\u7CBE\u5EA6\u3002");
    return true;
  } });
}

// src/path-mesh.js
var average = (a) => a.reduce((s, v) => s + v, 0) / a.length;
function meshFromPaths(text) {
  const parsed = parseGCode(text), byLayer = /* @__PURE__ */ new Map();
  for (const run of parsed.runs) {
    const g = runGeometry(run);
    if (!g.closed) continue;
    const width = run.moves.find((m) => m.width > 0)?.width || 0.45, r = average(g.radial);
    if (!byLayer.has(run.layer)) byLayer.set(run.layer, []);
    byLayer.get(run.layer).push({ ...g, width, r, feature: run.feature });
  }
  const records = [];
  for (const layer of parsed.layers) {
    const rings = byLayer.get(layer.number) || [], outer = rings.filter((g) => /Outer|External/i.test(g.feature)).sort((a, b) => b.r - a.r)[0];
    if (!outer) throw Error(`\u7B2C ${layer.number} \u5C42\u7F3A\u5C11\u95ED\u5408\u5916\u5899\uFF0C\u65E0\u6CD5\u81EA\u52A8\u91CD\u5EFA\u5355\u8272\u5207\u7247\u3002\u8BF7\u5BFC\u5165\u539F\u59CB\u6A21\u578B 3MF\u3002`);
    const shell = rings.filter((g) => g.r < outer.r - 0.05 && g.r > outer.r * 0.7).sort((a, b) => a.r - b.r)[0], hole = rings.filter((g) => g.r < outer.r * 0.7).sort((a, b) => a.r - b.r)[0];
    records.push({ layer, ...outer, outer: outer.radial.map((r) => r + outer.width / 2), inner: shell ? shell.radial.map((r) => r - shell.width / 2) : outer.radial.map((r) => r - outer.width * 1.5), hole: hole ? hole.radial.map((r) => Math.max(0, r - hole.width / 2)) : null });
  }
  if (records.length < 2) throw Error("\u53EF\u7528\u4E8E\u91CD\u5EFA\u7684\u5899\u5C42\u8FC7\u5C11\uFF0C\u8BF7\u5BFC\u5165\u539F\u59CB\u6A21\u578B\u3002");
  const center = [average(records.map((r) => r.cx)), average(records.map((r) => r.cy))];
  if (records.some((r) => Math.hypot(r.cx - center[0], r.cy - center[1]) > 0.5)) throw Error("\u5BFC\u5165\u5207\u7247\u4E0D\u662F\u540C\u5FC3\u7A7A\u5FC3\u5668\u7269\uFF0C\u8BF7\u5BFC\u5165\u539F\u59CB\u6A21\u578B 3MF\u3002");
  const filled = /* @__PURE__ */ new Set();
  function segmentRadius(m) {
    const ax = m.a.x - center[0], ay = m.a.y - center[1], dx = m.b.x - m.a.x, dy = m.b.y - m.a.y, t = Math.max(0, Math.min(1, -(ax * dx + ay * dy) / (dx * dx + dy * dy || 1)));
    return Math.hypot(ax + dx * t, ay + dy * t);
  }
  for (const m of parsed.moves) {
    const record = records[m.layer - 1];
    if (!record || m.wall || !/solid|bottom|top surface|bridge/i.test(m.feature) || /tower|support/i.test(m.feature)) continue;
    if (segmentRadius(m) < record.r * 0.7) filled.add(m.layer);
  }
  let floorLayer = 0;
  for (const r of records) {
    if (filled.has(r.layer.number)) floorLayer = r.layer.number;
    else if (floorLayer) break;
  }
  if ([...filled].some((l) => l > floorLayer + 2)) throw Error("\u5207\u7247\u5305\u542B\u4E2D\u95F4\u5B9E\u4F53\u586B\u5145\uFF0C\u65E0\u6CD5\u6309\u7A7A\u5FC3\u5668\u7269\u81EA\u52A8\u6062\u590D\uFF1B\u8BF7\u5BFC\u5165\u539F\u59CB\u6A21\u578B 3MF\u3002");
  const floorZ = floorLayer ? records[floorLayer - 1].layer.z : 0, last = records.at(-1), n = last.outer.length, positions = [], indices = [];
  const ring = (rad, z) => {
    const start = positions.length / 3;
    for (let j = 0; j < n; j++) {
      const theta = j / n * Math.PI * 2;
      positions.push(rad[j] * Math.cos(theta), rad[j] * Math.sin(theta), z);
    }
    return start;
  };
  function connect(a, b, inward = false) {
    for (let j = 0; j < n; j++) {
      const k = (j + 1) % n;
      if (inward) indices.push(a + j, b + k, b + j, a + j, a + k, b + k);
      else indices.push(a + j, b + j, b + k, a + j, b + k, a + k);
    }
  }
  const outerRings = [ring(records[0].outer, 0)];
  for (const r of records) outerRings.push(ring(r.outer, Math.max(0, r.layer.z - r.layer.height / 2)));
  outerRings.push(ring(last.outer, last.layer.z));
  for (let i = 1; i < outerRings.length; i++) connect(outerRings[i - 1], outerRings[i]);
  const cavity = records.filter((r) => r.layer.z > floorZ + 1e-4);
  if (!cavity.length) throw Error("\u5207\u7247\u6CA1\u6709\u5F00\u653E\u7684\u5185\u8154\u3002");
  const innerRings = [ring(cavity[0].inner, floorZ)];
  for (const r of cavity) {
    const z = r.layer.z - r.layer.height / 2;
    if (z > floorZ + 1e-4) innerRings.push(ring(r.inner, z));
  }
  innerRings.push(ring(last.inner, last.layer.z));
  for (let i = 1; i < innerRings.length; i++) connect(innerRings[i - 1], innerRings[i], true);
  connect(outerRings.at(-1), innerRings.at(-1));
  if (floorZ > 0 && records[0].hole) {
    const holeBottom = ring(records[0].hole, 0), holeTop = ring(records[Math.max(0, floorLayer - 1)].hole || records[0].hole, floorZ);
    connect(holeBottom, holeTop, true);
    connect(holeBottom, outerRings[0]);
    connect(innerRings[0], holeTop);
  } else if (floorZ > 0) {
    const bottom = positions.length / 3;
    positions.push(0, 0, 0);
    const top = positions.length / 3;
    positions.push(0, 0, floorZ);
    for (let j = 0; j < n; j++) {
      const k = (j + 1) % n;
      indices.push(bottom, outerRings[0] + j, outerRings[0] + k, top, innerRings[0] + k, innerRings[0] + j);
    }
  } else connect(innerRings[0], outerRings[0]);
  for (let i = 0; i < indices.length; i += 3) [indices[i + 1], indices[i + 2]] = [indices[i + 2], indices[i + 1]];
  return { positions: new Float32Array(positions), indices: new Uint32Array(indices), source: "reconstructed-from-sliced-walls", layerHeight: records[1].layer.height, height: last.layer.z, bottomHeight: floorZ, mountingHole: records[0].hole ? average(records[0].hole) * 2 : 0, approximation: "\u539F\u59CB\u7F51\u683C\u7F3A\u5931\uFF1B\u6309\u539F\u5C42\u9AD8\u548C\u539F\u5899\u7EBF\u5BBD\u6062\u590D\u540C\u5FC3\u7A7A\u5FC3\u5668\u7269\uFF0C\u8F6E\u5ED3\u7CBE\u5EA6\u53D7\u5207\u7247\u5206\u8FA8\u7387\u9650\u5236\u3002" };
}
function stlFromPaths(text) {
  const mesh = meshFromPaths(text);
  return { ...mesh, bytes: exportSTL(mesh) };
}

// src/local-plan.js
function withMaterialTemperature(material, requested) {
  const result = structuredClone(material);
  if (requested === void 0) return result;
  const temperature = Number(requested);
  if (!Number.isFinite(temperature) || temperature < 170 || temperature > 300) throw Error("\u55B7\u5634\u6E29\u5EA6\u5FC5\u987B\u5728 170\u2013300\xB0C \u4E4B\u95F4\u3002");
  for (const key of ["nozzle_temperature", "nozzle_temperature_initial_layer"]) result[key] = (Array.isArray(material[key]) ? material[key] : [""]).map(() => String(temperature));
  return result;
}
function autoColorPlan(input, settings, totalLayers, layerHeight) {
  const params = normalize(input), path = pathSettings(settings), pattern = patternSettings(path.pattern);
  const needed = [...new Set(pattern.pixels.filter((x) => x >= 0))].sort(), sequence = [...pattern.sequence].map((c) => "ABCD".indexOf(c));
  if (pattern.enabled) {
    for (const slot of needed) if (!sequence.includes(slot)) sequence.push(slot);
    pattern.sequence = sequence.map((x) => "ABCD"[x]).join("");
    pattern.layersPerRow = Math.max(pattern.layersPerRow, sequence.length);
    path.pattern = pattern;
  }
  const rows = Array.from({ length: totalLayers }, (_, i) => {
    const layer = i + 1, tool = pattern.enabled ? sequence[(layer - 1) % sequence.length] : slotAtLayer({ ...params, height: totalLayers * layerHeight, layer: layerHeight }, layer);
    return { layer, z: +(layer * layerHeight).toFixed(6), tool };
  });
  let end = path.endLayer || totalLayers;
  const span = pattern.layersPerRow, offset = (end - path.startLayer + 1) % span;
  if (pattern.enabled && offset > 0) {
    const row = Math.floor((end - path.startLayer) / span), tools = [...new Set(pattern.pixels.slice(row * pattern.cols, (row + 1) * pattern.cols).filter((t) => t >= 0))], lastTools = new Set(rows.slice(end - offset, end).map((r) => r.tool));
    if (tools.some((t) => !lastTools.has(t))) end -= offset;
  }
  if (end < path.startLayer) throw Error("\u6A21\u578B\u9AD8\u5EA6\u4E0D\u8DB3\u4EE5\u653E\u4E0B\u4E00\u4E2A\u5B8C\u6574\u6362\u8272\u5468\u671F\uFF0C\u8BF7\u589E\u52A0\u9AD8\u5EA6\u6216\u51CF\u5C11\u989C\u8272\u3002");
  path.endLayer = end === totalLayers ? 0 : end;
  return { rows, settings: path, colors: pattern.enabled ? pattern.palette : params.filamentColors, slotCount: Math.max(...rows.map((r) => r.tool)) + 1, sequence: pattern.enabled ? pattern.sequence : params.layerSequence, layerHeight, totalLayers, adjustedRowSpan: pattern.layersPerRow !== (settings.pattern?.layersPerRow || 6), croppedEnd: end !== (settings.endLayer || totalLayers) };
}
function customToolJSON(plan) {
  return { mode: "MultiAsSingle", gcodes: plan.rows.map((r) => ({ print_z: r.z, type: "ToolChange", extruder: r.tool + 1, color: plan.colors[r.tool].toUpperCase(), extra: "" })) };
}

// src/local-slicer.js
var MACHINES = ["Bambu Lab A1", "Bambu Lab A1 mini", "Bambu Lab P1S", "Bambu Lab P1P", "Bambu Lab X1 Carbon", "Bambu Lab X1", "Bambu Lab X1E", "Bambu Lab P2S"];
var MATERIALS = ["Bambu PLA Basic", "Generic PLA", "Bambu PETG Basic", "Bambu PETG HF", "Generic PETG"];
var activeProcess = null;
var cancelled = false;
if (!isMainThread) parentPort.on("message", (message) => {
  if (message.cancel) {
    cancelled = true;
    activeProcess?.kill();
  }
});
var hash = (data) => createHash("sha256").update(data).digest("hex");
async function executable() {
  const candidates = [process.env.KNITFORM_BAMBU_STUDIO, join(process.env.ProgramFiles || "C:/Program Files", "Bambu Studio/bambu-studio.exe"), join(process.env.LOCALAPPDATA || "", "Programs/Bambu Studio/bambu-studio.exe")].filter(Boolean);
  for (const path of candidates) {
    try {
      await access(path);
      return resolve(path);
    } catch {
    }
  }
  throw Error("\u672A\u627E\u5230\u672C\u673A Bambu Studio\u3002\u8BF7\u5B89\u88C5\u62D3\u7AF9\u5B98\u65B9\u5207\u7247\u5668\u540E\u91CD\u542F\u672C\u5730\u670D\u52A1\u3002");
}
async function profileLibrary(exe) {
  const root = join(dirname(exe), "resources/profiles/BBL"), maps = {};
  for (const type of ["machine", "process", "filament"]) {
    const map = /* @__PURE__ */ new Map();
    for (const file of await readdir(join(root, type))) {
      if (!file.endsWith(".json")) continue;
      const obj = JSON.parse(await readFile(join(root, type, file), "utf8"));
      map.set(basename(file, ".json"), obj);
      if (obj.name) map.set(obj.name, obj);
    }
    maps[type] = map;
  }
  function full(type, name, parents = []) {
    if (parents.includes(name)) throw Error("\u62D3\u7AF9\u914D\u7F6E\u5305\u542B\u5FAA\u73AF\u7EE7\u627F\u3002");
    const obj = maps[type].get(name);
    if (!obj) throw Error(`\u672C\u673A\u62D3\u7AF9\u7F3A\u5C11\u914D\u7F6E\uFF1A${name}`);
    let result = obj.inherits ? full(type, obj.inherits, [...parents, name]) : {};
    for (const inc of obj.include || []) result = { ...result, ...full(type, inc, [...parents, name]) };
    result = { ...result, ...obj };
    delete result.inherits;
    delete result.include;
    return result;
  }
  function material(machine, label) {
    const candidates = [...new Set(maps.filament.values())].filter((x) => x.instantiation === "true" && x.name?.startsWith(label + " @"));
    for (const obj of candidates) {
      const p = full("filament", obj.name);
      if (p.compatible_printers?.includes(machine)) return obj.name;
    }
    throw Error(`\u672C\u673A\u7F3A\u5C11 ${machine} \u9002\u7528\u7684 ${label} \u8017\u6750\u914D\u7F6E\u3002`);
  }
  const machines = [];
  for (const model of MACHINES) for (const nozzle of ["0.4", "0.6", "0.8", "0.2"]) {
    const id = model + " " + nozzle + " nozzle";
    if (!maps.machine.has(id)) continue;
    const p = full("machine", id);
    if ((p.nozzle_diameter?.length || 1) !== 1) continue;
    const filaments = MATERIALS.filter((label) => {
      try {
        material(id, label);
        return true;
      } catch {
        return false;
      }
    });
    if (!filaments.length) continue;
    const corners = (p.printable_area || []).map((s) => s.split("x").map(Number));
    const size = Math.min(...[0, 1].map((i) => Math.max(...corners.map((v) => v[i]))));
    machines.push({ id, model, nozzle: +nozzle, bedSize: size, height: +p.printable_height, materials: filaments, defaultMaterial: filaments[0] });
  }
  return { root, full, material, machines };
}
async function slicerCapabilities() {
  try {
    const exe = await executable(), lib = await profileLibrary(exe);
    return { available: true, engine: "Installed Bambu Studio", machines: lib.machines, defaultMachine: lib.machines.find((m) => m.id === "Bambu Lab A1 0.4 nozzle")?.id || lib.machines[0]?.id };
  } catch (error) {
    return { available: false, error: error.message, machines: [] };
  }
}
function safeConfig(files) {
  try {
    return JSON.parse(new TextDecoder().decode(files["Metadata/project_settings.config"]));
  } catch {
    return {};
  }
}
function inferSourceMachine(bytes) {
  try {
    const p = safeConfig(readSlicedPackage(bytes).files);
    return typeof p.printer_settings_id === "string" ? p.printer_settings_id : null;
  } catch {
    return null;
  }
}
async function sliceJob(payload, jobDir, progress) {
  const exe = await executable(), library = await profileLibrary(exe), choice = library.machines.find((m) => m.id === payload.machine);
  if (!choice) throw Error("\u8BF7\u9009\u62E9\u672C\u673A\u5DF2\u5B89\u88C5\u3001\u5355\u55B7\u5934\u7684\u62D3\u7AF9\u673A\u578B\u914D\u7F6E\u3002");
  if (!choice.materials.includes(payload.material)) throw Error("\u6240\u9009\u8017\u6750\u914D\u7F6E\u4E0E\u673A\u578B\u4E0D\u5339\u914D\u3002");
  const params = normalize(payload.params), settings = pathSettings(payload.settings), machine = library.full("machine", choice.id), material = withMaterialTemperature(library.full("filament", library.material(choice.id, payload.material)), payload.nozzleTemperature ?? payload.params?.temperature);
  let meshBytes, sourceGeometry = "current-design", sourceConfig = {}, geometryNote = "";
  if (payload.basis === "import") {
    let files;
    if (typeof payload.archive === "string" && payload.archive.length <= 112 * 1024 * 1024) files = readModelPackage(Buffer.from(payload.archive, "base64"));
    else if (typeof payload.gcode === "string" && payload.gcode.length <= 80 * 1024 * 1024) files = { "Metadata/plate_1.gcode": strToU8(payload.gcode) };
    else throw Error("\u8BF7\u5BFC\u5165\u539F\u59CB 3MF \u6216 G-code\uFF0C\u6216\u9009\u62E9\u5F53\u524D\u9020\u578B\u3002");
    sourceConfig = safeConfig(files);
    const objectSettings = new TextDecoder().decode(files["Metadata/model_settings.config"] || new Uint8Array());
    if (/subtype="(?:negative_part|modifier_part|support_enforcer|support_blocker)"/.test(objectSettings)) throw Error("\u6A21\u578B\u542B\u8D1F\u4F53\u79EF\u6216\u4FEE\u6539\u5668\uFF0C\u8BF7\u5148\u5BFC\u51FA\u5408\u5E76\u540E\u7684\u5B9E\u4F53\u6A21\u578B 3MF\u3002");
    const modelXML = new TextDecoder().decode(files["3D/3dmodel.model"] || new Uint8Array());
    let imported;
    if (/<(?:\w+:)?object\b/.test(modelXML)) imported = stlFrom3MF(files);
    else {
      const key = Object.keys(files).find((k) => /^Metadata\/plate_\d+\.gcode$/.test(k));
      if (!key) throw Error("\u6587\u4EF6\u4E0D\u542B\u53EF\u7528\u6A21\u578B\u6216\u5899\u4F53\u8DEF\u5F84\u3002");
      imported = stlFromPaths(new TextDecoder().decode(files[key]));
      geometryNote = imported.approximation;
      params.layer = imported.layerHeight;
      params.bottom = imported.bottomHeight;
    }
    meshBytes = imported.bytes;
    sourceGeometry = imported.source;
    const h = Number(sourceConfig.layer_height);
    if (h >= 0.06 && h <= 0.6) params.layer = h;
  } else if (payload.basis === "design") {
    const smooth = normalize({ ...params, texture: "none", amplitude: 0, exportMode: "shell", bedSize: choice.bedSize, bedHeight: choice.height, nozzle: choice.nozzle });
    const check = validate(smooth);
    if (!check.valid) throw Error(check.issues.filter((x) => x.level === "error").map((x) => x.text).join(" "));
    meshBytes = exportSTL(createMesh(smooth));
  } else throw Error("\u8BF7\u6307\u5B9A\u5F53\u524D\u9020\u578B\u6216\u5BFC\u5165\u6A21\u578B\u3002");
  machine.time_lapse_gcode = "";
  const layerHeight = params.layer;
  if (layerHeight > choice.nozzle * 0.8 || layerHeight < choice.nozzle * 0.15) throw Error("\u5F53\u524D\u5C42\u9AD8\u4E0E\u6240\u9009\u55B7\u5634\u4E0D\u5339\u914D\uFF0C\u8BF7\u8C03\u6574\u4E3B\u754C\u9762\u6253\u5370\u5C42\u9AD8\u3002");
  const view = new DataView(meshBytes.buffer, meshBytes.byteOffset, meshBytes.byteLength), triangles = view.getUint32(80, true), bounds = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  for (let t = 0; t < triangles; t++) for (let v = 0; v < 3; v++) for (let axis = 0; axis < 3; axis++) {
    const x = view.getFloat32(84 + t * 50 + 12 + v * 12 + axis * 4, true);
    if (!Number.isFinite(x)) throw Error("\u6A21\u578B\u5750\u6807\u65E0\u6548\u3002");
    bounds.min[axis] = Math.min(bounds.min[axis], x);
    bounds.max[axis] = Math.max(bounds.max[axis], x);
  }
  const dimensions = bounds.max.map((x, i) => x - bounds.min[i]);
  if (dimensions[0] > choice.bedSize - 12 || dimensions[1] > choice.bedSize - 12 || dimensions[2] > choice.height) throw Error("\u6A21\u578B\u5C3A\u5BF8\u8D85\u51FA\u6240\u9009\u673A\u578B\uFF0C\u9700\u4E3A\u64E6\u6599\u5854\u53CA\u8FB9\u754C\u7559\u51FA\u7A7A\u95F4\u3002");
  const layers = Math.ceil(dimensions[2] / layerHeight - 1e-4), plan = autoColorPlan(params, settings, layers, layerHeight);
  plan.settings.bedSize = choice.bedSize;
  const processProfile = library.full("process", machine.default_print_profile), width = Math.max(choice.nozzle * 0.8, Math.min(choice.nozzle * 1.5, settings.lineWidth));
  Object.assign(processProfile, { layer_height: String(layerHeight), initial_layer_print_height: String(layerHeight), enable_prime_tower: plan.slotCount > 1 ? "1" : "0", spiral_mode: "0", adaptive_layer_height: "0", enable_support: "0", fuzzy_skin: "none", wall_generator: "classic", wall_loops: String(Math.max(2, Math.ceil(params.wall / width))), sparse_infill_density: "0%", top_shell_layers: "0", top_shell_thickness: "0", bottom_shell_layers: String(Math.ceil(params.bottom / layerHeight)), bottom_shell_thickness: "0", seam_slope_type: "none", override_filament_scarf_seam_setting: "1", apply_scarf_seam_on_circles: "0", enable_arc_fitting: "0", outer_wall_speed: String(settings.maxSpeed), inner_wall_speed: String(settings.maxSpeed), brim_type: "no_brim", elefant_foot_compensation: "0", only_one_wall_top: "0" });
  for (const key of ["line_width", "initial_layer_line_width", "outer_wall_line_width", "inner_wall_line_width", "sparse_infill_line_width", "internal_solid_infill_line_width", "top_surface_line_width"]) processProfile[key] = String(width);
  processProfile.flush_volumes_matrix = Array.from({ length: plan.slotCount ** 2 }, (_, i) => String(Math.floor(i / plan.slotCount) === i % plan.slotCount ? 0 : 280));
  processProfile.flush_volumes_vector = Array(plan.slotCount * 2).fill("140");
  await mkdir(jobDir, { recursive: true });
  await writeFile(join(jobDir, "input.stl"), meshBytes);
  await writeFile(join(jobDir, "machine.json"), JSON.stringify(machine));
  await writeFile(join(jobDir, "process.json"), JSON.stringify(processProfile));
  await writeFile(join(jobDir, "toolchanges.json"), JSON.stringify(customToolJSON(plan)));
  const filamentPaths = [];
  for (let slot = 0; slot < plan.slotCount; slot++) {
    const path = join(jobDir, `filament-${slot}.json`);
    await writeFile(path, JSON.stringify({ ...material, filament_colour: [plan.colors[slot].toUpperCase()] }));
    filamentPaths.push(path);
  }
  progress("\u62D3\u7AF9\u6B63\u5728\u81EA\u52A8\u751F\u6210\u542F\u505C\u3001\u6E29\u5EA6\u3001\u9010\u5C42 AMS \u6362\u6599\u3001\u51B2\u5237\u4E0E\u64E6\u6599\u5854\u2026");
  const args = ["--datadir", join(jobDir, "slicer-user"), "--load-settings", join(jobDir, "machine.json") + ";" + join(jobDir, "process.json"), "--load-filaments", filamentPaths.join(";"), "--load-custom-gcodes", join(jobDir, "toolchanges.json"), "--curr-bed-type", "Textured PEI Plate", "--arrange", "1", "--slice", "0", "--debug", "2", "--outputdir", jobDir, "--export-3mf", "source.gcode.3mf", join(jobDir, "input.stl")];
  if (cancelled) throw Error("\u672C\u5730\u5207\u7247\u4EFB\u52A1\u5DF2\u53D6\u6D88\u3002");
  const code = await new Promise((resolve2, reject) => {
    const child = spawn(exe, args, { cwd: jobDir, windowsHide: true, stdio: "ignore", shell: false }), timer = setTimeout(() => {
      child.kill();
      reject(Error("\u62D3\u7AF9\u81EA\u52A8\u5207\u7247\u8D85\u8FC7 10 \u5206\u949F\uFF0C\u8BF7\u5148\u964D\u4F4E\u6A21\u578B\u7CBE\u5EA6\u6216\u5C3A\u5BF8\u3002"));
    }, 6e5);
    activeProcess = child;
    child.once("error", (e) => {
      clearTimeout(timer);
      reject(e);
    });
    child.once("exit", (code2) => {
      activeProcess = null;
      clearTimeout(timer);
      resolve2(code2);
    });
  });
  if (code !== 0) {
    let reason = "";
    try {
      reason = JSON.parse(await readFile(join(jobDir, "result.json"), "utf8")).error_string || "";
    } catch {
    }
    throw Error(`\u62D3\u7AF9\u5207\u7247\u5931\u8D25\uFF08${code}\uFF09${reason ? "\uFF1A" + reason : "\uFF0C\u8BF7\u68C0\u67E5\u6A21\u578B\u3001\u673A\u578B\u4E0E\u8017\u6750\u914D\u7F6E\u3002"}`);
  }
  progress("\u6B63\u5728\u9010\u5C42\u6838\u5BF9\u5B9E\u9645\u8272\u69FD\u3001\u6539\u5199\u63D0\u82B1\u5E76\u5C01\u88C5\u6253\u5370\u6587\u4EF6\u2026");
  const sourceArchive = await readFile(join(jobDir, "source.gcode.3mf")), source = readSlicedPackage(sourceArchive), parsed = parseGCode(source.text), wrong = [];
  for (const run of parsed.runs) {
    const row = plan.rows[run.layer - 1];
    if (!row || run.tool !== row.tool) wrong.push(run.layer);
  }
  if (wrong.length) throw Error(`\u62D3\u7AF9\u5B9E\u9645\u6362\u8272\u4E0E\u8BA1\u5212\u4E0D\u4E00\u81F4\uFF1A\u7B2C ${[...new Set(wrong)].slice(0, 5).join("\u3001")} \u5C42\u3002\u672A\u751F\u6210\u6253\u5370\u6587\u4EF6\u3002`);
  if (!source.text.includes("MACHINE_START_GCODE_END") || !source.text.includes("MACHINE_END_GCODE_START") || plan.slotCount > 1 && !/M620/.test(source.text)) throw Error("\u62D3\u7AF9\u8F93\u51FA\u7F3A\u5C11\u5B8C\u6574\u673A\u5668/AMS \u6307\u4EE4\uFF0C\u672A\u751F\u6210\u6253\u5370\u6587\u4EF6\u3002");
  const result = rewriteGCode(parsed, plan.settings), nativeReport = { engine: "Bambu Studio local CLI", printer: choice.id, model: choice.model, modelId: library.full("machine", choice.model).model_id, material: payload.material, sourceGeometry, geometryNote, nativeStartEndAndAMS: true, plannedLayers: layers, actualLayers: parsed.totalLayers, sequence: plan.sequence, slotCount: plan.slotCount, wallToolMismatches: 0, toolChanges: (source.text.match(/^T[0-3]\s*$/gm) || []).length, sourceSHA256: hash(source.text), effectiveLineWidth: width, croppedEnd: plan.croppedEnd, adjustedRowSpan: plan.adjustedRowSpan, physicalPrintTested: false };
  result.report.nativeSlicer = nativeReport;
  await writeFile(join(jobDir, "source.gcode.3mf"), stampSlicedMachineIdentity(sourceArchive, nativeReport));
  await writeFile(join(jobDir, "print.gcode"), result.text);
  await writeFile(join(jobDir, "print.gcode.3mf"), packEditedGCode(sourceArchive, result));
  await writeFile(join(jobDir, "report.json"), JSON.stringify(result.report, null, 2));
  return { report: result.report, settings: plan.settings, printer: choice.id, material: payload.material, sequence: plan.sequence, geometry: sourceGeometry, files: ["source.gcode.3mf", "print.gcode.3mf", "print.gcode", "report.json"] };
}
var LocalSlicerService = class {
  constructor(dataDir) {
    this.root = resolve(dataDir, "slicing");
    this.jobs = /* @__PURE__ */ new Map();
  }
  async capabilities() {
    return slicerCapabilities();
  }
  async start(payload) {
    if ([...this.jobs.values()].some((j) => j.state === "running")) throw Object.assign(Error("\u6B63\u5728\u5904\u7406\u53E6\u4E00\u4E2A\u62D3\u7AF9\u5207\u7247\u4EFB\u52A1\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002"), { status: 409 });
    if (this.jobs.size >= 20) {
      for (const [id2, j] of this.jobs) if (j.state !== "running") {
        this.jobs.delete(id2);
        break;
      }
    }
    const id = randomUUID(), job = { id, state: "running", message: "\u6B63\u5728\u8BFB\u53D6\u672C\u673A\u62D3\u7AF9\u914D\u7F6E\u4E0E\u6A21\u578B\u2026", createdAt: Date.now() }, directory = join(this.root, id);
    this.jobs.set(id, job);
    await mkdir(directory, { recursive: true });
    const worker = new Worker2(new URL(import.meta.url), { workerData: { payload, jobDir: directory }, execArgv: [] });
    job.worker = worker;
    worker.on("message", (event) => {
      if (event.progress) job.message = event.progress;
      else if (event.result) {
        job.state = "complete";
        job.message = "\u5DF2\u751F\u6210\u5B8C\u6574\u62D3\u7AF9\u63D0\u82B1\u6253\u5370\u6587\u4EF6\u3002";
        job.result = event.result;
      } else if (event.error) {
        job.state = "failed";
        job.message = event.error;
      }
    });
    worker.on("error", (error) => {
      job.state = "failed";
      job.message = error.message;
    });
    worker.on("exit", (code) => {
      delete job.worker;
      if (job.state === "running") {
        job.state = "failed";
        job.message = `\u672C\u5730\u5207\u7247\u4EFB\u52A1\u9000\u51FA\uFF08${code}\uFF09\u3002`;
      }
    });
    return this.status(id);
  }
  status(id) {
    const job = this.jobs.get(id);
    if (!job) return null;
    const { worker, ...publicJob } = job;
    return publicJob;
  }
  async file(id, name) {
    const job = this.jobs.get(id);
    if (job?.state !== "complete" || !job.result.files.includes(name)) return null;
    return readFile(join(this.root, id, name));
  }
  close() {
    for (const job of this.jobs.values()) if (job.worker) {
      job.worker.postMessage({ cancel: true });
      const worker = job.worker;
      setTimeout(() => worker.terminate(), 1500).unref();
    }
  }
};
if (!isMainThread && workerData?.jobDir) {
  sliceJob(workerData.payload, workerData.jobDir, (progress) => parentPort.postMessage({ progress })).then((result) => {
    parentPort.postMessage({ result });
    parentPort.close();
  }, (error) => {
    parentPort.postMessage({ error: error.message });
    parentPort.close();
  });
}
export {
  LocalSlicerService,
  inferSourceMachine,
  profileLibrary,
  slicerCapabilities
};
