 $(document).ready(function() { 
    
    $('.menu-toggle').bind('click', function () {
        $('body').toggleClass('menu-open');
    });

    $('.menu-toggle-right').bind('click', function () {
        $('body').toggleClass('menu-open-right');
    });   
     
     

});

$(document).on('click', '.add-layout-image', function () {
    var $newdiv = $('<div class="layout layout-image row">' + 
                        '<div class="remove-layout"><i class="fa fa-trash"></i></div>' + 
                        '<div class="col-xs-12"><div data-toggle="modal" data-target="#imageModal" class="image select-image"><div class="image-background"><i class="fa fa-picture-o"></i></div></div></div>' + 
                    '</div>');

    $('#project-layouts').append($newdiv);
    $('body').removeClass('menu-open');
    $('body').removeClass('menu-open-right');
});

$(document).on('click', '.add-layout-image-text', function () {
    var $newdiv = $('<div class="layout layout-image-text row">' + 
                        '<div class="remove-layout"><i class="fa fa-trash"></i></div>' + 
                        '<div class="col-xs-12 col-sm-6"><div data-toggle="modal" data-target="#imageModal" class="image select-image"><div class="image-background"><i class="fa fa-picture-o"></i></div></div></div>' + 
                        '<div class="col-xs-12 col-sm-6"><div data-toggle="modal" data-target="#textModal" class="text select-text"><div class="text-background"><i class="fa fa-align-left"></i></div></div></div>' + 
                    '</div>');

    $('#project-layouts').append($newdiv);
    $('body').removeClass('menu-open');
    $('body').removeClass('menu-open-right');
});

$(document).on('click', '.add-layout-text-image', function () {
    var $newdiv = $('<div class="layout layout-image-text row">' + 
                        '<div class="remove-layout"><i class="fa fa-trash"></i></div>' + 
                        '<div class="col-xs-12 col-sm-6"><div data-toggle="modal" data-target="#textModal" class="text select-text"><div class="text-background"><i class="fa fa-align-left"></i></div></div></div>' + 
                        '<div class="col-xs-12 col-sm-6"><div data-toggle="modal" data-target="#imageModal" class="image select-image"><div class="image-background"><i class="fa fa-picture-o"></i></div></div></div>' + 
                    '</div>');

    $('#project-layouts').append($newdiv);
    $('body').removeClass('menu-open');
    $('body').removeClass('menu-open-right');
});

$(document).on('click', '.add-layout-video', function () {
    var $newdiv = $('<div class="layout layout-video row">' + 
                        '<div class="col-xs-12"><div data-toggle="modal" data-target="#youtubeModal" class="youtube select-youtube"><div class="youtube-background"><i class="fa fa-youtube-play"></i></div></div></div>' +
                    '</div>');

    $('#project-layouts').append($newdiv);
    $('body').removeClass('menu-open');
    $('body').removeClass('menu-open-right');
});

/**
 * @todo Remove images if layout is removed
 */
$(document).on('click', '.remove-youtube', function () {
    $(this).parent().parent().parent().parent().remove();
});

$(document).on('click', '.remove-layout', function () {
    $(this).parent().remove(); 
});

$(document).on('click', '.select-image', function () {
    $('.update-to-picture').removeAttr('id');
    $(this).addClass('update-to-picture'); 
    $(this).attr('id', 'update-to-picture');
});

$(document).on('click', '.select-text', function () {
    $('.update-to-text').removeAttr('id');
    $(this).addClass('update-to-text');
    $(this).attr('id', 'update-to-text');

    $('#update-to-text .text-background').remove();
    $('#edit').editable('setHTML', $('#update-to-text').html(), false);
});

$(document).on('click', '.select-youtube', function () {
    $('.update-to-youtube').removeAttr('id');
    $(this).parent().addClass('update-to-youtube');
    $(this).parent().attr('id', 'update-to-youtube');
}); 

$(document).on('click', '#vote', function () {
    if ($.cookie('votecookie') == undefined) {
        $.cookie('votecookie', 'voted', { 
            expires: 14,
            path: '/'
        });

        $.ajax({
            type: "POST",
            url: '/api/projects/votes/' + $('#vote').data('id'),
            dataType: "json",
            data: {}
        });
    }
})


