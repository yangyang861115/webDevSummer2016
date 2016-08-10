//check off todos by clicking
$("ul").on('click', 'li', function () {
    $(this).toggleClass('completed');
});

//click on X to delete todos
$("ul").on('click', 'span', function(event){
    //stop event bubbling
    event.stopPropagation();
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    })
});

//add a new todo
$("input[type='text']").keypress(function(event){
    if(event.which === 13) {
       var todoText = $(this).val();
       $('ul').append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> " + todoText + "</li>");
       $(this).val("");
    }
});

//toggle the input box
$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
});