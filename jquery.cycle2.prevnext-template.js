/*! prevnext-template for Cycle2
 * Extend cycle to use next/prev templates
 */

(function($) {
"use strict";

  $.extend($.fn.cycle.defaults, {
      prevTemplate:  '<span>prev {{slideNum}}</span>',
      prevEndTemplate:  '<span>first</span>',
      nextTemplate:  '<span>next {{slideNum}}</span>',
      nextEndTemplate:  '<span>last</span>'
  });    

  $(document).on( 'cycle-update-view', function( e, opts, slideOpts, currSlide ) {

    var prevBoundry = opts._prevBoundry || 0;
    var nextBoundry = opts._nextBoundry || opts.slideCount - 1;

    // holds  prevSlide, nextSlide and can be undefined if no allow wrap
    var neighborSlides = {};

    if ( opts.currSlide == nextBoundry ) {
      if ( opts.allowWrap ) {
        // loop to the first slide
        neighborSlides[ 'next' ] = opts.slides[ 0 ];
      }
    } else {
      neighborSlides[ 'next' ] = opts.slides[ opts.currSlide + 1 ];
    }

    if ( opts.currSlide == prevBoundry ) {
      if ( opts.allowWrap ) {
        // loop to the last slide
        neighborSlides[ 'prev' ] = opts.slides[ opts.slideCount - 1 ];
      }
    } else {
      neighborSlides[ 'prev' ] = opts.slides[ opts.currSlide - 1 ];
    }

    $.each(['next', 'prev'], function(){
      var name = this; 
      var template = slideOpts[name+'Template'];
      var terminateTemplate = slideOpts[name+'End'+'Template'];
      var el = opts.API.getComponent( name );
      var neighborSlide = neighborSlides[ name ];
      if (neighborSlide) {
        var neighborSlideOpts = $(neighborSlide).data('cycle.opts');
        if( el.length && template ) {
          el.html( opts.API.tmpl( template, neighborSlideOpts, opts, neighborSlide ) );
        }
      } else {
        // When using no allow wrap.
        // There isn't a next or prev slide so use the terminate template.
        el.html( opts.API.tmpl( terminateTemplate, {}, opts ) );
      }
    });

  });
})(jQuery);
