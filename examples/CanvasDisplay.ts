import {GUI} from "./GUI";
import {ThreeJSView} from "./ThreeJSView";
/**
 * Created by Nidin Vinayakan on 11-01-2016.
 */
export abstract class CanvasDisplay{

    data:Uint8ClampedArray|number[];

    constructor(public i_width:number = 640, public i_height:number = 480) {
        this.data = new Uint8ClampedArray(this.i_width * this.i_height * 4);
    }

    setResolution(width:number,height:number):void {
        this.i_width = width;
        this.i_height = height;
    }

    updatePixels(pixels:Uint8ClampedArray):void {

        for (var y = 0; y < this.i_height; y++) {
            for (var x = 0; x < this.i_width; x++) {
                var i:number = y * (this.i_width * 4) + (x * 4);
                var pi:number = y * (this.i_width * 3) + (x * 3);
                this.data[i] = pixels[pi];
                this.data[i + 1] = pixels[pi + 1];
                this.data[i + 2] = pixels[pi + 2];
                this.data[i + 3] = 255;
            }
        }
    }

    updatePixelsRect(rect, pixels:Uint8ClampedArray):void {

        for (var y = rect.yoffset; y < rect.yoffset + rect.height; y++) {
            for (var x = rect.xoffset; x < rect.xoffset + rect.width; x++) {

                var i:number = y * (this.i_width * 4) + (x * 4);
                var pi:number = y * (this.i_width * 3) + (x * 3);
                this.data[i] = pixels[pi];
                this.data[i + 1] = pixels[pi + 1];
                this.data[i + 2] = pixels[pi + 2];
                this.data[i + 3] = 255;
            }
        }
    }
}
