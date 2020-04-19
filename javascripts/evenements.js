/*================================================== Navigation ==================================================*/


(function($) { "use strict";

    $(function() {
        var header = $(".start-style");
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 10) {
                header.removeClass('start-style').addClass("scroll-on");
            } else {
                header.removeClass("scroll-on").addClass('start-style');
            }
        });
    });

    //Animation

    $(document).ready(function() {
        $('body.hero-anime').removeClass('hero-anime');
    });

    //Menu On Hover

    $('body').on('mouseenter mouseleave','.nav-item',function(e){
        if ($(window).width() > 750) {
            var _d=$(e.target).closest('.nav-item');_d.addClass('show');
            setTimeout(function(){
                _d[_d.is(':hover')?'addClass':'removeClass']('show');
            },1);
        }
    });

    //Switch light/dark

    $("#switch").on('click', function () {
        if ($("body").hasClass("dark")) {
            $("body").removeClass("dark");
            $("#switch").removeClass("switched");
        }
        else {
            $("body").addClass("dark");
            $("#switch").addClass("switched");
        }
    });

})(jQuery);

/*================================================== Navigation ==================================================*/

const gallery = (function(){

    'use strict';

    // vars
    const gal_item = $('.gallery_item'),
        gal_img = $('.gallery_item_preview a img'),
        gal_full = $('.gallery_item_full'),
        gal_box = $('.box'),
        gal_top =  $('.gallery_top');


    return {
        // this.js(obj)
        js: function(e){return $("[data-js="+e+"]");},
        // this.lk(obj)
        lk: function(e){return $("[data-lk="+e+"]");},
        // Ready functions
        ready_: function(){this.events();},
        //  functions
        events:function(){
            const self = this;
            // add close link
            gal_full.append('<a href="#" data-js="cl" class="cl">X</a>');
            // Get all data js and add clickOn function
            const k = $('a[data-js]');
            k.each(function(i, v){
                i = i+1;
                self.clickOn(i);
            });
            // close on click
            self.js('cl').on("click",function(e){
                e.preventDefault();
                self.fx_out(gal_full);
                self.fx_out(gal_box);
            });

            // list style
            self.js('list').on("click",function(e){
                e.preventDefault();
                // toggle class
                gal_item.toggleClass('gallery_item_list');
                gal_img.toggleClass('gallery_line');


                // change icon style
                if(gal_item.hasClass('gallery_item_list')){
                    $(this).addClass('icon_list_open')
                        .html('<span>•••</span>'+
                            '<span>•••</span>'+
                            '<span>•••</span>');
                    gal_top.attr("class", "gallery_top gallery_hide_top");
                }else{
                    $(this).removeClass('icon_list_open')
                        .html('<span>• -</span>'+
                            '<span>• -</span>'+
                            '<span>• -</span>');
                    gal_top.attr("class", "gallery_top");
                }
            });
        },
        // Show on click
        clickOn: function(i){
            const self = this;
            this.js(i).on('click',function(e){
                e.preventDefault();
                self.fx_in(self.lk(i));
                self.fx_in(gal_box);
            });
        },
        // out function
        fx_out: function(el){
            el.addClass('efOut')
                .delay(500)
                .fadeOut('fast')
                .removeClass('efIn');
            // show scroll
            $('body').css({overflow:'auto'});
            return false;
        },
        // in function
        fx_in: function(el){
            el.removeClass('efOut')
                .show(200)
                .addClass('efIn');
            // hide scroll
            $('body').css({overflow:'hidden'});
            return false;
        }
    };
})();
// ready function of gallery
gallery.ready_();