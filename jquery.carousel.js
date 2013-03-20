/**
 *
 * Simple jQuery Carousel scipt by Ben Cooling
 * Allows for:
 * - Dynamic amount of items
 * - Disabling prev and next buttons
 * - Optional support for swipe gesture on touch devices
 * - Vertical & Horizontal orientation
 * - Animation options (speed, distance)
 * - Multiple carousels on single page
 * - Use custom markup
 * 
 * Carousel Options:
 * @param (string) orientation : Either 'horizontal' or 'vertical'
 * @param (int) distance : Amount in pixels for carousel to slide
 * @param (string) prev : Selector for previous button, default is '.prev'
 * @param (string) next : Selector for next button, default is '.next'
 * @param (string) mask : Selector for mask, default is '.mask'
 * @param (string) items : Selector for items, default is 'ul'
 * @param (string) item : Selector for item, default is 'li'
 * @param (boolean) swipe : Enable Zepto swipe
 * @param (int) speed : Speed of animation
 *
 *
 * Please help me make this script better!
 * License : GPL
 * 
 */
(function($){
  $.fn.carousel = function(options){
  
    // Script variables
    var defaults = {
      orientation : 'horizontal', // vertical, horizontal
      distance    :  94,          // distance to slide the item (px)
      prev        : '.left',      // .prev, .left, .up
      next        : '.right',     // .next, .right, .down
      mask        : '.mask',      // selector for the mask (element with overflow:hidden)
      items       : 'ul',         // selector for item parent
      item        : 'li',         // selector for item
      swipe       : true,        // zepto type swipe event available for touch devices?
      speed       : 200           // Speed of sliding animation
    },
    o = $.extend(defaults, options), // Merge defaults and options objects

    // Logic
    c = {
      move : function(direction, $context){ // direction: prev | next
        
        if ( $(this).hasClass('disabled') ) return false;

        var $items    = $(o.items, $context),
            $mask     = $(o.mask, $context),
            $prev     = $(o.prev, $context),
            $next     = $(o.next, $context),
            pos       = (o.orientation=='horizontal') ? 'left' : 'top',
            prevMove  = parseInt($items.css(pos)) + o.distance,
            nextMove  = parseInt($items.css(pos)) - o.distance,
            prevLimit = 0,
            nextLimit = Math.abs(  parseInt($items.css('width')) - parseInt($mask.css('width')) ) * -1,
            prop      = {};

        // Animation properties: animate left, top or not at all?
        prop[pos] = false;
        if (direction=='prev' && prevMove<=prevLimit){
          prop[pos] = prevMove;
        }
        else if (direction=='next' && nextMove>=nextLimit){
          prop[pos] = nextMove;
        }

        if (prop[pos]!==false) $items.animate(prop, o.speed, function(){
          var curPos = parseInt($items.css(pos));
          // Add/Remove disabled to prev, next buttons
          if ( (curPos + o.distance) > prevLimit) $prev.addClass('disabled');
          else $prev.removeClass('disabled');
          if ( (curPos - o.distance) < nextLimit) $next.addClass('disabled');
          else $next.removeClass('disabled');
        });

      }
    }

    // Event handlers TODO: Rewrite once Zepto supports data argument for on method
    this.each(function(){
      var $context  = $(this),
          $items    = $(o.items, $context),
          $prev     = $(o.prev, $context),
          $next     = $(o.next, $context),
          $gallery     = Zepto(this),
          total_width = 0;

      // Apply explicit width to $items
      $(o.item, $items).each(function(){
        var $item = $(this);
        total_width += $item.outerWidth(true);
      });
      $items.css('width', total_width);

      // Desktop
      $prev.on('click', function(){ c.move('prev', $context); });
      $next.on('click', function(){ c.move('next', $context); });

      // Touch
      if (o.swipe){
        if (o.orientation=='horizontal'){
          $gallery.on('swipeLeft', function(){ console.log('swipeLeft'); c.move('prev', $context); });
          $gallery.on('swipeRight', function(){ console.log('swipeRight'); c.move('next', $context); });
        }
        else if (o.orientation=='vertical') {
          $gallery.on('swipeUp', function(){ c.move('prev', $context); });
          $gallery.on('swipeDown', function(){ c.move('next', $context); });
        }
      }

    });
 
  return this;
 
  }
})(jQuery);