
const modals_ids = 
["create-user","create-tag","create-task","edit-task","display-task","create-event","display-event","create-note","edit-event","create-weekrow","editor-weekrow"]
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