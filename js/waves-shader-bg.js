/**
 * AILeader hero — performance WebGL waves. Brand: #050505 + #fffce1 (monochrome).
 * Caps FPS ~28, aggressive pixel budget, pauses offscreen / tab hidden.
 * Mounts only on #aileader-hero-shader.
 */
(function () {
  "use strict";

  var VERT =
    "attribute vec2 a_position;\nvoid main() {\n  gl_Position = vec4(a_position, 0.0, 1.0);\n}";

  /* Simplified fragment: 3 octaves FBM, no blur taps, cheap sRGB mix (no oklab), warp/cursor off */
  var FRAG =
    "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision mediump float;\n#else\nprecision mediump float;\n#endif\n\n" +
    "uniform vec3 u_colors[4];\n" +
    "uniform vec4 u_scene;\n" +
    "uniform vec4 u_shape;\n" +
    "uniform vec4 u_surface;\n" +
    "uniform vec4 u_finish;\n" +
    "uniform vec4 u_transform;\n" +
    "uniform vec4 u_space;\n\n" +
    "#define u_resolution u_scene.xy\n" +
    "#define u_time u_scene.z\n" +
    "#define u_colorCount u_scene.w\n" +
    "#define u_scale u_shape.x\n" +
    "#define u_intensity u_shape.y\n" +
    "#define u_detail u_surface.x\n" +
    "#define u_contrast u_surface.y\n" +
    "#define u_brightness u_surface.z\n" +
    "#define u_saturation u_surface.w\n" +
    "#define u_vignette u_finish.y\n" +
    "#define u_grain u_finish.w\n" +
    "#define u_seed u_transform.x\n" +
    "#define u_rotate u_transform.y\n" +
    "#define u_drift u_transform.z\n" +
    "#define u_offset u_space.xy\n\n" +
    "float hash21(vec2 p) {\n" +
    "  p = fract(p * vec2(234.34, 435.345));\n" +
    "  p += dot(p, p + 34.23);\n" +
    "  return fract(p.x * p.y);\n" +
    "}\n\n" +
    "float noise(vec2 p) {\n" +
    "  vec2 i = floor(p);\n" +
    "  vec2 f = fract(p);\n" +
    "  vec2 u = f * f * (3.0 - 2.0 * f);\n" +
    "  return mix(\n" +
    "    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),\n" +
    "    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),\n" +
    "    u.y);\n" +
    "}\n\n" +
    "float fbm(vec2 p) {\n" +
    "  float v = 0.0;\n" +
    "  float a = 0.5;\n" +
    "  for (int i = 0; i < 3; i++) {\n" +
    "    v += a * noise(p);\n" +
    "    p = p * 2.03 + vec2(17.0, 9.2);\n" +
    "    a *= 0.5;\n" +
    "  }\n" +
    "  return v;\n" +
    "}\n\n" +
    "vec3 palette(float x) {\n" +
    "  float n = max(u_colorCount - 1.0, 1.0);\n" +
    "  float f = clamp(x, 0.0, 1.0) * n;\n" +
    "  vec3 col = u_colors[0];\n" +
    "  for (int i = 0; i < 3; i++) {\n" +
    "    if (float(i) < n)\n" +
    "      col = mix(col, u_colors[i + 1], smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));\n" +
    "  }\n" +
    "  return col;\n" +
    "}\n\n" +
    "void main() {\n" +
    "  vec2 screenUv = gl_FragCoord.xy / u_resolution.xy;\n" +
    "  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);\n" +
    "  p *= u_scale;\n" +
    "  if (abs(u_rotate) > 0.0001) {\n" +
    "    float cr = cos(u_rotate), sr = sin(u_rotate);\n" +
    "    p = mat2(cr, -sr, sr, cr) * p;\n" +
    "  }\n" +
    "  p += u_offset;\n" +
    "  if (u_drift > 0.0001)\n" +
    "    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));\n" +
    "  float y = screenUv.y\n" +
    "    + sin(screenUv.x * (3.0 + u_intensity * 9.0) + u_time * 0.8) * 0.08\n" +
    "    + (fbm(p * u_detail * 2.0 + u_time * 0.1) - 0.5) * u_intensity * 0.6;\n" +
    "  vec3 col = palette(y);\n" +
    "  if (abs(u_contrast - 1.0) > 0.0001) col = (col - 0.5) * u_contrast + 0.5;\n" +
    "  if (abs(u_saturation - 1.0) > 0.0001) {\n" +
    "    float luma = dot(col, vec3(0.299, 0.587, 0.114));\n" +
    "    col = mix(vec3(luma), col, u_saturation);\n" +
    "  }\n" +
    "  if (abs(u_brightness) > 0.0001) col += u_brightness;\n" +
    "  if (u_vignette > 0.0001) {\n" +
    "    float vd = length(screenUv - 0.5) * 1.41421356;\n" +
    "    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);\n" +
    "  }\n" +
    "  if (u_grain > 0.0001) {\n" +
    "    float g = fract(sin(dot(gl_FragCoord.xy + u_seed, vec2(12.9898, 78.233))) * 43758.5453);\n" +
    "    col += (g - 0.5) * u_grain;\n" +
    "  }\n" +
    "  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);\n" +
    "}";

  var BASE = {
    colors: [
      [0.015, 0.015, 0.018],
      [0.06, 0.06, 0.07],
      [0.24, 0.24, 0.26],
      [0.6, 0.6, 0.64],
    ],
    colorCount: 4,
    scale: 1.1,
    intensity: 0.22,
    warp: 0,
    detail: 1.0,
    contrast: 1.05,
    brightness: -0.02,
    saturation: 1.12,
    vignette: 0.15,
    blur: 0,
    grain: 0.03,
    seed: 4984,
    rotate: 0.2,
    offsetX: 0,
    offsetY: 0,
    drift: 0.12,
    timeScale: 0.32,
  };

  var TARGET_FPS = 28;
  var FRAME_MS = 1000 / TARGET_FPS;

  var activeDestroy = null;
  var mounted = false;
  var pendingLose = null;
  var usingCssFallback = false;

  function isMobile() {
    return window.matchMedia("(max-width: 640px)").matches;
  }

  function isLowMemory() {
    try {
      if (navigator.deviceMemory && navigator.deviceMemory <= 4) return true;
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 && isMobile()) return true;
    } catch (e) {}
    return false;
  }

  function preferCssFallback() {
    return isMobile() && isLowMemory();
  }

  function perfProfile() {
    var mobile = isMobile() || window.matchMedia("(max-width: 768px)").matches;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return {
      maxDpr: mobile ? 1 : 1.25,
      maxPixels: mobile ? 400000 : 700000,
      grain: BASE.grain,
      blur: 0,
      timeScale: reduced ? 0 : BASE.timeScale,
      targetFps: TARGET_FPS,
    };
  }

  function applyCssFallback(host) {
    if (!host || host.getAttribute("data-aileader-css-bg") === "1") return;
    host.setAttribute("data-aileader-css-bg", "1");
    host.classList.add("aileader-hero-css-fallback");
    usingCssFallback = true;
  }

  function startShader(canvas, host) {
    if (activeDestroy) {
      activeDestroy();
      activeDestroy = null;
    }

    if (preferCssFallback()) {
      applyCssFallback(host);
      canvas.remove();
      return;
    }

    var perf = perfProfile();
    var U = Object.assign({}, BASE, {
      grain: perf.grain,
      blur: 0,
      intensity: 0.22,
      detail: 1.0,
      warp: 0,
      timeScale: perf.timeScale,
    });

    var gl = null;
    try {
      gl = canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
        preserveDrawingBuffer: false,
      });
    } catch (e) {
      gl = null;
    }
    if (!gl) {
      applyCssFallback(host);
      canvas.remove();
      return;
    }

    function compile(type, src) {
      var sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    var vs = compile(gl.VERTEX_SHADER, VERT);
    var fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      applyCssFallback(host);
      canvas.remove();
      return;
    }
    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      applyCssFallback(host);
      canvas.remove();
      return;
    }
    gl.useProgram(program);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var uni = {
      colors: gl.getUniformLocation(program, "u_colors"),
      scene: gl.getUniformLocation(program, "u_scene"),
      shape: gl.getUniformLocation(program, "u_shape"),
      surface: gl.getUniformLocation(program, "u_surface"),
      finish: gl.getUniformLocation(program, "u_finish"),
      transform: gl.getUniformLocation(program, "u_transform"),
      space: gl.getUniformLocation(program, "u_space"),
    };

    gl.uniform3fv(uni.colors, new Float32Array(U.colors.flat()));
    gl.uniform4f(uni.shape, U.scale, U.intensity, 0.84, 0);
    gl.uniform4f(uni.surface, U.detail, U.contrast, U.brightness, U.saturation);
    gl.uniform4f(uni.finish, 0, U.vignette, 0, U.grain);
    gl.uniform4f(uni.transform, U.seed, U.rotate, U.drift, 0);

    var raf = 0;
    var lastFrame = 0;
    var visible = !document.hidden;
    var inView = true;
    var disposed = false;
    var start = performance.now();
    var timeAnimated = Math.abs(U.timeScale) > 0.0001;
    var bounds = canvas.getBoundingClientRect();
    var homeEl = document.getElementById("home") || host;

    function resizeCanvas() {
      var dpr = Math.min(window.devicePixelRatio || 1, perf.maxDpr);
      var cssW = Math.max(1, bounds.width || canvas.clientWidth || 1);
      var cssH = Math.max(1, bounds.height || canvas.clientHeight || 1);
      var rawW = Math.max(1, Math.round(cssW * dpr));
      var rawH = Math.max(1, Math.round(cssH * dpr));
      var scale = Math.min(1, Math.sqrt(perf.maxPixels / Math.max(1, rawW * rawH)));
      var w = Math.max(1, Math.round(rawW * scale));
      var h = Math.max(1, Math.round(rawH * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    function stopLoop() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    function requestRender() {
      if (!disposed && visible && inView && raf === 0) raf = requestAnimationFrame(render);
    }

    function updateLayout() {
      bounds = canvas.getBoundingClientRect();
      resizeCanvas();
      requestRender();
    }

    function render(now) {
      raf = 0;
      if (disposed || !visible || !inView) return;

      var elapsed = now - lastFrame;
      if (elapsed < FRAME_MS - 1) {
        requestRender();
        return;
      }
      lastFrame = now;

      resizeCanvas();
      gl.uniform4f(
        uni.scene,
        canvas.width,
        canvas.height,
        ((now - start) / 1000) * U.timeScale,
        U.colorCount
      );
      gl.uniform4f(uni.space, U.offsetX, U.offsetY, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (timeAnimated) requestRender();
    }

    window.addEventListener("resize", updateLayout);
    var ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateLayout)
        : null;
    if (ro) ro.observe(canvas.parentElement || canvas);

    var io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            function (entries) {
              var hit = false;
              for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) hit = true;
              }
              inView = hit;
              if (inView) requestRender();
              else stopLoop();
            },
            { threshold: 0.02, rootMargin: "40px" }
          )
        : null;
    if (io) {
      io.observe(canvas);
      if (homeEl && homeEl !== canvas) io.observe(homeEl);
    }

    function onVis() {
      visible = !document.hidden;
      if (visible) requestRender();
      else stopLoop();
    }
    document.addEventListener("visibilitychange", onVis);

    canvas.style.willChange = "transform";
    canvas.style.pointerEvents = "none";

    updateLayout();
    requestRender();

    activeDestroy = function destroy() {
      disposed = true;
      stopLoop();
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", updateLayout);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      if (pendingLose) clearTimeout(pendingLose);
      pendingLose = setTimeout(function () {
        pendingLose = null;
        var ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
        canvas.width = 1;
        canvas.height = 1;
      }, 0);
    };
  }

  function mount() {
    var el = document.getElementById("aileader-hero-shader");
    if (!el) return false;
    if (el.querySelector("canvas") || el.getAttribute("data-aileader-css-bg") === "1") return true;

    if (preferCssFallback()) {
      applyCssFallback(el);
      return true;
    }

    if (activeDestroy) {
      activeDestroy();
      activeDestroy = null;
    }
    var canvas = document.createElement("canvas");
    canvas.style.cssText =
      "display:block;width:100%;height:100%;position:absolute;inset:0;pointer-events:none;will-change:transform";
    canvas.setAttribute("aria-hidden", "true");
    el.appendChild(canvas);
    startShader(canvas, el);
    return true;
  }

  function tryMount() {
    if (mounted && (document.getElementById("aileader-hero-shader") || usingCssFallback)) return;
    if (mount()) {
      mounted = true;
      if (obs) {
        obs.disconnect();
        obs = null;
      }
    }
  }

  var obs = new MutationObserver(function () {
    tryMount();
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });

  function boot() {
    tryMount();
    setTimeout(tryMount, 50);
    setTimeout(tryMount, 200);
    setTimeout(tryMount, 600);
    setTimeout(tryMount, 1500);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
