$( document ).ready(function() {

    if($('.page-info-carousel').length !== 0){

        alert("Hij kent het element");
        setTimeout(function() 
        {
            var height = $(".page-info-carousel").height();
            height = ((height + 80)/2)  + 'px';
            var module = document.getElementById("clamp");
            if (module !== null) {
                console.log("Element: " + module);
                $clamp(module, {clamp: height}); 
            } else {
                console.log("Elemement is empty");
            }
        }, 500);
    }
});

