const socket = io.connect('http://localhost:3000/');

const id_generator = (n = 16) => new Array(n).fill().map( _ => ~~(10*Math.random())).join('')
let users = []
let current_user_id = ""
let current_tag_id = ""
let current_user =  () => users[users.findIndex(el => el.id == current_user_id)]

let current_state = "home"


function go_to_home(){
    document.getElementById("app_title").innerHTML = "Agenda"
    home_div.style.display = "block"
    user_div.style.display = "none"

    wrap_users_display.innerHTML = `
    <div class="text-center d-flex">
    <div class="users-holder-title">Users</div>
    
    `
    
    users.forEach( (user,index,arr) => {
        wrap_users_display.innerHTML += 
        `
        <div class="user-display" onclick="go_to_user('${user.id}')" style="background-color:${user.color};color:${user.text_color};" >
            <h1 class="user-display-name" >${user.name}</h1>
        </div>
        `
    })

    body.style.backgroundColor = standart_background_color
    // setTimeout(()=>{
    //     body.style.backgroundColor = standart_background_color
    // },1000)

    current_state = "home"
    socket.emit("change_state",current_state)
}

function go_to_user(user_id){
    current_user_id = user_id

    document.getElementById("app_title").innerHTML = "Agenda - "+ current_user().name
    home_div.style.display = "none"
    user_div.style.display = "block"

    current_state = current_user_id
    socket.emit("change_state",current_state)
    
    update_users()
    update_tags()
    update_events()
    update_week_rows_display()
    update_calendar_display()
    update_notes_display()
    update_color_inputs()

    update_colors_contrast_class()
}


