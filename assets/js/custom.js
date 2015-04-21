////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mapStyles = [ {"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"on"},{"lightness":10}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":50}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]}, {featureType:'road.highway',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-92},{lightness:60},{visibility:'on'}]}, {featureType:'landscape.natural',elementType:'all',stylers:[{hue:'#c8c6c3'},{saturation:-71},{lightness:-18},{visibility:'on'}]},  {featureType:'poi',elementType:'all',stylers:[{hue:'#d9d5cd'},{saturation:-70},{lightness:20},{visibility:'on'}]} ];

var $ = jQuery.noConflict();

$(document).ready(function($) {
    "use strict";

    if( $('body').hasClass('navigation-fixed') ){
        $('.off-canvas-navigation').css( 'top', - $('.header').height() );
        $('#page-canvas').css( 'margin-top',$('.header').height() );
    }

    // rating();

    // setInputsWidth();

    adaptBackgroundHeight();

    $('.quick-view, .results .item').on('click',  function(){
        var id = $(this).attr('id');
        quickView(id);
        return false;
    });

    // Scrollbar on "Results" section

    // if( $('.items-list').length > 0 ){
    //     $(".items-list").mCustomScrollbar({
    //         mouseWheel:{ scrollAmount: 350 }
    //     });
    // }

    // Bootstrap tooltip

    // $(function () {
    //     $('[data-toggle="tooltip"]').tooltip()
    // });
    // $('.off-canvas-navigation header').css( 'line-height', $('.header').height() + 'px' );

    // Date & Time picker

    // if( $('.input-group.date').length > 0 ){
    //     $('.input-group.date').datepicker({ });
    // }
    // if( $('.input-daterange').length > 0 ){
    //     $('.input-daterange').datepicker({
    //         todayHighlight: true
    //     });
    // }

//  Bootstrap Select ---------------------------------------------------------------------------------------------------

    // var select = $('select');
    // if (select.length > 0 ){
    //     select.selectpicker();
    // }
    // var bootstrapSelect = $('.bootstrap-select');
    // var dropDownMenu = $('.dropdown-menu');
    // bootstrapSelect.on('shown.bs.dropdown', function () {
    //     dropDownMenu.removeClass('animation-fade-out');
    //     dropDownMenu.addClass('animation-fade-in');
    // });
    // bootstrapSelect.on('hide.bs.dropdown', function () {
    //     dropDownMenu.removeClass('animation-fade-in');
    //     dropDownMenu.addClass('animation-fade-out');
    // });
    // bootstrapSelect.on('hidden.bs.dropdown', function () {
    //     var _this = $(this);
    //     $(_this).addClass('open');
    //     setTimeout(function() {
    //         $(_this).removeClass('open');
    //     }, 100);
    // });

//  Expand content on click --------------------------------------------------------------------------------------------

    $('.expand-content').on('click',  function(e){
        e.preventDefault();
        var children = $(this).attr('data-expand');
        var parentHeight = $(this).closest('.expandable-content').height();
        var contentSize = $( children + ' .content' ).height();
        $( children ).toggleClass('collapsed');
        $( this ).toggleClass('active');
        $( children ).css( 'height' , contentSize );
        if( !$( children).hasClass('collapsed') ){
            setTimeout(function() {
                $( children ).css('overflow', 'visible');
            }, 400);
        }
        else {
            $( children ).css('overflow', 'hidden');
        }
        $('.has-child').live('click',  function(e){
            var parent = $(this).closest('.expandable-content');
            var childHeight = $( $(this).attr('data-expand') + ' .content').height();
            if( $(this).hasClass('active') ){
                $(parent).height( parent.height() + childHeight )
            }
            else {
                $(parent).height(parentHeight);
            }
        });
    });

// Set width for inputs in horizontal search bar -----------------------------------------------------------------------

    // $( "#redefine-search-form" ).load( "assets/external/_search-bar.html", function() {
    //     setInputsWidth();
    //     //autoComplete();
    // });

//    if( $('#location').length ){
//        autoComplete();
//    }

// Keyboard Shortcuts --------------------------------------------------------------------------------------------------

    $(document).bind('keypress', 'F', function(){
        $('.redefine-search .expand-content').trigger('click');
        if( !$('.search-bar').hasClass('collapsed') ){
            setTimeout(function() {
                $('.search-bar input').first().focus();
            }, 200);
        }
        return false;
    });

    $(document).bind('keypress', 'M', function(){
        $('.header .toggle-navigation').trigger('click');
        return false;
    });

    $(document).bind('keypress', '+', function(){
        $('.header .submit-item').trigger('click');
        return false;
    });

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                $('.item-slider').trigger('prev.owl.carousel');
                break;
            case 39: // right
                $('.item-slider').trigger('next.owl.carousel');
                break;
            case 27: // ESC
                $('.modal-background').trigger('click');
                break;
        }
    });

