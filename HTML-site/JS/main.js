$(function() {
    $( "#sortable" ).sortable({opacity:0.5,
      cancel: ".ui-state-disabled",
      placeholder: "ui-state-highlight",
    });
    $( "#sortable" ).disableSelection();
    $( "#draggable1, #draggable2" ).draggable();
    $( "#droppable1, #droppable2, #droppable3, #droppable4" ).droppable({
      out: function (event, ui) {
        $( this )
          .removeClass( "ui-state-highlight" );
      },
      drop: function( event, ui ) {
        $( this )
            .addClass( "ui-state-highlight" );
      }
    });
    $("#secret").click(function(){
      alert("You Shall Not Pass!.");
    });

});
