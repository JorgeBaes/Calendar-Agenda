let creation_user_name = ""
let creation_user_color = ""
let creation_user_text_color = ""



input_user_color.value = "#FFC7F5"
input_user_text_color.value = "#000060"


function update_user_creator_info(){
    creation_user_name = input_user_name.value
    creation_user_color = input_user_color.value
    creation_user_text_color = input_user_text_color.value

    user_title_demo.innerText = creation_user_name
    user_title_demo.style.backgroundColor = creation_user_color
    user_title_demo.style.color = creation_user_text_color
    user_title_demo.style.boxShadow = `0px 0px 5px ${creation_user_text_color}`
}

function create_user(){
    if(input_user_name.value != ""){
        const new_user = {name:input_user_name.value,color:input_user_color.value,text_color:input_user_text_color.value}
        creation_user_name = ""
        input_user_name.value = creation_user_name
        user_title_demo.innerText = creation_user_name
        $(`#modal-create-user`).modal('toggle')   
        socket.emit('create_user', new_user)
    }
}

function open_user_creator(){
    $(`#modal-create-user`).modal('show')   
    input_user_name.value = ""
    user_title_demo.innerText = ""
}

update_user_creator_info()



/////
////DELETE
////

function delete_user(){
    const select_to_delete_users = document.getElementById("select-delete-user")
    const id_to_delete = select_to_delete_users.value
 
    if(select_to_delete_users.selectedOptions[0] !== undefined){
       const confirmation = window.prompt('To confirm user deletion type in the user name:') == select_to_delete_users.selectedOptions[0].innerText
       
       if(confirmation){
          socket.emit('delete_user_by_id', id_to_delete)
          $(`#modal-create-user`).modal('toggle')  
       }
    }
 }