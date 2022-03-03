const project_folder = require('path').basename(__dirname);
const source_folder = 'src';

const fs = require('fs');

const path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/assets/img/',
    // fonts: project_folder + '/assets/fonts/',
  },
  src: {
    html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
    // css: source_folder + '/scss/style.scss',
    css: source_folder + '/css/style.css',
    js: source_folder + '/js/script.js',
    img: source_folder + '/assets/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}',
    // fonts: source_folder + '/assets/fonts/*.ttf',
  },
  watch: {
    html: source_folder + '/**/*.html',
    // css: source_folder + '/scss/**/*.scss',
    css: source_folder + '/css/**/*.css',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/assets/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}',
  },
  clean: './' + project_folder + '/'
}

// changed = require('gulp-changed');
const { src, dest } = require('gulp'),
gulp = require('gulp'),
browsersync = require('browser-sync').create(),
fileinclude = require('gulp-file-include'),
del = require('del'),
scss = require('gulp-sass')(require('sass')),
autoprefixer = require('gulp-autoprefixer'),
group_media = require('gulp-group-css-media-queries'),
clean_css = require('gulp-clean-css'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify-es').default,
imagemin = require('gulp-imagemin'),
webp = require('gulp-webp'),
webphtml = require('gulp-webp-html'),
svgSprite = require('gulp-svg-sprite'),
ttf2woff = require('gulp-ttf2woff'),
ttf2woff2 = require('gulp-ttf2woff2'),
fonter = require('gulp-fonter'),
babel = require('gulp-babel'),
useref = require('gulp-useref'),
htmlmin = require('gulp-htmlmin'),
rev = require('gulp-rev'),
revRewrite = require('gulp-rev-rewrite'),
revDel = require('gulp-rev-delete-original');
// webpcss = require('gulp-webp-css'),


function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: './' + project_folder + '/'
    },
    port: 3000,
    notify: false
  })
}

function html() {
  return src(path.src.html)
  .pipe(fileinclude())
  // .pipe(changed(project_folder))
  // .pipe(webphtml())
  .pipe(useref())
  // .pipe(dest(path.build.html))
  .pipe(
    htmlmin({ 
      collapseWhitespace: true,
      removeComments: true
    })
  )
  // .pipe(
  //   rename({
  //     extname: '.min.html'
  //   })
  // )
  // .pipe(rev())
  // .pipe(src(project_folder + '/**/*.html'))
  // .pipe(revRewrite())
  // .pipe(src(path.src.html))
  // .pipe(revRewrite())
  .pipe(dest(path.build.html))
  .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
  .pipe(
    scss({
      outputStyle: 'expanded'
    })
  )
  // .pipe(changed(project_folder))
  .pipe(group_media())
  .pipe(
    autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      cascade: true
    })
  )
  // .pipe(webpcss())
  
  // .pipe(dest(path.build.css))
  .pipe(clean_css())
  // .pipe(
  //   rename({
  //     extname: '.min.css'
  //   })
  // )
  // .pipe(rev())
  // .pipe(src(path.build.html))
  // .pipe(revRewrite())
  .pipe(dest(path.build.css))
  .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
  .pipe(fileinclude())
  // .pipe(changed(project_folder))

  // .pipe(dest(path.build.js))
  .pipe(
    babel({
      presets: ['@babel/preset-env']
    })
  )
  .pipe(uglify())
  // .pipe(
  //   rename({
  //     extname: '.min.js'
  //   })
  // )
  // .pipe(rev())
  // .pipe(src(path.build.html))
  // .pipe(revRewrite())
  .pipe(dest(path.build.js))
  .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
  .pipe(
    webp({
      quality: 99
    })
  )
  // .pipe(changed(project_folder))
  // .pipe(rev())
  .pipe(dest(path.build.img))
  .pipe(src(path.src.img))
  .pipe(
    imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3 // 0 to 7
    })
  )
  // .pipe(rev())
  .pipe(dest(path.build.img))
  .pipe(browsersync.stream())
}

function fonts() {
  src(path.src.fonts)
  .pipe(ttf2woff())
  // .pipe(rev())
  .pipe(dest(path.build.fonts));

  return src(path.src.fonts)
  .pipe(ttf2woff2())
  // .pipe(rev())
  .pipe(dest(path.build.fonts))
}

gulp.task('otf2ttf', function() {
  return gulp.src([source_folder + '/fonts/*.otf'])
  .pipe(
    fonter({
      formats: ['ttf']
    })
  )
  .pipe(dest(source_folder + '/fonts/'))
})

gulp.task('svgSprite', function() {
  return gulp.src([source_folder + '/iconsprite/*.svg'])
  .pipe(
    svgSprite({
      mode: {
        stack: {
          sprite: '../icons/icons.svg',
          // example: true
        }
      }
    })
  )
  .pipe(dest(path.build.img))
})

function fontsStyle(params) {
  let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
  if (file_content == '') {
    fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    })
  }
}

// function revision() {
//   return src(path.build.html)
//     .pipe(revRewrite())
//     .pipe(dest(path.build.html));
// }

function cache() {
  // return src([project_folder + '/**/*.{css,js,jpg,jpeg,png,svg,gif,ico,webp,ttf,woff,woff2,otf}', '!' + project_folder + '/**/*._{jpg,jpeg,png,svg,gif,ico,webp,ttf,woff,woff2,otf}'])
  return src(project_folder + '/**/*.{css,js,jpg,jpeg,png,svg,gif,ico,webp,ttf,woff,woff2,otf}' )
  .pipe(rev())
  .pipe(revDel())
  .pipe(dest(project_folder))
  .pipe(rev.manifest('rev.json'))
  .pipe(dest(project_folder))
}

function rewrite() {
  const manifest = fs.readFileSync(project_folder + '/rev.json')

  return src(project_folder + '/**/*.{html,css}')
  .pipe(revRewrite({manifest}))
  .pipe(dest(project_folder))
}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean(params) {
  return del(path.clean)
}

// const build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts), fontsStyle, cache, rewrite);
const build = gulp.series(clean, gulp.parallel(js, css, html, images), cache, rewrite);
const watch = gulp.parallel(build, watchFiles, browserSync);

// exports.revision = revision;
exports.cache = cache;
exports.rewrite = rewrite;
// exports.fontsStyle = fontsStyle;
// exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;