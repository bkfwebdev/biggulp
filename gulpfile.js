"use strict";
//------------- set up required packages -----------------------
var myGulp = require("gulp");
var gulpConcat = require("gulp-concat");
var gulpMinify = require("gulp-uglify");
//------------------ define task -------------------------------
myGulp.task("scripts",function(){
gulp.src(["js/global.js","js/circle/autogrow.js","js/circle/circle.js"])
.pipe(gulpConcat("appconcat.js"))
.pipe(gulpMinify("madugly.js"))
.pipe(gulp.dest("dist/all.min.js"))
});

myGulp.task("styles",function(){

});
myGulp.task("images",function(){

});
myGulp.task("clean",function(){

});
myGulp.task("build",function(){

});
//---------------- set up default task ------------------------

