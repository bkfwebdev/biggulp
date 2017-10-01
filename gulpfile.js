"use strict";
//------------- set up required packages -----------------------
var myGulp = require("gulp");
var gulpConcat = require("gulp-concat");
var gulpMinify = require("gulp-uglify");
var soSassy = require("gulp-sass");
var mapThat = require("gulp-sourcemaps");
var cssCrunch = require("gulp-clean-css");
var concatCss = require("gulp-concat-css"); 
var imageCrunch = require("gulp-imagemin");
var cleanUpNice = require("gulp-clean");
var serveItUp = require("gulp-webserver");

//------------------ define task -------------------------------

// The gulp scripts command concatenates, minifies, and copies all of the project’s JavaScript files into an all.min.js file
// The command copies the all.min.js file into the dist/scripts folder

myGulp.task("scripts", function(){
    return myGulp.src(["js/global.js","js/circle/autogrow.js","js/circle/circle.js"])
        .pipe(mapThat.init())
        .pipe(gulpConcat("all.min.js"))
        .pipe(gulpMinify())
        .pipe(mapThat.write("./"))
        .pipe(myGulp.dest("dist/scripts"));
});

myGulp.task("styles0", function () {
    return myGulp.src("sass/global.scss")
        .pipe(soSassy().on("error", soSassy.logError))
        .pipe(concatCss("all.min.css"))
        .pipe(cssCrunch())
        .pipe(myGulp.dest("dist/styles"));
   });

   myGulp.task("styles1", function () {
    return myGulp.src("dist/styles/all.min.css")
     .pipe(mapThat.init())
     .pipe(mapThat.write("./"))
     .pipe(myGulp.dest("dist/styles"));
   });

myGulp.task("styles",["styles0","styles1"]);



// The gulp styles command compiles the project’s SCSS files into CSS, and concatenates and minifies into an all.min.css file
// The command copies the all.min.css file into the dist/styles folder
// >source maps<
// The gulp scripts command generates JavaScript source maps
// The gulp styles command generates CSS source maps

/* myGulp.task("styles1",function(){
    return myGulp.src(["sass/global.scss"])
        .pipe(soSassy())
        .pipe(concatCss("all.min.css"))   
        .pipe(cssCrunch())
        .pipe(myGulp.dest("dist/styles")); 
});

myGulp.task("styles2",function(){
    return myGulp.src(["dist/styles/all.min.css"])
    .pipe(mapThat.init())
    .pipe(mapThat.write("dist/styles"))
})

myGulp.task("styles",["styles1","styles2"]);
*/


// The gulp images command copies the optimized images to the dist/content folder.

myGulp.task("images", function(){
    return myGulp.src(["images/*.jpg","images/*.png"])
        .pipe(imageCrunch())
        .pipe(myGulp.dest("dist/content"))
});
 

// The gulp clean command deletes all of the files and folders in the dist folder.
myGulp.task("clean", function () {
    return myGulp.src("./dist", {read: false})
        .pipe(cleanUpNice()); 
});

myGulp.task('webServer', function() {
    return myGulp.src("./")
      .pipe(serveItUp({
        livereload: true,
        directoryListing: false,
        fallback:"index.html",
        open: true
      }));
  });


myGulp.task("sassWatch",function(){
    return myGulp.watch("sass/*.scss",["build"])
});

myGulp.task("build",["clean","scripts","styles","images","webServer","sassWatch"]);
myGulp.task("default",["build"]);
//---------------- set up default task ------------------------
// The gulp command properly runs the build task as a dependency
// The gulp command serves the project using a local webserver.
// The gulp command also listens for changes to any .scss file. When there is a change to any .scss file, the gulp styles command is run, 
// the files are compiled, concatenated and minified to the dist folder, and the browser reloads, displaying the changes