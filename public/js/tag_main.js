const socket = io.connect('http://localhost:3000/');
let users = []
const hashcode = location.hash.slice(1)

const user_id = hashcode.slice(0,hashcode.indexOf("-"))
const tag_id = hashcode.slice(Number(hashcode.indexOf("-"))+1)
let user = {}
let tag = {}

function update_color_inputs(){
   body.style.transitionDuration = '1s'
   body.style.backgroundColor = tag.color
   tag_color_input.value = tag.color
   tag_text_color_input.value = tag.text_color
   body.style.transitionDuration = '0s'

}
function update_colors_contrast_class(){
   const list_of_svg_ghost_to_change_color = [...document.getElementsByClassName("svg-to-change-color-ghost")]
   list_of_svg_ghost_to_change_color.forEach( svg =>{
       svg.style.fill = tag.text_color+"80"
   })

   const list_of_span_ghost_to_change_color = [...document.getElementsByClassName("span-to-change-color-ghost")]
   list_of_span_ghost_to_change_color.forEach( span =>{
       span.style.color = tag.color
   })

   const list_of_div_ghost_to_change_background = [...document.getElementsByClassName("div-to-change-backgroundcolor-ghost")]
   list_of_div_ghost_to_change_background.forEach( div =>{
       div.style.background = tag.text_color+"70"
   })

   const list_of_svg_to_change_color = [...document.getElementsByClassName("svg-to-change-color-background-color")]
   list_of_svg_to_change_color.forEach( svg =>{
       svg.style.fill = tag.color
   })

   const list_of_div_to_change_background = [...document.getElementsByClassName("div-to-change-backgroundcolor")]
   list_of_div_to_change_background.forEach( div =>{
       div.style.background = tag.text_color
   })

   const list_of_div_to_change_box_shadow = [...document.getElementsByClassName("div-to-change-box-shadow")]
   list_of_div_to_change_box_shadow.forEach( div =>{
       div.style.boxShadow = `0px 0px 15px ${tag.color}`
   })

   
   const list_of_div_to_change_box_shadow_to_color = [...document.getElementsByClassName("div-to-change-box-shadow-text-color")]
   list_of_div_to_change_box_shadow_to_color.forEach( div =>{
       div.style.boxShadow = `0px 0px 5px ${tag.text_color}`
   })

   const list_of_div_to_change_background_to_color = [...document.getElementsByClassName("div-to-change-backgroundcolor-to-color")]
   list_of_div_to_change_background_to_color.forEach( div =>{
       div.style.background = tag.color+"60"
   })
}
function update_task_display(){
   document.getElementById("tag_title").innerHTML = tag.name
   tasks_display_body.innerHTML = 
      `
      <div class="tasks-display-holder-title text-center d-flex div-to-change-backgroundcolor span-to-change-color-ghost">
      <div style="position: relative; margin-left:5%;line-height:55px;">
        <span onclick="open_tag_editor()">
         <svg xmlns="http://www.w3.org/2000/svg" class="svg-animate pointer svg-to-change-color-background-color" height="35px" width="35px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.873 477.873" style="enable-background:new 0 0 477.873 477.873; margin-right:-7px" xml:space="preserve">
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
      </div>
      <div class="tasks-display-title">Tasks</div>
      </div>
      `
      tag.tasks.sort((a,b) => get_time(a.date) - get_time(b.date))
      tag.tasks.forEach( task =>{  
         tasks_display_body.innerHTML += 
          `
          <div class="tasks-display-holder div-to-change-backgroundcolor-to-color div-to-change-box-shadow-text-color d-md-inline-flex text-center">
              <div class="tasks-display-data1 div-to-change-backgroundcolor span-to-change-color-ghost">${convert_date_to_string(task.date)}</div>
              <div class="tasks-display-data2 pointer div-to-change-backgroundcolor span-to-change-color-ghost" onclick="open_task_display('${task.id}')">${task.name}</div>
          </div>
          `
      })
  

}
function tag_color_oninput(){
   body.style.transitionDuration = '1s'
   body.style.backgroundColor = tag_color_input.value

   const list_of_svg_to_change_color = [...document.getElementsByClassName("svg-to-change-color")]
    list_of_svg_to_change_color.forEach( svg =>{
        svg.style.fill = tag_text_color_input.value
        svg.style.transition = "400ms"
    })

    const list_of_svg_to_change_to_background_color = [...document.getElementsByClassName("svg-to-change-color-background-color")]
    list_of_svg_to_change_to_background_color.forEach( svg =>{
        svg.style.fill = tag_color_input.value
        svg.style.transition = "400ms"
    })


    const list_of_span_to_change_color = [...document.getElementsByClassName("span-to-change-color")]
    list_of_span_to_change_color.forEach( span =>{
        span.style.color = tag_text_color_input.value
        span.style.transition = "400ms"
    })

    const list_of_svg_ghost_to_change_color = [...document.getElementsByClassName("svg-to-change-color-ghost")]
    list_of_svg_ghost_to_change_color.forEach( svg =>{
        svg.style.fill = tag_text_color_input.value+"80"
        svg.style.transition = "400ms"
    })

    const list_of_span_ghost_to_change_color = [...document.getElementsByClassName("span-to-change-color-ghost")]
    list_of_span_ghost_to_change_color.forEach( span =>{
        span.style.color = tag_color_input.value
        span.style.transition = "400ms"
    })

    const list_of_div_ghost_to_change_background = [...document.getElementsByClassName("div-to-change-backgroundcolor-ghost")]
    console.log(list_of_div_ghost_to_change_background)
    list_of_div_ghost_to_change_background.forEach( div =>{
        div.style.background = tag_text_color_input.value+"70"
        div.style.transition = "400ms"
    })

    const list_of_div_to_change_background = [...document.getElementsByClassName("div-to-change-backgroundcolor")]
    list_of_div_to_change_background.forEach( div =>{
        div.style.background = tag_text_color_input.value
        div.style.transition = "400ms"
    })

    const list_of_div_to_change_box_shadow = [...document.getElementsByClassName("div-to-change-box-shadow")]
    list_of_div_to_change_box_shadow.forEach( div =>{
        div.style.boxShadow = `0px 0px 5px ${tag_color_input.value}`
        div.style.transition = "400ms"
    })

    const list_of_div_to_change_box_shadow_to_color = [...document.getElementsByClassName("div-to-change-box-shadow-text-color")]
    list_of_div_to_change_box_shadow_to_color.forEach( div =>{
        div.style.boxShadow = `0px 0px 5px ${tag_text_color_input.value}`
        div.style.transition = "400ms"
    })

    const list_of_div_to_change_background_to_color = [...document.getElementsByClassName("div-to-change-backgroundcolor-to-color")]
    list_of_div_to_change_background_to_color.forEach( div =>{
        div.style.background = tag_color_input.value+"60"
    })

    
}
function tag_color_onchange(){
   socket.emit('change_tag_color', {user_id:user_id,tag_id:tag_id,color:tag_color_input.value,text_color:tag_text_color_input.value})
   body.style.transitionDuration = '0s'
}


function open_tag_editor(){
    input_editor_tag_name.value = tag.name
    $(`#modal-edit-tag`).modal('show')
}


function request_tag_edit(){
    if(input_editor_tag_name.value!= ""){
        const edited_tag= {
            name:input_editor_tag_name.value,
         }
         edit_tag(tag,edited_tag)
        $(`#modal-edit-tag`).modal('toggle') 
    }else{
        window.confirm("Tag name required")
    }
}
function edit_tag(tag, new_tag){
    socket.emit('edit_tag', {tag,new_tag})
}

socket.on('update_data_users', users_list => {
   users = cloneobj(users_list)
   user = cloneobj(users[users.findIndex( el => el.id == user_id)])
   tag = cloneobj(user.tags[user.tags.findIndex(el => el.id == tag_id)])
   update_color_inputs()
   update_task_display()    
   update_colors_contrast_class()    
   user_indicator.innerText = `${user.name} - ${tag.name}`  
   user_indicator.style.color = tag.text_color+"60" 
})

