
(function ($) {
    $.fn.swipeslider = function (options) {
    
    //自己编写的代码

    //生成导航移动坐标
        var tempWidth = 0;
        var i = 3;
        var navPos = new Array(11); navPos[0] = 0;navPos[1] = 0;navPos[2] = 0;
        $("#navBar ul li").each(function(){
            if(i > 2){
                tempWidth += $(this).outerWidth(true);
                navPos[i] = tempWidth;
                i++;
            }
        });
        //console.log(navPos);


        $("#navBar ul li").click(function(){
            jumpToSlide($(this).attr("name"));
            changeNavBar($(this).attr("name"))
        });
        function changeNavBar(flag){
            var oldId = "#navBar ul li:eq(" + $("#navBar ul").attr("name") +")";
            var newId = "#navBar ul li:eq(" + flag +")";

            $(oldId).css({"color":"#888"});
            $(newId).css({"color":"#ff7891"});
            navBarPlay(flag);
            $("#navBar ul").attr("name",flag);
        }
        function navBarPlay(flag){
            $("#navBar").animate({
                scrollLeft:navPos[flag],
            },300);
        }

        //展开分类里的div
        var openObj = null; //保存展开按钮的对象
        $(".shopClassify .openDiv").click(function(){
            openObj = $(this);
            $(this).children("div").css({"border-radius":"0px"});
            $(this).children(".shopClassifyImg").children("img").css({"display":"block"});
            $(this).children(".shopClassifyImg").children("i").css({"display":"none"});
            $(this).children("span").text($(this).children("span").attr("name"));
            // $(this).parent("ul").parent(".shopClassify").animate({
            //     height:$(this).parent("ul").parent(".shopClassify").children("ul").length * 80
            // },300);
            $(this).parent("ul").parent(".shopClassify").css({
                height:$(this).parent("ul").parent(".shopClassify").children("ul").length * 80
            });
        });
        //关闭分类里的div
        $(".shopClassify .closeDiv").click(function(){
            openObj.children("div").css({"border-radius":"50%"});
            openObj.children(".shopClassifyImg").children("img").css({"display":"none"});
            openObj.children(".shopClassifyImg").children("i").css({"display":"inline-block"});
            openObj.children("span").text("更多");
            openObj.parent("ul").parent(".shopClassify").css({
                height:"160px"
            });
        });
    //自己编写的代码结束
    
    
    
        var slideContainer = this;
        var slider = this.find('.sw-slides'); // reference to slider
        var defaultSettings = {
        /**
        / How long one slide will change the other.
        */
        transitionDuration: 500,
        /**
        / Enable autoplay
        */
        autoPlay: false,
        /**
        * How frequently slides will be changed.
        */
        autoPlayTimeout: 4000,
        /**
        * Transition effect.
        */
        timingFunction: 'ease-out',
        /**
        * Show 'Next' and 'Previous' buttons.
        */
        prevNextButtons: false,
        /**
        * Show slide switches.
        */
        bullets: false,
        /**
        * Enable swipe function.
        */
        swipe: true,
        /**
        * Overall height of the slider. Set it to percent to make it responsive.
        * Otherwise the slider will keep the height.
        */
        sliderHeight: ''
        };
    
        var settings = $.extend(defaultSettings, options);
    
        // Privates //
        /** Sliding states:
         * 0 - sliding not started
         * 1 - sliding started
         * 2 - slide released
         */
        var slidingState = 0;
        var startClientX = 0;
        var startPixelOffset = 0;
        var pixelOffset = 0;
        var currentSlide = 0;
        var slideCount = 0;
        // Overall width of sliders.
        var slidesWidth = 0;
        // Flag for disbling swipe function while transition animation is playing.
        var allowSwipe = true;
        var transitionDuration = settings.transitionDuration;
        var swipe = settings.swipe;
        var autoPlayTimeout = settings.autoPlayTimeout;
        // ID of timeout function that waits for animation to end.
        var animationDelayID = undefined;
        var allowSlideSwitch = true;
        var autoPlay = settings.autoPlay;
        /** 
         * Set initial values.
         */
        (function init() {
        //$(slideContainer).css('padding-top', settings.sliderHeight);
        
        slidesWidth = slider.width();
            
        // Change slide width when window changes.
        $(window).resize(resizeSlider);
            
        //if(settings.prevNextButtons) {
            // insertPrevNextButtons();
        //}
        
        // Add last slide before first and first before last to seamless and engless transition
        // slider.find('.sw-slide:last-child').clone().prependTo(slider);
        // slider.find('.sw-slide:nth-child(2)').clone().appendTo(slider);
        slideCount = slider.find('.sw-slide').length;
        
        //if(settings.bullets) {
            //insertBullets(slideCount - 2);
        //}
    
        setTransitionDuration(transitionDuration);
        setTimingFunction(settings.timingFunction);
        setTransitionProperty('all');
        
        if(swipe) {
            // Add event handlers to react when user swipe.
            slider.on('mousedown touchstart', swipeStart,);
            $('html').on('mouseup touchend', swipeEnd);
            $('html').on('mousemove touchmove', swiping);
        }
    
        // Jump to slide 1 (since another slide was added to the beginning of row);
        //jumpToSlide(1);
    
        enableAutoPlay();
        })();
        
        /**
         * Changes slider size to response on window change.
         */
        function resizeSlider(){
        // Slide width is being changed automatically. Tough slidesWidth used to calculate a distance of transition effect.
        slidesWidth = slider.width();
        switchSlide();
        }
    
        /**
         * Triggers when user starts swipe.
         * @param event browser event object
         */
        function swipeStart(event) {
            if(!allowSwipe) {
                return;
            }
        
            disableAutoPlay();
            // If it is mobile device redefine event to first touch point
            if (event.originalEvent.touches)
                event = event.originalEvent.touches[0];
        
            // Check if slide started on slider 
            if (slidingState == 0){
                slidingState = 1; // Status 1 = slide started.
                startClientX = event.clientX;
            }
        }
    
        /** Triggers when user continues swipe.
         * @param event browser event object
         */
        function swiping(event) {
        var pointerData;
        
        // Get pointer data from event.
        if (event.originalEvent.touches) {
            pointerData = event.originalEvent.touches[0];
        } else {
            pointerData = event;
        }
    
        // Distance of slide from the first touch
        var deltaSlide = pointerData.clientX - startClientX;
    
        // If sliding started first time and there was a distance.
        if (slidingState == 1 && Math.abs(deltaSlide) >= 30) {  //当左右滑动超过30px时触发
            //重置滑动距离
            startClientX = pointerData.clientX;
            deltaSlide = pointerData.clientX - startClientX;    //重置滑动距离


            slidingState = 2; // Set status to 'actually moving'
            startPixelOffset = currentSlide * -slidesWidth; // Store current offset of slide
        }
    
        //  When user move image
        if (slidingState == 2) {
            //event.preventDefault(); // 阻止默认事件 
            
            // Means that user slide 1 pixel for every 1 pixel of mouse movement.
            var touchPixelRatio = 1;
            // Check for user doesn't slide out of boundaries
            if ((currentSlide == 0 && pointerData.clientX > startClientX) ||
                (currentSlide == slideCount - 1 && pointerData.clientX < startClientX)) {
            // Set ratio to 3 means image will be moving by 3 pixels each time user moves it's pointer by 1 pixel. (Rubber-band effect)
            touchPixelRatio = 3;
            }
    
            // How far to translate slide while dragging.
            pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
            enableTransition(false);
            // Apply moving and remove animation class
            translateX(pixelOffset);
            //console.log(startClientX + "------" + pointerData.clientX);
        }
        }
    
        /** Triggers when user finishes swipe.
         * @param event browser event object
         */
        function swipeEnd(event) {
        if (slidingState == 2) {
            // Reset sliding state.
            slidingState = 0;
    
            // Calculate which slide need to be in view.
            //var pixeFlag = pixelOffset - startPixelOffset > 0 ? 1 : -1;
            if(pixelOffset - startPixelOffset > 50){
                currentSlide -= 1;
                theSwipeEnd();
            }else if(pixelOffset - startPixelOffset < -50){
                currentSlide += 1;
                theSwipeEnd();
            }else{
                theSwipeEnd();
            }
        }
        function theSwipeEnd(){
            //currentSlide = pixelOffset < startPixelOffset  ? currentSlide + 1 : currentSlide -1;
    
            // Make sure that unexisting slides weren't selected.
            currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
    
            // Since in this example slide is full viewport width offset can be calculated according to it.
            pixelOffset = currentSlide * - slidesWidth;
    
            disableSwipe();
            switchSlide();
            enableAutoPlay();
        }
        
        slidingState = 0;
    
        } 
    
        /** 
         * Disables reaction on swipe while transition effect is playing.
         */
        function disableSwipe() {
        allowSwipe = false;
        window.setTimeout(enableSwipe, transitionDuration)
        }
    
        /** 
         * Enables reaction on swipe.
         */
        function enableSwipe() {
        allowSwipe = true;
        }
    
        /**
         * Disables autoplay function.
         * Used while performing manual operations.
         */
        function disableAutoPlay() {
        allowSlideSwitch = false;
        window.clearTimeout(animationDelayID);
        }
        
        /**
         * Enables autoplay function.
         * Used to prevent auto play when user performs manual switching.
         */
        function enableAutoPlay() {
        if(autoPlay) {
            allowSlideSwitch = true;
            startAutoPlay();
        }
        }
    
        /**
         * Launches autoPlay function with delay.
         */
        function startAutoPlay() {
        if(allowSlideSwitch) {
            animationDelayID = window.setTimeout(performAutoPlay, autoPlayTimeout);
        }
        }
    
        /**
         * Switches between slides in autoplay mode.
         */
        function performAutoPlay() {
        switchForward();
        startAutoPlay();
        }
    
        /**
         * Switches slideshow one slide forward.
         */
        function switchForward() {
        currentSlide += 1;
        switchSlide();
        }
    
        /**
         * Switches slideshow one slide backward.
         */
        function switchBackward() {
        currentSlide -= 1;
        switchSlide();
        }
        
        /**
         * Switches slideshow to currentSlide.
         */
        function switchSlide() {
        changeNavBar(currentSlide)
        enableTransition(true);
        translateX(-currentSlide * slidesWidth);
        
        if(currentSlide == 0) {
            window.setTimeout(jumpToEnd, transitionDuration);
        } else if (currentSlide == slideCount - 1) {
            window.setTimeout(jumpToStart, transitionDuration);
        }
        setActiveBullet(currentSlide);
        }
    
        /**
         * Switches slideshow to the first slide.
         * Remark: the first slide from html elements, not the slide that was added for smooth transition effect.
         */
        function jumpToStart() {
        //jumpToSlide(1);
        }
        
        /**
         * Switches slideshow to the last slide.
         * Remark: the last slide from html elements, not the slide that was added for smooth transition effect.
         */
        function jumpToEnd() {
        //jumpToSlide(slideCount - 2);
        }
    
        /**
         * Switches slideshow to exact slide number.
         * Remark: respecting two slides that were added for smooth transaction effect.
         */
        function jumpToSlide(slideNumber) {
        enableTransition(false);
        currentSlide = slideNumber;
        translateX(-slidesWidth * currentSlide);
        window.setTimeout(returnTransitionAfterJump, 50);
        }
    
        /**
         * Returns transition effect after jumpToSlide function call.
         */
        function returnTransitionAfterJump() {
        enableTransition(true);
        }
    
        /** 
         * Enables or disables transition
         * @param {bool} true to enable traintion.
         */
        function enableTransition(enable) {
        if (enable) {
            setTransitionProperty('all');
        } else {
            setTransitionProperty('none');
        }
        }
    
        /**
         * Translates slides on certain amount.
         * @param distance {Number} distance of transition. If negative, transition from right to left.
         */
        function translateX(distance) {
        slider
        // Prefixes are being set automatically.
    //      .css('-webkit-transform','translateX(' + distance + 'px)')
    //      .css('-ms-transform','translateX(' + distance + 'px)')
            .css('transform','translateX(' + distance + 'px)');
        }
    
        /**
         * Sets duration of transition between slides.
         * @param duration {Number} amount in milliseconds.
         */
        function setTransitionDuration(duration) {
        slider
    //      .css('-webkit-transition-duration', duration + 'ms')
            .css('transition-duration', duration + 'ms');
        }
    
        /**
         * Sets transition function.
         */
        function setTimingFunction(functionDescription) {
        slider
    //      .css('-webkit-transition-timing-function', functionDescription)
            .css('transition-timing-function', functionDescription);
        }
    
        /**
         * Sets property that will be used in transition effect.
         */
        function setTransitionProperty(property) {
        slider
    //      .css('-webkit-transition-property', property)
            .css('transition-property', property);
        }
        
        
        
        /**
         * Add bullet indicator of current slide.
         */
        function insertBullets(count) {
        // slider.after('<ul class="sw-bullet"></ul>');
        // var bulletList = slider.parent().find('.sw-bullet');
        // for (var i = 0; i < count; i++) {
            
        //     if (i == 0) {
        //     bulletList.append('<li class="sw-slide-' + i + ' active"></li>');
        //     } else {
        //     bulletList.append('<li class="sw-slide-' + i + '"></li>');
        //     }
            
        //     var item = slideContainer.find('.sw-slide-' + i);
            
        //     // Workaround a problem when iterator i will have max value due to closure nature.
        //     (function(lockedIndex) {
        //     item.click(function() {
        //         // Disable autoplay on time of transition.
        //         disableAutoPlay();
        //         currentSlide = lockedIndex + 1;
        //         switchSlide();
        //         enableAutoPlay();
        //     });
        //     })(i);
        // }
        }
        
        /**
         * Sets active bullet mark of active slide.
         * @param number {Number} active slide with respect of two added slides. 
         */
        function setActiveBullet(number) {
        // var activeBullet = 0;
        
        // if(number == 0) {
        //     activeBullet = slideCount - 3;
        // } else if (number == slideCount - 1) {
        //     activeBullet = 0;
        // } else {
        //     activeBullet = number - 1;
        // }
        
        //slideContainer.find('.sw-bullet').find('li').removeClass('active');
        //slideContainer.find('.sw-slide-' + activeBullet).addClass('active');
        }
    
        return slideContainer;    
    }
    }(jQuery));