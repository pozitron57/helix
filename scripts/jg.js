'use strict';

/**
* jg tag by lisakov.com
*
*   Examples jg
*   
*   {% jg img_path=https://lisakov.com/images/ thumbs_dir=800 thumbs_dir2=2000 lastonly=true %}
*     imagename1.jpg
*     imagename2.jpg "Title with description for imagename2"
*   {% endjg %}
*   
*   Arguments
*   
*   path:
*     path to images (img_path)
*     default: 'https://lisakov.com/images/'
*   
*   thumbs_dir:
*     path to thumbs (appended to img_path)
*     default: 'thumbs/'
*     none: no thumbs, use original images, useful for a single image
*   
*   thumbs_dir2:
*     path to medium thumbs (appended to img_path)
*     default: '800/'
*     if lastonly=true, last element gets
*   
*   lastonly:
*     <bool> (if true, use larger thumbs or original only for the last item)
*     default: false
*     use img_path + 'thumbs/' for every image except for the last, 
*     last will be img_path + thumbs (equals to anything, if thumbs=undefined, use original)
*   
*/

hexo.extend.tag.register('jg', function(args, content){
  // set defaults
  var img_path = 'https://lisakov.com/images/'; 
  var thumbs_dir = 'thumbs/';
  var thumbs_dir2 = '800/';
  var lastonly = 'false';
  // read arguments and replace defaults if needed
  args.forEach((el, idx) => {
    if (el.includes('img_path='))   { img_path   = el.replace('img_path=',''); }
    if (el.includes('lastonly='))   { lastonly   = el.replace('lastonly=',''); }
    if (el.includes('thumbs_dir=')) {
      thumbs_dir = el.replace('thumbs_dir=',''); 
      thumbs_dir += thumbs_dir.endsWith("/") ? "" : "/" //add trailing slash if not present
      if (thumbs_dir.includes('none')) { thumbs_dir=''; }
    }
    if (el.includes('thumbs_dir2=')) {
      thumbs_dir2 = el.replace('thumbs_dir2=',''); 
      thumbs_dir2 += thumbs_dir2.endsWith("/") ? "" : "/" //add trailing slash if not present
      if (thumbs_dir2.includes('none')) { thumbs_dir2 = ''; }
    }
  });

  // Перебираем все строки
  var lines = content.split(/\r\n|\r|\n/);
  lines.forEach((element, index, array) => {
    // Если нет lastonly=true
    if (lastonly === 'false') {
      // Если в строке только imgname без title
      if (lines[index].indexOf('"') === -1) {
        lines[index] = '<a href=" ' + img_path + element + '"><img src="' + img_path + thumbs_dir + element + '"/></a>';
      // Если в строке imgname + "title"
      } else {
        var title = lines[index].match(/"([^']+)"/)[1];
        var img_name = lines[index].split(' ')[0];
        lines[index] = '<a href=" ' + img_path + img_name + '"' + 'title="' + title + '"><img src="' + img_path + thumbs_dir + img_name + '"/></a>';
      }
    // Если lastonly=true
    } else {

      // Если элемент ПОСЛЕДНИЙ
      if (index === array.length - 1) {
        // Если в строке только imgname без title
        if (lines[index].indexOf('"') === -1) {
          lines[index] = '<a href=" ' + img_path + element + '"><img src="' + img_path + thumbs_dir2 + element + '"/></a>';
        // Если в строке imgname + "title"
        } else {
          var title = lines[index].match(/"([^']+)"/)[1];
          var img_name = lines[index].split(' ')[0];
          lines[index] = '<a href=" ' + img_path + img_name + '"' + 'title="' + title + '"><img src="' + img_path + thumbs_dir2 + img_name + '"/></a>';
        }

      // Если элемент НЕ последний
      } else {
        // Если в строке только imgname без title
        if (lines[index].indexOf('"') === -1) {
          lines[index] = '<a href=" ' + img_path + element + '"><img src="' + img_path + thumbs_dir + element + '"/></a>';
        // Если в строке imgname + "title"
        } else {
          var title = lines[index].match(/"([^']+)"/)[1];
          var img_name = lines[index].split(' ')[0];
          lines[index] = '<a href=" ' + img_path + img_name + '"' + 'title="' + title + '"><img src="' + img_path + thumbs_dir + img_name + '"/></a>';
        }
      }

    }
  });

  return '<div class="jg">' + lines.join(' ') + '</div>';
}, {ends: true});
