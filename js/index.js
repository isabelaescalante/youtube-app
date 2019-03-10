function handleFetch(link, callback) {
	$.ajax({
		url: link,
		method: "GET",
		success: responseJson => callback(responseJson),
		error: err => console.log(err)
	});
		
}

function displayResult(data) {
	$('.results').html('');
	var items = data.items;
	//console.log(data);
	items.forEach(function (item) {
		$('.results').append(`
							<a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
							<h3> ${item.snippet.title} </h3>
							<img src="${item.snippet.thumbnails.medium.url}" alt="news image">
							</a>
							<hr>
					`);
	});
	if(data.hasOwnProperty('prevPageToken')) {
		$('.results').append('<button id="previousBtn" class="navig"> < </button>');

		$('#previousBtn').on('click', (event) => {
			let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAMX6PVHEXvt713lNXHDEVB7e8koOHJTTo&part=snippet&type=video&maxResults=10&pageToken=' + data.prevPageToken + '&q=' + $('#videoSearchBox').val();
			handleFetch(url, displayResult);
		});

	}
	if(data.hasOwnProperty('nextPageToken')) {
		$('.results').append('<button id="nextBtn" class="navig"> > </button>');

		$('#nextBtn').on('click', (event) => {
			let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAMX6PVHEXvt713lNXHDEVB7e8koOHJTTo&part=snippet&type=video&maxResults=10&pageToken=' + data.nextPageToken + '&q=' + $('#videoSearchBox').val();
			handleFetch(url, displayResult);
		});
	}
}

function watchForm() {
	$('.videoForm').on('submit', (event) => {
		event.preventDefault();

		let videos = $('#videoSearchBox').val();
		let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAMX6PVHEXvt713lNXHDEVB7e8koOHJTTo&part=snippet&type=video&maxResults=10&q=' + videos;
		handleFetch(url, displayResult);
	}); 
}

// para ejecutar una funcion, tambien se puede con watchForm();
$(watchForm);