function update_side_tag_holder(){
    side_tag_holder_tbody.innerHTML = 
    `
    <div class="side-tag-holder-title text-center d-flex span-to-change-color-ghost div-to-change-backgroundcolor div-to-change-box-shadow">
    <div class="side-tag-title">Tags</div>
    <div class="side-tag-add-tag">
    <span id="add_tag" onclick="open_create_tag()">
    <svg class="svg-animate pointer " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="Layer_1" style="enable-background:new 0 0 64 64;" version="1.1" viewBox="0 0 64 64" xml:space="preserve">
    <g><g id="Icon-Plus" transform="translate(28.000000, 278.000000)"><path class="svg-to-change-color-background-color" d="M4-222.1c-13.2,0-23.9-10.7-23.9-23.9c0-13.2,10.7-23.9,23.9-23.9s23.9,10.7,23.9,23.9     C27.9-232.8,17.2-222.1,4-222.1L4-222.1z M4-267.3c-11.7,0-21.3,9.6-21.3,21.3s9.6,21.3,21.3,21.3s21.3-9.6,21.3-21.3     S15.7-267.3,4-267.3L4-267.3z" id="Fill-38"/><polygon class="svg-to-change-color-background-color" id="Fill-39" points="-8.7,-247.4 16.7,-247.4 16.7,-244.6 -8.7,-244.6    "/><polygon class="svg-to-change-color-background-color" id="Fill-40" points="2.6,-258.7 5.4,-258.7 5.4,-233.3 2.6,-233.3    "/></g></g></svg>    </span></div> 
    </div>
    `

    current_user().tags.forEach( tag =>{
        side_tag_holder_tbody.innerHTML += 
        `
        <div class="side-tag-holder d-md-inline-flex text-center">
            <div class="tag-holder-data1"  style="background:${tag.color};color:${tag.text_color}; font-size:1.2rem; line-height:3rem;">${tag.tasks.length}</div>
            <div class="tag-holder-data2 pointer" onclick="open_tag_on_another_tab('${tag.user_id}','${tag.id}')"  style="background:${tag.color};color:${tag.text_color};">${tag.name}</div>
            <div class="tag-holder-data3 pointer"  style="background:${tag.color};color:${tag.text_color};" onclick="open_create_task('${tag.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="${tag.text_color}" class="svg-animate" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px"
            viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve" width="2.6rem" heigth="2.6rem" style="margin-bottom:10px">            
            <g>
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                    <path
                        d="M4173.5,4997.4c-176.2-49.8-379.3-191.6-454-318l-30.6-51.7l-432.9-9.6c-287.3-3.8-455.9-15.3-503.8-32.6c-113-40.2-249-155.2-318-268.2l-63.2-105.4l-616.8-9.6c-597.6-9.6-618.7-11.5-699.2-53.6c-126.4-67-228-168.6-285.4-287.3L716,3752.4V-289.4v-4041.7l47.9-95.8c59.4-122.6,174.3-237.5,296.9-296.9l95.8-47.9l2040-5.7c1863.8-5.8,2045.8-3.8,2099.4,24.9c116.9,61.3,141.8,224.1,47.9,318l-55.5,55.6h-1996c-2212.4,0-2091.7-7.7-2153,124.5c-26.8,57.5-30.6,452-30.6,3963.2c0,3329.1,3.8,3911.5,26.8,3967c49.8,118.8,82.4,124.5,668.5,124.5h526.8l7.7-145.6c5.7-136,11.5-149.4,69-201.1l61.3-55.5h1911.7c1735.5,0,1915.5,1.9,1955.8,30.6c61.3,44.1,97.7,141.7,97.7,266.3v105.4h526.8c442.5,0,538.3-5.7,586.2-30.6c116.9-59.4,113,0,113-1827.4c0-1812.1-3.8-1746.9,105.4-1796.7c90-42.1,160.9-28.7,231.8,42.1l65.1,65.1l-3.8,1750.8l-5.7,1748.9l-53.6,109.2c-57.5,118.8-159,220.3-285.4,287.3c-80.5,42.1-97.7,44.1-699.2,49.8l-616.8,5.8l-57.5,101.5c-67.1,120.7-147.5,191.6-289.2,258.6c-101.5,47.9-120.7,49.8-536.3,57.5l-431,5.7l-57.5,78.5c-76.6,105.4-224.1,214.5-354.4,264.3C4531.7,5024.3,4311.4,5035.8,4173.5,4997.4z M4504.9,4597.1c113-40.2,195.4-114.9,252.8-229.9c82.4-162.8,91.9-164.7,660.8-164.7h482.7l55.5-55.5c51.7-51.7,55.6-67,55.6-201.1v-145.6H4384.2H2756V3942c0,124.5,5.7,151.3,46,197.3l46,53.6l517.2,9.6l519.1,9.6l57.5,55.6c32.6,32.6,59.4,67,59.4,78.5c0,44.1,114.9,180.1,176.2,212.6C4309.5,4627.7,4391.9,4637.3,4504.9,4597.1z" />
                    <path
                        d="M6780.5-300.8c-331.4-38.3-712.6-182-999.9-375.5c-664.7-444.4-1057.4-1275.7-976.9-2057.2c59.4-559.3,252.8-973.1,643.6-1367.7c277.7-281.6,530.6-444.4,860.1-555.5c823.7-275.8,1710.5-70.9,2317.8,538.3c609.1,607.2,814.1,1494.1,538.3,2317.8c-111.1,329.5-273.9,582.3-555.5,860.1C8221-557.5,7807.3-360.2,7269-300.8C7064-277.9,6985.5-277.9,6780.5-300.8z M7420.3-737.6c1103.3-228,1752.7-1438.6,1325.5-2472.9c-419.5-1019.1-1593.7-1455.8-2555.3-948.2c-494.2,260.5-837.1,712.6-948.2,1254.7c-53.6,258.6-40.2,628.3,30.7,871.6C5472.2-1364,5995.2-879.3,6675.2-731.8C6864.8-691.6,7211.5-693.5,7420.3-737.6z" />
                    <path
                        d="M6956.7-1532.5c-105.4-47.9-120.7-103.4-120.7-471.2v-325.6h-325.6c-371.6,0-425.3-13.4-471.2-128.3c-38.3-88.1-19.2-164.7,53.6-226c55.5-47.9,61.3-47.9,400.3-47.9h342.9v-346.7v-346.7l65.1-65.1c46-46,82.4-65.1,126.4-65.1c67.1,0,162.8,47.9,185.8,93.9c7.6,17.2,19.1,185.8,24.9,375.4l9.6,344.8l344.8,9.6c189.6,5.7,358.2,17.3,375.4,24.9c46,23,93.9,118.8,93.9,185.8c0,44-19.2,80.4-65.1,126.4l-65.1,65.1H7585h-346.7v344.8v344.8l-51.7,57.5C7123.4-1513.4,7041-1496.1,6956.7-1532.5z" />
                </g>
            </g>
            </svg>
            </div>
        </div>
        `
    })
    if(current_user().tags.length != 0){
        side_tag_open_bar.style.height = `${3*current_user().tags.length + 6}rem`
    }else{
        side_tag_open_bar.style.height = `${9}rem`
    }
}
function update_events_display(){
    events_display_body.innerHTML = 
    `
    <div class="events-display-holder-title text-center d-flex div-to-change-backgroundcolor span-to-change-color-ghost">
        <div class="events-display-title">Events</div>
        <div class="events-display-add-event">
            <span id="add_event" onclick="open_create_event()">
                <svg class="svg-animate pointer svg-to-change-color-background-color" width="4rem" height="4rem" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="Layer_1" style="enable-background:new 0 0 64 64;" version="1.1" viewBox="0 0 64 64" xml:space="preserve">
                <g><g id="Icon-Plus" transform="translate(28.000000, 278.000000)"><path class="svg-to-change-color-background-color" d="M4-222.1c-13.2,0-23.9-10.7-23.9-23.9c0-13.2,10.7-23.9,23.9-23.9s23.9,10.7,23.9,23.9     C27.9-232.8,17.2-222.1,4-222.1L4-222.1z M4-267.3c-11.7,0-21.3,9.6-21.3,21.3s9.6,21.3,21.3,21.3s21.3-9.6,21.3-21.3     S15.7-267.3,4-267.3L4-267.3z" id="Fill-38"/><polygon class="svg-to-change-color-background-color" id="Fill-39" points="-8.7,-247.4 16.7,-247.4 16.7,-244.6 -8.7,-244.6    "/><polygon class="svg-to-change-color-background-color" id="Fill-40" points="2.6,-258.7 5.4,-258.7 5.4,-233.3 2.6,-233.3    "/></g></g>
                </svg>    
            </span>
        </div> 
    </div>
    `
    current_user().events.sort((a,b) => get_time(a.date) - get_time(b.date))
    current_user().events.forEach( event =>{

        events_display_body.innerHTML += 
        `
        <div class="events-display-holder d-md-inline-flex text-center">
            <div class="events-display-data1 div-to-change-backgroundcolor span-to-change-color-ghost">${convert_date_to_string(event.date)}</div>
            <div class="events-display-data2 pointer div-to-change-backgroundcolor span-to-change-color-ghost" onclick="open_event_display('${event.id}')">${event.name}</div>
            <div class="events-display-data3 pointer div-to-change-backgroundcolor span-to-change-color-ghost" onclick="request_delete_event_('${event.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bfbfbf" class="svg-animate pointer svg-to-change-color-background-color" height="30px" width="30px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
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
            </div>
        
        </div>
        `
    })


}
function update_notes_display(){
    note_display_body.innerHTML = ""
    
    current_user().notes.forEach( note =>{

        note_display_body.innerHTML += 
        `
        <div class="note-display-note-body">
            <div class="note-display-note-title">
                ${note.name}
            </div>
            <div class="note-display-note-text">
                <p>
                ${note.text}
                </p>
            </div>
            <div style="position:relative; bottom:10px; right:5px; text-align:right;">
            <span onclick="request_to_delete_note('${note.user_id}','${note.id}')">            
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="svg-animate svg-garbage pointer" height="18px" width="18px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
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
            </div>
        </div>
        `
    })
}
function update_colors_contrast_class(){
    const list_of_svg_ghost_to_change_color = [...document.getElementsByClassName("svg-to-change-color-ghost")]
    list_of_svg_ghost_to_change_color.forEach( svg =>{
        svg.style.fill = current_user().text_color+"80"
    })

    const list_of_span_ghost_to_change_color = [...document.getElementsByClassName("span-to-change-color-ghost")]
    list_of_span_ghost_to_change_color.forEach( span =>{
        span.style.color = current_user().color
    })

    const list_of_div_ghost_to_change_background = [...document.getElementsByClassName("div-to-change-backgroundcolor-ghost")]
    list_of_div_ghost_to_change_background.forEach( div =>{
        div.style.background = current_user().text_color+"70"
    })

    const list_of_svg_to_change_color = [...document.getElementsByClassName("svg-to-change-color-background-color")]
    list_of_svg_to_change_color.forEach( svg =>{
        svg.style.fill = current_user().color
    })

    const list_of_div_to_change_background = [...document.getElementsByClassName("div-to-change-backgroundcolor")]
    list_of_div_to_change_background.forEach( div =>{
        div.style.background = current_user().text_color
    })

    const list_of_div_to_change_box_shadow = [...document.getElementsByClassName("div-to-change-box-shadow")]
    list_of_div_to_change_box_shadow.forEach( div =>{
        div.style.boxShadow = `0px 0px 15px ${current_user().color}`
    })
}
function update_weekrows_editors_selectors(){
    let list_of_tags = cloneobj(current_user().tags)
    for(let i = 0 ; i <= 6; i++){
        const cur_selector = document.getElementById(`input-week-creator-selector-${i}`)
        cur_selector.innerHTML = 
        `
        <option value=""></option>
        `
        list_of_tags.forEach( tag => {
            cur_selector.innerHTML +=
            `
            <option value="${tag.id}">${tag.name}</option>
            `
        })
     }
     for(let i = 0 ; i <= 6; i++){
        const cur_selector = document.getElementById(`input-week-editor-selector-${i}`)
        cur_selector.innerHTML = 
        `
        <option value=""></option>
        `
        list_of_tags.forEach( tag => {
            cur_selector.innerHTML +=
            `
            <option value="${tag.id}">${tag.name}</option>
            `
        })
     }
}
function get_tag(id){
    if(id != ""){
        return current_user().tags[current_user().tags.findIndex(el => el.id == id)]
    }else{
        return {name:"",color:"#ffffff",text_color:"#000000",id:""}
    }
}


