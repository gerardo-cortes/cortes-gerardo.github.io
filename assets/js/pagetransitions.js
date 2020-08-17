var PageTransitions = jQuery(function ($) {

	var $main = $( '#pt-main' ),
		$pages = $main.find( 'section.pt-page' ),
		animcursor = 1,
		page_id = 0,
		current = 0,
		hashCallback = "",
    	intro       = '.intro',
    	mob_scr     = false,
        page_right  = '.page-right',
        body        = 'body',
        splitlayout = '#splitlayout',
        menu__a     = '#menu a',
        home__type  ='.home_type',
        page_current ='.pt-page-current',
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;
	
	function init() {

		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

	    /*--------------------------------
	    * Functions 
	    ----------------------------------*/

	    function go_to_right() {

	        $(splitlayout).addClass('open-right').removeClass('close-right');

	    }

	    function go_to_left() {

	        $(splitlayout).removeClass('open-right').addClass('close-right reset-layout');
	        setTimeout(function(){
	        	//$("section.pt-page.pt-page-current").getNiceScroll(0).setScrollTop(0,0);
	        	$("section.pt-page.pt-page-current").scrollTop(0);
	        },700);

	    }

	    function check_screen() {
	        
	        if (Modernizr.mq('(max-width: 991px)')) {

	            return "mobile_screen";

	        } else {
	            
	            return "not_mobile_screen";

	        }
	        
	    }
	    check_screen();

	    function open_sec_on_load() {

	    	if ( $(".front_home").length ) { window__hash('#home', false); }

	        var wind_hash = window.location.hash;
	        if(wind_hash !='#home' && wind_hash !=''){
	        	if (!$("section"+wind_hash).length){return;}

	        	if( check_screen() === 'mobile_screen' ){

	            	page_id = $(wind_hash).index();
	                if ( $(page_current).index() == page_id ){ return; }

	                $(page_right).removeClass('page-right-zero-height').addClass('page-right-normal-height');
	                mob_scr = true;
	                $(home__type).fadeOut();
	                go_to_right();

	                if( isAnimating ) {
	                    return false;
	                }
	                if( animcursor > 63 ) {
	                    animcursor = 1;
	                }
	                nextPage( animcursor );
	                ++animcursor;

	        	}else{
		            go_to_right();
		            $(wind_hash).addClass('pt-page-current').siblings().removeClass('pt-page-current');
	        	}
	            window__hash(wind_hash);

	        }
	    }
	    open_sec_on_load();

	    function window__hash(elem, changeHash = true){
	    	$('#menu a[href="'+elem+'"]').addClass('active_item').parents("li").siblings().find('a').removeClass('active_item'); 
	    	if (changeHash) {
		    	hashCallback = function(){ window.location.hash =  elem; };
	    	}
	    }

		$(window).on('hashchange', function() {
			var hash = window.location.hash;
			if (hash){
				$('#menu a[href="' + hash + '"]').trigger("click");
			}
		});

	    function fitMyText(){
	        var fit__text = $(".fit__text");
	        if ( fit__text.length !== 0 ){

	            fit__text.fitText(1, { maxFontSize: 62 });
	        }
	    }

	    function mob_menu_toggle(){
	        $(".navbar-toggle").toggleClass("collapsed");
	        $('.mob-menu-overlay').fadeToggle();
	        $('.side-right').toggleClass('right-zero');
	    }

	    $(window).on("resize", function () {
	        $(page_right).removeClass('page-right-zero-height').addClass('page-right-normal-height');
	        if( check_screen() === "mobile_screen" ){

	            if (  $("[href='#home']").hasClass("active_item") || $(".active_item").length == 0 ) {

	                $(home__type).fadeIn();

	            } else {

	                $(home__type).fadeOut();
	            }
	        }
	    });

	    if( $(".pt-page").length ){
	    	if( !mob_scr ){
	    		$(page_right).addClass('page-right-zero-height').removeClass('page-right-normal-height');
	    	}
	    } else {
	    	$(page_right).removeClass('page-right-zero-height').addClass('page-right-normal-height');
	    }


	    $(document).on("click", '#menu a:not(.single),.goToSec', function (event) {
	        event.preventDefault();
	        var sec = $(this).attr('href');

	        if (check_screen() === "mobile_screen") {

	            if ( sec === '#home' ) {
	            	window__hash(sec);
	                $(home__type).fadeIn();
	                $(page_right).addClass('page-right-zero-height').removeClass('page-right-normal-height');
	                go_to_left();
	                fitMyText();

	            } else {

	            	page_id = $(sec).index();
	            	if ( $("[href='#home']").hasClass("active_item") && $(page_current).index() == page_id ) {
	            		$(page_right).removeClass('page-right-zero-height').addClass('page-right-normal-height');
	            		$(home__type).fadeOut();
	            		go_to_right();
	            		window__hash(sec);
	            		return;
	            	}
	                if ( $(page_current).index() == page_id ){ 
	                	$(page_right).removeClass('page-right-zero-height').addClass('page-right-normal-height');
	                	$(home__type).fadeOut();
	                	window__hash(sec);
	                	return; 
	                }

	                $(page_right).removeClass('page-right-zero-height').addClass('page-right-normal-height');
	                $(home__type).fadeOut();
	                go_to_right();

	                if( isAnimating ) {
	                    return false;
	                }
	                window__hash(sec);
	                if( animcursor > 63 ) {
	                    animcursor = 1;
	                }
	                
	                nextPage( animcursor );
	                ++animcursor;

	                }

	        } else {

	            if ( sec === '#home' ) {

	                go_to_left();
	                window__hash(sec);

	            }

	            else if ( $('.open-right').length ) {
            
	                page_id = $(sec).index();
	                if ( $(page_current).index() == page_id ){ return; } 
	                
	                if( isAnimating ) {
	                    return false;
	                }
	                window__hash(sec);
	                
	                if( animcursor > 53 ) {
	                    animcursor = 1;
	                }//console.log(animcursor);
	                nextPage( animcursor );
	                ++animcursor;                   

	            } else {
	                go_to_right();
	                $(sec).addClass('pt-page-current').siblings().removeClass('pt-page-current');
	                window__hash(sec);

	            }
	        }
	    });
	}

	function nextPage(options ) {
		var animation = (options.animation) ? options.animation : options;

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;

		$("html").addClass("animating");

		if (!$(page_current).length) {
			$pages.eq( current ).addClass( 'pt-page-current' );
		}
		
		var $currPage = $(page_current);
		var $nextPage = $pages.eq( page_id ).addClass( 'pt-page-current' ),

			outClass = '', inClass = '';

			/*var currPageIndex = $(".pt-page-current").index();
			var nextPageIndex = page_id;
			if (nextPageIndex > currPageIndex){
				animation = 1;
			} else {
				animation = 2;
			}*/
			animation = animcursor;
			//console.log(animation);

		switch( animation ) {
			case 1:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 2:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 3:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 4:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case 5:
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case 6:
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 7:
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 8:
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 9:
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case 10:
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case 11:
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case 12:
				outClass = 'pt-page-rotateTopSideFirst';
				inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
				break;
			case 13:
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case 14:
				outClass = 'pt-page-flipOutTop';
				inClass = 'pt-page-flipInBottom pt-page-delay500';
				break;
			case 15:
				outClass = 'pt-page-flipOutBottom';
				inClass = 'pt-page-flipInTop pt-page-delay500';
				break;
			case 16:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 17:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 18:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 19:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 20:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-rotatePullRight pt-page-delay180';
				break;
			case 21:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-rotatePullLeft pt-page-delay180';
				break;
			case 22:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-rotatePullBottom pt-page-delay180';
				break;
			case 23:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-rotatePullTop pt-page-delay180';
				break;
			case 24:
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 25:
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 26:
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 27:
				outClass = 'pt-page-rotateFoldBottom';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 28:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 29:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 30:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 31:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
			case 32:
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case 33:
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case 34:
				outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomTopIn';
				break;
			case 35:
				outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomBottomIn';
				break;
			case 36:
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case 37:
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case 38:
				outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeTopIn';
				break;
			case 39:
				outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeBottomIn';
				break;
			case 40:
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case 41:
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;
			case 42:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 43:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 44:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 45:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 46:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 47:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 48:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 49:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 50:
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case 51:
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 52:
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 53:
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			
		}

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		if(hashCallback){
			hashCallback();
			hashCallback = "";
		}
		$("html").removeClass("animating");
		$("section.pt-page:not(.pt-page-current)").each(function(){
			$(this).scrollTop(0);
		});
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}

	init();

	return { 
		init : init,
		nextPage : nextPage,
	};

});