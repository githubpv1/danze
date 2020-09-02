objectFitImages(); //IE polyfill

function more() {
	var el = document.querySelector('.btn__more');

	if (el) {
		el.onclick = function () {
			this.classList.toggle('active');
		}
	}
}
more();



//сбрасываем :focus при клике для a и button, но оставляем с клавиатуры


function focusLose() {
	var isMouseDown = false;
	var button = document.querySelectorAll('a, button');
	var isDialog = document.querySelector('[role="dialog"]');

	function func() {
		if (isMouseDown) {
			this.blur();
		}
	}

	for (var i = 0; i < button.length; i++) {
		var el = button[i];
		el.addEventListener('mousedown', function () {
			isMouseDown = true;
			if (isDialog) {
				isKeyClick = false;
			}
		});
		el.addEventListener('mouseup', function () {
			isMouseDown = false;
		});
		if (isDialog) {
			el.addEventListener('keydown', function () {
				isKeyClick = true;
			});
		}
		el.addEventListener('focus', func.bind(el));
	}
}
focusLose();



// ===== navigation =====

function nav() {

	var burger = document.querySelector('.nav__burger');
	var menu = document.querySelector('.nav');
	var body = document.querySelector('body');

	function close() {
		// navClose.classList.remove('active');
		menu.classList.remove('active');
		burger.classList.remove('active');
		body.classList.remove('lock');
	}

	burger.onclick = function () {
		this.classList.toggle('active');
		menu.classList.toggle('active');
		body.classList.toggle('lock');
	}


	// ===== swipe =====

	function swipe(elem) {

		var touchstartX = 0;
		var touchstartY = 0;
		var touchendX = 0;
		var touchendY = 0;
		var treshold = 10;


		elem.addEventListener('touchstart', function (event) {
			touchstartX = event.changedTouches[0].screenX;
			touchstartY = event.changedTouches[0].screenY;
		}, false);

		elem.addEventListener('touchend', function (event) {
			touchendX = event.changedTouches[0].screenX;
			touchendY = event.changedTouches[0].screenY;
			handleGesture();
		}, false);

		function handleGesture() {
			var dx = touchendX - touchstartX;
			var dy = touchendY - touchstartY;
			var abs_dx = Math.abs(dx);
			var abs_dy = Math.abs(dy);


			if (abs_dx > treshold && abs_dx > abs_dy) {
				if (dx < 0) {
					elem.dispatchEvent(new CustomEvent("onSwipeLeft"));
				} else {
					elem.dispatchEvent(new CustomEvent("onSwipeRight"));
				}
			}

			if (abs_dy > treshold && abs_dy > abs_dx) {
				if (dy < 0) {
					elem.dispatchEvent(new CustomEvent("onSwipeUp"));
				} else {
					elem.dispatchEvent(new CustomEvent("onSwipeDown"));
				}
			}
		}
	}
	swipe(menu);
	menu.addEventListener("onSwipeUp", close);

	

	// ===== scrollMenu =====

	function scrollMenu(nav, offset, speed, easing) {

		var menu = document.querySelector(nav);
		var menuHeight;
		if (offset) { //если есть значение селектора
			var head = document.querySelector(offset);

			if (head) { //если есть объект по заданному селектору
				menuHeight = head.clientHeight;
				// отступ под меню
				// document.body.style.paddingTop = menuHeight + 'px';
			} else {
				menuHeight = 0;
			}
		} else {
			menuHeight = 0;
		}

		function fncAnimation(callback) {
			window.setTimeout(callback, 1000 / 60);
		};

		window.requestAnimFrame = function () {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || fncAnimation;
		}();



		function scrollToY(height, speed, easing) {
			var scrollTargetY = height || 0;
			scrollTargetY += 2;
			var speed = speed || 2000;
			var easing = easing || 'easeOutSine';

			var scrollY = window.pageYOffset;
			var currentTime = 0;
			var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));

			var easingEquations = {
				easeOutSine: function easeOutSine(pos) {
					return Math.sin(pos * (Math.PI / 2));
				},
				easeInOutSine: function easeInOutSine(pos) {
					return -0.5 * (Math.cos(Math.PI * pos) - 1);
				},
				easeInOutQuint: function easeInOutQuint(pos) {
					/* eslint-disable-next-line */
					if ((pos /= 0.5) < 1) {
						return 0.5 * Math.pow(pos, 5);
					}
					return 0.5 * (Math.pow(pos - 2, 5) + 2);
				}
			};

			function tick() {
				currentTime += 1 / 60;
				var p = currentTime / time;
				var t = easingEquations[easing](p);

				if (p < 1) {
					window.requestAnimFrame(tick);
					window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
				} else {
					window.scrollTo(0, scrollTargetY);
				}
			}

			tick();
		};


		function menuControl(menu) {
			var i = void 0;
			var currLink = void 0;
			var refElement = void 0;
			var links = menu.querySelectorAll('a[href^="#"]');
			var scrollY = window.pageYOffset;

			for (i = 0; i < links.length; i += 1) {
				currLink = links[i];
				refElement = document.querySelector(currLink.getAttribute('href'));
				if (refElement) {
					var box = refElement.getBoundingClientRect();

					var topElem = box.top + scrollY - menuHeight;

					if (topElem <= scrollY && topElem + refElement.clientHeight > scrollY) {
						currLink.classList.add('active');
					} else {
						currLink.classList.remove('active');
					}
				}
			}
		};

		function animated(menu, speed, easing) {
			function control(e) {
				e.preventDefault();
				var elem = document.querySelector(this.hash);
				if (elem) {
					var box = elem.getBoundingClientRect();
					var topElem = box.top + window.pageYOffset;
					scrollToY(topElem - menuHeight, speed, easing);
				}
			}

			var i = void 0;
			var link = void 0;
			var links = menu.querySelectorAll('a[href^="#"]');

			for (i = 0; i < links.length; i += 1) {
				link = links[i];
				link.addEventListener('click', control);
			}
		};

		animated(menu, speed, easing);
		document.addEventListener('scroll', function () {
			menuControl(menu);
		});
	};
	scrollMenu('.nav', '.head');
	scrollMenu('.footer__nav', '.head');

}
nav();





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
			scrollTop: Top - 200
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
	breakpointsInverse: true,
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
		if (el) {
			var elem = el.querySelectorAll('.swiper-slide');
			if (elem.length % 2 == 0) {
				var wrap = document.querySelector('.reviews__swiper_wrapper');
				wrap.insertAdjacentHTML('beforeEnd', '<div class="swiper-slide"></div>');
				mySwiper_reviews.update();
			}
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


// ===== article =====


var mySwiper = new Swiper('.art__swiper', { 
  autoHeight: true,
	grabCursor: true,
	navigation: {
		nextEl: '.art__btn_next',
		prevEl: '.art__btn_prev',
	},
})



function showTitle() {
	var swiper = document.querySelector('.art__swiper');
	if (swiper) {
		var prevBtn = document.querySelector('.art__btn_prev');
		var nextBtn = document.querySelector('.art__btn_next');

		function funk(sw, prev, next) {
			var prevSlide = sw.querySelector('.swiper-slide-prev');
			if (prevSlide) {
				var prevTitle = prevSlide.querySelector('.art__title').textContent;
				prev.querySelector('[data-prev]').textContent = prevTitle;
			} else {
				prev.querySelector('[data-prev]').textContent = '';
			}
			var nextSlide = sw.querySelector('.swiper-slide-next');
			if (nextSlide) {
				var nextTitle = nextSlide.querySelector('.art__title').textContent;
				next.querySelector('[data-next]').textContent = nextTitle;
			} else {
				next.querySelector('[data-next]').textContent = '';
			}
		}

		funk(swiper, prevBtn, nextBtn);

		prevBtn.addEventListener('click', funk.bind(null, swiper, prevBtn, nextBtn));
		nextBtn.addEventListener('click', funk.bind(null, swiper, prevBtn, nextBtn));
	}
}
showTitle();
