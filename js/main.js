
		
		/* carousel */
	$('.carousel__list').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
			prevArrow: $('.prev3'),  
			nextArrow: $('.next3'),
			responsive: [
    {
      breakpoint: 992, //и меньше
      settings: {
        slidesToShow: 3
             }
			},
		{
      breakpoint: 768, 
      settings: {
        slidesToShow: 2
             }
			},	
		{				
			breakpoint: 576, 
      settings: {
        slidesToShow: 1
             }			 
    }] 
    });


		/* carousel */ 
	$('.slider').slick({
		infinite: true,
    rows: 2,
		//slidesPerRow: 2,
		slidesToScroll: 1,
		slidesToShow: 2,
		prevArrow: $('.prev'), 
		nextArrow: $('.next'),
		responsive: [
	{
		breakpoint: 768, //и меньше
		settings: {
		//	slidesToShow: 1,
		//	slidesToScroll: 1
					 }
    }] 
    });
		
		/* carousel */
	var mySwiper1 = new Swiper ('.reviews_list', {
    slidesPerView: 2,
		spaceBetween: 20,
		slidesPerColumn: 2,
    loop: true,
    
    navigation: {
      nextEl: '.next_reviews',
      prevEl: '.prev_reviews',
    },
		breakpoints: {
			580: {
				slidesPerView: 1
			},
		}
  })
		
		
		/* video-carousel */
	var mySwiper = new Swiper ('.s1', {
    slidesPerView: 2,
		spaceBetween: 20,
		loop: true,
		grabCursor: true,
    navigation: {
      nextEl: '.next_video',
      prevEl: '.prev_video',
    },
		pagination: {
			el: '.swiper-pagination1',
			clickable: true,
		},
		breakpoints: {
			580: {
				slidesPerView: 1
			},
		}
  });
 

 
	/* carousel */
	$('.reviews__list').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
			rows: 2,
			prevArrow: $('.prev_carousel'),  
			nextArrow: $('.next_carousel'),
			responsive: [
		{				
			breakpoint: 580, 
      settings: {
        slidesToShow: 1,
				rows: 1
             }			 
    }] 
    });
 
 
 
	objectFitImages(); //IE polyfill
	
	/*reviews jQery
	
	$('[data-img]').click(function(){
		var bg = $(this).attr('src');
		var text = $(this).attr('data-img');
    $('[data-bg]').css('backgroundImage', 'url('+ bg +')');
		$('[data-text]').css("display", "none");
		$('[data-text='+ text +']').css("display", "block");
  });	*/
  
	/*reviews js*/
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
showText();
	


	$('[data-href=teach]').click(function(){ //таже копка
		if ($(this).hasClass('show')) {
			$(this).removeClass('show');  
			
			$('.teach__item').removeClass('show2');
			setTimeout(function(){
				$('#teach').removeClass('show1');
				$('.teach__item').removeClass('display');},1000);
		} else {                                 //новая
			var idItem = $(this).attr('data-id');
			if ($('[data-href=teach]').hasClass('show')) { //есть активные
				$('[data-href=teach]').removeClass('show');
				$(this).addClass('show');
				
				$('.teach__item').removeClass('show2');
				setTimeout(function(){
					$('.teach__item').removeClass('display');
					$('[data-teach="'+ idItem +'"]').addClass('display');
				},1000);
				setTimeout(function(){$('[data-teach="'+ idItem +'"]').addClass('show2');},1100);
			} else {                                       //нет включеных
				$(this).addClass('show');

				$('#teach').addClass('show1');
				$('[data-teach='+ idItem +']').addClass('display');
				setTimeout(function(){$('[data-teach="'+ idItem +'"]').addClass('show2');},1000);
			}
		}
		var Top = $('#teach').offset().top;
		$('html, body').animate({scrollTop: Top -80}, 1000);
  });	
	
	
	
	
//	var heigh = $('[data-teach='+ idItem +']').height();
	
/*	$('[data-href=teach]').click(function(){
		if ($(this).hasClass('show')) {
			$(this).removeClass('show');   
			$('.teach__item').fadeOut(1000);
			$('#teach').delay(1000).animate({height:"0px"},1000);
		} else {
			var idItem = $(this).attr('data-id');
			$('[data-href=teach]').removeClass('show');
			$(this).addClass('show');
			$('.teach__item').fadeOut(1000);
					
			$('#teach').animate({height:"250px"},1000); 
			$('[data-teach='+ idItem +']').delay(1000).fadeIn(1000);
					
			var Top = $('#teach').offset().top;                    //плавная прокрутка к метке 
						$('html, body').animate({scrollTop: Top -80}, 1000);
		}
	});*/

	
	
	
	
	
	
	
	