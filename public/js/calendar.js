const months = [
   'Janeiro',
   'Fevereiro',
   'Março',
   'Abril',
   'Maio',
   'Junho',
   'Julho',
   'Agosto',
   'Setembro',
   'Outubro',
   'Novembro',
   'Dezembro',
]
const calendar = new CalendarBase.Calendar({
   siblingMonths: true,
   weekStart: true
})
const today = new Date()

let month_counter = today.getUTCMonth()
let year_counter = today.getUTCFullYear()


// const days_have_the_same_year_month_day_ = (day1, day2) =>
//     day1.getUTCFullYear() === day2.getUTCFullYear() &&
//     day1.getUTCMonth() === day2.getUTCMonth() &&
//     day1.getDate() === day2.getDate()

const days_have_the_same_year_month_day = (d1,d2) =>
   d1.toISOString().substring(0, 10) == d2.toISOString().substring(0, 10)

function get_calendar(month, year) {    
    return calendar.getCalendar(year, month)   
}
function foward_month() {
    month_counter++
    if (month_counter == 12) {
      month_counter = 0
      year_counter++
    }
    update_calendar_display()
}
function backward_month() {
   month_counter--
    if (month_counter == -1) {
      month_counter = 11
        year_counter--
    }
    update_calendar_display()
}



function update_calendar_display(){
   calendar_display_body.innerHTML = 
   `
   <div class="calendar-display-holder-title text-center d-flex">
      <div class="calendar-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Seg</div> 
      <div class="calendar-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Ter</div> 
      <div class="calendar-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Qua</div> 
      <div class="calendar-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Qui</div> 
      <div class="calendar-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Sex</div>  
      <div class="calendar-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Sab</div>
      <div class="calendar-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Dom</div>                      
   </div> 
   `
   const calendar_array = get_calendar(month_counter,year_counter)
   let counter = 0

   let row_string = ""

   // console.log("fix",fixed_calendar)
   for(let i = 0; i < calendar_array[0].weekDay ; i++){
      let task_events_string = ``
      const calendar_date = new Date(calendar_array[i].year, calendar_array[i].month, calendar_array[i].day)
      current_user().tags.forEach(tag => {
         for(let j in tag.tasks){
            if(days_have_the_same_year_month_day(new Date(tag.tasks[j].date),calendar_date)){
               // console.log(new Date(tag.tasks[j].date))
               // console.log(calendar_date)
               task_events_string += 
               `
               <div class="calendar-display-task-div pointer calendar-task-animate" onclick="open_task_display('${tag.user_id}','${tag.id}','${tag.tasks[j].id}')" style="background:${tag.color}d0;">
               </div>   
               `
            }
         }
      })
      current_user().events.forEach( event => {
         if(days_have_the_same_year_month_day(new Date(event.date),calendar_date)){
            task_events_string += 
            `
            <div class="calendar-display-event-div pointer calendar-event-animate" onclick="open_event_display('${event.id}')">
            </div>   
            `
         }
      })
      row_string +=
      `
      <div class="calendar-display-header-row-day">
            <div class="calendar-display-day-title-holder">
               <div class="calendar-display-day-title-div">${calendar_array[i].day}</div>
            </div>
            <div class="calendar-display-event-task-holder d-md-inline-flex">   
            ${task_events_string}                       
            </div>
      </div>
      `
      counter += 1
   }
   for(let i = counter; i < calendar_array.length ; i++){
      const calendar_day = calendar_array[i]

      let task_events_string = ``
      // <div class="calendar-display-event-div"></div> 
      // <div class="calendar-display-task-div"></div>   
      
      const calendar_date = new Date(calendar_day.year, calendar_day.month, calendar_day.day)
      current_user().tags.forEach(tag => {
         for(let j in tag.tasks){
            if(days_have_the_same_year_month_day(new Date(tag.tasks[j].date),calendar_date)){
               task_events_string += 
               `
               <div class="calendar-display-task-div pointer calendar-task-animate" onclick="open_task_display('${tag.user_id}','${tag.id}','${tag.tasks[j].id}')" style="background:${tag.color}d0;">
               </div>   
               `
            }
         }
      })
      current_user().events.forEach( event => {
         if(days_have_the_same_year_month_day(new Date(event.date),calendar_date)){
            task_events_string += 
            `
            <div class="calendar-display-event-div pointer calendar-event-animate" onclick="open_event_display('${event.id}')">
            </div>   
            `
         }
      })


      row_string +=
      `
      <div class="calendar-display-header-row-day">
            <div class="calendar-display-day-title-holder">
               <div class="calendar-display-day-title-div">${calendar_day.day}</div>
            </div>
            <div class="calendar-display-event-task-holder d-md-inline-flex">   
            ${task_events_string}                       
            </div>
      </div>
      `
      counter += 1
      if(counter % 7 == 0){
         calendar_display_body.innerHTML += 
         `
         <div class="calendar-display-holder-row text-center d-flex">
         ${row_string}
         </div>
         `
         row_string = ""
      }
   }

   
   calendar_month_year_display_span_title.innerText = 
   `${months[month_counter]} de ${year_counter}`
  
}

