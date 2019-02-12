$(document).ready(function() {

  /**
   * Gradient color palette for the ball.
   */
  const hues = {
    '0': [252, 172, 128],
    '1': [244, 138, 96],
    '2': [255, 149, 62],
    '3': [247, 153, 28],
    '4': [247, 205, 87]
  };

  /**
   * Breakpoint for responsive UI in pixels.
   */
  const screenBreak = 640;

  /**
   * Dynamically position intro text based on navbar height.
   */
  var navHeight = $('#top_container').outerHeight(true);
  introMarginTop();

  /**
   * Housekeeping for the gradient.
   */
  const state = {
    start: hues[0],
    end: hues[1],
    next: 2
  };

  /**
   * Adjust values to accomodate for window resizing.
   */
  $(window).on('resize', function() {
    navHeight = $('#top_container').outerHeight(true);
    introMarginTop();

    var windowWidth = window.innerWidth;
    if (windowWidth >= screenBreak) {
      $('.nav_container').removeClass('nav_container_active');
      $('.menu_button').removeClass('menu_button_active');
    }


  });

  /**
   * Initialize UI elements.
   */
  setInterval(function() {
    let hue = gradient();
    $('#top_container #top #header_container .header#ball').css({'background': hue});
  }
  , 50);

  // TODO: Animate name container on mobile so that when user scrolls down,
  // the font size of name becomes smaller and margin top decreases.

  /**
   * Global navigation animation for mobile and tablet.
   */
  $('#top_container #top #header_container .header#ball').on('click', function(e) {
    e.preventDefault();
    var windowWidth = window.innerWidth;
    if (windowWidth < screenBreak) {
      $('.menu_button').toggleClass('menu_button_active');
      $('.nav_container').toggleClass('nav_container_active');
    }
  });

  /**
   * Returns true if the visibility property of nav_container is set to true;
   * false otherwise.
   */
  function navHidden() {
    return $('#top_container #top #nav_container').css('visibility') === 'hidden';
  }

  /**
   * Performs the gradient transition.
   */
  function gradient() {
    adjust(state.start[0], state.end[0], 0);
    adjust(state.start[1], state.end[1], 1);
    adjust(state.start[2], state.end[2], 2);
    if (allEqual()) {
      state.start = state.end;
      state.end = hues[state.next];
      state.next = (state.next + 1) % 5;
    } else {
      var rgb = 'rgb(' + state.start[0] + ', ' + state.start[1] + ', ' + state.start[2] + ')';
      return rgb;
    }
  }

  /**
   * Returns true if all values of start and end are equal.
   */
  function allEqual() {
    return state.start[0] === state.end[0] && state.start[1] === state.end[1] && state.start[2] === state.end[2];
  }

  /**
   * Returns one less than here if here > there, and one more than here otherwise.
   */
  function adjust(start, end, idx) {
    if (start > end) {
      state.start[idx] = state.start[idx] - 1;
    } else if (start < end) {
      state.start[idx] = state.start[idx] + 1;
    }
  }

  function introMarginTop() {
    var windowWidth = window.innerWidth;
    if (windowWidth >= screenBreak) {
      $('#content').css({'margin-top': navHeight + 96 + 'px'});
    } else {
      $('#content').css({'margin-top': navHeight + 48 +'px'});
    }
  }

});
