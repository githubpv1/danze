objectFitImages(); //IE polyfill


document.querySelector('.nav__burger').onclick = function () {
	this.classList.toggle('active');
	document.querySelector('.nav').classList.toggle('active');
	document.querySelector('body').classList.toggle('lock');
}


var mySwiper = new Swiper('.news__swiper', {
	// spaceBetween: 20,
	loop: true,
	autoHeight: true,
	grabCursor: true,
	// effect: 'fade',
	// fadeEffect: { //без этого наслаивается html контент
	// 	crossFade: true
	// },
	navigation: {
		nextEl: '.news__btn_next',
		prevEl: '.news__btn_prev',
	},
	pagination: {
		el: '.news__swiper_pagination',
		clickable: true,
	},
	breakpointsInverse: true,
	breakpoints: {
		768: {
			slidesPerView: 2,
			spaceBetween: 40
		},
		1200: {
			slidesPerView: 4,
			spaceBetween: 80
		}
	}
});



/* store-gallery */
if (window.innerWidth < 768) {
	var mySwiper = new Swiper('.store__swiper', {
		//spaceBetween: 20,
		// loop: true,
		grabCursor: true,
		navigation: {
			nextEl: '.store__btn_next',
			prevEl: '.store__btn_prev',
		},
		pagination: {
			el: '.store__swiper_pagination',
			clickable: true,
		}
	});
}


/* video-carousel */
var mySwiper = new Swiper('.video__swiper', {
	slidesPerView: 1,
	loop: true,
	grabCursor: true,
	navigation: {
		nextEl: '.video__btn_next',
		prevEl: '.video__btn_prev',
	},
	pagination: {
		el: '.video__swiper_pagination',
		clickable: true,
	},
	breakpoints: {
		1200: {
			spaceBetween: 20,
			slidesPerView: 2
		},
	}
});



/* carousel reviews */
var mySwiper_reviews = new Swiper('.reviews__swiper', {
	loop: true,
	grabCursor: true,
	navigation: {
		nextEl: '.rewiews__btn_next',
		prevEl: '.rewiews__btn_prev',
	},
	breakpoints: {
		768: {
			spaceBetween: 20,
			slidesPerView: 2
		},
		1200: {
			loop: false,
			spaceBetween: 20,
			slidesPerColumn: 2,
			slidesPerView: 2
		},
	},
	pagination: {
		el: '.rewiews__swiper_pagination',
		type: 'custom',
		renderCustom: function (swiper, current, total) {
			return ' ещё ' + (total - current);
		}
	}

})


// add div .swiper-slide carousel_reviews
function addSlide() {
	if (window.innerWidth > 1199) {
		var el = document.querySelector('.reviews__swiper');
		var elem = el.querySelectorAll('.swiper-slide');

		if (elem.length % 2 == 0) {
			var wrap = document.querySelector('.reviews__swiper_wrapper');
			wrap.insertAdjacentHTML('beforeEnd', '<div class="swiper-slide"></div>');
			mySwiper_reviews.update();
		}
	}
}
addSlide();


/* reviews jQery */

function showText1() {
	$('[data-id_img]').click(function () {
		var bg = $(this).attr('src');
		var text = $(this).attr('data-id_img');
		$('[data-bg]').css('backgroundImage', 'url(' + bg + ')');

		$('[data-text]').css("display", "none");
		$('[data-text=' + text + ']').css("display", "block");
	});
}
showText1();

/* reviews js */

function showText() {
	var elems = document.querySelectorAll('[data-id_img]');
	for (var i = 0; i < elems.length; i++) {
		elems[i].onclick = function () {
			var bg = this.getAttribute('src');
			var id = this.getAttribute('data-id_img');
			document.querySelector('[data-bg]').style.backgroundImage = 'url(' + bg + ')';

			var text = document.querySelectorAll('[data-text]');
			for (var i = 0; i < text.length; i++) {
				text[i].style.display = "none";
			}
			document.querySelector('[data-text="' + id + '"]').style.display = "block";
		}
	}
}
// showText();




function showTeach() {

	var btn = $('[data-id]');
	var teach = $('[data-teach]');
	var field = $('#teach');

	// var heigh = $('[data-teach=' + idItem + ']').height();

	var btn = $('[data-id]');
	var teach = $('[data-teach]');
	var field = $('#teach');

	btn.click(function () {
		var Top = field.offset().top; //плавная прокрутка к метке 
		$('html, body').animate({
			scrollTop: Top - 80
		}, 500);

		if ($(this).hasClass('show')) { //таже копка
			$(this).removeClass('show');
			teach.slideUp(500);

		} else { //не эта

			var id = $(this).attr('data-id');
			var teachShow = $('[data-teach="' + id + '"]');

			if (btn.hasClass('show')) { //есть активные	
				btn.removeClass('show');
				$(this).addClass('show');

				teach.slideUp(500);
				teachShow.slideDown(500);

			} else { //нет включеных

				$(this).addClass('show');
				teachShow.slideDown(500);
			}
		}
	});
}
showTeach();