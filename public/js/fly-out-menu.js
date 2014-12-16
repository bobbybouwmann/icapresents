 $(document).ready(function() { 
    
    $('.menu-toggle').bind('click', function () {
        $('body').toggleClass('menu-open');
    });

    $('.menu-toggle-right').bind('click', function () {
        $('body').toggleClass('menu-open-right');
    });

    $('.add-layout-image').click(function () {
        var $newdiv = $('<div class="layout layout-image row"><div class="remove-layout"><i class="fa fa-times"></i></div><img src="http://lorempixel.com/800/250"></div>');

        $('#project-layouts').append($newdiv);
        $('body').removeClass('menu-open');
        $('body').removeClass('menu-open-right');
    });

    $('.add-layout-image-text').click(function () {
        var $newdiv = $('<div class="layout layout-image-text row"><div class="remove-layout"><i class="fa fa-times"></i></div><div class="image col-xs-12 col-sm-6"><img src="http://lorempixel.com/400/250"></div><div class="text col-xs-12-col-sm-6"><h2>Lorem Pixel</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, quae rerum, recusandae fugit incidunt odit vitae non aliquid doloribus sequi pariatur sapiente, ipsa aspernatur unde aperiam quis culpa porro consequatur.</p></div></div>');

        $('#project-layouts').append($newdiv);
        $('body').removeClass('menu-open');
        $('body').removeClass('menu-open-right');
    });

    $('.add-layout-text-image').click(function () {
        var $newdiv = $('<div class="layout layout-text-image row"><div class="remove-layout"><i class="fa fa-times"></i></div><div class="text col-xs-12 col-sm-6"><h2>Lorem Pixel</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, quae rerum, recusandae fugit incidunt odit vitae non aliquid doloribus sequi pariatur sapiente, ipsa aspernatur unde aperiam quis culpa porro consequatur.</p></div><div class="image col-xs-12 col-sm-6"><img src="http://lorempixel.com/400/250"></div></div>');

        $('#project-layouts').append($newdiv);
        $('body').removeClass('menu-open');
        $('body').removeClass('menu-open-right');
    });

    $('.add-layout-video').click(function () {
        var $newdiv = $('<div class="layout layout-video row"><div class="remove-layout"><i class="fa fa-times"></i></div><div class="embed-container"><iframe src="http://www.youtube.com/embed/WmVXJ3hQrPo" frameborder="0" allowfullscreen></iframe></div></div>');

        $('#project-layouts').append($newdiv);
        $('body').removeClass('menu-open');
        $('body').removeClass('menu-open-right');
    });

});

$(document).on('click', '.remove-layout', function () {
    $(this).parent().remove();
});

$('#colorSelector').ColorPicker({
    color: '#0000ff',
    onShow: function (colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function (colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function (hsb, hex, rgb) {
        $('#colorSelector div').css('backgroundColor', '#' + hex);
    }
});
