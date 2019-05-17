var browserify = require('browserify'),
  shim = require('browserify-shim'),
  chalk = require('chalk'),
  del = require('del'),
  vinyPaths = require('vinyl-paths'),
  gulp = require('gulp'),
  bump = require('gulp-bump'),
  connect = require('gulp-connect'),
  deploy = require("gulp-gh-pages"),
  git = require("gulp-git"),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  streamify = require('gulp-streamify'),
  uglify = require('gulp-uglify'),
  gutil = require('gulp-util'),
  merge = require('merge-stream'),
  source = require('vinyl-source-stream'),
  babel = require('gulp-babel');
  watchify = require('watchify');


/**
 * Constants
 */

var SRC_PATH = 'src';
var DIST_PATH = 'dist';

var COMPONENT_NAME = 'Halogen';
var PACKAGE_FILE =  COMPONENT_NAME + '.js';
var PACKAGE_NAME = COMPONENT_NAME.toLowerCase();

var DEPENDENCIES = ['react', 'react-dom'];

var EXAMPLE_SRC_PATH = 'example/src';
var EXAMPLE_DIST_PATH = 'example/dist';

var EXAMPLE_APP = 'app.js';
var EXAMPLE_COPY = [
    'node_modules/codemirror/lib/codemirror.js',
    'node_modules/codemirror/lib/codemirror.css',
    'node_modules/codemirror/mode/javascript/javascript.js',
];
var EXAMPLE_LESS = 'app.less';
var EXAMPLE_FILES = [
  'index.html'
];


/**
 * Bundle helpers
 */

function doBundle(target, name, dest) {
  return target.bundle()
    .on('error', function(e) {
      gutil.log('Browserify Error', e);
    })
    .pipe(source(name))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
}

function watchBundle(target, name, dest) {
  return watchify(target)
    .on('update', function (scriptIds) {
      scriptIds = scriptIds
        .filter(function(i) { return i.substr(0,2) !== './' })
        .map(function(i) { return chalk.blue(i.replace(__dirname, '')) });
      if (scriptIds.length > 1) {
        gutil.log(scriptIds.length + ' Scripts updated:\n* ' + scriptIds.join('\n* ') + '\nrebuilding...');
      } else {
        gutil.log(scriptIds[0] + ' updated, rebuilding...');
      }
      doBundle(target, name, dest);
    })
    .on('time', function (time) {
      gutil.log(chalk.green(name + ' built in ' + (Math.round(time / 10) / 100) + 's'));
    });
}


/**
 * Prepare task for examples
 */

gulp.task('prepare:examples', function(done) {
  del([EXAMPLE_DIST_PATH], done);
});


/**
 * Build example files
 */
gulp.task('build:example:files', ['prepare:examples'], function buildExampleFiles() {
  return gulp.src(EXAMPLE_FILES.map(function(i) { return EXAMPLE_SRC_PATH + '/' + i }))
    .pipe(gulp.dest(EXAMPLE_DIST_PATH))
    .pipe(connect.reload());
});


/**
 * Build example css from less
 */
gulp.task('build:example:css', ['prepare:examples'], function buildExampleCSS() {
  return gulp.src(EXAMPLE_SRC_PATH + '/' + EXAMPLE_LESS)
    .pipe(less())
    .pipe(gulp.dest(EXAMPLE_DIST_PATH))
    .pipe(connect.reload());
});


/**
 * Build example scripts
 *
 * Returns a gulp task with watchify when in development mode
 */

function buildExampleScripts(dev) {

  var dest = EXAMPLE_DIST_PATH;

  var opts = dev ? watchify.args : {};
  opts.debug = dev ? true : false;
  opts.hasExports = true;

  return function() {

    var common = browserify(opts).transform('babelify', {presets: ["es2015", "react"]}),
      bundle = browserify(opts).require('./' + SRC_PATH + '/' + PACKAGE_FILE, { expose: PACKAGE_NAME }).transform('babelify', {presets: ["es2015", "react"]}),
      example = browserify(opts).exclude(PACKAGE_NAME).add('./' + EXAMPLE_SRC_PATH + '/' + EXAMPLE_APP).transform('babelify', {presets: ["es2015", "react"]});

    DEPENDENCIES.forEach(function(pkg) {
      common.require(pkg);
      bundle.exclude(pkg);
      example.exclude(pkg);
    });

    if (dev) {
      watchBundle(common, 'common.js', dest);
      watchBundle(bundle, 'bundle.js', dest);
      watchBundle(example, 'app.js', dest);
    }

    return merge(
      doBundle(common, 'common.js', dest),
      doBundle(bundle, 'bundle.js', dest),
      doBundle(example, 'app.js', dest)
    );

  }

};


