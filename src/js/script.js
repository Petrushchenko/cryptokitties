'use strict'

window.onload = function () {

	var btnMore = getElem('.more', '.more__title')[0];
	var dropdownMore = getElem('.more', '.more__items')[0];
	var counter = 0;
	
	btnMore.addEventListener('click', function opening () {
		
		if(counter % 2 == 0) {
			console.log(counter);
			dropdownMore.classList.add("opened");
			counter++;

		} else {
			dropdownMore.classList.remove('opened');
			counter++;
		}	
	});
	
	
	var gallery = document.querySelector('.gallery__items');
	var kitty = document.querySelector('#template');

	for (var i = 0; i < 50 ; i++) {
		gallery.appendChild(kitty.content.cloneNode(true));
		
	}

	var imagesList = getElem('.gallery__item', 'img');

	bgColor(imagesList);

	getCats('https://ma-cats-api.herokuapp.com/api/cats', imagesList);
	

}

function getElem (selector1, selector2) {
	var itemsList = document.querySelectorAll(selector1);
	var res = [];
	for (var i = 0; i < itemsList.length; i++) {
		var a = itemsList[i].querySelector(selector2);
		res.push(a);	
	}
	return res;
}

function bgColor (ar){
	var color = ['#fde9e4', ' #fae1ca', '#faeefa', '#dfdffa', '#d3e8ff'];
	color.forEach(function(item, j){

		var array = enumeration(ar, 5, j);
		array.forEach(function (item) {
			item.style.backgroundColor = color[j];
		});
	
	});
	
};

function enumeration (ar, n, j) {
	var res =[];
	for (var i = 0; i < ar.length/n; i++) {

		if (ar[j + i*n] !== undefined) {
			res.push(ar[j + i*n]);
		};
	}
	return (res);
};


function getCats(url, elems) {
	var request = new XMLHttpRequest();

	request.onload = function() {
	  	if (request.status >= 200 && request.status < 400) {
		    var data = JSON.parse(request.responseText).cats;
		    for (var i = 0; i < data.length; i++) {
		  		for (var key in data[i]) {
				  	if (key == 'img_url') {

						var img = elems[i].removeAttribute('src');
						img = elems[i].setAttribute('src', data[i][key]);
				  	}
				}
		    	
		    }
		   
		} else {
			alert('Ooops!');
		    return;
		}
	};
	
	request.open('GET', url, true);

	request.send();
};


