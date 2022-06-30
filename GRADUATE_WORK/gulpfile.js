const gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass")),
  fileinclude = require("gulp-file-include"),
  browserSync = require("browser-sync");
replace = require("gulp-replace");

gulp.task("copy:icons", function () {
  return gulp
    .src("./src/assets/icons/*")
    .pipe(gulp.dest("./dest/assets/icons"));
});
gulp.task("copy:images", function () {
  return gulp.src("./src/assets/img/*").pipe(gulp.dest("./dest/assets/img"));
});

gulp.task("sass", function () {
  return gulp
    .src("./src/assets/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dest/css"))
    .pipe(browserSync.stream());
});
gulp.task("fileinclude", function () {
  return gulp
    .src("./src/pages/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("./dest"))
    .pipe(browserSync.stream());
});
gulp.task("watch", function (done) {
  browserSync.init({
    server: {
      baseDir: "./dest",
      // replace current page
      index: "homepage.html",
    },
  });
  gulp.watch("./src/assets/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("./src/pages/**/*.html").on("change", gulp.series("fileinclude"));
  gulp.watch("./src/pages/homepage.html").on("change", browserSync.reload);
});

gulp.task(
  "default",
  gulp.series(["sass", "fileinclude", "copy:images", "copy:icons", "watch"])
);
