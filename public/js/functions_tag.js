function open_create_tag(){
    $(`#modal-create-tag`).modal('show')
}



let creation_tag_name = ""
let creation_tag_color = ""
let creation_tag_text_color = ""



input_tag_color.value = "#47C2FF"
input_tag_text_color.value = "#000050"


function update_tag_creator_info(){
    creation_tag_name = input_tag_name.value
    creation_tag_color = input_tag_color.value
    creation_tag_text_color = input_tag_text_color.value

    tag_title_demo.innerText = creation_tag_name
    tag_title_demo.style.backgroundColor = creation_tag_color
    tag_title_demo.style.color = creation_tag_text_color
    tag_title_demo.style.boxShadow = `0px 0px 5px ${creation_tag_text_color}`
}

function create_tag(){
    if(input_tag_name.value != ""){
        const new_tag = {user_id: current_user_id, name:input_tag_name.value,color:input_tag_color.value,text_color:input_tag_text_color.value}
        creation_tag_name = ""
        input_tag_name.value = creation_tag_name
        tag_title_demo.innerText = creation_tag_name
        console.log(new_tag)
        socket.emit('create_tag', new_tag)
    }
}



update_tag_creator_info()



////
////DELETE
////

function delete_tag(){
    const select_to_delete_tag = document.getElementById("select-delete-tag")
    const id_to_delete = select_to_delete_tag.value
 
    if(select_to_delete_tag.selectedOptions[0] !== undefined){
       const confirmation = window.prompt('To confirm user deletion type in the tag name:') == select_to_delete_tag.selectedOptions[0].innerText
       
       if(confirmation){
          socket.emit('delete_tag_by_id', {user_id:current_user_id,id_to_delete:id_to_delete})
       }
    }
 }