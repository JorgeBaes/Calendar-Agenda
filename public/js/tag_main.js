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
}

function update_task_display(){
   document.getElementById("tag_title").innerHTML = tag.name
   tasks_display_body.innerHTML = 
      `
      <div class="tasks-display-holder-title text-center d-flex div-to-change-backgroundcolor span-to-change-color-ghost">
      <div class="tasks-display-title">Tasks</div>
      </div>
      `
      tag.tasks.sort((a,b) => get_time(a.date) - get_time(b.date))
      tag.tasks.forEach( task =>{  
         tasks_display_body.innerHTML += 
          `
          <div class="tasks-display-holder d-md-inline-flex text-center">
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
        div.style.boxShadow = `0px 0px 15px ${tag_color_input.value}`
        div.style.transition = "400ms"
    })

    
}

function tag_color_onchange(){
   socket.emit('change_tag_color', {user_id:user_id,tag_id:tag_id,color:tag_color_input.value,text_color:tag_text_color_input.value})
   body.style.transitionDuration = '0s'
}


socket.on('update_data_users', users_list => {
   users = cloneobj(users_list)
   user = cloneobj(users[users.findIndex( el => el.id == user_id)])
   tag = cloneobj(user.tags[user.tags.findIndex(el => el.id == tag_id)])
   update_color_inputs()
   update_task_display()    
   update_colors_contrast_class()       
})

