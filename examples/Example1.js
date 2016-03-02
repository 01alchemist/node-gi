System.register(["./GUI", "./GIJSView", "./ThreeJSView", "../src/engine/utils/MathUtils"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var GUI_1, GIJSView_1, ThreeJSView_1, MathUtils_1;
    var Example1;
    return {
        setters:[
            function (GUI_1_1) {
                GUI_1 = GUI_1_1;
            },
            function (GIJSView_1_1) {
                GIJSView_1 = GIJSView_1_1;
            },
            function (ThreeJSView_1_1) {
                ThreeJSView_1 = ThreeJSView_1_1;
            },
            function (MathUtils_1_1) {
                MathUtils_1 = MathUtils_1_1;
            }],
        execute: function() {
            Example1 = (function (_super) {
                __extends(Example1, _super);
                function Example1() {
                    _super.call(this);
                    this.i_width = 2560 / 2;
                    this.i_height = 1440 / 2;
                }
                Example1.prototype.onInit = function () {
                    var self = this;
                    this.threeJSView = new ThreeJSView_1.ThreeJSView(this.i_width, this.i_height, this.webglOutput);
                    this.giJSView = new GIJSView_1.GIJSView(this.i_width, this.i_height, this.giOutput);
                    var color = 0xffeedd;
                    var pointLight = new THREE.PointLight(color, 1, 30);
                    pointLight.position.set(5, 5, 0);
                    pointLight.castShadow = true;
                    pointLight.shadow.camera.near = 1;
                    pointLight.shadow.camera.far = 300;
                    pointLight.shadow.bias = 0.01;
                    var geometry = new THREE.SphereGeometry(1, 32, 32);
                    var material = new THREE.MeshBasicMaterial({ color: color });
                    var sphere = new THREE.Mesh(geometry, material);
                    pointLight.add(sphere);
                    this.threeJSView.scene.add(pointLight);
                    var manager = new THREE.LoadingManager();
                    manager.onProgress = function (item, loaded, total) {
                        console.log(item, loaded, total);
                    };
                    var onProgress = function (xhr) {
                        if (xhr.lengthComputable) {
                            var percentComplete = xhr.loaded / xhr.total * 100;
                            console.log(Math.round(percentComplete) + '% downloaded');
                        }
                    };
                    var onError = function (xhr) {
                    };
                    geometry = new THREE.PlaneGeometry(100, 100);
                    material = new THREE.MeshPhongMaterial({ color: 0xffffff });
                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.rotation.set(MathUtils_1.MathUtils.radians(-90), 0, 0);
                    mesh.castShadow = false;
                    mesh.receiveShadow = true;
                    this.threeJSView.scene.add(mesh);
                    var loader = new THREE.OBJLoader(manager);
                    loader.load('../models/teapot.obj', function (object) {
                        self.model = object;
                        self.model.castShadow = true;
                        self.model.receiveShadow = false;
                        object.traverse(function (child) {
                            if (child instanceof THREE.Mesh) {
                                child.material.color = new THREE.Color(0xB9121B);
                                child.material.ior = 2;
                                child.receiveShadow = false;
                            }
                        });
                        self.threeJSView.scene.add(object);
                        self.giJSView.setThreeJSScene(self.threeJSView.scene, function () {
                            if (self._tracing.value) {
                                self.giJSView.toggleTrace(true);
                            }
                        });
                        self.render();
                    }, onProgress, onError);
                    this.threeJSView.onCameraChange = function (camera) {
                        self.giJSView.updateCamera(camera);
                    };
                    this.render();
                };
                Example1.prototype.render = function () {
                    this.threeJSView.render();
                };
                Example1.prototype.toggleGI = function (newValue) {
                    _super.prototype.toggleGI.call(this, newValue);
                    if (newValue) {
                        if (!this._tracing.value && !this.traceInitialized) {
                            this._tracing.click();
                            this.traceInitialized = true;
                        }
                        if (this._tracing.value && this.giJSView.dirty) {
                            this.giJSView.toggleTrace(newValue);
                        }
                    }
                };
                Example1.prototype.toggleTrace = function (newValue) {
                    this.giJSView.toggleTrace(newValue);
                };
                return Example1;
            })(GUI_1.GUI);
            exports_1("Example1", Example1);
        }
    }
});
//# sourceMappingURL=Example1.js.map