//  Smooth Navigation Scrolling ----------------------------------------------------------------------------------------

    $('.navigation .nav a[href^="#"], a[href^="#"].roll').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        if ($(window).width() > 768) {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - $('.navigation').height()
            }, 2000)
        } else {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 2000)
        }
        return false;
    });

//  iCheck -------------------------------------------------------------------------------------------------------------

    // if ($('.checkbox').length > 0) {
    //     $('input').iCheck();
    // }

    // if ($('.radio').length > 0) {
    //     $('input').iCheck();
    // }

    $('body').addClass('page-fade-in');

    // $('a').on('click', function (e) {
    //     var attr = $(this).attr('href');
    //     //alert( $(this).attr('href') );
    //     if ( attr.indexOf('#') != 0 ) {
    //         e.preventDefault();
    //         var goTo = this.getAttribute("href");
    //         $('body').removeClass('page-fade-in');
    //         $('body').addClass('page-fade-out');
    //         setTimeout(function(){
    //             window.location = goTo;
    //         },200);
    //     }
    //     else if ( $(this).attr('href') == '#' ) {
    //         e.preventDefault();
    //     }
    // });

//  Dropzone -----------------------------------------------------------------------------------------------------------

    // if( $('.dropzone').length > 0 ) {
    //     Dropzone.autoDiscover = false;
    //     $("#file-submit").dropzone({
    //         url: "upload",
    //         addRemoveLinks: true
    //     });

    //     $("#profile-picture").dropzone({
    //         url: "upload",
    //         addRemoveLinks: true
    //     });
    // }

//  Timepicker ---------------------------------------------------------------------------------------------------------

    // if( $('.oh-timepicker').length > 0 ) {
    //     $('.oh-timepicker').timepicker();
    // }

    // $('.item .quick-view').on('click',function (e) {
    //     e.preventDefault();
    // });

//  Items scripts ------------------------------------------------------------------------------------------------------

    $('.item.admin-view .hide-item').on('click',function (e) {
        $(this).closest('.item').toggleClass('is-hidden');
    });

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).load(function(){
    var $equalHeight = $('.equal-height');
    for( var i=0; i<$equalHeight.length; i++ ){
        equalHeight( $equalHeight );
    }
});

