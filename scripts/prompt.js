'use strict';

/**
 * Prompt tag by lisakov.com
 *
 * Syntax
 *
 *   {% prompt [NAME] [DIR] [SYMBOL] [PREFIX] %}
 *   code
 *   code
 *   {% endprompt %}
 *
 *  Examples
 *
 *   {% prompt root 0 # %}              →   root #
 *   {% prompt root /dir # %}           →   root /dir #
 *   {% prompt livecd ~ # %}            →   livecd ~ #
 *   {% prompt user /dir $ %}           →   user /dir $
 *   {% prompt user 0 $ %}              →   user $
 *   {% prompt user %}                  →   user $
 *   {% prompt livecd ~ # (chroot) %}   →   (chroot) livecd ~ #
 *
 */

hexo.extend.tag.register('prompt', function(args, content){
  args.unshift('prompt'); // make first argument args[1] not args[0]
  var name='user';
  var dir='';
  var symbol='$';
  var prefix='';
  var promptclass = 'promptuser'; 
  if (args.length > 1) {
    name   = args[1];
    dir    = args[2]+' ';
    symbol = args[3];
  }
  if (typeof args[1] !=='undefined' && args[1].indexOf('root') >-1 || args[1]=='livecd') {
    promptclass = 'promptroot'; 
  }
  if (args[2]=='0' || typeof args[2] == 'undefined') { dir = ''; }
  if (args[3]=='0' || typeof args[3] == 'undefined') { symbol = ''; }
  if (typeof args[4] !== 'undefined')  { prefix = args[4] + ' '; }

  var lines = content.split(/\r\n|\r|\n/).length+1
  var gutter='';
  var i=1;
  for (i=1; i<lines; i++) {
    gutter += prefix+"<span class='"+promptclass+"'>"+name+"</span> <span class='promptdir'>" + dir + symbol + "</span><br>"
  }

  var table = '<figure class="highlight prompt"><table><tr><td class="gutter"><pre>' + gutter + '</pre></td><td class="code"><pre>' + content + '</pre></td></tr></table></figure>';

  return table;

}, {ends: true});
