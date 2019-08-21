//This file contains the javascript code controlling the SVG artwork. The javascript code for website in general is found in website.js
//Some of the feedback in the SVG artwork is coded in the css file
var jetBubbles = document.getElementsByClassName('jetBubble');
var Packman = document.getElementsByClassName('Packman');
var colorlines = document.getElementsByClassName('colorLines');
var speedlines = document.getElementsByClassName('speedLine');
var clouds = document.getElementsByClassName('cloud');
var mouth = document.getElementById('mouth');

//TweenMax.to() allows you to animate elements by defineing the destination values.
TweenMax.to(Packman, 0.1, {
  y:'+=1',
  x:'-=2',
  repeat:-1,
  yoyo:true
})
TweenMax.to(colorlines, 0.25, {
  y:'+=1',
  repeat:-1,
  yoyo:true
})
TweenMax.to(speedlines, 0.4, {
  x:'-=400',
  repeat:-1,
  yoyo:false
})
TweenMax.to(clouds, 2.0, {
  x:'-=1200',
  repeat:-1,
  yoyo:false,
  ease:Linear.easeNone
})

//TimelineMax acts like a container for tweens.
var mainTimeline = new TimelineMax({repeat:-1}).seek(100);
var mainSpeedLinesTimeline = new TimelineMax({repeat:-1, paused:false});
mainTimeline.timeScale(2);//double speed

for(var i = 0; i < jetBubbles.length; i++){
  var jb = jetBubbles[i];
  var tl = new TimelineMax({repeat:-1,repeatDelay:Math.random()}).timeScale(4);
  tl.to(jb, Math.random() + 1 , {//Adds a TweenLite.to() tween to the end of the timeline with the jetbubles[i] as target
    attr:{
      r:'+=15'
    },
    ease:Linear.easeNone
  })
  .to(jb, Math.random() + 1 , {
    attr:{
      r:'-=15'
    },
    ease:Linear.easeNone
  })
  mainTimeline.add(tl, i/4)//add the timeline tl to mainTimeline
}

//This function provides feedback when the 'FEED' button is pressed.
$(".pushButton").click(function(){
  TweenMax.to($(food), 0.5,{
    x:'-=710',
    repeat:10,
    yoyo:false
  })
  setTimeout(function(){
    TweenMax.to(mouth, 0.25, {attr: {points:"300,260 395,260 395,260"}, repeat:21, yoyo:true})
  },200)
  TweenMax.to(mouth, 0.5, {attr: {points:"300,260 395,230 395,290"}, ease:Elastic.easeOut, repeat:0, yoyo:true})
  setTimeout(function(){
    TweenMax.to($(food), 0.001,{
      x:'=1000',
      repeat:1,
      yoyo:false
    })
  },6000)
});
//Provides feedback when Packman is clicked on
$(Packman).click(function(){
    setTimeout(function(){
      TweenMax.to(mouth, 0.5, {attr: {points:"300,260 395,260 395,260"}, ease:Elastic.easeOut, repeat:1, yoyo:true})
    },100)
    TweenMax.to(mouth, 0.5, {attr: {points:"300,260 395,230 395,290"}, ease:Elastic.easeOut, repeat:0, yoyo:true})
});
//Enlarges the title of the artwork when mouse is hovering over
$("#title").on({"mouseenter": function () {
  $(this).css({'font-size': '150%'});
}}).on({"mouseleave": function () {
  $(this).css({'font-size': '100%'});
}});
