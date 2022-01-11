let is_closed = true
side_tag_open_bar.addEventListener("mouseenter", () => {
   side_tag_holder_tbody.style.opacity = "1"
   side_tag_holder_tbody.style.pointerEvents = "all"
   side_tag_holder_tbody.style.transition = "1s"
   side_tag_open_bar.style.opacity = "0"
   side_tag_open_bar.style.pointerEvents = "none"
   side_tag_open_bar.style.transition = "1s"
   is_closed = false
})
side_tag_holder_tbody.addEventListener("mouseleave",() => {
   side_tag_holder_tbody.style.opacity = "0"
   side_tag_holder_tbody.style.transition = "3s"
   side_tag_open_bar.style.opacity = "1"
   side_tag_open_bar.style.transition = "4s"
   
   is_closed = true
   setTimeout( () =>{
      if(is_closed){
         side_tag_holder_tbody.style.pointerEvents = "none"
         side_tag_open_bar.style.pointerEvents = "all"
      }
   },1800)
})

side_tag_holder_tbody.addEventListener("mouseover",() => {
   side_tag_holder_tbody.style.opacity = "1"
   side_tag_holder_tbody.style.pointerEvents = "all"
   side_tag_holder_tbody.style.transition = "1s"
   side_tag_open_bar.style.opacity = "0"
   side_tag_open_bar.style.pointerEvents = "none"
   side_tag_open_bar.style.transition = "1s"

   is_closed = false
})
