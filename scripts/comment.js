'use strict';

/**
 * Comment tag by lisakov.com
 *
 *   {% comment %}
 *   Text here won't be rendered
 *   {% endcomment %}
 *
 */

hexo.extend.tag.register('comment', function(args, content){
}, {ends: true});
