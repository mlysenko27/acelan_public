// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"livkF":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "a9221aba410bebd3";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"ijs7x":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Connection", ()=>(0, _connectionDefault.default));
parcelHelpers.export(exports, "ConnectionMonitor", ()=>(0, _connectionMonitorDefault.default));
parcelHelpers.export(exports, "Consumer", ()=>(0, _consumerDefault.default));
parcelHelpers.export(exports, "INTERNAL", ()=>(0, _internalDefault.default));
parcelHelpers.export(exports, "Subscription", ()=>(0, _subscriptionDefault.default));
parcelHelpers.export(exports, "Subscriptions", ()=>(0, _subscriptionsDefault.default));
parcelHelpers.export(exports, "SubscriptionGuarantor", ()=>(0, _subscriptionGuarantorDefault.default));
parcelHelpers.export(exports, "adapters", ()=>(0, _adaptersDefault.default));
parcelHelpers.export(exports, "createWebSocketURL", ()=>(0, _consumer.createWebSocketURL));
parcelHelpers.export(exports, "logger", ()=>(0, _loggerDefault.default));
parcelHelpers.export(exports, "createConsumer", ()=>createConsumer);
parcelHelpers.export(exports, "getConfig", ()=>getConfig);
var _connection = require("./connection");
var _connectionDefault = parcelHelpers.interopDefault(_connection);
var _connectionMonitor = require("./connection_monitor");
var _connectionMonitorDefault = parcelHelpers.interopDefault(_connectionMonitor);
var _consumer = require("./consumer");
var _consumerDefault = parcelHelpers.interopDefault(_consumer);
var _internal = require("./internal");
var _internalDefault = parcelHelpers.interopDefault(_internal);
var _subscription = require("./subscription");
var _subscriptionDefault = parcelHelpers.interopDefault(_subscription);
var _subscriptions = require("./subscriptions");
var _subscriptionsDefault = parcelHelpers.interopDefault(_subscriptions);
var _subscriptionGuarantor = require("./subscription_guarantor");
var _subscriptionGuarantorDefault = parcelHelpers.interopDefault(_subscriptionGuarantor);
var _adapters = require("./adapters");
var _adaptersDefault = parcelHelpers.interopDefault(_adapters);
var _logger = require("./logger");
var _loggerDefault = parcelHelpers.interopDefault(_logger);
function createConsumer(url = getConfig("url") || (0, _internalDefault.default).default_mount_path) {
    return new (0, _consumerDefault.default)(url);
}
function getConfig(name) {
    const element = document.head.querySelector(`meta[name='action-cable-${name}']`);
    if (element) return element.getAttribute("content");
}

},{"./connection":"gmpaE","./connection_monitor":"aL6lv","./consumer":"b3WGf","./internal":"jCEoK","./subscription":"7dUsM","./subscriptions":"338UI","./subscription_guarantor":"gxjoA","./adapters":"XqXiO","./logger":"9YuFN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gmpaE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _adapters = require("./adapters");
var _adaptersDefault = parcelHelpers.interopDefault(_adapters);
var _connectionMonitor = require("./connection_monitor");
var _connectionMonitorDefault = parcelHelpers.interopDefault(_connectionMonitor);
var _internal = require("./internal");
var _internalDefault = parcelHelpers.interopDefault(_internal);
var _logger = require("./logger");
var _loggerDefault = parcelHelpers.interopDefault(_logger);
// Encapsulate the cable connection held by the consumer. This is an internal class not intended for direct user manipulation.
const { message_types, protocols } = (0, _internalDefault.default);
const supportedProtocols = protocols.slice(0, protocols.length - 1);
const indexOf = [].indexOf;
class Connection {
    constructor(consumer){
        this.open = this.open.bind(this);
        this.consumer = consumer;
        this.subscriptions = this.consumer.subscriptions;
        this.monitor = new (0, _connectionMonitorDefault.default)(this);
        this.disconnected = true;
    }
    send(data) {
        if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
        } else return false;
    }
    open() {
        if (this.isActive()) {
            (0, _loggerDefault.default).log(`Attempted to open WebSocket, but existing socket is ${this.getState()}`);
            return false;
        } else {
            (0, _loggerDefault.default).log(`Opening WebSocket, current state is ${this.getState()}, subprotocols: ${protocols}`);
            if (this.webSocket) this.uninstallEventHandlers();
            this.webSocket = new (0, _adaptersDefault.default).WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
        }
    }
    close({ allowReconnect } = {
        allowReconnect: true
    }) {
        if (!allowReconnect) this.monitor.stop();
        // Avoid closing websockets in a "connecting" state due to Safari 15.1+ bug. See: https://github.com/rails/rails/issues/43835#issuecomment-1002288478
        if (this.isOpen()) return this.webSocket.close();
    }
    reopen() {
        (0, _loggerDefault.default).log(`Reopening WebSocket, current state is ${this.getState()}`);
        if (this.isActive()) try {
            return this.close();
        } catch (error) {
            (0, _loggerDefault.default).log("Failed to reopen WebSocket", error);
        } finally{
            (0, _loggerDefault.default).log(`Reopening WebSocket in ${this.constructor.reopenDelay}ms`);
            setTimeout(this.open, this.constructor.reopenDelay);
        }
        else return this.open();
    }
    getProtocol() {
        if (this.webSocket) return this.webSocket.protocol;
    }
    isOpen() {
        return this.isState("open");
    }
    isActive() {
        return this.isState("open", "connecting");
    }
    // Private
    isProtocolSupported() {
        return indexOf.call(supportedProtocols, this.getProtocol()) >= 0;
    }
    isState(...states) {
        return indexOf.call(states, this.getState()) >= 0;
    }
    getState() {
        if (this.webSocket) for(let state in (0, _adaptersDefault.default).WebSocket){
            if ((0, _adaptersDefault.default).WebSocket[state] === this.webSocket.readyState) return state.toLowerCase();
        }
        return null;
    }
    installEventHandlers() {
        for(let eventName in this.events){
            const handler = this.events[eventName].bind(this);
            this.webSocket[`on${eventName}`] = handler;
        }
    }
    uninstallEventHandlers() {
        for(let eventName in this.events)this.webSocket[`on${eventName}`] = function() {};
    }
}
Connection.reopenDelay = 500;
Connection.prototype.events = {
    message (event) {
        if (!this.isProtocolSupported()) return;
        const { identifier, message, reason, reconnect, type } = JSON.parse(event.data);
        switch(type){
            case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
            case message_types.disconnect:
                (0, _loggerDefault.default).log(`Disconnecting. Reason: ${reason}`);
                return this.close({
                    allowReconnect: reconnect
                });
            case message_types.ping:
                return this.monitor.recordPing();
            case message_types.confirmation:
                this.subscriptions.confirmSubscription(identifier);
                return this.subscriptions.notify(identifier, "connected");
            case message_types.rejection:
                return this.subscriptions.reject(identifier);
            default:
                return this.subscriptions.notify(identifier, "received", message);
        }
    },
    open () {
        (0, _loggerDefault.default).log(`WebSocket onopen event, using '${this.getProtocol()}' subprotocol`);
        this.disconnected = false;
        if (!this.isProtocolSupported()) {
            (0, _loggerDefault.default).log("Protocol is unsupported. Stopping monitor and disconnecting.");
            return this.close({
                allowReconnect: false
            });
        }
    },
    close (event) {
        (0, _loggerDefault.default).log("WebSocket onclose event");
        if (this.disconnected) return;
        this.disconnected = true;
        this.monitor.recordDisconnect();
        return this.subscriptions.notifyAll("disconnected", {
            willAttemptReconnect: this.monitor.isRunning()
        });
    },
    error () {
        (0, _loggerDefault.default).log("WebSocket onerror event");
    }
};
exports.default = Connection;

},{"./adapters":"XqXiO","./connection_monitor":"aL6lv","./internal":"jCEoK","./logger":"9YuFN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"XqXiO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    logger: self.console,
    WebSocket: self.WebSocket
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aL6lv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _logger = require("./logger");
var _loggerDefault = parcelHelpers.interopDefault(_logger);
// Responsible for ensuring the cable connection is in good health by validating the heartbeat pings sent from the server, and attempting
// revival reconnections if things go astray. Internal class, not intended for direct user manipulation.
const now = ()=>new Date().getTime();
const secondsSince = (time)=>(now() - time) / 1000;
class ConnectionMonitor {
    constructor(connection){
        this.visibilityDidChange = this.visibilityDidChange.bind(this);
        this.connection = connection;
        this.reconnectAttempts = 0;
    }
    start() {
        if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            addEventListener("visibilitychange", this.visibilityDidChange);
            (0, _loggerDefault.default).log(`ConnectionMonitor started. stale threshold = ${this.constructor.staleThreshold} s`);
        }
    }
    stop() {
        if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            removeEventListener("visibilitychange", this.visibilityDidChange);
            (0, _loggerDefault.default).log("ConnectionMonitor stopped");
        }
    }
    isRunning() {
        return this.startedAt && !this.stoppedAt;
    }
    recordPing() {
        this.pingedAt = now();
    }
    recordConnect() {
        this.reconnectAttempts = 0;
        this.recordPing();
        delete this.disconnectedAt;
        (0, _loggerDefault.default).log("ConnectionMonitor recorded connect");
    }
    recordDisconnect() {
        this.disconnectedAt = now();
        (0, _loggerDefault.default).log("ConnectionMonitor recorded disconnect");
    }
    // Private
    startPolling() {
        this.stopPolling();
        this.poll();
    }
    stopPolling() {
        clearTimeout(this.pollTimeout);
    }
    poll() {
        this.pollTimeout = setTimeout(()=>{
            this.reconnectIfStale();
            this.poll();
        }, this.getPollInterval());
    }
    getPollInterval() {
        const { staleThreshold, reconnectionBackoffRate } = this.constructor;
        const backoff = Math.pow(1 + reconnectionBackoffRate, Math.min(this.reconnectAttempts, 10));
        const jitterMax = this.reconnectAttempts === 0 ? 1.0 : reconnectionBackoffRate;
        const jitter = jitterMax * Math.random();
        return staleThreshold * 1000 * backoff * (1 + jitter);
    }
    reconnectIfStale() {
        if (this.connectionIsStale()) {
            (0, _loggerDefault.default).log(`ConnectionMonitor detected stale connection. reconnectAttempts = ${this.reconnectAttempts}, time stale = ${secondsSince(this.refreshedAt)} s, stale threshold = ${this.constructor.staleThreshold} s`);
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) (0, _loggerDefault.default).log(`ConnectionMonitor skipping reopening recent disconnect. time disconnected = ${secondsSince(this.disconnectedAt)} s`);
            else {
                (0, _loggerDefault.default).log("ConnectionMonitor reopening");
                this.connection.reopen();
            }
        }
    }
    get refreshedAt() {
        return this.pingedAt ? this.pingedAt : this.startedAt;
    }
    connectionIsStale() {
        return secondsSince(this.refreshedAt) > this.constructor.staleThreshold;
    }
    disconnectedRecently() {
        return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
    }
    visibilityDidChange() {
        if (document.visibilityState === "visible") setTimeout(()=>{
            if (this.connectionIsStale() || !this.connection.isOpen()) {
                (0, _loggerDefault.default).log(`ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = ${document.visibilityState}`);
                this.connection.reopen();
            }
        }, 200);
    }
}
ConnectionMonitor.staleThreshold = 6 // Server::Connections::BEAT_INTERVAL * 2 (missed two pings)
;
ConnectionMonitor.reconnectionBackoffRate = 0.15;
exports.default = ConnectionMonitor;

},{"./logger":"9YuFN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9YuFN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _adapters = require("./adapters");
var _adaptersDefault = parcelHelpers.interopDefault(_adapters);
// The logger is disabled by default. You can enable it with:
//
//   ActionCable.logger.enabled = true
//
//   Example:
//
//   import * as ActionCable from '@rails/actioncable'
//
//   ActionCable.logger.enabled = true
//   ActionCable.logger.log('Connection Established.')
//
exports.default = {
    log (...messages) {
        if (this.enabled) {
            messages.push(Date.now());
            (0, _adaptersDefault.default).logger.log("[ActionCable]", ...messages);
        }
    }
};

},{"./adapters":"XqXiO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jCEoK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    "message_types": {
        "welcome": "welcome",
        "disconnect": "disconnect",
        "ping": "ping",
        "confirmation": "confirm_subscription",
        "rejection": "reject_subscription"
    },
    "disconnect_reasons": {
        "unauthorized": "unauthorized",
        "invalid_request": "invalid_request",
        "server_restart": "server_restart"
    },
    "default_mount_path": "/cable",
    "protocols": [
        "actioncable-v1-json",
        "actioncable-unsupported"
    ]
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b3WGf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createWebSocketURL", ()=>createWebSocketURL);
var _connection = require("./connection");
var _connectionDefault = parcelHelpers.interopDefault(_connection);
var _subscriptions = require("./subscriptions");
var _subscriptionsDefault = parcelHelpers.interopDefault(_subscriptions);
class Consumer {
    constructor(url){
        this._url = url;
        this.subscriptions = new (0, _subscriptionsDefault.default)(this);
        this.connection = new (0, _connectionDefault.default)(this);
    }
    get url() {
        return createWebSocketURL(this._url);
    }
    send(data) {
        return this.connection.send(data);
    }
    connect() {
        return this.connection.open();
    }
    disconnect() {
        return this.connection.close({
            allowReconnect: false
        });
    }
    ensureActiveConnection() {
        if (!this.connection.isActive()) return this.connection.open();
    }
}
exports.default = Consumer;
function createWebSocketURL(url) {
    if (typeof url === "function") url = url();
    if (url && !/^wss?:/i.test(url)) {
        const a = document.createElement("a");
        a.href = url;
        // Fix populating Location properties in IE. Otherwise, protocol will be blank.
        a.href = a.href;
        a.protocol = a.protocol.replace("http", "ws");
        return a.href;
    } else return url;
}

},{"./connection":"gmpaE","./subscriptions":"338UI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"338UI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _subscription = require("./subscription");
var _subscriptionDefault = parcelHelpers.interopDefault(_subscription);
var _subscriptionGuarantor = require("./subscription_guarantor");
var _subscriptionGuarantorDefault = parcelHelpers.interopDefault(_subscriptionGuarantor);
var _logger = require("./logger");
var _loggerDefault = parcelHelpers.interopDefault(_logger);
class Subscriptions {
    constructor(consumer){
        this.consumer = consumer;
        this.guarantor = new (0, _subscriptionGuarantorDefault.default)(this);
        this.subscriptions = [];
    }
    create(channelName, mixin) {
        const channel = channelName;
        const params = typeof channel === "object" ? channel : {
            channel
        };
        const subscription = new (0, _subscriptionDefault.default)(this.consumer, params, mixin);
        return this.add(subscription);
    }
    // Private
    add(subscription) {
        this.subscriptions.push(subscription);
        this.consumer.ensureActiveConnection();
        this.notify(subscription, "initialized");
        this.subscribe(subscription);
        return subscription;
    }
    remove(subscription) {
        this.forget(subscription);
        if (!this.findAll(subscription.identifier).length) this.sendCommand(subscription, "unsubscribe");
        return subscription;
    }
    reject(identifier) {
        return this.findAll(identifier).map((subscription)=>{
            this.forget(subscription);
            this.notify(subscription, "rejected");
            return subscription;
        });
    }
    forget(subscription) {
        this.guarantor.forget(subscription);
        this.subscriptions = this.subscriptions.filter((s)=>s !== subscription);
        return subscription;
    }
    findAll(identifier) {
        return this.subscriptions.filter((s)=>s.identifier === identifier);
    }
    reload() {
        return this.subscriptions.map((subscription)=>this.subscribe(subscription));
    }
    notifyAll(callbackName, ...args) {
        return this.subscriptions.map((subscription)=>this.notify(subscription, callbackName, ...args));
    }
    notify(subscription, callbackName, ...args) {
        let subscriptions;
        if (typeof subscription === "string") subscriptions = this.findAll(subscription);
        else subscriptions = [
            subscription
        ];
        return subscriptions.map((subscription)=>typeof subscription[callbackName] === "function" ? subscription[callbackName](...args) : undefined);
    }
    subscribe(subscription) {
        if (this.sendCommand(subscription, "subscribe")) this.guarantor.guarantee(subscription);
    }
    confirmSubscription(identifier) {
        (0, _loggerDefault.default).log(`Subscription confirmed ${identifier}`);
        this.findAll(identifier).map((subscription)=>this.guarantor.forget(subscription));
    }
    sendCommand(subscription, command) {
        const { identifier } = subscription;
        return this.consumer.send({
            command,
            identifier
        });
    }
}
exports.default = Subscriptions;

},{"./subscription":"7dUsM","./subscription_guarantor":"gxjoA","./logger":"9YuFN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7dUsM":[function(require,module,exports) {
// A new subscription is created through the ActionCable.Subscriptions instance available on the consumer.
// It provides a number of callbacks and a method for calling remote procedure calls on the corresponding
// Channel instance on the server side.
//
// An example demonstrates the basic functionality:
//
//   App.appearance = App.cable.subscriptions.create("AppearanceChannel", {
//     connected() {
//       // Called once the subscription has been successfully completed
//     },
//
//     disconnected({ willAttemptReconnect: boolean }) {
//       // Called when the client has disconnected with the server.
//       // The object will have an `willAttemptReconnect` property which
//       // says whether the client has the intention of attempting
//       // to reconnect.
//     },
//
//     appear() {
//       this.perform('appear', {appearing_on: this.appearingOn()})
//     },
//
//     away() {
//       this.perform('away')
//     },
//
//     appearingOn() {
//       $('main').data('appearing-on')
//     }
//   })
//
// The methods #appear and #away forward their intent to the remote AppearanceChannel instance on the server
// by calling the `perform` method with the first parameter being the action (which maps to AppearanceChannel#appear/away).
// The second parameter is a hash that'll get JSON encoded and made available on the server in the data parameter.
//
// This is how the server component would look:
//
//   class AppearanceChannel < ApplicationActionCable::Channel
//     def subscribed
//       current_user.appear
//     end
//
//     def unsubscribed
//       current_user.disappear
//     end
//
//     def appear(data)
//       current_user.appear on: data['appearing_on']
//     end
//
//     def away
//       current_user.away
//     end
//   end
//
// The "AppearanceChannel" name is automatically mapped between the client-side subscription creation and the server-side Ruby class name.
// The AppearanceChannel#appear/away public methods are exposed automatically to client-side invocation through the perform method.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const extend = function(object, properties) {
    if (properties != null) for(let key in properties){
        const value = properties[key];
        object[key] = value;
    }
    return object;
};
class Subscription {
    constructor(consumer, params = {}, mixin){
        this.consumer = consumer;
        this.identifier = JSON.stringify(params);
        extend(this, mixin);
    }
    // Perform a channel action with the optional data passed as an attribute
    perform(action, data = {}) {
        data.action = action;
        return this.send(data);
    }
    send(data) {
        return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
        });
    }
    unsubscribe() {
        return this.consumer.subscriptions.remove(this);
    }
}
exports.default = Subscription;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gxjoA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _logger = require("./logger");
var _loggerDefault = parcelHelpers.interopDefault(_logger);
// Responsible for ensuring channel subscribe command is confirmed, retrying until confirmation is received.
// Internal class, not intended for direct user manipulation.
class SubscriptionGuarantor {
    constructor(subscriptions){
        this.subscriptions = subscriptions;
        this.pendingSubscriptions = [];
    }
    guarantee(subscription) {
        if (this.pendingSubscriptions.indexOf(subscription) == -1) {
            (0, _loggerDefault.default).log(`SubscriptionGuarantor guaranteeing ${subscription.identifier}`);
            this.pendingSubscriptions.push(subscription);
        } else (0, _loggerDefault.default).log(`SubscriptionGuarantor already guaranteeing ${subscription.identifier}`);
        this.startGuaranteeing();
    }
    forget(subscription) {
        (0, _loggerDefault.default).log(`SubscriptionGuarantor forgetting ${subscription.identifier}`);
        this.pendingSubscriptions = this.pendingSubscriptions.filter((s)=>s !== subscription);
    }
    startGuaranteeing() {
        this.stopGuaranteeing();
        this.retrySubscribing();
    }
    stopGuaranteeing() {
        clearTimeout(this.retryTimeout);
    }
    retrySubscribing() {
        this.retryTimeout = setTimeout(()=>{
            if (this.subscriptions && typeof this.subscriptions.subscribe === "function") this.pendingSubscriptions.map((subscription)=>{
                (0, _loggerDefault.default).log(`SubscriptionGuarantor resubscribing ${subscription.identifier}`);
                this.subscriptions.subscribe(subscription);
            });
        }, 500);
    }
}
exports.default = SubscriptionGuarantor;

},{"./logger":"9YuFN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["livkF"], null, "parcelRequirec720")

//# sourceMappingURL=actioncable.410bebd3.js.map
