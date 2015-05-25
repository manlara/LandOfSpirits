

function startSlider(){
	var totalSlides = $('.active > .bxslider').children().length;
	$('.active > .bxslider').bxSlider({
	  mode: 'fade',
	  captions: true,
	  keyboardEnabled: true,
	  onSlideBefore: function($slideElement, oldIndex, newIndex){ 
	  	$("#counter").text(newIndex+1  + " / " + totalSlides);
	  },
	  onSliderLoad: function(currentIndex){
	  	$("#counter").text("1 / " + totalSlides);
	  }
	});
}

startSlider();

 
 $('.album').on("click", function(){
 	var descr = $(this).attr('id');
 	
 	if (descr=="albumFaces") {
 		$('#title').text("People");
 		if ($('#faces').attr('class').indexOf('active') == -1){
 			$('#faces').addClass('active');
 		}
 		$('#faces').removeClass('hidden');
 		if ($('#landscapes').attr('class').indexOf('hidden') == -1){
 			$('#landscapes').addClass('hidden');
 		}
 		if ($('#crew').attr('class').indexOf('hidden') == -1){
 			$('#crew').addClass('hidden');
 		}
 	}
	else if (descr=="albumLandscapes") {
		$('#title').text("Landscapes");
		if ($('#faces').attr('class').indexOf('hidden') == -1){
 			$('#faces').addClass('hidden');
 		}
 		if ($('#landscapes').attr('class').indexOf('active') == -1){
 			$('#landscapes').addClass('active');
 		}
 		$('#landscapes').removeClass('hidden');
 		if ($('#crew').attr('class').indexOf('hidden') == -1){
 			$('#crew').addClass('hidden');
 		}
	}
	else if (descr=="albumCrew") {
		$('#title').text("Crew");
		if ($('#faces').attr('class').indexOf('hidden') == -1){
 			$('#faces').addClass('hidden');
 		}
 		if ($('#landscapes').attr('class').indexOf('hidden') == -1){
 			$('#landscapes').addClass('hidden');
 		}
 		if ($('#crew').attr('class').indexOf('active') == -1){
 			$('#crew').addClass('active');
 		}
 		$('#crew').removeClass('hidden');
	}
	startSlider();

 });