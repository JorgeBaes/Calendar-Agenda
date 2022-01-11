function open_note_display(){
   note_display.style.bottom = "0"
   note_display.style.boxShadow = "0px 0px 200px #000000"
   note_display.style.transitionDuration = "1200ms"
   note_open_display_button.style.opacity = "0"
   note_open_display_button.style.pointerEvents = "none"
   note_open_display_button.style.transitionDuration = "500ms"
}
function close_note_display(){
   note_display.style.bottom = "-50vh"
   note_display.style.boxShadow = "0px 0px 0px #000000"
   note_display.style.transitionDuration = "1200ms"

   setTimeout(()=>{
      note_open_display_button.style.opacity = "1"
      note_open_display_button.style.pointerEvents = "all"
      note_open_display_button.style.transitionDuration = "500ms"
   },500)
}