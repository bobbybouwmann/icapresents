$( document ).ready(function() {
    window.viewportWidth = $(window).width() + ( $(window).width() / 4 );
    window.reverse = viewportWidth * - 1;
    
    check_next_slide();

    setTimeout(function() {
        window.get_amount_of_projects = $( '#get-value' ).attr('value');
        check_amount_projects();
        // amount_of_pages();
    }, 500);
});

function check_amount_projects () {
    if (get_amount_of_projects <= 6) {
        $( '#controles' ).css("visibility", "hidden");
    } else {
        console.log("I have a value off: " + get_amount_of_projects);
    }
}

    // System to load the projects dynamicly, only angular goes before js..

// function amount_of_pages () {
//     var amount_of_projects_per_page = 6;
//     var amount_of_pages = Math.ceil(get_amount_of_projects / amount_of_projects_per_page);
//     var place = document.getElementById("place_pages");

//     for (var i = 1; i <= amount_of_pages; i++) {
//         // Build container
//         var containerdiv = document.createElement("div");
//             containerdiv.classList.add("slide-student");

//             // Build inner container with the ng-repeat
//             var container_ng_repeat = document.createElement("div");
//                 container_ng_repeat.setAttribute("ng-repeat", "project in projects | filter:search track by $index");
//             // add the inner container to outer container as child page
//             containerdiv.appendChild(container_ng_repeat);

//                 // Create container that styles the bootstrap element.
//                 var bootstrap_container = document.createElement("div");
//                     bootstrap_container.classList.add("col-xs-12", "col-md-4");
//                     bootstrap_container.setAttribute("ng-show", "$index >= 0 && $index < 6");
//                 // add bootstrap style container to the ng repeat container.
//                 container_ng_repeat.appendChild(bootstrap_container);

//                     var link_block = document.createElement("a");
//                         link_block.href = "/project/{{project._id}}";
//                     bootstrap_container.appendChild(link_block);

//                         var block_background_image = document.createElement("div");
//                             block_background_image.classList.add("unplaced");
//                             block_background_image.style.cssText = "background: url({{ project.banner }}) center center no-repeat; background-size:cover;"
//                         link_block.appendChild(block_background_image);

//                             var page_info = document.createElement("div");
//                                 page_info.classList.add("page-info");
//                             block_background_image.appendChild(page_info);

//                                 var page_info_title = document.createElement("h3");
//                                 var page_info_title_node = document.createTextNode("{{ project.title }}");
//                                 page_info_title.appendChild(page_info_title_node);
//                                 page_info.appendChild(page_info_title);

//                                 var page_info_description = document.createElement("p");
//                                 var page_info_description_node = document.createTextNode("{{ project.votes }}");
//                                     page_info_description.classList.add("visibility-of-votes");
//                                 page_info_description.appendChild(page_info_description_node);
//                                 page_info.appendChild(page_info_description);

//         place.appendChild(containerdiv);

//         if (i === 1) {
            
//         }
//         if (i === amount_of_pages ) {

//         } 
//     };

// }

function clicked (side) {
    var check_side = side;

    if(check_side === "left") {
        check_amount_projects();
        $( '.slide-student:nth-child(2)' ).css({left: 0});
        $( '.slide-student:nth-child(3)' ).css({left: viewportWidth});
    } else if (check_side === "right") {
        if (get_amount_of_projects > 6) {
            check_amount_projects();
            $( '.slide-student:nth-child(2)' ).css({left: reverse});
            $( '.slide-student:nth-child(3)' ).css({left: 0});
        } else {

        }
    } else {
        console.log(check_side + ' is not a valid side!');
    }
}

function check_next_slide () {
    var first_left_pos = get_style_value('left', '.slide-student:nth-child(2)');
    var last_right_pos = get_style_value('left', '.slide-student:last-child');
    if(first_left_pos === "0px") {
        $( '#left-student-slide' ).css('visibility', 'hidden');
        console.log('First value is 0: ' + first_left_pos);
    } else {
        console.log('First value is not 0 the value is: ' + first_left_pos);
    }

    if(last_right_pos === "0px") {
        $( '#left-student-slide' ).css('visibility', 'visible');
        console.log('Last value is 0: ' + last_right_pos);
    } else {
        console.log('Last value is not 0 the value is: ' + last_right_pos);
    }
}

function get_style_value(style, selector, sheet) {
    var sheets = typeof sheet !== 'undefined' ? [sheet] : document.styleSheets;
    for (var i = 0, l = sheets.length; i < l; i++) {
        var sheet = sheets[i];
        if( !sheet.cssRules ) { continue; }
        for (var j = 0, k = sheet.cssRules.length; j < k; j++) {
            var rule = sheet.cssRules[j];
            if (rule.selectorText && rule.selectorText.split(',').indexOf(selector) !== -1) {
                return rule.style[style];
            }
        }
    }
    return null;
}


function slide_to_first() {
    $( '.slide-student:nth-child(2)' ).css({left: 0});
    $( '.slide-student:nth-child(3)' ).css({left: viewportWidth});
}

function force_reload() {
    location.reload();
}
