"use strict";
//------------- set up required packages -----------------------
var myGulp = require("gulp");
var gulpConcat = require("gulp-concat");
var gulpMinify = require("gulp-uglify");
var soSassy = require("gulp-sass");
var mapThat = require("gulp-sourcemaps");


//------------------ define task -------------------------------

// The gulp scripts command concatenates, minifies, and copies all of the project’s JavaScript files into an all.min.js file
// The command copies the all.min.js file into the dist/scripts folder

myGulp.task("scripts", function() {
    return myGulp.src(["js/global.js","js/circle/autogrow.js","js/circle/circle.js"])
        .pipe(gulpConcat("all.min.js"))
        .pipe(gulpMinify())
        .pipe(myGulp.dest("dist/"));
});

// The gulp styles command compiles the project’s SCSS files into CSS, and concatenates and minifies into an all.min.css file
// The command copies the all.min.css file into the dist/styles folder

myGulp.task("styles",function(){
    return myGulp.src(["sass/*.sass"]).
    pipe(soSassy()).
    pipe(gulpConcat()).
    pipe(gulpMinify("all.min.css")).
    pipe(myGulp.dest("dist/"));
});

// source maps
// The gulp scripts command generates JavaScript source maps
// The gulp styles command generates CSS source maps

// The gulp images command copies the optimized images to the dist/content folder.
myGulp.task("images",function(){});

// The gulp clean command deletes all of the files and folders in the dist folder.
myGulp.task("clean",function(){});

// The gulp build command properly runs the clean, scripts, styles, and images tasks.
myGulp.task("build",function(){});

//---------------- set up default task ------------------------
// The gulp command properly runs the build task as a dependency
// The gulp command serves the project using a local webserver.
// The gulp command also listens for changes to any .scss file. When there is a change to any .scss file, the gulp styles command is run, 
// the files are compiled, concatenated and minified to the dist folder, and the browser reloads, displaying the changes
