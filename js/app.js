var artistName = "";
var markers = [];
var getLocation = function() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    } else {
	          alert("Geolocation is not supported by this browser.");
	    }
	}
var showPosition = function(position) {
			$('.loading').show();
		    var location = {latitude: position.coords.latitude,
		    		    	longitude: position.coords.longitude};
	    	var artistName = $('#artistName').val();
	    	getTourDates(artistName, location);
		}
var getTourDates = function(artistName, location){
	$.post('/get-bands-event-data', {data: artistName.toLowerCase()})
	.done((res) => {
		displayTourDates(location, res);
	})
	.fail((xhr, status, err) => {
		$('.loading').hide()
		$('.get-tickets').hide();
	})
};
var displayTourDates = function(location, result){
	if(result && result[0]){
		var tourDates = result[0].url;
		$('.get-tickets').attr('href', tourDates);
		$('.get-tickets').attr('target', '_blank');
		showTours();
		initMap(location, result);
	}
	else{
		noTours();
	}
}
function showTours(){
		$('.no-tours').hide();
		$('.get-tickets').show();
}

function noTours(){
		$('.loading').hide();
		$('.no-tours').show();
		$('.get-tickets').hide();
		$('.map').hide();
}
//ajax data is obtained and returned from API.
var getMusic = function(tags){
	$.ajax({
		dataType: "jsonp",
		url: '//www.tastekid.com/api/similar?q=' + tags + '&callback=callBackMusic&k=227160-Discover-804XO5GB&verbose=1&type=music&info=1',
		type: "GET"
	})

};
//callback function for the API data thats finds the length of the data and diplays search result number in the counter div
var callBackMusic = function(query){
		var tagName = query.Similar.Info[0].Name;
		var searchResults = showSearchResults(query.Similar.Results.length, tagName);
		var searchedBand = showMusicResults(query.Similar.Info[0])
		$('.display').append(searchedBand);
		$.each(query.Similar.Results, function(i, item){
			var music = showMusicResults(item);
			$('.display').append(music);
	});	
		$('.counter').append(searchResults);		
}
var showSearchResults = function(resultNum, resultName){
	if($("input[name='query']").val() == ""){
		var results = resultNum + ' results for <strong> ' + resultName + ' </strong>';
	}
	else{
		var results = resultNum + ' results for <strong> ' + $("input[name='query']").val(); + ' </strong>';
		}
	return results;
};
// clones search results and results divs, adds attributes, and returns data.
var showMusicResults = function(music) {
	var result = $('.searchResults .result').clone();
	var bandName = result.find('.band-name');	
	bandName.attr('name', music.Name);
	bandName.attr('href', music.yUrl);
	bandName.attr('description', music.wTeaser);
	bandName.text(music.Name);
	return result;
}
$(document).ready(function() {

	// $.ajax({
	// 	method: "GET",
	// 	url: "/get-auth-code",
	// 	success: function(result){
	// 		console.log(result);
	// 		}
	// 	});

	// $.ajax({
	// 	method: "GET",
	// 	url: "https://crossorigin.me/https://accounts.spotify.com/authorize/?client_id=1477dd268434476fa067b97c618573d5&response_type=code&redirect_uri=localhost:8080%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09", 
	// 	success: function(result){
	// 		console.log(result);
	// 		}
	// 	});
	hideBandInfo()
//displays iframe and discription when each link is clicked.
	$(document).on('click', '.result li', function(event) {
		addBandCSS();
		showBandInfo();
		getLocation();
		// Prevent from opening iframe in new tab
		event.preventDefault();
		var _url = $(this).attr('href');
		description = $(this).attr('description');
		artistName = $(this).attr('name');
		$('#artistName').val(artistName);
	 	$('.band-info iframe').attr("src", _url);
		$('.band-info h2').html(artistName);
		$('.band-info h1').html(description);
		readMore(description);
		$('.get-tickets').html("Get Tickets");
		$('html, body').animate({
		    scrollTop: $(".band-info").offset().top
		}, 1000);
	});
	function hideBandInfo(){
		$('.band-info a').hide();
		$('.band-info h2').hide();
		$('.loading').hide();
		$('.no-tours').hide();
	}
	function showBandInfo(){
		$('.band-info h2').show();
		$('.band-info a').show();
		$('.map').hide();
		$('.no-tours').hide();
		$('.loading').show();
	}

	function addBandCSS(){
		$('.band-info').css('background-image', 'none')
		$('.band-info').css('background-color', '#2196F3');
		$('iframe, h1').css('display', 'block');
		$('.band-info').css('display', 'block');
	}


/*Function that runs when keyword is entered and search button clicked.
The results and counter classes are cleared and the value typed by user is stored.
*/
	$('#search-form').submit(function(e) {
		e.preventDefault();
		//clear cache results of a previous search
		cacheResults();
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='query']").val();
		getMusic(tags);
		$('.results').css('padding-top', '150px');
	});

	function cacheResults(){
		$('.display').html('');
		$('.counter').html('');
	}
$(function() {
$( "#focusedInput" ).autocomplete({
    minLength: 1,
	 source: function (request, response) {
        // $.ajax({
        //     url: 'https://api.spotify.com/v1/search',
        //     data: {
        //         q: $("#focusedInput").val(),
        //         type: 'artist',
        //         limit: 10
        //     },
        //     success: function (data) { 
        //     	response(data.artists.items)	    
        //     }
		  // });
		  

      //   $.ajax({
		//     method: "POST",
		//     url: "https://accounts.spotify.com/api/token",
		//     data: {
		//       "grant_type":    "authorization_code",
		//       "code":          code,
		//       "redirect_uri":  "localhost:8080",
		//       "client_secret": "b659abbe6d354267833920c37d88a499",
		//       "client_id":     "1477dd268434476fa067b97c618573d5",
		//     },
		//     success: function(result) {
		//     	console.log(result)
		//       // handle result...
		//     },

// 		$.ajax({
// 			method: "POST",
// 			url: "/api/get-access-token",
// 			data: {
// 			  "grant_type":    "authorization_code",
// 			//   "code":          code,
// 			  "redirect_uri":  "localhost:8080",
// 			  "client_secret": "b659abbe6d354267833920c37d88a499",
// 			  "client_id":     "1477dd268434476fa067b97c618573d5",
// 			},
// 			success: function(result) {
// 				console.log(result)
// 			  // handle result...
// 			},
//   });
    }
}).data( "ui-autocomplete" )._renderItem = function( ul, item ) {       
     return $( "<li></li>" ).click(function(){
     		$('#focusedInput').val(item.name);
     		$('.form-group').submit()
     })
        .data( "item.autocomplete", item )
          .append( "<a class='artist-image'>" + item.name + "<br>" + '<img src=' + item.images[0].url + '>' + "</a>" )
        .appendTo( ul );
		};
	});  
$( "#focusedInput" ).on("input", function() {
		var input = this.value;
	});
});
var readMore = function(){
	var showChar = 200; // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more >";
    var lesstext = "< Show less";
    $('.article').each(function() {
        var content = $(this).html();
	        if(content.length > showChar) {
	            var c = content.substr(0, showChar);
	            var h = content.substr(showChar, content.length - showChar);
	            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink"> <p style="background-color: #1976D2; margin-right: 84%;">' + moretext + '</p></a></span>';
	            $(this).html(html);
	        }
    });
    	$(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } 
        else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });

} 
var initMap = function(myLatLng, events) {
	myLatLng = {lat: parseFloat(myLatLng.latitude), lng: parseFloat(myLatLng.longitude)};
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });
	clearOverlays();
	  for(var i = 0; i <= events.length; i++){
			var event = events[i];
			if(event && event.venue){
				  	var marker = new google.maps.Marker({
				    position: { lat: parseFloat(event.venue.latitude), lng: parseFloat(event.venue.longitude)},
				    map: map,
				    title: event.title
				  });
				  	markers.push(marker);
	  		}
	  	}		
	  	showMap();
}
function showMap(){
	$('.loading').hide();
  	$('.map').show();
}
var clearOverlays = function() {
  for (var i = 0; i < markers.length; i++ ){
    markers[i].setMap(null);
  }
	  markers.length = 0;
	}