function update_week_rows_display(){
    week_display_body.innerHTML = 
    `
    <div class="week-display-holder-title text-center d-flex">
        <div class="week-display-header-time span-to-change-color-ghost div-to-change-backgroundcolor ">
            <span onclick="open_create_weekrow()">
                <svg class="svg-animate pointer svg-to-change-color-background-color" width="3.5rem" height="3.5rem" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" id="Layer_1" style="enable-background:new 0 0 64 64;" version="1.1" viewBox="0 0 64 64" xml:space="preserve">
                <g>
                <g id="Icon-Plus" transform="translate(28.000000, 278.000000)">
                <path class="svg-request-add-week-row" d="M4-222.1c-13.2,0-23.9-10.7-23.9-23.9c0-13.2,10.7-23.9,23.9-23.9s23.9,10.7,23.9,23.9     C27.9-232.8,17.2-222.1,4-222.1L4-222.1z M4-267.3c-11.7,0-21.3,9.6-21.3,21.3s9.6,21.3,21.3,21.3s21.3-9.6,21.3-21.3     S15.7-267.3,4-267.3L4-267.3z" id="Fill-38"/><polygon class="svg-request-add-week-row" id="Fill-39" points="-8.7,-247.4 16.7,-247.4 16.7,-244.6 -8.7,-244.6    "/><polygon class="svg-request-add-week-row" id="Fill-40" points="2.6,-258.7 5.4,-258.7 5.4,-233.3 2.6,-233.3    "/></g></g></svg>    
            </span> 
                
        </div>    
        <div class="week-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Seg</div> 
        <div class="week-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Ter</div> 
        <div class="week-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Qua</div> 
        <div class="week-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Qui</div> 
        <div class="week-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Sex</div>  
        <div class="week-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Sab</div>
        <div class="week-display-header-day span-to-change-color-ghost div-to-change-backgroundcolor">Dom</div>                      
    </div>  
    `
    current_user().week_schedule.sort((a,b) => convert_time_to_minutes(a.time) - convert_time_to_minutes(b.time))
    current_user().week_schedule.forEach( week_row =>{
        week_display_body.innerHTML += 
        `
        <div class="week-display-holder-row text-center d-flex">
        <div class="week-display-header-row-time">
            <div class="week-display-header-row-hours div-to-change-backgroundcolor span-to-change-color-ghost">
            ${week_row.time}
            </div>
            <div class="week-display-header-row-edit-button">
            <span onclick="edit_week_row('${week_row.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#8f8f8f" class="pointer edit-row-button" height="15px" width="15px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.873 477.873" style="enable-background:new 0 0 477.873 477.873; margin-right:-7px" xml:space="preserve">
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

            
        </div>    
        <div ${get_tag(week_row.seg.tag).name == ""?"":String(`onclick="open_tag_on_another_tab('${get_tag(week_row.seg.tag).user_id}','${get_tag(week_row.seg.tag).id}')"`)} style="background:${get_tag(week_row.seg.tag).color};color:${get_tag(week_row.seg.tag).text_color};" class="week-display-header-row-day ${get_tag(week_row.seg.tag).name == ""?"":"pointer"}">
            <div class="week-display-name-holder">
                ${week_row.seg.name || "&nbsp;"}
            </div>
            <div class="week-display-tag-holder">
                ${get_tag(week_row.seg.tag).name}
            </div>
        </div> 
        <div ${get_tag(week_row.ter.tag).name == ""?"":String(`onclick="open_tag_on_another_tab('${get_tag(week_row.ter.tag).user_id}','${get_tag(week_row.ter.tag).id}')"`)} style="background:${get_tag(week_row.ter.tag).color};color:${get_tag(week_row.ter.tag).text_color};" class="week-display-header-row-day ${get_tag(week_row.ter.tag).name == ""?"":"pointer"}">
            <div class="week-display-name-holder">
                ${week_row.ter.name || "&nbsp;"}
            </div>
            <div class="week-display-tag-holder">
                ${get_tag(week_row.ter.tag).name}
            </div>
        </div> 
        <div ${get_tag(week_row.qua.tag).name == ""?"":String(`onclick="open_tag_on_another_tab('${get_tag(week_row.qua.tag).user_id}','${get_tag(week_row.qua.tag).id}')"`)} style="background:${get_tag(week_row.qua.tag).color};color:${get_tag(week_row.qua.tag).text_color};" class="week-display-header-row-day ${get_tag(week_row.qua.tag).name == ""?"":"pointer"}">
            <div class="week-display-name-holder">
                ${week_row.qua.name || "&nbsp;"}
            </div>
            <div class="week-display-tag-holder">
                ${get_tag(week_row.qua.tag).name}
            </div>
        </div> 
        <div ${get_tag(week_row.qui.tag).name == ""?"":String(`onclick="open_tag_on_another_tab('${get_tag(week_row.qui.tag).user_id}','${get_tag(week_row.qui.tag).id}')"`)} style="background:${get_tag(week_row.qui.tag).color};color:${get_tag(week_row.qui.tag).text_color};" class="week-display-header-row-day ${get_tag(week_row.qui.tag).name == ""?"":"pointer"}">
            <div class="week-display-name-holder">
                ${week_row.qui.name || "&nbsp;"}
            </div>
            <div class="week-display-tag-holder">
                ${get_tag(week_row.qui.tag).name}
            </div>
        </div> 
        <div ${get_tag(week_row.sex.tag).name == ""?"":String(`onclick="open_tag_on_another_tab('${get_tag(week_row.sex.tag).user_id}','${get_tag(week_row.sex.tag).id}')"`)} style="background:${get_tag(week_row.sex.tag).color};color:${get_tag(week_row.sex.tag).text_color};" class="week-display-header-row-day ${get_tag(week_row.sex.tag).name == ""?"":"pointer"}">
            <div class="week-display-name-holder">
                ${week_row.sex.name || "&nbsp;"}
            </div>
            <div class="week-display-tag-holder">
                ${get_tag(week_row.sex.tag).name}
            </div>
        </div> 
        <div ${get_tag(week_row.sab.tag).name == ""?"":String(`onclick="open_tag_on_another_tab('${get_tag(week_row.sab.tag).user_id}','${get_tag(week_row.sab.tag).id}')"`)} style="background:${get_tag(week_row.sab.tag).color};color:${get_tag(week_row.sab.tag).text_color};" class="week-display-header-row-day ${get_tag(week_row.sab.tag).name == ""?"":"pointer"}">
            <div class="week-display-name-holder">
                ${week_row.sab.name || "&nbsp;"}
            </div>
            <div class="week-display-tag-holder">
                ${get_tag(week_row.sab.tag).name}
            </div>
        </div> 
        <div ${get_tag(week_row.dom.tag).name == ""?"":String(`onclick="open_tag_on_another_tab('${get_tag(week_row.dom.tag).user_id}','${get_tag(week_row.dom.tag).id}')"`)} style="background:${get_tag(week_row.dom.tag).color};color:${get_tag(week_row.dom.tag).text_color};" class="week-display-header-row-day ${get_tag(week_row.dom.tag).name == ""?"":"pointer"}">
            <div class="week-display-name-holder">
                ${week_row.dom.name || "&nbsp;"}
            </div>
            <div class="week-display-tag-holder">
                ${get_tag(week_row.dom.tag).name}
            </div>
        </div> 
    </div> 
        `
    })

}

