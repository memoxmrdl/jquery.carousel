jquery.carousel
===============

Lightweight jQuery carousel plugin.


## Features

* Vertical or Horizontal orientation
* Dynamic amount of items (doesn't require a fixed width)
* Disabling prev and next buttons upon reaching ends of carousel


## Quick Setup

Get jQuery, jquery.carousel & call the jQuery carousel method on the relevant selector inside the jquery window load function.

    <script src="jquery.js"></script>
    <script src="carousel.js"></script>
    <script>
      (function($){
        $(window).load(function(){
          $('.gallery').carousel();
        });
      })(jQuery)
    </script>


The markup for a carousel should look something like:

    <div class="gallery">
      <div class="left"></div>
      <div class="right"></div>
      <div class="mask">
        <ul>
          <li></li>
          ...
        </ul>
      </div>
    </div>
    
    
Note: At the moment this plugin does not have the required css. The css should look something like this:

    .mask    {position:relative}
    .mask ul {position:absolute}
    .mask li {display:block}
    

## Customisation

Options include:


    $('.gallery').carousel(
      orientation : 'horizontal', // vertical or horizontal
      distance    :  94,          // distance to slide the item (px)
      prev        : '.left',      // .prev, .left, .up
      next        : '.right',     // .next, .right, .down
      mask        : '.mask',      // selector for the mask (element with overflow:hidden)
      items       : 'ul',         // selector for item parent
      item        : 'li',         // selector for item
      swipe       : true,         // zepto type swipe event available for touch devices?
      speed       : 200           // speed of animation
    );
