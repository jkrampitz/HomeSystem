const gulp = require('gulp');
const exec = require('child_process').exec;
const path = require('path');
const express = require('./node_modules/express');

const sass = path.normalize('./node_modules/.bin/node-sass');
var typescript = require('gulp-tsc');

gulp.task('build:ts:app', () => {
    gulp.src(['src/app/**/*.ts'])
        .pipe(typescript())
        .pipe(gulp.dest('./dist/app'));
});

gulp.task('build:ts:scripts', () => {
    gulp.src(['src/scripts/**/*.ts'])
        .pipe(typescript())
        .pipe(gulp.dest('dist/public/scripts'));
});

gulp.task('build:sass', (done) => {
    exec(sass + ' ./src/css --output ./dist/public/css', done);
});

gulp.task('copy:html', () => {
    gulp.src('./src/html/**/*.html')
        .pipe(gulp.dest('./dist/public/html'))
});

gulp.task('copy:pug', () => {
    gulp.src('./src/views/**/*.pug')
        .pipe(gulp.dest('./dist/views'))
});

gulp.task('build', ['build:ts:app', 'build:ts:scripts', 'build:sass', 'copy:html', 'copy:pug'], () => {
    console.log('build finished');
});

gulp.task('run', function (cb) {
    exec('node dist/app/app.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    })});

gulp.task('watch', () => {
    gulp.watch('./src/**/*.html', ['copy:html']);
});
