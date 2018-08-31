
//This file contains the javascript code for website in general. The ineractive SVG artwork is controlled in another file (artwork.js)

$(document).ready(function(){
  //The following functions defines the result of clicking on each individual sidebar button.
    $("#btn0").click(function(){
      clearSelected();
      $('svg').css({'display' : 'block'});//displays the SVG artwork
      $(this).css({'color' : '#fd5c63', 'text-decoration': 'underline'});//feedback on button click to the user
      $("#infotext").html("<p><p/>");
    });

    $("#btn1").click(function(){
      clearSelected();
      $('svg').css({'display' : 'none'});//hides the SVG artwork
      $(this).css({'color' : '#fd5c63' ,'text-decoration': 'underline'});
      $("#infoHeader").html("<p>Grid vs FlexBox</p>");
      $("#infotext").html("<p>The main difference between CSS-grid and CSS-flexbox is their ability to lay out items in one or two dimensions. If you are laying out items in one direction, either horizontaly or verticaly, <strong>FlexBox</strong> is the way to go. Using FlexBox in these situations gives more flexibility and requires less code. <br>If you wish to lay out items both horizontaly and verticaly, <strong>Grid</strong> is the way to go. It is fully possible to combine the two, such that the page layout is decided by the grid, and the alignment of elements within one grid-cell using FlexBox. Another difference is that Flexbox takes basis in the content while Grid takes basis in the layout. In other words, when using grid, you have to define the size of the rows and the collumns before adding the elements. Whereas with FlexBox you do not have to concider this.<br><br>I am using grid to define the layout of my site, and then flexbox within the grid cell of the side-menu.</p>");
      $(infoPhoto).prop('src', "img/grid-vs-flexbox.jpg");
      $(infoPhoto).css({'display' : 'block'});
    });

    $("#btn2").click(function(){
      clearSelected();
      $('svg').css({'display' : 'none'});
      $(this).css({'color' : '#fd5c63' ,'text-decoration': 'underline'});
      $("#infoHeader").html("<p>Canvas vs SVG</p>");
      $("#infotext").html("<p>SVG is a format for 2D vector graphics. It supports animations and interaction. SVG elements can be looked at as objects, and if attributes of an SVG object are changed, the browser can automatically re-render the scene. SVG elements are searchable because they can have their own id. Since we can locate the SVG element, we can make it respond to events like 'hover' or 'click'. <br>A canvas is just a container element where we can draw new graphics on the fly. You do not write html code to add graphic to a canvas, you will have to use JavaScript. One benefit of canvas is that it does not have a DOM, It is therefore much easier to make a lot of elements. To get the same 'click' functionality with canvas, we have to match the coordinates of the mouse click with the coordinates of the drawn element manualy to determine whether it was clicked.<br><br>My animation is made using SVG</p>");
      $(infoPhoto).prop('src', "img/svg_canvas.png");
      $(infoPhoto).css({'display' : 'block'});
    });

    $("#btn3").click(function(){
      clearSelected();
      $('svg').css({'display' : 'none'});
      $(this).css({'color' : '#fd5c63' ,'text-decoration': 'underline'});
      $("#infoHeader").html("<p>jQuery</p>");
      $("#infotext").html("<p>jQuery is a popular and useful framework built for JavaScript. jQuery makes it quicker and easier to build JavaScript webpages and web applications. Look at jQuery as a function rather than a language. These functions include; adding animated effects to elements, manipulating the Document Object Model(DOM), and much more!<br>jQuery makes it really easy to write JavaScript compatible with several different browsers. The usual incompatibilities you could experience between popular browsers, which meant that you often had to write different chunks of JavaScript code for each browser, is non-existent using jQuery. Just call the appropriate jQuery function and jQuery will make sure the code runs on the current browser.<br><br>For this small project I have been using jQuery functions like .css .prop .on .click .hover etc. for manipulating elements. jQuery makes it easy to show and hide elements, which I am currently using to hide the SVG.</p>");
      $(infoPhoto).prop('src', "img/jquery.png");
      $(infoPhoto).css({'display' : 'block'});
    });

    $("#btn4").click(function(){
      clearSelected();
      $('svg').css({'display' : 'none'});
      $(this).css({'color' : '#fd5c63' ,'text-decoration': 'underline'});
      $("#infoHeader").html("<p>Cross-Browser Testing</p>");
      $("#infotext").html("<p>When developing a website or webb app, the developer has to make sure the project is compatible with an acceptable number of popular browsers and devices. Just because the site works on your computer in your standard browser, does not mean it will work for all of your users. We have to check not only apperance, but also the functionality of the website. It is potentially OK for a site to not deliver the exact same experience on all browsers and devices, as long as the core functionality is accessible in some way. Cross browser issues commonly occur because browsers may implement features differently, have different levels of support for technology features, and more.<br><br>A difference I found by testing different browsers (Chrome and Safari) was the scaling of the different elements. A small difference, but noticeable. During testing I first looked at all the visuals, like shapes, colors and resizing. Next I checked all the website functionality.</p>");
      $(infoPhoto).prop('src', "img/web-browsers.png");
      $(infoPhoto).css({'display' : 'block'});
    });

    $("#btn5").click(function(){
      clearSelected();
      $('svg').css({'display' : 'none'});
      $(this).css({'color' : '#fd5c63','text-decoration': 'underline'});
      $("#infoHeader").html("<p>Tutorials & Sources</p>");
      $("#infotext").html("<p><strong>Tutorials:</strong><ul><li>https://www.w3schools.com/</li><li>https://developer.mozilla.org/</li><li>https://greensock.com/docs</li><li>https://stackoverflow.com/</li><li>https://hackernoon.com/the-ultimate-css-battle-grid-vs-flexbox-d40da0449faf</li><li>https://www.elated.com/articles/what-is-jquery/</li></ul><strong>Sources:</strong><ul><li>https://codepen.io/chrisgannon/pen/EjVyXN</li></ul></p>")
      $(infoPhoto).css({'display' : 'none'});
    });

});
//This function provides feedback to user when hovering over the buttons in the sidebar.
$(".sidebarBtn").on({"mouseenter": function () {
  $(this).css({'border-width': '1px','border-color': '#fd5c63'});
}}).on({"mouseleave": function () {
  $(this).css({'border-width': '0px'});
}});

//When a button is pressed, we first make shure all the other buttons get marked as 'unselected'
function clearSelected(){
  $("#btn0").css({'background-color' : '#34302D' , 'color' : 'grey' , 'text-decoration': 'none'});
  $("#btn1").css({'background-color' : '#34302D' , 'color' : 'grey' ,'text-decoration': 'none'});
  $("#btn2").css({'background-color' : '#34302D' , 'color' : 'grey' ,'text-decoration': 'none'});
  $("#btn3").css({'background-color' : '#34302D' , 'color' : 'grey' ,'text-decoration': 'none'});
  $("#btn4").css({'background-color' : '#34302D' , 'color' : 'grey' ,'text-decoration': 'none'});
  $("#btn5").css({'background-color' : '#34302D' , 'color' : 'grey' ,'text-decoration': 'none'});
  }
