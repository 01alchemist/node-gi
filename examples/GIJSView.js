System.register(["./GIRenderBase", "../src/engine/data/OBJLoader", "../src/engine/scene/materials/SpecularMaterial", "../src/engine/math/Color", "../src/engine/scene/Camera", "../src/engine/scene/SharedScene", "../src/engine/math/Vector3", "../src/engine/scene/shapes/Sphere", "../src/engine/scene/materials/LightMaterial", "../src/engine/scene/materials/Attenuation"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var GIRenderBase_1, OBJLoader_1, SpecularMaterial_1, Color_1, Camera_1, SharedScene_1, Vector3_1, Sphere_1, LightMaterial_1, Attenuation_1;
    var GIJSView;
    return {
        setters:[
            function (GIRenderBase_1_1) {
                GIRenderBase_1 = GIRenderBase_1_1;
            },
            function (OBJLoader_1_1) {
                OBJLoader_1 = OBJLoader_1_1;
            },
            function (SpecularMaterial_1_1) {
                SpecularMaterial_1 = SpecularMaterial_1_1;
            },
            function (Color_1_1) {
                Color_1 = Color_1_1;
            },
            function (Camera_1_1) {
                Camera_1 = Camera_1_1;
            },
            function (SharedScene_1_1) {
                SharedScene_1 = SharedScene_1_1;
            },
            function (Vector3_1_1) {
                Vector3_1 = Vector3_1_1;
            },
            function (Sphere_1_1) {
                Sphere_1 = Sphere_1_1;
            },
            function (LightMaterial_1_1) {
                LightMaterial_1 = LightMaterial_1_1;
            },
            function (Attenuation_1_1) {
                Attenuation_1 = Attenuation_1_1;
            }],
        execute: function() {
            GIJSView = (function (_super) {
                __extends(GIJSView, _super);
                function GIJSView(width, height) {
                    _super.call(this, width, height);
                    this.width = width;
                    this.height = height;
                    this.scene = new SharedScene_1.SharedScene();
                    this.scene.add(Sphere_1.Sphere.newSphere(new Vector3_1.Vector3(5, 5, 0), 1, new LightMaterial_1.LightMaterial(Color_1.Color.hexColor(0xffeedd), 1, Attenuation_1.NoAttenuation)));
                    this.camera = Camera_1.Camera.lookAt(new Vector3_1.Vector3(0, 10, 10), new Vector3_1.Vector3(0, 0, 0), new Vector3_1.Vector3(0, 1, 0), 45);
                    this.cameraSamples = -1;
                    this.hitSamples = 1;
                    this.bounces = 4;
                    this.iterations = 1000000;
                    this.blockIterations = 1;
                }
                GIJSView.prototype.loadModel = function (url, onInit) {
                    if (url === void 0) { url = "../models/teapot.obj"; }
                    var self = this;
                    var loader = new OBJLoader_1.OBJLoader();
                    loader.parentMaterial = new SpecularMaterial_1.SpecularMaterial(Color_1.Color.hexColor(0xB9121B), 2);
                    loader.load(url, function (_mesh) {
                        if (!_mesh) {
                            console.log("LoadOBJ error:");
                        }
                        else {
                            console.log("Obj file loaded");
                            self.scene.add(_mesh);
                            self.render.call(self, onInit);
                        }
                    });
                };
                GIJSView.prototype.updateCamera = function (camera) {
                    this.camera.p.setFromJson(camera.position);
                    this.camera.m = 1 / Math.tan(camera.fov * Math.PI / 360);
                    var e = camera.matrix.elements;
                    var x = [-e[0], -e[1], -e[2]];
                    var y = [e[4], e[5], e[6]];
                    var z = [-e[8], -e[9], -e[10]];
                    this.camera.u.setFromArray(x);
                    this.camera.v.setFromArray(y);
                    this.camera.w.setFromArray(z);
                    this.dirty = true;
                    if (this.renderer) {
                        this.renderer.traceManager.stop();
                    }
                };
                return GIJSView;
            })(GIRenderBase_1.GIRenderBase);
            exports_1("GIJSView", GIJSView);
        }
    }
});
//# sourceMappingURL=GIJSView.js.map