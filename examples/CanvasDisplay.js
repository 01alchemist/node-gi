System.register([], function(exports_1) {
    var CanvasDisplay;
    return {
        setters:[],
        execute: function() {
            CanvasDisplay = (function () {
                function CanvasDisplay(i_width, i_height) {
                    if (i_width === void 0) { i_width = 640; }
                    if (i_height === void 0) { i_height = 480; }
                    this.i_width = i_width;
                    this.i_height = i_height;
                    this.data = new Uint8ClampedArray(this.i_width * this.i_height * 4);
                }
                CanvasDisplay.prototype.setResolution = function (width, height) {
                    this.i_width = width;
                    this.i_height = height;
                };
                CanvasDisplay.prototype.updatePixels = function (pixels) {
                    for (var y = 0; y < this.i_height; y++) {
                        for (var x = 0; x < this.i_width; x++) {
                            var i = y * (this.i_width * 4) + (x * 4);
                            var pi = y * (this.i_width * 3) + (x * 3);
                            this.data[i] = pixels[pi];
                            this.data[i + 1] = pixels[pi + 1];
                            this.data[i + 2] = pixels[pi + 2];
                            this.data[i + 3] = 255;
                        }
                    }
                };
                CanvasDisplay.prototype.updatePixelsRect = function (rect, pixels) {
                    for (var y = rect.yoffset; y < rect.yoffset + rect.height; y++) {
                        for (var x = rect.xoffset; x < rect.xoffset + rect.width; x++) {
                            var i = y * (this.i_width * 4) + (x * 4);
                            var pi = y * (this.i_width * 3) + (x * 3);
                            this.data[i] = pixels[pi];
                            this.data[i + 1] = pixels[pi + 1];
                            this.data[i + 2] = pixels[pi + 2];
                            this.data[i + 3] = 255;
                        }
                    }
                };
                return CanvasDisplay;
            })();
            exports_1("CanvasDisplay", CanvasDisplay);
        }
    }
});
//# sourceMappingURL=CanvasDisplay.js.map