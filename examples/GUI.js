System.register([], function(exports_1) {
    var GUI;
    return {
        setters:[],
        execute: function() {
            GUI = (function () {
                function GUI() {
                    var _this = this;
                    this.i_width = 640;
                    this.i_height = 480;
                    this.rendererList = [
                        "Simple Renderer",
                        "Bucket Renderer",
                        "Progressive Renderer"
                    ];
                    this.GIEngineList = [
                        "Instant GI",
                        "Path Tracing",
                        "Irradiance Cache",
                        "Ambient Occlusion GI",
                        "Fake GI"
                    ];
                    this.sceneList = [];
                    this.superSampling = [
                        "1x",
                        "2x",
                        "4x",
                        "8x",
                        "16x"
                    ];
                    console.info("GUI initialized");
                    this.appContainer = document.getElementById("appContainer");
                    if (this.appContainer) {
                        this.init();
                    }
                    else {
                        window.onload = function () {
                            _this.appContainer = document.getElementById("appContainer");
                            _this.init.call(_this);
                        };
                    }
                }
                GUI.prototype.toggleTrace = function (value) { };
                GUI.prototype.onSceneChange = function (value) { };
                GUI.prototype.onRendererChange = function (value) { };
                GUI.prototype.onEngineChange = function (value) { };
                GUI.prototype.onBucketSizeChange = function (value) { };
                GUI.prototype.onIterationsChange = function (value) { };
                GUI.prototype.onBlockIterationsChange = function (value) { };
                GUI.prototype.onCameraSamplesChange = function (value) { };
                GUI.prototype.onHitSamplesChange = function (value) { };
                GUI.prototype.onOutputChange = function (value) { };
                GUI.prototype.onCameraChange = function (value) { };
                GUI.prototype.onThreadsChange = function (value) { };
                Object.defineProperty(GUI.prototype, "cameraSamples", {
                    get: function () {
                        return this._cameraSamples.value;
                    },
                    set: function (value) {
                        this._cameraSamples.value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GUI.prototype, "hitSamples", {
                    get: function () {
                        return this._hitSamples.value;
                    },
                    set: function (value) {
                        this._hitSamples.value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                GUI.prototype.init = function () {
                    document.body.style.margin = "0px";
                    this.appContainer = document.getElementById("appContainer");
                    this.giOutput = document.getElementById("giOutput");
                    this.webglOutput = document.getElementById("webglOutput");
                    this.controlGui = document.getElementById("control-gui");
                    if (!this.appContainer) {
                        this.appContainer = document.createElement("div");
                        this.appContainer.setAttribute("id", "appContainer");
                        document.body.appendChild(this.appContainer);
                    }
                    this.appContainer.style.background = "#161616";
                    this.appContainer.style.fontFamily = "Courier New";
                    this.appContainer.style.color = "#7F8184";
                    this.appContainer.style.width = "100%";
                    this.appContainer.style.height = "100%";
                    this.appContainer.style.position = "absolute";
                    if (!this.giOutput) {
                        this.giOutput = document.createElement("div");
                        this.giOutput.setAttribute("id", "giOutput");
                        this.appContainer.appendChild(this.giOutput);
                    }
                    if (!this.webglOutput) {
                        this.webglOutput = document.createElement("div");
                        this.webglOutput.setAttribute("id", "webglOutput");
                        this.appContainer.appendChild(this.webglOutput);
                    }
                    if (!this.controlGui) {
                        this.controlGui = document.createElement("div");
                        this.controlGui.setAttribute("id", "controlGui");
                        document.body.appendChild(this.controlGui);
                    }
                    this.webglOutput.style.width = this.i_width + "px";
                    this.webglOutput.style.height = this.i_height + "px";
                    this.webglOutput.style.backgroundColor = "#585858";
                    this.webglOutput.style.position = "absolute";
                    this.giOutput.style.width = this.i_width + "px";
                    this.giOutput.style.height = this.i_height + "px";
                    this.giOutput.style.backgroundColor = "#3C3C3C";
                    this.giOutput.style.position = "absolute";
                    this.resize();
                    new UIL.Title({
                        target: this.controlGui,
                        name: 'Global illumination for ThreeJS by 01Alchemist',
                        id: "v1.0",
                        size: 450,
                        pos: { left: '10px', top: '10px' },
                        simple: false
                    });
                    if (!window["SharedArrayBuffer"]) {
                        this.webglOutput.style.display = "none";
                        this.giOutput.style.display = "none";
                        var msg = "Oops! Your browser does not supported. Start chrome with --enable-blink-feature=SharedArrayBuffer or use Firefox Nightly";
                        new UIL.Title({
                            target: this.controlGui,
                            name: msg,
                            id: "!",
                            size: "900",
                            pos: { left: '10px', top: '50px' },
                            titleColor: "#ff0000",
                            fontColor: "#ff0000",
                            simple: false
                        });
                        new UIL.Button({
                            target: this.controlGui,
                            callback: gotoDownloadPage,
                            name: 'Download Firefox Nightly',
                            size: 200,
                            pos: { left: '10px', top: '100px' },
                            simple: true
                        });
                        function gotoDownloadPage() {
                            location.href = "https://nightly.mozilla.org";
                        }
                        this.giCapable = false;
                        throw "Oops! Your browser does not supported. If you want to try this app go and get Firefox Nightly 46 https://nightly.mozilla.org";
                    }
                    else {
                        this.info = new UIL.Title({
                            target: this.controlGui,
                            name: 'Info:',
                            id: "!",
                            size: 400,
                            pos: { left: '10px', bottom: '10px' },
                            simple: false
                        });
                        this.giCapable = true;
                        this.initGIControls();
                    }
                    window.onresize = this.resize.bind(this);
                    if (this.onInit) {
                        this.onInit();
                    }
                };
                GUI.prototype.resize = function () {
                    this.giOutput.style.left = (window.innerWidth - this.i_width) / 2 + "px";
                    this.webglOutput.style.left = (window.innerWidth - this.i_width) / 2 + "px";
                    this.giOutput.style.top = (window.innerHeight - this.i_height) / 2 + "px";
                    this.webglOutput.style.top = (window.innerHeight - this.i_height) / 2 + "px";
                };
                GUI.prototype.toggleGI = function (newValue) {
                    if (newValue) {
                        this.webglOutput.style.display = "none";
                        this.giOutput.style.display = "block";
                    }
                    else {
                        this.giOutput.style.display = "none";
                        this.webglOutput.style.display = "block";
                    }
                };
                GUI.prototype.initGIControls = function () {
                    var ui = new UIL.Gui({
                        target: this.controlGui,
                        css: 'top:10px; right:10px;',
                        Tpercent: 50,
                        size: 250,
                        left: 200
                    });
                    ui.add('title', { name: 'Options', id: "v1.0", titleColor: '#D4B87B', fontColor: "#D4B87B" });
                    this._gi = ui.add('bool', { name: 'GI View', value: false, callback: this.toggleGI.bind(this), height: 30 });
                    this._tracing = ui.add('bool', {
                        name: 'Ray Trace',
                        value: false,
                        callback: this.toggleTrace.bind(this),
                        height: 30
                    });
                    ui.add('list', { name: 'Scenes', callback: this.onSceneChange.bind(this), list: this.sceneList, height: 30 });
                    var renderGroup = ui.add('group', {
                        name: 'Render',
                        titleColor: '#D4B87B',
                        fontColor: '#D4B87B',
                        height: 30
                    });
                    renderGroup.add('list', {
                        name: 'Block Size',
                        callback: this.onBucketSizeChange.bind(this),
                        list: [8, 16, 24, 32, 64, 128]
                    });
                    this._iterations = renderGroup.add('slide', {
                        name: 'Iterations',
                        callback: this.onIterationsChange.bind(this),
                        value: 1,
                        min: 1,
                        max: 1000,
                        step: 1
                    });
                    this._blockIterations = renderGroup.add('slide', {
                        name: 'Block Iterations',
                        callback: this.onBlockIterationsChange.bind(this),
                        value: 1,
                        min: 1,
                        max: 16,
                        step: 1
                    });
                    this._cameraSamples = renderGroup.add('slide', {
                        name: 'Camera Samples',
                        callback: this.onCameraSamplesChange.bind(this),
                        value: 1,
                        min: -1,
                        max: 16,
                        step: 1
                    });
                    this._hitSamples = renderGroup.add('slide', {
                        name: 'Hit Samples',
                        callback: this.onHitSamplesChange.bind(this),
                        value: 1,
                        min: 1,
                        max: 16,
                        step: 1
                    });
                    renderGroup.add('number', {
                        name: 'Output',
                        callback: this.onOutputChange.bind(this),
                        value: [1280, 720],
                        step: 1
                    });
                    var camera = ui.add('group', { name: 'Camera', titleColor: '#D4B87B', fontColor: '#D4B87B', height: 30 });
                    this._eye = camera.add('number', {
                        name: 'Eye',
                        callback: this.onCameraChange.bind(this),
                        step: 1,
                        precision: 3,
                        value: [0, -1, 0]
                    });
                    this._lookAt = camera.add('number', {
                        name: 'Look At',
                        callback: this.onCameraChange.bind(this),
                        step: 1,
                        precision: 3,
                        value: [0, 0, 0]
                    });
                    this._up = camera.add('number', {
                        name: 'Up',
                        callback: this.onCameraChange.bind(this),
                        min: -1,
                        max: 1,
                        step: 1,
                        precision: 3,
                        value: [0, 1, 0]
                    });
                    this._fov = camera.add('number', {
                        name: 'FOV',
                        callback: this.onCameraChange.bind(this),
                        min: 0,
                        max: 128,
                        step: 1,
                        precision: 0,
                        value: 45
                    });
                    this._focus = camera.add('number', {
                        name: 'Focus',
                        callback: this.onCameraChange.bind(this),
                        step: 0.001,
                        value: 0.25
                    });
                    this._aperture = camera.add('number', {
                        name: 'Aperture',
                        callback: this.onCameraChange.bind(this),
                        step: 0.001,
                        value: 1 / 40
                    });
                    var sun = ui.add('group', { name: 'Sun', titleColor: '#D4B87B', fontColor: '#D4B87B', height: 30 });
                    sun.add('bool', { name: 'On', height: 30 });
                    sun.add('number', {
                        name: 'Direction',
                        callback: callback,
                        min: -1,
                        max: 1,
                        step: 0.001,
                        precision: 3,
                        value: [0, -1, 0]
                    });
                    sun.add('slide', {
                        name: 'Brightness',
                        callback: callback,
                        min: 0,
                        max: 1,
                        value: 1,
                        step: 0.0001,
                        precision: 4
                    });
                    var debug = ui.add('group', { name: 'Debug', titleColor: '#D4B87B', fontColor: '#D4B87B', height: 30 });
                    debug.add('slide', {
                        name: 'Threads',
                        callback: callback,
                        min: 1,
                        max: 16,
                        value: 4,
                        step: 1,
                        precision: 0.1
                    });
                    debug.add('color', { name: 'Background', callback: callback, type: 'html', value: 0 });
                    debug.add('color', { name: 'No Hit', callback: callback, type: 'html', value: 0 });
                    function callback(data) {
                        console.log(data);
                    }
                };
                return GUI;
            })();
            exports_1("GUI", GUI);
        }
    }
});
//# sourceMappingURL=GUI.js.map