function user_color_oninput(){
   body.style.transitionDuration = '1s'
   body.style.backgroundColor = user_color_input.value

   const list_of_svg_to_change_color = [...document.getElementsByClassName("svg-to-change-color")]
    list_of_svg_to_change_color.forEach( svg =>{
        svg.style.fill = user_text_color_input.value
        svg.style.transition = "400ms"
    })

    const list_of_svg_to_change_to_background_color = [...document.getElementsByClassName("svg-to-change-color-background-color")]
    list_of_svg_to_change_to_background_color.forEach( svg =>{
        svg.style.fill = user_color_input.value
        svg.style.transition = "400ms"
    })


    const list_of_span_to_change_color = [...document.getElementsByClassName("span-to-change-color")]
    list_of_span_to_change_color.forEach( span =>{
        span.style.color = user_text_color_input.value
        span.style.transition = "400ms"
    })

    const list_of_svg_ghost_to_change_color = [...document.getElementsByClassName("svg-to-change-color-ghost")]
    list_of_svg_ghost_to_change_color.forEach( svg =>{
        svg.style.fill = user_text_color_input.value+"80"
        svg.style.transition = "400ms"
    })

    const list_of_span_ghost_to_change_color = [...document.getElementsByClassName("span-to-change-color-ghost")]
    list_of_span_ghost_to_change_color.forEach( span =>{
        span.style.color = user_color_input.value
        span.style.transition = "400ms"
    })

    const list_of_div_ghost_to_change_background = [...document.getElementsByClassName("div-to-change-backgroundcolor-ghost")]
    list_of_div_ghost_to_change_background.forEach( div =>{
        div.style.background = user_text_color_input.value+"70"
        div.style.transition = "400ms"
    })

    const list_of_div_to_change_background = [...document.getElementsByClassName("div-to-change-backgroundcolor")]
    list_of_div_to_change_background.forEach( div =>{
        div.style.background = user_text_color_input.value
        div.style.transition = "400ms"
    })

    const list_of_div_to_change_box_shadow = [...document.getElementsByClassName("div-to-change-box-shadow")]
    list_of_div_to_change_box_shadow.forEach( div =>{
        div.style.boxShadow = `0px 0px 15px ${user_color_input.value}`
        div.style.transition = "400ms"
    })

    
}

function user_color_onchange(){
   socket.emit('change_user_color', {user_id:current_user_id,color:user_color_input.value,text_color:user_text_color_input.value})
   body.style.transitionDuration = '0s'
}