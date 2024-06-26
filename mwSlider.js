const sliders = document.querySelectorAll('.mwSlider');

for (let i = 0; i < sliders.length; i++) {
    sliders[i].id = 'slider' + (i + 1);
    let sliderID = sliders[i].getAttribute('id');
    const slider = document.querySelector('#' + sliderID);
    const slide = slider.querySelector(':scope > *');
    const slides = slider.querySelectorAll(':scope > *');
    let active = slide.querySelector('.show');
    let scrollSlides, scrollSlide, automateTimer;
    let scrollClicks = 0;

// build slider
    // Create slides wrapper and wrap all slides in it
        let slidesWrap = document.createElement('div');
        slidesWrap.className = 'slides';
        for (let s = 0; s < slides.length; s++) {
            slidesWrap.append(slides[s]);
        }
        slider.prepend(slidesWrap);
    // create the previous arrow
        let previousArrow = document.createElement('div');
        previousArrow.className = 'prevArrow';
        previousArrow.textContent = '<';
        slider.prepend(previousArrow);
    // create the next arrow
        let nextArrow = document.createElement('div');
        nextArrow.className = 'nextArrow';
        nextArrow.textContent = '>';
        slider.append(nextArrow);
    // create the navigation item container
        let navItemsContainer = document.createElement('div');
        navItemsContainer.className = 'navigationPoints';
        slider.append(navItemsContainer);
    // scroll slider setup
        if (slider.classList.contains('mwScroll')) {
            scrollSlides = sliders[i].querySelector('.slides');
            scrollSlide = scrollSlides.querySelectorAll(':scope > div');
            active = scrollSlides.querySelector('.show');
            scrollSlides.style.width = scrollSlide.length * 100 + '%';
        }
    // ticker slider setup
        if (slider.classList.contains('mwTicker')) {
            scrollSlides = sliders[i].querySelector('.slides');
            scrollSlide = scrollSlides.querySelectorAll(':scope > div');
        };

// slider functionalities
    const pArrow = slider.querySelector('.prevArrow'); 
    const nArrow = slider.querySelector('.nextArrow');
    const mainChild = slidesWrap.querySelectorAll('div');
    const lastChild = slidesWrap.querySelector('div:last-child');
    const firstChild = slidesWrap.querySelector('div:first-child');
    const navigationPoints = slider.querySelector('.navigationPoints')
    ;    
    // show the sliders when built
        firstChild.classList.add('show');
        fadeIn();
    // clicking the previous arrow    
        pArrow.addEventListener('click', function(pA) {
            pA = pA.target;
            if (firstChild.classList.contains('show')) {
            // fade functionality
                if (!pA.closest('.mwScroll') || pA.closest('mwFade')) {
                    fadeOut();
                    setTimeout(function() {
                        PreviousFirstActiveUpdate();
                        fadeIn();
                    }, 500);
            // Scroll functionality
                } else if (pA.closest('.mwScroll')) {                    
                    scrollClicks = scrollSlide.length - 1;
                    scrollSlides.style.left = -(100 * (scrollClicks - 1)) + '%';
                    PreviousFirstActiveUpdate();
                }
            } else {
            // fade functionality
                if (!pA.closest('.mwScroll') || pA.closest('mwFade')) {
                    fadeOut();
                    setTimeout(function() {
                        previousActiveUpdate();
                        fadeIn();
                    }, 500);
            // Scroll functionality
                } else if (pA.closest('.mwScroll')) {                    
                    scrollClicks--;
                    scrollSlides.style.left = -(100 * (scrollClicks - 1)) + '%';
                    previousActiveUpdate();
                }
            }
        });
    // clicking the next arrow
        nArrow.addEventListener('click', function(nA) {
            nA = nA.target;
            if (lastChild.classList.contains('show')) {
            // fade functionality
                if (!nA.closest('.mwScroll') || nA.closest('mwFade')) {
                    fadeOut();
                    setTimeout(function() {
                        activeChange();
                        firstChild.classList.add('show');
                        removeActiveNavItem();
                        nextLastActiveUpdate();
                        fadeIn();
                    }, 800);
            // Scroll functionality
                } else if (nA.closest('.mwScroll')) {
                    scrollClicks = 0;
                    scrollSlides.style.left = 100 + '%';
                    activeChange();
                    firstChild.classList.add('show');
                    removeActiveNavItem();
                    nextLastActiveUpdate();
                }
            } else {
            // fade functionality
                if (!nA.closest('.mwScroll') || nA.closest('mwFade')) {
                    fadeOut();
                    setTimeout(function() {
                        nextActiveUpdate();                        
                        fadeIn();
                    }, 500);
            // Scroll functionality
                } else if (nA.closest('.mwScroll')) {                    
                    scrollClicks++;
                    scrollSlides.style.left = -(100 * (scrollClicks - 1)) + '%';
                    nextActiveUpdate();
                }                
            }
        });
    // build navigation items for each slide in slider
        for (var n = 0; n < mainChild.length; n++) {
            let navPointChild = document.createElement('div');
            navPointChild.className = 'items';
            navPointChild.classList.add('item' + [n + 1]);
            navPointChild.textContent = [n + 1];
            navPointChild.setAttribute('data-id', n);
            navigationPoints.append(navPointChild);
        }
        let navPoints;
        let activeNavPoint = slider.querySelector('.navigationPoints .items');
        activeNavPoint.classList.add('active');
        let allNavPoints = slider.querySelectorAll('.navigationPoints .items');
    // clicking a navigtion item
        const items = slider.querySelectorAll('.items');
        items.forEach(item => {
            item.addEventListener('click', function(e) {
                e = e.target;
                if (!e.closest('.mwScroll') || e.closest('mwFade')) {
                // fade functionality
                    if (!e.classList.contains('active')) {
                        fadeOut();                
                        setTimeout(function() {
                            active.classList.remove('show');  
                            mainChild[item.getAttribute('data-id')].classList.add('show');
                            fadeIn();
                            for (let i = 0; i < items.length; i++) {
                                items[i].classList.remove('active');
                            };
                            e.classList.add('active');
                        }, 500);
                    }
                } else if (e.closest('.mwScroll')) {
                // scroll functionality
                    if (!e.classList.contains('active') || e.closest('mwFade')) {
                        for (let i = 0; i < scrollSlide.length; i++) {
                            scrollSlide[i].classList.remove('show');
                        }
                        mainChild[item.getAttribute('data-id')].classList.add('show');
                        scrollClicks = item.getAttribute('data-id');
                        scrollSlides.style.left = -(100 * (scrollClicks - 1)) + '%';
                        for (let i = 0; i < items.length; i++) {
                            items[i].classList.remove('active');
                        };
                        e.classList.add('active');
                    }
                }
            });
        });
    // Automate transition
        if (sliders[i].classList.contains('mwAuto')) {
            automateTimer = setInterval(automateTransition, 4000);
            nArrow.addEventListener('click', function() {
                clearAndStartTimer(automateTransition, 4000);
            });
            pArrow.addEventListener('click', function() {
                clearAndStartTimer(automateTransition, 4000);
            });
            items.forEach(item => {
                item.addEventListener('click', function(it) {
                    it = it.target;
                    if (!it.classList.contains('active')) {
                        clearAndStartTimer(automateTransition, 4000);                       
                    };
                });
            });
        }
    // Stop Automate transition on hover
        if (sliders[i].classList.contains('mwAutoPause')) { 
            automateTimer = setInterval(automateTransition, 4000); 
            sliders[i].addEventListener('mouseover', function() {
                clearInterval(automateTimer);
            });

            sliders[i].addEventListener('mouseout', function() {
                automateTimer = setInterval(automateTransition, 4000);
            });
        };
    // Ticker Slider
        if (sliders[i].classList.contains('mwTicker')) {
            let originalSliderwidth = sliders[i].offsetWidth;
            let slidesNumber = slides.length;
            let slideWidth = originalSliderwidth / slidesNumber;
            leftPosition = (originalSliderwidth / slidesNumber) + slideWidth; 
            let tickerChildren = scrollSlides.querySelectorAll(':scope > *');   
            tickerChildren.forEach(function(tc) { 
                let postSlides = tc.cloneNode(true);
                scrollSlides.appendChild(postSlides);
            });      
            let slidesLength = scrollSlides.offsetWidth;
            tickerSlide(0, 0);
            function tickerSlider() {
                if (scrollSlides.offsetLeft <= -(slidesLength / 2)) {
                    tickerSlide(0, 0);
                } else {
                    tickerSlide(leftPosition - 0.25, leftPosition);
                }
            }
        // start the ticker
            let tickerTimer = setInterval(function() {
                tickerSlider();
            }, 1);
        // pause on hover
            sliders[i].addEventListener('mouseover', function() {
                clearInterval(tickerTimer);
            });
        // resume on hover
            sliders[i].addEventListener('mouseout', function() {
                tickerTimer = setInterval(tickerSlider, 1);
            });        
        }


    function tickerSlide(variableLeftValue, newLeftValue) {
        leftPosition = variableLeftValue;
        scrollSlides.style.left = newLeftValue + 'px';
    };       

    function activeChange() {
        active = slider.querySelector('.show');
        active.classList.remove('show');
    };

    function PreviousFirstActiveUpdate() {
        activeChange();
        lastChild.classList.add('show');
        removeActiveNavItem();
        let lastNavPoint = slider.querySelector('.navigationPoints .items:last-of-type');
        lastNavPoint.classList.add('active');
    };

    function nextLastActiveUpdate() {
        let firstNavPoint = slider.querySelector('.navigationPoints .items:first-of-type');
        firstNavPoint.classList.add('active');
    }

    function previousActiveUpdate() {
        activeChange();
        active.previousElementSibling.classList.add('show');                    
        navPoints = slider.querySelector('.navigationPoints .items.active');
        navPoints.previousElementSibling.classList.add('active');
        navPoints.classList.remove('active');
    };

    function nextActiveUpdate() {
        activeChange();
        active.nextElementSibling.classList.add('show');
        navPoints = slider.querySelector('.navigationPoints .items.active');
        navPoints.nextElementSibling.classList.add('active');
        navPoints.classList.remove('active');
    };

    function automateTransition() {
        if (!sliders[i].classList.contains('mwScroll')) {
        // fade functionality
            if (lastChild.classList.contains('show')) {            
                fadeOut();
                setTimeout(function() {
                    activeChange();
                    firstChild.classList.add('show');
                    removeActiveNavItem();
                    nextLastActiveUpdate();
                    fadeIn();
                }, 800);
            } else {
                fadeOut();
                setTimeout(function() {
                    nextActiveUpdate();
                    fadeIn();
                }, 500);
            }
        } else if (!sliders[i].classList.contains('mwFade')) {
        // Scroll functionality
            if (lastChild.classList.contains('show')) {            
                scrollClicks = 0;
                scrollSlides.style.left = 100 + '%';
                activeChange();
                firstChild.classList.add('show');
                removeActiveNavItem();
                nextLastActiveUpdate();
            } else {
                scrollClicks++;
                scrollSlides.style.left = -(100 * (scrollClicks - 1)) + '%';
                nextActiveUpdate();
            }
        }      
    };

    function clearAndStartTimer(functionName, transitionDelayTime) {
        clearInterval(automateTimer);
        automateTimer = setInterval(functionName, transitionDelayTime);
    }

    function removeActiveNavItem() {
        for (var n = 0; n < allNavPoints.length; n++) {
            allNavPoints[n].classList.remove('active');
        }
    }
    
    function fadeIn() {
        active = slider.querySelector('.show');
        let fadeInEffect = setInterval(function() {
            if (active.style.opacity == 1) {
                clearInterval(fadeInEffect);
            } else {                
                active.style.opacity -= -0.1;
            }                
        }, 50);
    } 

    function fadeOut() {
        let fadeOutEffect = setInterval(function() {
            if (active.style.opacity == 0) {
                clearInterval(fadeOutEffect);
            } else {                
                active.style.opacity -= 0.1;
            }                
        }, 50);
    }

};