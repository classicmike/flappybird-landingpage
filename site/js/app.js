(function(){
    var app = {};

    /***--------- SCROLL TO Helper ------------ ***/
    app.ScrollToHelper = {};

    app.ScrollToHelper.scrollTo = function(id){
        //scroll to
        if(!id){
            return;
        }

        var position = $(id).offset().top;


        if(!position){
            return;
        }

        return $('html,body').velocity('scroll', { duration: 200, offset: position }).promise();

    };
    /***--------- SCROLL TO Helper ------------ ***/

    app.ScrollToNavigation = function(){
        this.setEvents();
    };

    app.ScrollToNavigation.prototype.setEvents = function(){
        $('.' + app.ScrollToNavigation.SCROLL_TO_NAV_CLASS).on('click', this.scrollToElement.bind(this));
    };

    app.ScrollToNavigation.prototype.scrollToElement = function(event){
        event.preventDefault();

        var id = $(event.target).attr('href');
        app.ScrollToHelper.scrollTo(id);

        app.ScrollToHelper.scrollTo(id);
    };

    app.ScrollToNavigation.SCROLL_TO_NAV_CLASS = 'nav-scrollto';


    app.ScrollToAnimation = function(){
        this.setup();
    };

    app.ScrollToAnimation.prototype.setup = function(){
        var scrollToElements = $(app.ScrollToAnimation.SCROLL_TO_SELECTOR);

        this.scrollToController = new ScrollMagic.Controller();
        this.scrollToScenes = [];

        console.log(scrollToElements);
        var _self = this;

        scrollToElements.each(function(){
            _self.setupScrollToScene($(this));
        });

    };

    app.ScrollToAnimation.prototype.setupScrollToScene = function(element){
        var scene = new ScrollMagic.Scene({
            triggerElement: '#' + element.attr('id'),
            logLevel: 2,
            reverse: false
        }).setVelocity(
            '#' + element.attr('id') + ' ' +  app.ScrollToAnimation.ELEMENT_TO_ANIMATE,
            'slideDown',
            {
                duration: 500,
                easing: [100, 10]
            }
        ).addTo(this.scrollToController);

        this.scrollToScenes.push(scene);
    };

    app.ScrollToAnimation.SCROLL_TO_SELECTOR = '.scroll-to-scene';
    app.ScrollToAnimation.ELEMENT_TO_ANIMATE = '.scroll-to-animate-element';


    app.BirdHeroAnimation = function(){
        // run the bird animation
        this.setup();
        this.run();
    };

    app.BirdHeroAnimation.prototype.setup = function(){
        this.birdHeroElement = $(app.BirdHeroAnimation.HERO_ID);
    };

    app.BirdHeroAnimation.prototype.run = function(){
        this.birdHeroElement.velocity({
            left: 0
        }, {
            duration: 1000,
            easing: [100, 10],
            complete: this.markAsAnimated.bind(this)
        });
    };

    app.BirdHeroAnimation.prototype.markAsAnimated = function(elements){
        $(elements[0]).removeClass(app.BirdHeroAnimation.NOT_ANIMATED_CLASS.replace('.', ''));
    };

    app.BirdHeroAnimation.HERO_ID = '#bird-hero';
    app.BirdHeroAnimation.NOT_ANIMATED_CLASS = '.not-animated';


    app.NavigationTimingPane = function(){
        this.setup();
        this.setEvents();
    };

    app.NavigationTimingPane.prototype.setup = function(){
        this.element = $(app.NavigationTimingPane.NAVIGATION_TIMING_PANE_ELEMENT_ID);
    };

    app.NavigationTimingPane.prototype.setEvents = function(){
        window.addEventListener('load', this.run.bind(this));
    };

    app.NavigationTimingPane.prototype.run = function(){
        setTimeout(this.showTimings.bind(this), 0);
    };

    app.NavigationTimingPane.prototype.showTimings = function(){
        if(!window.performance.timing){
            this.element.append('<p>' + app.NavigationTimingPane.ERROR_MESSAGE + '</p>');
        } else {
            var timings = window.performance.timing;

            var start = timings.navigationStart;
            var list = $('<ul></ul>');
            for(var timing in timings){
                if((timings[timing]) !== 0){
                    list.append('<li>' + timing + ': <span class="value">' + (timings[timing] - start) + 'ms</span></li>');
                }
            }

            this.element.append(list);
        }
    };

    app.NavigationTimingPane.NAVIGATION_TIMING_PANE_ELEMENT_ID = '#navigation-timing-pane';
    app.NavigationTimingPane.ERROR_MESSAGE = 'Unfortunately Navigation Timing API is not supported by your browser';


    $(document).ready(function(){
        var scrollToNav = new app.ScrollToNavigation();
        var heroBirdAnimation = new app.BirdHeroAnimation();
        var scrollToAnimation = new app.ScrollToAnimation();
        var navigationTimingPane = new app.NavigationTimingPane();
    });










})(jQuery);