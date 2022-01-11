
const modals_ids = 
["create-user","create-tag","edit-tag","create-task","edit-task","display-task","create-event","display-event","create-note","edit-note","edit-event","create-weekrow","editor-weekrow","display-tutorial"]
/*
COLOCAR OS IDS NO "modal" "button" e "close button"
*/


$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})
$(document).ready(function() {

    modals_ids.forEach( el =>{
        $(`#btn-${el}`).click(function() {
            $(`#modal-${el}`).modal('show')
        })
        $(`#btn-close-${el}`).click(function() {
            $(`#modal-${el}`).modal('toggle')
        })
    })
})


window.addEventListener('keydown', ({key}) => { 
    console.log(key)   
    if (key === 'Escape'){
        modals_ids.forEach( el =>{  
            $(`#modal-${el}`).modal('hide')
        })
        close_note_display()
    }    
})

window.addEventListener('mousemove', event => {
    let x = event.clientX
    let y = event.clientY
    if(window.innerHeight*0.92<y && window.innerWidth*0.08>x){
        document.getElementById("tutorial_button").style.opacity = "1"        
        document.getElementById("tutorial_button").style.transitionDuration = "500ms"
    }else{
        document.getElementById("tutorial_button").style.opacity = "0"
        document.getElementById("tutorial_button").style.transitionDuration = "12s"
    }
})


function open_tutorial(){    
    $(`#modal-display-tutorial`).modal('show')
}
