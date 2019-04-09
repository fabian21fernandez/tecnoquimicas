// $(window).ready(function(){
// 	$('aside').css('height', $(window).height());
// })


$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
	
	
	/*
    var isSyncingLeftScroll = false;
    var isSyncingRightScroll = false;
    var leftDiv = document.querySelector('.one-tab');
    var rightDiv = document.querySelector('.two-tab');

    if(leftDiv && rightDiv){
        leftDiv.onscroll = function() {
        if (!isSyncingLeftScroll) {
        isSyncingRightScroll = true;
        rightDiv.scrollLeft = this.scrollLeft;
      }
      isSyncingLeftScroll = false;
    }

    rightDiv.onscroll = function() {
        if (!isSyncingRightScroll) {
        isSyncingLeftScroll = true;
        leftDiv.scrollLeft = this.scrollLeft;
      }
      isSyncingRightScroll = false;
    }
    }
	*/

$('.arrow-options').on('click', function(e){
   var $containerOption = $(this).next('.container-options');
  e.preventDefault();
  e.stopPropagation();
  $containerOption.show();
})

$('.container-options').on('mouseleave', function(e){
    
    $('.container-options').hide();
    })

    /*Toggle FullScreen*/
$('#fullscreen-toggler')
    .on('click', function (e) {
        var element = document.documentElement;
        if (!$('body')
            .hasClass("full-screen")) {

            $('body')
                .addClass("full-screen");
            $('#fullscreen-toggler')
                .addClass("active");
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }

        } else {

            $('body')
                .removeClass("full-screen");
            $('#fullscreen-toggler')
                .removeClass("active");

            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }

        }
    });

    //Sidebar Toggler
    $(".sidebar-toggler").on('click', function () {
        $("#sidebar").toggleClass("hide");
        $("#sidebar-toggler").toggleClass("hide");
        return false;
    });

    //Sidebar Toggler
    $(".sidebar-collapse").on('click', function () {
        $("#sidebar-toggler").toggleClass("hide");
        return false;
    });

    //Sidebar Collapse
    var b = $("#sidebar").hasClass("menu-compact");
    $("#sidebar-collapse").on('click', function () {
        if (!$('#sidebar').is(':visible'))
            $("#sidebar").toggleClass("hide");
        $("#sidebar").toggleClass("menu-compact");
        $(".sidebar-collapse").toggleClass("active");
        b = $("#sidebar").hasClass("menu-compact");

        if ($(".sidebar-menu").closest("div").hasClass("slimScrollDiv")) {
            $(".sidebar-menu").slimScroll({ destroy: true });
            $(".sidebar-menu").attr('style', '');
        }
        if (b) {
            $(".open > .submenu")
                .removeClass("open");
        } else {
            if ($('.page-sidebar').hasClass('sidebar-fixed')) {
                var position = (readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html") ? 'right' : 'left';
                $('.sidebar-menu').slimscroll({
                    height: 'auto',
                    position: position,
                    size: '3px',
                    color: themeprimary
                });
            }
        }
        //Slim Scroll Handle



    });
    //End Sidebar Collapse


    //Sidebar Menu Handle
    $(".sidebar-menu").on('click', function (e) {
        var menuLink = $(e.target).closest("a");
        if (!menuLink || menuLink.length == 0)
            return;
        if (!menuLink.hasClass("menu-dropdown")) {
            if (b && menuLink.get(0).parentNode.parentNode == this) {
                var menuText = menuLink.find(".menu-text").get(0);
                if (e.target != menuText && !$.contains(menuText, e.target)) {
                    return false;
                }
            }
            return;
        }
        var submenu = menuLink.next().get(0);
        if (!$(submenu).is(":visible")) {
            var c = $(submenu.parentNode).closest("ul");
            if (b && c.hasClass("sidebar-menu"))
                return;
            c.find("> .open > .submenu")
                .each(function () {
                    if (this != submenu && !$(this.parentNode).hasClass("active"))
                        $(this).slideUp(200).parent().removeClass("open");
                });
        }
        if (b && $(submenu.parentNode.parentNode).hasClass("sidebar-menu"))
            return false;
        $(submenu).slideToggle(200).parent().toggleClass("open");
        return false;
    });
    //End Sidebar Menu Handle
});

function sticky_relocate() {
    var window_top = $(window).scrollTop();
    if($('#sticky-anchor').length ){
        var div_top = $('#sticky-anchor').offset().top;
            if (window_top > div_top) {
            $('#sticky').addClass('stick');
            $('#sticky-anchor').height($('#sticky').outerHeight());
        } else {
            $('#sticky').removeClass('stick');
            $('#sticky-anchor').height(0);
        }
    }
}

$(function() {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
});


///funcion para la sincronizacion del scroll en las tablas
var scrollItems = [];
var isSyncingScroll = false;

function syncScroll(div){
	scrollItems.push(div);
	
	div.onscroll = function() {
		if(isSyncingScroll) return;
		isSyncingScroll = true;
		var scrollPosition = div.scrollLeft;
		for (i = 0; i < scrollItems.length; i++) {
			scrollItems[i].scrollLeft = scrollPosition;
		}
		isSyncingScroll = false;
	}
}