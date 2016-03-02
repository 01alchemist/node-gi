import {GIJSView} from "./GIJSView";
/**
 * Created by Nidin Vinayakan on 02-03-2016.
 */
this.i_width = 2560 / 2;
this.i_height = 1440 / 2;
var gijs = new GIJSView(this.i_width, this.i_height);
var self = this;
gijs.loadModel("../models/teapot.obj", function(){
    self.giJSView.toggleTrace(true);
});