gulp.task('dev:build:example:scripts', ['prepare:examples'], buildExampleScripts(true));
gulp.task('build:example:scripts', ['prepare:examples'], buildExampleScripts());

gulp.task('build:example:copy', function(){
    return gulp.src(EXAMPLE_COPY)
        .pipe(gulp.dest(EXAMPLE_DIST_PATH))
        .pipe(connect.reload());
});

/**
 * Build examples
 */
gulp.task('build:examples', [
  'build:example:files',
  'build:example:css',
  'build:example:scripts',
  'build:example:copy'
]);

gulp.task('watch:examples', [
  'build:example:files',
  'build:example:css',
  'dev:build:example:scripts',
  'build:example:copy'
], function() {
  gulp.watch(EXAMPLE_FILES.map(function(i) { return EXAMPLE_SRC_PATH + '/' + i }), ['build:example:files']);
  gulp.watch([EXAMPLE_SRC_PATH + '/' + EXAMPLE_LESS], ['build:example:css']);
});


/**
 * Serve task for local development
 */

gulp.task('dev:server', function() {
  connect.server({
    root: 'example/dist',
    port: 9999,
    livereload: true
  });
});

/**
 * Development task
 */

gulp.task('dev', [
  'dev:server',
  'watch:examples'
]);


/**
 * Build task
 */

gulp.task('prepare:dist', function(done) {
  del([DIST_PATH], done);
});

gulp.task('build:dist', ['prepare:dist'], function() {

  var standalone = browserify('./' + SRC_PATH + '/' + PACKAGE_FILE, {
      standalone: COMPONENT_NAME
    })
    .transform("babelify", {presets: ["es2015", "react"]})
    .transform(shim);

  DEPENDENCIES.forEach(function(pkg) {
    standalone.exclude(pkg);
  });

  return standalone.bundle()
    .on('error', function(e) {
      gutil.log('Browserify Error', e);
    })
    .pipe(source(PACKAGE_NAME + '.js'))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(rename(PACKAGE_NAME + '.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(DIST_PATH));

});

gulp.task('build', [
  'prepare:dist',
  'prepare:examples'
], function(){
  gulp.start('build:dist', 'build:examples')
});


/**
 * Version bump tasks
 */

function getBumpTask(type) {
  return function() {
    return gulp.src(['./package.json'])
      .pipe(bump({ type: type }))
      .pipe(gulp.dest('./'));
  };
}

gulp.task('bump', getBumpTask('patch'));
gulp.task('bump:minor', getBumpTask('minor'));
gulp.task('bump:major', getBumpTask('major'));


/**
 * Git tag task
 * (version *must* be bumped first)
 */

gulp.task('publish:tag', function(done) {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  git.tag(v, message, function (err) {
    if (err) throw err;
    git.push('origin', v, function (err) {
      if (err) throw err;
      done();
    });
  });
});



/**
 * npm publish task
 * * (version *must* be bumped first)
 */
function buildToRoot(){
  return gulp.src(SRC_PATH + '/*.js')
    .pipe(babel({
      presets: ['es2015', 'react', 'stage-1']
    }))
    .pipe(gulp.dest('./'))
}

gulp.task('build:npm', buildToRoot);

gulp.task('publish:npm', ['build:npm'], function(done) {

  require('child_process')
    .spawn('npm', ['publish'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('release:npm', ['publish:npm'], function(){
    buildToRoot().pipe(vinyPaths(del))
});


/**
 * Deploy tasks
 */

gulp.task('publish:examples', ['build:examples'], function() {
  return gulp.src(EXAMPLE_DIST_PATH + '/**/*').pipe(deploy());
});

gulp.task('release', ['publish:tag', 'release:npm', 'publish:examples']);
