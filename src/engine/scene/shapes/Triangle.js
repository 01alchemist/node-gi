System.register(["../materials/Material", "./Box", "../../math/Vector3", "../../math/Hit", "../../math/Constants", "../../math/Matrix4", "./Shape", "../materials/MaterialUtils", "../../../pointer/ByteArrayBase"], function(exports_1) {
    var Material_1, Box_1, Vector3_1, Hit_1, Constants_1, Hit_2, Matrix4_1, Shape_1, MaterialUtils_1, ByteArrayBase_1;
    var Triangle;
    return {
        setters:[
            function (Material_1_1) {
                Material_1 = Material_1_1;
            },
            function (Box_1_1) {
                Box_1 = Box_1_1;
            },
            function (Vector3_1_1) {
                Vector3_1 = Vector3_1_1;
            },
            function (Hit_1_1) {
                Hit_1 = Hit_1_1;
                Hit_2 = Hit_1_1;
            },
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            },
            function (Matrix4_1_1) {
                Matrix4_1 = Matrix4_1_1;
            },
            function (Shape_1_1) {
                Shape_1 = Shape_1_1;
            },
            function (MaterialUtils_1_1) {
                MaterialUtils_1 = MaterialUtils_1_1;
            },
            function (ByteArrayBase_1_1) {
                ByteArrayBase_1 = ByteArrayBase_1_1;
            }],
        execute: function() {
            Triangle = (function () {
                function Triangle(material, box, v1, v2, v3, n1, n2, n3, t1, t2, t3) {
                    if (material === void 0) { material = null; }
                    if (box === void 0) { box = new Box_1.Box(); }
                    if (v1 === void 0) { v1 = new Vector3_1.Vector3(); }
                    if (v2 === void 0) { v2 = new Vector3_1.Vector3(); }
                    if (v3 === void 0) { v3 = new Vector3_1.Vector3(); }
                    if (n1 === void 0) { n1 = new Vector3_1.Vector3(); }
                    if (n2 === void 0) { n2 = new Vector3_1.Vector3(); }
                    if (n3 === void 0) { n3 = new Vector3_1.Vector3(); }
                    if (t1 === void 0) { t1 = new Vector3_1.Vector3(); }
                    if (t2 === void 0) { t2 = new Vector3_1.Vector3(); }
                    if (t3 === void 0) { t3 = new Vector3_1.Vector3(); }
                    this.material = material;
                    this.box = box;
                    this.v1 = v1;
                    this.v2 = v2;
                    this.v3 = v3;
                    this.n1 = n1;
                    this.n2 = n2;
                    this.n3 = n3;
                    this.t1 = t1;
                    this.t2 = t2;
                    this.t3 = t3;
                    this.type = Shape_1.ShapeType.TRIANGLE;
                    this.memorySize = Triangle.SIZE;
                }
                Triangle.prototype.directRead = function (memory, offset) {
                    offset++;
                    var materialIndex = memory[offset++];
                    var material = Material_1.Material.map[materialIndex];
                    if (material) {
                        this.material = material;
                    }
                    this.index = memory[offset++];
                    offset = this.v1.directRead(memory, offset);
                    offset = this.v2.directRead(memory, offset);
                    offset = this.v3.directRead(memory, offset);
                    offset = this.n1.directRead(memory, offset);
                    offset = this.n2.directRead(memory, offset);
                    offset = this.n3.directRead(memory, offset);
                    if (this.t1) {
                        offset = this.t1.directRead(memory, offset);
                    }
                    else {
                        offset = offset + Vector3_1.Vector3.SIZE;
                    }
                    if (this.t2) {
                        offset = this.t2.directRead(memory, offset);
                    }
                    else {
                        offset = offset + Vector3_1.Vector3.SIZE;
                    }
                    if (this.t3) {
                        offset = this.t3.directRead(memory, offset);
                    }
                    else {
                        offset = offset + Vector3_1.Vector3.SIZE;
                    }
                    this.updateBox();
                    return offset;
                };
                Triangle.prototype.directWrite = function (memory, offset) {
                    memory[offset++] = this.type;
                    memory[offset++] = this.material.index;
                    memory[offset++] = this.index;
                    offset = this.v1.directWrite(memory, offset);
                    offset = this.v2.directWrite(memory, offset);
                    offset = this.v3.directWrite(memory, offset);
                    offset = this.n1.directWrite(memory, offset);
                    offset = this.n2.directWrite(memory, offset);
                    offset = this.n3.directWrite(memory, offset);
                    if (this.t1) {
                        offset = this.t1.directWrite(memory, offset);
                    }
                    else {
                        offset = offset + Vector3_1.Vector3.SIZE;
                    }
                    if (this.t2) {
                        offset = this.t2.directWrite(memory, offset);
                    }
                    else {
                        offset = offset + Vector3_1.Vector3.SIZE;
                    }
                    if (this.t3) {
                        offset = this.t3.directWrite(memory, offset);
                    }
                    else {
                        offset = offset + Vector3_1.Vector3.SIZE;
                    }
                    return offset;
                };
                Triangle.prototype.read = function (memory) {
                    memory.position += ByteArrayBase_1.ByteArrayBase.SIZE_OF_UINT8;
                    var materialIndex = memory.readInt();
                    var material = Material_1.Material.map[materialIndex];
                    if (material) {
                        this.material = material;
                    }
                    this.index = memory.readInt();
                    this.v1.read(memory);
                    this.v2.read(memory);
                    this.v3.read(memory);
                    this.n1.read(memory);
                    this.n2.read(memory);
                    this.n3.read(memory);
                    this.t1.read(memory);
                    this.t2.read(memory);
                    this.t3.read(memory);
                    if (this.t1.isNullVector()) {
                        this.t1 = null;
                    }
                    if (this.t2.isNullVector()) {
                        this.t2 = null;
                    }
                    if (this.t3.isNullVector()) {
                        this.t3 = null;
                    }
                    this.updateBox();
                    return memory.position;
                };
                Triangle.prototype.write = function (memory) {
                    memory.writeByte(this.type);
                    memory.writeInt(this.material.index);
                    memory.writeInt(this.index);
                    this.v1.write(memory);
                    this.v2.write(memory);
                    this.v3.write(memory);
                    this.n1.write(memory);
                    this.n2.write(memory);
                    this.n3.write(memory);
                    if (this.t1) {
                        this.t1.write(memory);
                    }
                    else {
                        Vector3_1.Vector3.NullVector.write(memory);
                    }
                    if (this.t2) {
                        this.t2.write(memory);
                    }
                    else {
                        Vector3_1.Vector3.NullVector.write(memory);
                    }
                    if (this.t3) {
                        this.t3.write(memory);
                    }
                    else {
                        Vector3_1.Vector3.NullVector.write(memory);
                    }
                    return memory.position;
                };
                Triangle.fromJson = function (triangles) {
                    if (triangles instanceof Triangle) {
                        var t = triangles;
                        return new Triangle(MaterialUtils_1.MaterialUtils.fromJson(t.material), Box_1.Box.fromJson(t.box), Vector3_1.Vector3.fromJson(t.v1), Vector3_1.Vector3.fromJson(t.v2), Vector3_1.Vector3.fromJson(t.v3), Vector3_1.Vector3.fromJson(t.n1), Vector3_1.Vector3.fromJson(t.n2), Vector3_1.Vector3.fromJson(t.n3), Vector3_1.Vector3.fromJson(t.t1), Vector3_1.Vector3.fromJson(t.t2), Vector3_1.Vector3.fromJson(t.t3));
                    }
                    else {
                        var _ts = [];
                        var ts = triangles;
                        ts.forEach(function (t) {
                            _ts.push(new Triangle(MaterialUtils_1.MaterialUtils.fromJson(t.material), Box_1.Box.fromJson(t.box), Vector3_1.Vector3.fromJson(t.v1), Vector3_1.Vector3.fromJson(t.v2), Vector3_1.Vector3.fromJson(t.v3), Vector3_1.Vector3.fromJson(t.n1), Vector3_1.Vector3.fromJson(t.n2), Vector3_1.Vector3.fromJson(t.n3), Vector3_1.Vector3.fromJson(t.t1), Vector3_1.Vector3.fromJson(t.t2), Vector3_1.Vector3.fromJson(t.t3)));
                        });
                        return _ts;
                    }
                };
                Triangle.newTriangle = function (v1, v2, v3, t1, t2, t3, material) {
                    var t = new Triangle();
                    t.v1 = v1;
                    t.v2 = v2;
                    t.v3 = v3;
                    t.t1 = t1;
                    t.t2 = t2;
                    t.t3 = t3;
                    t.material = material;
                    t.updateBox();
                    t.fixNormals();
                    return t;
                };
                Triangle.prototype.compile = function () {
                };
                Object.defineProperty(Triangle.prototype, "vertices", {
                    get: function () {
                        return [this.v1, this.v2, this.v3];
                    },
                    enumerable: true,
                    configurable: true
                });
                Triangle.prototype.intersect = function (r) {
                    var e1x = this.v2.x - this.v1.x;
                    var e1y = this.v2.y - this.v1.y;
                    var e1z = this.v2.z - this.v1.z;
                    var e2x = this.v3.x - this.v1.x;
                    var e2y = this.v3.y - this.v1.y;
                    var e2z = this.v3.z - this.v1.z;
                    var px = r.direction.y * e2z - r.direction.z * e2y;
                    var py = r.direction.z * e2x - r.direction.x * e2z;
                    var pz = r.direction.x * e2y - r.direction.y * e2x;
                    var det = e1x * px + e1y * py + e1z * pz;
                    if (det > -Constants_1.EPS && det < Constants_1.EPS) {
                        return Hit_2.NoHit;
                    }
                    var inv = 1 / det;
                    var tx = r.origin.x - this.v1.x;
                    var ty = r.origin.y - this.v1.y;
                    var tz = r.origin.z - this.v1.z;
                    var u = (tx * px + ty * py + tz * pz) * inv;
                    if (u < 0 || u > 1) {
                        return Hit_2.NoHit;
                    }
                    var qx = ty * e1z - tz * e1y;
                    var qy = tz * e1x - tx * e1z;
                    var qz = tx * e1y - ty * e1x;
                    var v = (r.direction.x * qx + r.direction.y * qy + r.direction.z * qz) * inv;
                    if (v < 0 || u + v > 1) {
                        return Hit_2.NoHit;
                    }
                    var d = (e2x * qx + e2y * qy + e2z * qz) * inv;
                    if (d < Constants_1.EPS) {
                        return Hit_2.NoHit;
                    }
                    return new Hit_1.Hit(this, d);
                };
                Triangle.prototype.getColor = function (p) {
                    var t = this;
                    if (t.material.texture == null) {
                        return t.material.color;
                    }
                    var _uvw = t.baryCentric(p);
                    var u = _uvw.u;
                    var v = _uvw.v;
                    var w = _uvw.w;
                    var n = new Vector3_1.Vector3();
                    n = n.add(t.t1.mulScalar(u));
                    n = n.add(t.t2.mulScalar(v));
                    n = n.add(t.t3.mulScalar(w));
                    return t.material.texture.sample(n.x, n.y);
                };
                Triangle.prototype.getMaterial = function (p) {
                    return this.material;
                };
                Triangle.prototype.getNormal = function (p) {
                    var t = this;
                    var _uvw = t.baryCentric(p);
                    var u = _uvw.u;
                    var v = _uvw.v;
                    var w = _uvw.w;
                    var n = new Vector3_1.Vector3();
                    n = n.add(t.n1.mulScalar(u));
                    n = n.add(t.n2.mulScalar(v));
                    n = n.add(t.n3.mulScalar(w));
                    n = n.normalize();
                    if (t.material.normalTexture != null) {
                        var b = new Vector3_1.Vector3();
                        b = b.add(t.t1.mulScalar(u));
                        b = b.add(t.t2.mulScalar(v));
                        b = b.add(t.t3.mulScalar(w));
                        var ns = t.material.normalTexture.normalSample(b.x, b.y);
                        var dv1 = t.v2.sub(t.v1);
                        var dv2 = t.v3.sub(t.v1);
                        var dt1 = t.t2.sub(t.t1);
                        var dt2 = t.t3.sub(t.t1);
                        var T = dv1.mulScalar(dt2.y).sub(dv2.mulScalar(dt1.y)).normalize();
                        var B = dv2.mulScalar(dt1.x).sub(dv1.mulScalar(dt2.x)).normalize();
                        var N = T.cross(B);
                        var matrix = new Matrix4_1.Matrix4(T.x, B.x, N.x, 0, T.y, B.y, N.y, 0, T.z, B.z, N.z, 0, 0, 0, 0, 1);
                        n = matrix.mulDirection(ns);
                    }
                    if (t.material.bumpTexture != null) {
                        var b = new Vector3_1.Vector3();
                        b = b.add(t.t1.mulScalar(u));
                        b = b.add(t.t2.mulScalar(v));
                        b = b.add(t.t3.mulScalar(w));
                        var bump = t.material.bumpTexture.bumpSample(b.x, b.y);
                        var dv1 = t.v2.sub(t.v1);
                        var dv2 = t.v3.sub(t.v1);
                        var dt1 = t.t2.sub(t.t1);
                        var dt2 = t.t3.sub(t.t1);
                        var tangent = dv1.mulScalar(dt2.y).sub(dv2.mulScalar(dt1.y)).normalize();
                        var biTangent = dv2.mulScalar(dt1.x).sub(dv1.mulScalar(dt2.x)).normalize();
                        n = n.add(tangent.mulScalar(bump.x * t.material.bumpMultiplier));
                        n = n.add(biTangent.mulScalar(bump.y * t.material.bumpMultiplier));
                    }
                    n = n.normalize();
                    return n;
                };
                Triangle.prototype.getRandomPoint = function () {
                    return new Vector3_1.Vector3();
                };
                Triangle.prototype.area = function () {
                    var t = this;
                    var e1 = t.v2.sub(t.v1);
                    var e2 = t.v3.sub(t.v1);
                    var n = e1.cross(e2);
                    return n.length() / 2;
                };
                Triangle.prototype.baryCentric = function (p) {
                    var t = this;
                    var v0 = t.v2.sub(t.v1);
                    var v1 = t.v3.sub(t.v1);
                    var v2 = p.sub(t.v1);
                    var d00 = v0.dot(v0);
                    var d01 = v0.dot(v1);
                    var d11 = v1.dot(v1);
                    var d20 = v2.dot(v0);
                    var d21 = v2.dot(v1);
                    var d = d00 * d11 - d01 * d01;
                    var v = (d11 * d20 - d01 * d21) / d;
                    var w = (d00 * d21 - d01 * d20) / d;
                    var u = 1 - v - w;
                    return { u: u, v: v, w: w };
                };
                Triangle.prototype.updateBox = function () {
                    var t = this;
                    var min = t.v1.min(t.v2).min(t.v3);
                    var max = t.v1.max(t.v2).max(t.v3);
                    t.box = new Box_1.Box(min, max);
                };
                Triangle.prototype.fixNormals = function () {
                    var t = this;
                    var e1 = t.v2.sub(t.v1);
                    var e2 = t.v3.sub(t.v1);
                    var n = e1.cross(e2).normalize();
                    var zero = new Vector3_1.Vector3();
                    if (t.n1 == undefined || t.n1.equals(zero)) {
                        t.n1 = n;
                    }
                    if (t.n2 == undefined || t.n2.equals(zero)) {
                        t.n2 = n;
                    }
                    if (t.n3 == undefined || t.n3.equals(zero)) {
                        t.n3 = n;
                    }
                };
                Triangle.SIZE = Box_1.Box.SIZE + (Vector3_1.Vector3.SIZE * 9) + 2;
                return Triangle;
            })();
            exports_1("Triangle", Triangle);
        }
    }
});
//# sourceMappingURL=Triangle.js.map