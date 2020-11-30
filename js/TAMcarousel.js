$(window).on('load', function(){

var Stack = new Array();
var count = 0;

$('img').attr('draggable', false);

$('.TAMcarousel').each(function(){
	carousel(count, this);
	count++;	
});


function carousel(count, TAMcarousel){

Stack[count] = new Array();

$( TAMcarousel ).height($(TAMcarousel).find('#slide2').height());

$(window).resize(function() {
  $( TAMcarousel ).height($(TAMcarousel).find('#slide2').height());
});


$(TAMcarousel).find('.slide').each(function(){
Stack[count].push($(this));
})


var animating=false;

var child = $(TAMcarousel).find(".right-btn");

$(TAMcarousel).find(".right-btn").on('click', moveright);

function moveright(){	
  
    if(animating)return;
	animating=true;
	
    // Move the slides
	Stack[count][1].animate({left: '-100%'},
	                        {step: function( now, fx )
							{
                             Stack[count][2].css( "left", ((now+100)+'%'));
                            },done: function()
							{
						    // move slide references in arrays
	                        Stack[count].push(Stack[count][0]); // move first slide to the end
	                        Stack[count].shift();//remove first element in array
	                        // move actual slides 
                            Stack[count][0].css({left: '-100%'},0);
	                        Stack[count][2].css({left: '100%'},0);
						    animating=false;
							}
							});
};	

$(TAMcarousel).find(".left-btn").on('click', moveleft);

function moveleft(){

    console.log(Stack[count]);
	
    if(animating)return;
	animating=true;	
	
	Stack[count][1].animate({left: '100%'},
	                        {step: function( now, fx )
							{
                             Stack[count][0].css( "left", ((now-100)+'%'));
                            }
							,done: function()
							{
						    // move slide references in arrays
                            Stack[count].unshift(Stack[count][((Stack[count].length)-1)]); // copy last slide to the start
	                        Stack[count].pop();//remove first slide in array
	                        // move actual slides 
                            Stack[count][0].animate({left: '-100%'},0);
	                        Stack[count][2].animate({left: '100%'},0);
						    animating=false;
						    }
							});
};	




} /* END of carousel function */

}); /* END of window onload */