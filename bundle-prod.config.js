module.exports = {
  bundle: {
    main: {
      scripts: [
        './public/js/main.js',
      ],
      styles: './public/css/**/*.css',
      options: {
        useMin: false,
        uglify: true,
        minCSS: true,
        rev: false
      }
    }
  },
  copy: './app/images/**/*.{png,svg}'
};
