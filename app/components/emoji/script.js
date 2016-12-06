// Code goes here

angular.module('chatApp', ['ngSanitize', 'ngEmoji'])

.run(function ($emoji) {
  $emoji.setConfig({
    img_dir: 'http://hassankhan.github.io/emojify.js/images/emoji'
  })
});

angular.element(document).ready(function () {
  angular.bootstrap(document, ['chatApp'])
})