$(window).resize(function(){
    adaptBackgroundHeight();
    var $equalHeight = $('.equal-height');
    for( var i=0; i<$equalHeight.length; i++ ){
        equalHeight( $equalHeight );
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Owl Carousel in Modal Window ----------------------------------------------------------------------------------------

// function drawOwlCarousel(_rtl){
//     $.getScript( "assets/js/owl.carousel.min.js", function( data, textStatus, jqxhr ) {
//         $(".image .gallery").owlCarousel({
//             rtl: _rtl,
//             items: 1,
//             nav: true,
//             navText: ["",""],
//             responsiveBaseElement: ".image"
//         });
//     });
// }

// function lazyLoad(selector){
//     selector.load(function() {
//         $(this).parent().removeClass('loading');
//     });
// }

//  Equal heights ------------------------------------------------------------------------------------------------------

// function equalHeight(container){
//     var currentTallest = 0,
//         currentRowStart = 0,
//         rowDivs = new Array(),
//         $el,
//         topPosition = 0;

//     $(container).find('.item, .price-box').each(function() {
//         $el = $(this);
//         $($el).height('auto');
//         topPostion = $el.position().top;
//         if (currentRowStart != topPostion) {
//             for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
//                 rowDivs[currentDiv].height(currentTallest);
//             }
//             rowDivs.length = 0; // empty the array
//             currentRowStart = topPostion;
//             currentTallest = $el.height();
//             rowDivs.push($el);
//         } else {
//             rowDivs.push($el);
//             currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
//         }
//         for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
//             rowDivs[currentDiv].height(currentTallest);
//         }
//     });
// }

// Initialize Owl carousel ---------------------------------------------------------------------------------------------

// function initializeOwl(_rtl){
//     $.getScript( "assets/js/owl.carousel.min.js", function( data, textStatus, jqxhr ) {
//         if ($('.owl-carousel').length > 0) {
//             if ($('.carousel-full-width').length > 0) {
//                 setCarouselWidth();
//             }
//             $(".carousel.wide").owlCarousel({
//                 rtl: _rtl,
//                 items: 1,
//                 responsiveBaseWidth: ".slide",
//                 nav: true,
//                 navText: ["",""]
//             });
//             $(".item-slider").owlCarousel({
//                 rtl: _rtl,
//                 items: 1,
//                 autoHeight: true,
//                 responsiveBaseWidth: ".slide",
//                 nav: false,
//                 callbacks: true,
//                 URLhashListener: true,
//                 navText: ["",""]
//             });
//             $(".list-slider").owlCarousel({
//                 rtl: _rtl,
//                 items: 1,
//                 responsiveBaseWidth: ".slide",
//                 nav: true,
//                 navText: ["",""]
//             });
//             $(".testimonials").owlCarousel({
//                 rtl: _rtl,
//                 items: 1,
//                 responsiveBaseWidth: "blockquote",
//                 nav: true,
//                 navText: ["",""]
//             });

//             $('.item-gallery .thumbnails a').on('click', function(){
//                 $('.item-gallery .thumbnails a').each(function(){
//                     $(this).removeClass('active');
//                 });
//                 $(this).addClass('active');
//             });
//             $('.item-slider').on('translated.owl.carousel', function(event) {
//                 var thumbnailNumber = $('.item-slider .owl-item.active img').attr('data-hash');
//                 $( '.item-gallery .thumbnails #thumbnail-' + thumbnailNumber ).trigger('click');
//             });
//             return false;
//         }
//     });
// }

// Specific data for each item -----------------------------------------------------------------------------------------

function drawItemSpecific(category, json, a){
    var itemSpecific = '';
    if( category ){
        if( category == 'real_estate' ){
            if( json.data[a].item_specific ){
                if( json.data[a].item_specific.bedrooms ){
                    itemSpecific += '<span title="Bedrooms"><img src="assets/img/bedrooms.png">' + json.data[a].item_specific.bedrooms + '</span>';
                }
                if( json.data[a].item_specific.bathrooms ){
                    itemSpecific += '<span title="Bathrooms"><img src="assets/img/bathrooms.png">' + json.data[a].item_specific.bathrooms + '</span>';
                }
                if( json.data[a].item_specific.area ){
                    itemSpecific += '<span title="Area"><img src="assets/img/area.png">' + json.data[a].item_specific.area + '<sup>2</sup></span>';
                }
                if( json.data[a].item_specific.garages ){
                    itemSpecific += '<span title="Garages"><img src="assets/img/garages.png">' + json.data[a].item_specific.garages + '</span>';
                }
                return itemSpecific;
            }
        }
        else if ( category == 'bar_restaurant' ){
            if( json.data[a].item_specific ){
                if( json.data[a].item_specific.menu ){
                    itemSpecific += '<span>Menu from: ' + json.data[a].item_specific.menu + '</span>';
                }
                return itemSpecific;
            }
            return itemSpecific;
        }
    }
    else {
        return '';
    }
    return '';
}

// Quick View ----------------------------------------------------------------------------------------------------------

function quickView(id){
    $.ajax({
        type: 'POST',
        url: 'assets/external/_modal.html',
        data: id,
        success: function (data) {
            // Create HTML element with loaded data
            $('body').append(data);
        }
    });
}

// Adapt background height to block element ----------------------------------------------------------------------------

function adaptBackgroundHeight(){
    $('.background').each(function(){
        if( $(this).children('img').height() < $(this).height() ){
            //$(this).children('img').css('right', ( $(this).children('img').width()/2 -  $(window).width())/2 );
            $(this).children('img').css('width', 'auto');
            $(this).children('img').css('height', '100%');
        }
    });



}
