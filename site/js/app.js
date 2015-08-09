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

    };


    $(document).ready(function(){
        var scrollToNav = new app.ScrollToNavigation();
    });








})(jQuery);