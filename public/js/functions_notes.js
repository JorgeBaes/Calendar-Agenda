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
 let current_note_id_editing = ""
 function open_edit_note(note_id){
     current_note_id_editing = note_id
 
     $(`#modal-edit-note`).modal('show') 
     $(`#modal-display-note`).modal('toggle') 
     const evt_index = current_user().notes.findIndex( el => el.id == note_id)
     const note_to_be_edited = current_user().notes[evt_index]
 
     input_editor_note_name.value = note_to_be_edited.name
     input_editor_note_text.value = note_to_be_edited.text
 }
 
 function request_note_edit(){
     const evt_index = current_user().notes.findIndex( el => el.id == current_note_id_editing)
     if(evt_index != -1){
         const note_to_be_edited = current_user().notes[evt_index]
         const edited_note = {
             user_id: current_user_id, 
             id:note_to_be_edited.id,
             name:input_editor_note_name.value,
             text:input_editor_note_text.value
          }
         edit_note(note_to_be_edited,edited_note)
         $(`#modal-edit-note`).modal('toggle') 
     }
 }
 

 function edit_note(note, new_note){
   socket.emit('edit_note', {note,new_note})
 }