function update_users(){
    const select_to_delete_users = document.getElementById("select-delete-user")

    select_to_delete_users.innerHTML = ""

    users.forEach( user =>{
        select_to_delete_users.innerHTML += 
        `<option value="${user.id}">${user.name}</option>`
    })
}
function update_tags(){
    const select_to_delete_tag = document.getElementById("select-delete-tag")

    select_to_delete_tag.innerHTML = ""
    current_user().tags.forEach( tag =>{
        select_to_delete_tag.innerHTML += 
        `<option value="${tag.id}">${tag.name}</option>`
    })

    update_weekrows_editors_selectors()
    update_week_rows_display()
    update_side_tag_holder()
}
function update_events(){
    update_events_display()
}
function update_color_inputs(){
    body.style.transitionDuration = '1s'
    body.style.backgroundColor = current_user().color
    user_color_input.value = current_user().color
    user_text_color_input.value = current_user().text_color
    body.style.transitionDuration = '0s'

    const list_of_svg_to_change_color = [...document.getElementsByClassName("svg-to-change-color")]
    list_of_svg_to_change_color.forEach( svg =>{
        svg.style.fill = current_user().text_color
        svg.style.transition = "400ms"
    })

    const list_of_span_to_change_color = [...document.getElementsByClassName("span-to-change-color")]
    list_of_span_to_change_color.forEach( span =>{
        span.style.color = current_user().text_color
        span.style.transition = "400ms"
    })
}

function open_tag_on_another_tab(user_id,tag_id){
    window.open(`../html/tag.html#${user_id}-${tag_id}`,'_blank')
}

// socket.emit('deleteRow',id)

socket.on('update_data_users', users_list => {
    users = cloneobj(users_list)
    update_users()
    setTimeout(()=>{
        if(current_state == "home"){
            go_to_home()
        }
        if(current_user()){
            update_tags()
            update_events()
            update_week_rows_display()
            update_calendar_display()
            update_notes_display()
            update_colors_contrast_class()
            update_users()
            update_color_inputs()
        }
    },500)
})

socket.on('update_state', state => {
    current_state = state
    if(current_state == "home"){
        go_to_home()
    }else{
        go_to_user(state)
    }
})



// window.addEventListener('keydown', ({key}) => {
//     if (key === 'Escape'){
//     }
// })