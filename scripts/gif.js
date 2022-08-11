'use strict';

/**
* gifonclick tag by lisakov.com
*
* Syntax:
*   {% gif image.png animation.gif %}
*/


hexo.extend.tag.register('gif', function(args){
  var img_path = args[0];
  var gif_path = args[1];
  return '<div class="cf" style="text-align:center"> <figure> <img src="' + img_path + '" data-alt="' + gif_path + '"></figure></div>'
});
