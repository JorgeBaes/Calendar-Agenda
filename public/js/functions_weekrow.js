function open_create_weekrow(){
   $(`#modal-create-weekrow`).modal('show')
   document.getElementById("create-weekrow-modal-content").style.opacity = "0"
   setTimeout(()=>{
      document.getElementById("create-weekrow-modal-content").style.opacity = "1"
   },500)

   for(let i =0 ; i <=6 ; i++){
      document.getElementById(`input-week-creator-text-${i}`).value = ""
      document.getElementById(`input-week-creator-selector-${i}`).getElementsByTagName('option')[0].selected = 'selected'
   }
   input_week_creator_time.value = "00:00"
}

function close_create_weekrow(){
   $(`#modal-create-weekrow`).modal('toggle')
   document.getElementById("create-weekrow-modal-content").style.opacity = "0"
}


function create_week_row(){
   let days = ["seg","ter","qua","qui","sex","sab","dom"]
   const week_row = 
   {
      seg:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
      ter:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
      qua:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
      qui:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
      sex:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
      sab:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
      dom:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
      user_id:current_user_id,
      time:input_week_creator_time.value
   }
   for(let i in days){
      week_row[days[i]].tag = document.getElementById(`input-week-creator-selector-${i}`).value
      week_row[days[i]].name = document.getElementById(`input-week-creator-text-${i}`).value
      
   }
   close_create_weekrow()
   socket.emit('create_week_row', {week_row:week_row,user_id:current_user_id})
}


let current_week_row_id = ""
//EDIT WEEK ROW
function edit_week_row(week_row_id){
   current_week_row_id = week_row_id
   const week_row_being_edited = current_user().week_schedule[current_user().week_schedule.findIndex(el=>el.id==week_row_id)]

   $(`#modal-editor-weekrow`).modal('show')
   document.getElementById("editor-weekrow-modal-content").style.opacity = "0"
   setTimeout(()=>{
      document.getElementById("editor-weekrow-modal-content").style.opacity = "1"
   },500)

   let days = ["seg","ter","qua","qui","sex","sab","dom"]
   console.log(week_row_being_edited)
   for(let i in days){
      document.getElementById(`input-week-editor-text-${i}`).value = week_row_being_edited[days[i]].name
      $(`#input-week-editor-selector-${i} > option[value="${week_row_being_edited[days[i]].tag}"]`).attr("selected",true)
   }
   input_week_editor_time.value = week_row_being_edited.time
}

function request_edit_week_row(){
   const row_index = current_user().week_schedule.findIndex( el => el.id == current_week_row_id)
   if(row_index != -1){
      const week_row_to_be_edited = current_user().week_schedule[row_index]
      let days = ["seg","ter","qua","qui","sex","sab","dom"]
      const new_week_row = 
      {
         seg:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
         ter:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
         qua:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
         qui:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
         sex:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
         sab:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
         dom:{tag:null,name:null,text_color:"#000000",color:"#ffffff"},
         user_id:current_user_id,
         id:week_row_to_be_edited.id,
         time:input_week_editor_time.value
      }
      for(let i in days){
         new_week_row[days[i]].tag = document.getElementById(`input-week-editor-selector-${i}`).value
         new_week_row[days[i]].name = document.getElementById(`input-week-editor-text-${i}`).value
      }
      close_edit_weekrow()
      socket_emit_edit_week_row(cloneobj(week_row_to_be_edited),cloneobj(new_week_row))
   }
}

function socket_emit_edit_week_row(week_row, new_week_row){
   socket.emit('edit_week_row', {week_row,new_week_row})
}

function close_edit_weekrow(){
   $(`#modal-editor-weekrow`).modal('toggle')
   document.getElementById("editor-weekrow-modal-content").style.opacity = "0"
}



//DELETE
function delete_week_row(){
   const week_row_being_edited = current_user().week_schedule[current_user().week_schedule.findIndex(el=>el.id==current_week_row_id)]
   if(window.confirm("Confirm deletion")){
      socket.emit('delete_week_row_by_id', week_row_being_edited)
   }
   close_edit_weekrow()
}