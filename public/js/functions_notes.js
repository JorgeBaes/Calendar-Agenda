let creation_note_name = ""
let creation_note_text = ""


function update_note_creator_info(){
    creation_note_name = input_note_name.value
    creation_note_text = input_note_text.value
}

function create_note(){
    if(input_note_name.value != ""){
        const new_note = {
           user_id: current_user_id, 
           name:creation_note_name,
           text:creation_note_text
        }
        creation_note_name = ""
        input_note_name.value = creation_note_name
        socket.emit('create_note', new_note)
        $(`#modal-create-note`).modal('toggle')
    }else{
       window.alert("Note name required")
    }
}


function open_create_note(){
    $(`#modal-create-note`).modal('show')
    input_note_name.value = ""
    input_note_text.value = ""
}

////
////DELETE
////
function request_to_delete_note(user_id,note_id){
    const _user = users[users.findIndex( el => el.id == user_id)]
    const _note = _user.notes[_user.notes.findIndex( el => el.id == note_id)]
    delete_note(_note)
}

function delete_note(note){
    const confirmation = window.confirm("Confirm deletion:")
    if(confirmation){
       socket.emit('delete_note_by_id', note)
    }
 }


 
 /////
 ////EDIT
 /////


 function edit_note(note, new_note){
   socket.emit('edit_note', {note,new_note})
 }