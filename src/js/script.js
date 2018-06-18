'use strict'

window.onload = function () {
	
	modalMore();
	
	var gallery = document.querySelector('.gallery__items');
	var kitty = document.querySelector('#template');

	for (var i = 0; i < 50 ; i++) {
		gallery.appendChild(kitty.content.cloneNode(true));
		
	}

	var imagesList = getElem('.gallery__item', 'img');

	bgColor(imagesList);
		
	getCats('https://ma-cats-api.herokuapp.com/api/cats', imagesList);

	
}
function modalMore() {
	var btnMore = getElem('.more', '.more__title')[0];
	var dropdownMore = getElem('.more', '.more__items')[0];
	var counter = 0;
	btnMore.addEventListener('click', function () {
		
		if(counter % 2 == 0) {
			console.log(counter);
			dropdownMore.classList.add("opened");
			counter++;

		} else {
			dropdownMore.classList.remove('opened');
			counter++;
		}	
	});
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


function getCats(url, imgList) {
	var request = new XMLHttpRequest();

	request.onload = function() {
	  	if (request.status >= 200 && request.status < 400) {
	  		
		    var data = JSON.parse(request.responseText).cats;
		    
		    buildCats(data, imgList);

		} else {
			alert('Ooops!');
		    return;
		}
	};
	
	request.open('GET', url, true);

	request.send();
};

function buildCats(data, imgList) {

	var namesList = getElem('.kitty__details', 'span:first-child');
	var categoryList =  getElem('.kitty__details', 'span:last-child');
	var priceList =  getElem('.kitty__status', 'p > span');
	var obj = {};
	for (var i = 0; i < data.length; i++) {

  		for (var key in data[i]) {
  			switch (key) {
  				case 'img_url':
	  				var img = imgList[i].removeAttribute('src');
					img = imgList[i].setAttribute('src', data[i][key]);
				break;

				case 'name':
					namesList[i].textContent = data[i][key];
				break;

				case 'category':
					categoryList[i].textContent = data[i][key];
			  		var str = data[i][key]; 		
	    			obj[str] = true;
	    			
    			break;

    			case 'price':
    				priceList[i].textContent = data[i][key];
    			break;
  			}
		  	
		  
		}
    	
    }
    
    var categories = Object.keys(obj)
    console.log(categories);

    var btnPlace = document.querySelector('.filter__item:last-child div');
    cloneBtn(categories, btnPlace);
    
   	chooseCats(categoryList);

   
}

function cloneBtn(arr, whereInsert) {

	var btn = document.querySelector('.button-category');
	for (var i = 0; i < arr.length ; i++) {

		whereInsert.appendChild(btn.content.cloneNode(true));
		whereInsert.children[i].textContent = arr[i];	
	}
}

function chooseCats(arrOfElements) {
	var btns = document.querySelectorAll('.filter__item:last-child div button');
	btns.forEach(function (item){
		var counter = 1;
		item.counter = function () {
			if (counter == 1) {
				return counter +=1;
			} else {return counter -=1;}
		};

		item.addEventListener('click', function(e) {
			
			item.style.color = '#9c9c9b';
			if (counter == 1) {
				arrOfElements.filter(function(el){
			
					if (el.textContent == item.textContent) {
						el.parentNode.parentNode.parentNode.style.display = 'none';
					}	
				});
			} else {
				arrOfElements.filter(function(el){
					if (el.textContent == item.textContent) {
						el.parentNode.parentNode.parentNode.style.display = 'block';
						item.style.color = '#2a2825';
					} 
				});
				
			}
			item.counter();
		});

	});
	
}
