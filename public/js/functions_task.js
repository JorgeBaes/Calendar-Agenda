function open_create_task(tag_id){
    current_tag_id = tag_id

    const tag_index = current_user().tags.findIndex( el => el.id == tag_id)
    const tag = current_user().tags[tag_index]

    
    $(`#modal-create-task`).modal('show')
    tag_title_to_create_task.innerText = tag.name

    create_task_header.style.backgroundColor = tag.color+"80"
    create_task_header.style.color = tag.text_color
    
    modal_create_task.style.backgroundColor = tag.color+"60"
    create_task_body.style.backgroundColor = tag.color+"30"
    create_task_body.style.color = tag.text_color

    input_task_name.value = ""
    input_task_date.valueAsDate = new Date()
    input_task_text.value = ""
}





let creation_task_name = ""
let creation_task_date = new Date()
let creation_task_text = ""

input_task_date.valueAsDate = new Date()

function update_task_creator_info(){
    creation_task_name = input_task_name.value
    creation_task_date = new Date(input_task_date.value)
    creation_task_text = input_task_text.value
}

function create_task(){
    if(input_task_name.value != ""){
        const new_task = {
           user_id: current_user_id, 
           tag_id: current_tag_id, 
           name:creation_task_name,
           date:creation_task_date,
           text:creation_task_text
        }

        creation_task_name = ""
        input_task_name.value = creation_task_name
        $(`#modal-create-task`).modal('toggle')

        socket.emit('create_task', new_task)
    }else{
       window.alert("Task name required")
    }
}


////
////DELETE
////

function request_delete_task(user_id,tag_id,task_id){
    const _user = users[users.findIndex( el => el.id == user_id)]
    const _tag = _user.tags[_user.tags.findIndex( el => el.id == tag_id)]
    const _task = _tag.tasks[_tag.tasks.findIndex( el => el.id == task_id)]

    delete_task(_task)
}
function delete_task(task){
    const confirmation = window.confirm("Confirm deletion:")

    if(confirmation){
       socket.emit('delete_task_by_id', task)
       $(`#modal-display-task`).modal('toggle')
    }
 }



////
////EDIT
////





let current_task_id_editing = {user_id:"",tag_id:"",task_id:""}
function open_task_editor(user_id,tag_id,task_id){
    current_task_id_editing.user_id = user_id
    current_task_id_editing.tag_id = tag_id
    current_task_id_editing.task_id = task_id

    $(`#modal-edit-task`).modal('show') 
    $(`#modal-display-task`).modal('toggle') 
    const _user = users[users.findIndex( el => el.id == user_id)]
    const _tag = _user.tags[_user.tags.findIndex( el => el.id == tag_id)]
    const _task = _tag.tasks[_tag.tasks.findIndex( el => el.id == task_id)]

    input_editor_task_name.value = _task.name
    input_editor_task_date.valueAsDate = new Date(_task.date)
    input_editor_task_text.value = _task.text

}
function request_task_edit(){
    const _user = users[users.findIndex( el => el.id == current_task_id_editing.user_id)]
    const _tag = _user.tags[_user.tags.findIndex( el => el.id == current_task_id_editing.tag_id)]
    const _task = _tag.tasks[_tag.tasks.findIndex( el => el.id == current_task_id_editing.task_id)]
    if(input_editor_task_name.value!= ""){
        const edited_task= {
            user_id: _user.id, 
            tag_id:_tag.id,
            id:_task.id,
            name:input_editor_task_name.value,
            date:new Date(input_editor_task_date.value),
            text:input_editor_task_text.value
         }
         edit_task(_task,edited_task)
        $(`#modal-edit-task`).modal('toggle') 
    }else{
        window.confirm("Task name required")
    }
}
function edit_task(task, new_task){
    socket.emit('edit_task', {task,new_task})
}



////
////DISPLAY
////

function open_task_display(user_id,tag_id,task_id){
    const _user = users[users.findIndex( el => el.id == user_id)]
    const _tag = _user.tags[_user.tags.findIndex( el => el.id == tag_id)]
    const _task = _tag.tasks[_tag.tasks.findIndex( el => el.id == task_id)]
    // console.log(_user,_tag,_task)
    $(`#modal-display-task`).modal('show')
    display_task_title.innerText = _task.name
    display_task_text.innerText = _task.text
    display_task_date.innerText = convert_date_to_string(_task.date)

    document.getElementById("display-task-editor-spot").innerHTML = 
    `
    <span onclick="open_task_editor('${user_id}','${tag_id}','${task_id}')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="svg-animate pointer editor-svg" height="35px" width="35px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.873 477.873" style="enable-background:new 0 0 477.873 477.873; margin-right:-7px" xml:space="preserve">
        <title>Editar</title>
        <g>
            <g>
                <path d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2    c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067    S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2    c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"/>
            </g>
        </g>
        <g>
            <g>
                <path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937    c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585    c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13    l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z"/>
            </g>
        </g><g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
        </svg>
    </span>
    `
    document.getElementById("display-task-delete-spot").innerHTML =
    `
    <span onclick="request_delete_task('${user_id}','${tag_id}','${task_id}')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="svg-animate pointer garbage-svg" height="35px" width="35px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <title>Deletar</title>
        <g>
            <g>
                <path d="M436,60h-90V45c0-24.813-20.187-45-45-45h-90c-24.813,0-45,20.187-45,45v15H76c-24.813,0-45,20.187-45,45v30    c0,8.284,6.716,15,15,15h16.183L88.57,470.945c0.003,0.043,0.007,0.086,0.011,0.129C90.703,494.406,109.97,512,133.396,512    h245.207c23.427,0,42.693-17.594,44.815-40.926c0.004-0.043,0.008-0.086,0.011-0.129L449.817,150H466c8.284,0,15-6.716,15-15v-30    C481,80.187,460.813,60,436,60z M196,45c0-8.271,6.729-15,15-15h90c8.271,0,15,6.729,15,15v15H196V45z M393.537,468.408    c-0.729,7.753-7.142,13.592-14.934,13.592H133.396c-7.792,0-14.204-5.839-14.934-13.592L92.284,150h327.432L393.537,468.408z     M451,120h-15H76H61v-15c0-8.271,6.729-15,15-15h105h150h105c8.271,0,15,6.729,15,15V120z"/>
            </g>
        </g>
        <g>
            <g>
                <path d="M256,180c-8.284,0-15,6.716-15,15v212c0,8.284,6.716,15,15,15s15-6.716,15-15V195C271,186.716,264.284,180,256,180z"/>
            </g>
        </g>
        <g>
            <g>
                <path d="M346,180c-8.284,0-15,6.716-15,15v212c0,8.284,6.716,15,15,15s15-6.716,15-15V195C361,186.716,354.284,180,346,180z"/>
            </g>
        </g>
        <g>
            <g>
                <path d="M166,180c-8.284,0-15,6.716-15,15v212c0,8.284,6.716,15,15,15s15-6.716,15-15V195C181,186.716,174.284,180,166,180z"/>
            </g>
        </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g>/g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
    </span>
    `
}
