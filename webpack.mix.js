const mix = require('laravel-mix');

/**
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('src/js/app.js', 'public/js')
  .sass('src/scss/app.scss', 'public/css')
  .copyDirectory('src/images', 'public/images')
  .copyDirectory('src/files', 'public/files')
  .copy('src/index.html', 'public/index.php');
