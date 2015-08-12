!function(){var o={};o.ScrollToHelper={},o.ScrollToHelper.scrollTo=function(o){if(o){var t=$(o).offset().top;if(t)return $("html,body").velocity("scroll",{duration:200,offset:t}).promise()}},o.ScrollToNavigation=function(){this.setEvents()},o.ScrollToNavigation.prototype.setEvents=function(){$("."+o.ScrollToNavigation.SCROLL_TO_NAV_CLASS).on("click",this.scrollToElement.bind(this))},o.ScrollToNavigation.prototype.scrollToElement=function(t){t.preventDefault();var i=$(t.target).attr("href");o.ScrollToHelper.scrollTo(i),o.ScrollToHelper.scrollTo(i)},o.ScrollToNavigation.SCROLL_TO_NAV_CLASS="nav-scrollto",o.ScrollToAnimation=function(){this.setup()},o.ScrollToAnimation.prototype.setup=function(){var t=$(o.ScrollToAnimation.SCROLL_TO_SELECTOR);this.scrollToController=new ScrollMagic.Controller,this.scrollToScenes=[],console.log(t);var i=this;t.each(function(){i.setupScrollToScene($(this))})},o.ScrollToAnimation.prototype.setupScrollToScene=function(t){var i=new ScrollMagic.Scene({triggerElement:"#"+t.attr("id"),logLevel:2,reverse:!1}).setVelocity("#"+t.attr("id")+" "+o.ScrollToAnimation.ELEMENT_TO_ANIMATE,"slideDown",{duration:500,easing:[100,10]}).addTo(this.scrollToController);this.scrollToScenes.push(i)},o.ScrollToAnimation.SCROLL_TO_SELECTOR=".scroll-to-scene",o.ScrollToAnimation.ELEMENT_TO_ANIMATE=".scroll-to-animate-element",o.BirdHeroAnimation=function(){this.setup(),this.run()},o.BirdHeroAnimation.prototype.setup=function(){this.birdHeroElement=$(o.BirdHeroAnimation.HERO_ID)},o.BirdHeroAnimation.prototype.run=function(){this.birdHeroElement.velocity({left:0},{duration:1e3,easing:[100,10],complete:this.markAsAnimated.bind(this)})},o.BirdHeroAnimation.prototype.markAsAnimated=function(t){$(t[0]).removeClass(o.BirdHeroAnimation.NOT_ANIMATED_CLASS.replace(".",""))},o.BirdHeroAnimation.HERO_ID="#bird-hero",o.BirdHeroAnimation.NOT_ANIMATED_CLASS=".not-animated",$(document).ready(function(){new o.ScrollToNavigation,new o.BirdHeroAnimation,new o.ScrollToAnimation})}(jQuery);