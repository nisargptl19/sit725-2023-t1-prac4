const addCards = (items) => {
    console.log(items);
    items.forEach(item => {
        // const image = item.image_link ? item.image_link : item.file_path;
        // let itemToAppend = '<div class="col s4 center-align"> <div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+ item.image +'"></img></div><div class="card-content"><span class="card-title activator">'+ item.title +'<i class="material-icons right">more_vert</i></span></div><div class="card-reveal"><span class="card-title title-text">'+item.title+'<i class="material-icons right">close</i></span><p class="card-text  left-align">'+item.description+'</p></div></div></div>';
        let itemToAppend = '<div class="col s4 center-align"> <div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+ item.image_link +'"></img></div><div class="card-content"><span class="card-title activator">'+ item.name +'<i class="material-icons right">more_vert</i></span></div><div class="card-reveal"><span class="card-title title-text">'+item.name+'<i class="material-icons right">close</i></span><p class="card-text  left-align">'+item.detail+'</p></div></div></div>';
        $('#card-section').append(itemToAppend);
    });
}

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.email = $('#email').val();
    formData.rating = $('#rate').val()
    formData.character = $('#like').val()

    console.log('form data: ', formData);
}

function getAllCharacter(){
    $.ajax({
        type: "GET",
        url: '/api/get-all-characters',
        beforeSend: function (){
            $('#call-to-marvel').css('display', 'block')
        },
        success: function (response){
            $('#call-to-marvel').css('display', 'none')
            addCards(response.data)
            console.log(response)
        },
        error: function (error){
            console.log(error)   
        }
    })
}

function addCharacterMsg(msg, type){
    if(type == 'success'){
        $('#add-msg').css('color', 'green')
    } else {
        $('#add-msg').css('color', 'red')
    }
    $('#add-msg').text(msg)
}

function removeMsg(){
    $('#add-msg').text('')
}

$(document).ready(function(){
    // Initial text
    const characterButtonText = $('#heroFormButton').html();

    $('.materialboxed').materialbox();
    $('.modal').modal();

    // Tooltip 
    $('.tooltipped').tooltip();
    
    // select
    $('select').formSelect();

    // character counter
    $('input#character_name, textarea#character_detail').characterCounter()

    // get all character from database
    getAllCharacter();

    // Character form submit
    $('#heroForm').on('submit', (event) =>{
        event.preventDefault();
        const formData = {
            'name':  $("#character_name").val(),
            'detail':  $("#character_detail").val(),
            // 'file_path':  $("#file_path").val(),
            'image_link':  $("#image").val(), 
        }

        console.log(formData)

        $.ajax({
            type: "POST",
            url: '/api/add-character',
            data: formData,
            beforeSend: function (xhr){
                $('#heroFormButton').html('<i class="material-icons left">directions_run</i> New Superhero Coming...')
                $('#heroFormButton').attr('disabled', true)
            },
            success: function (response){
                addCharacterMsg(response.message, 'success')
                window.location.reload();
                // getAllCharacter()
                // $('#heroFormButton').html(characterButtonText)
                // $('#heroFormButton').removeAttr('disabled')
            },
            error: function (error){
                console.log(error)
                addCharacterMsg(error, 'error')
                $('#heroFormButton').html(characterButtonText)
                $('#heroFormButton').removeAttr('disabled')
            }
        })
    })

    $('#formSubmit').click(()=>{
        submitForm();
    })
});

        
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems);
  });
