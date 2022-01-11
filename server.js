/*
cd C:\Users\User\Desktop\programacoes_em_javascript\agendaAppfull
node server.js
*/


const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// // Use JSON file for storage
// const file = join(__dirname, 'db.json')
// const adapter = new JSONFile(file)
// const db = new Low(adapter)
// console.log()
// const dd = require('./dbDealer.js')
/*
dd.isEqual(value, other) 

dd.insertDB(name, value)
dd.pushIntoArray(arrayName)
dd.deleteFromArray_Index(arrayName, index, count = 1)
dd.deleteFromArray_Item(arrayName, item)
dd.changeItem(itemName, func)
dd.value(name)
*/


function value (name) {
    return db.get(name).value();
}
const isEqual = function (value, other) {
    /*
    Função que verifica se um objeto ou array é igual a outro objeto ou array
    */
    var type = Object.prototype.toString.call(value);
    if (type !== Object.prototype.toString.call(other)) return false;
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;
    var compare = function (item1, item2) {
        var itemType = Object.prototype.toString.call(item1);
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2)) return false;
        }
        else {
            if (itemType !== Object.prototype.toString.call(item2)) return false;
            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString()) return false;
            } else {
                if (item1 !== item2) return false;
            }
        }
    };
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false;
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false;
            }
        }
    }
    return true;

}
const insertDB = (name, value) => {
    /*
    insertDB ou redefineItem é uma função que insere ou redefine um item no banco de dados,
    se ele já estiver inserido será redefinido. 
    O primeiro parâmetro é o nome do item, e o segundo o valor o qual será atribuido.
    **Valores undifined e null não podem ser atribuidos
    */
    if (value == undefined || value == null) {
        console.error(`Propriety value can't be null or undifined`)
        return
    }
    if (typeof name != typeof '') {
        console.error('Propriety name must be String type')
        return
    }
    db.set(name, value)
        .write()
}
const redefineItem = insertDB
function pushIntoArray(arrayName) {
    /*
    pushIntoArray recebe um argumento obrigatório e quantos argumentos opicionais quiser.
    Esta função insere os argumentos, a partir do 2°, ao array indicado no primeiro argumento.
    O primeiro argumento é para o nome do array
    */
    const args = Array.from(pushIntoArray.arguments)
    if (typeof arrayName != typeof '') {
        console.error('Propriety arrayName must be String type')
        return
    }
    args.forEach((el, index) => {
        if (index != 0) {
            db.get(arrayName)
                .push(el)
                .write()
        }
    })

}
function deleteFromArray_Index(arrayName, index, count = 1) {
    /*
    deleteFromArray_Index é uma função que deleta items do array pelo index.
    O primeiro argumento é o nome do array
    O segundo argumento é o index a ser deletado
    O terceiro argumento é a contagem de elementos a serem deletados: default = 1
    */
    if (typeof arrayName != typeof '') {
        console.error('Propriety arrayName must be String type')
        return
    }
    let array = db
        .get(arrayName)
        .value();

    array.splice(index, count);

    db.get(arrayName)
        .assign(array)
        .write();
}
function deleteFromArray_Item(arrayName, item) {
    /*
    deleteFromArray_Item é uma função que deleta um item do array pelo próprio item.
    O primeiro argumento é o nome do array
    O segundo argumento é o item a ser deletado
    **Este método suporta items do tipo objeto e array
    */
    if (typeof arrayName != typeof '') {
        console.error('Propriety arrayName must be String type')
        return
    }
    let array = db
        .get(arrayName)
        .value();
    array.forEach((el, index) => {
        if (isEqual(item, el) || el === item) {
            array.splice(index, 1)
        }
    })
    db.get(arrayName)
        .assign(array)
        .write();
}
function changeItem(itemName, func = (item) => { }) {
    /*
    changeItem é uma função que muda um item na db pelo seu nome.
    O primeiro argumento é o nome do item
    O segundo é uma função que recebe um argumento item que é o item a ser alterado,
    e esta função é executada e o item é modificado de acordo com ela.
    **Esta função não requer return
    */
    if (typeof itemName != typeof '') {
        console.error('Propriety itemName must be String type')
        return
    }
    if (typeof func != typeof function () { }) {
        console.error('Propriety func must be a function with one argument')
        return
    }
    let item = db
        .get(itemName)
        .value();
    func(item)
    redefineItem(itemName, item)
}
const getDB = () => db.value()

const express = require('express');
const { Console } = require('console');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/agenda.html')
})
server.listen(3000);
//process.env.PORT || 3000
console.log('')
console.log('')
console.log(' - Server listening on port 3000')
console.log('')
console.log(' - As long as you leave this window open the app will be listened on http://localhost:3000/')
console.log('')
console.log(' - To stop the aplication you must close this window')

function id_generator(n = 10){
    return new Array(n).fill().map( _ => ~~(10*Math.random())).join('')
}
function traverseAndFlatten(currentNode, target, flattenedKey) {
    for (var key in currentNode) {
        if (currentNode.hasOwnProperty(key)) {
            var newKey;
            if (flattenedKey === undefined) {
                newKey = key;
            } else {
                newKey = flattenedKey + '.' + key;
            }

            var value = currentNode[key];
            if (typeof value === "object") {
                traverseAndFlatten(value, target, newKey);
            } else {
                target[newKey] = value;
            }
        }
    }
}
function flatten(obj) {
    var flattenedObject = {};
    traverseAndFlatten(obj, flattenedObject);
    return flattenedObject;
}    
function get_ids_already_used(){
    const obj = value("users")
    let flattened = Object.entries(flatten(obj))
    
    let all_ids = flattened.map(el=>{
        if(el[0].indexOf("id")!=-1){
            return el[1]
        }else{
            return null
        }
    }).filter(el=>el!=null)
    return all_ids
}
function get_a_new_id(){
    const ids_already_used = get_ids_already_used()

    let new_id = id_generator()
    while(ids_already_used.indexOf(new_id) != -1){
        new_id = id_generator()
    }
    return new_id
}

io.sockets.on('connection', function (socket) {
    // console.log('Client connected... ' + socket.id);   

    // io.emit('updateColor', value('background_color'))
    io.emit('update_data_users', value("users"))
    io.emit('update_state', value("state"))

    socket.on('change_state', state =>{
        db.set("state", state)
        .write()
    })


    socket.on('create_user', ({name, color, text_color}) => {
        
        const new_user = {
            id:get_a_new_id(),
            name,
            color,
            text_color,
            tags:[],
            events:[],
            week_schedule:[],
            notes:[]
        }
        
        pushIntoArray("users",new_user)

        io.emit('update_data_users', value("users"))
    })
    socket.on('delete_user_by_id', id_to_delete =>{
        let array = db
        .get("users")
        .value();

        let index_to_delete = array.findIndex((el) => el.id == id_to_delete)

        if(index_to_delete != -1){
            array.splice(index_to_delete,1)
            db.get("users")
            .assign(array) 
            .write();
        }

        io.emit('update_data_users', value("users"))
    })

    socket.on('create_tag', ({user_id ,name, color, text_color}) => {
        
        const new_tag = {
            id:get_a_new_id(),
            user_id,
            name,
            color,
            text_color,
            tasks:[]
        }
        
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == user_id)

        if(index_id != -1){
            array[index_id].tags.push(new_tag)
            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })
    socket.on('delete_tag_by_id', ({user_id,id_to_delete}) => {
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == user_id)

        if(index_id != -1){
            const tag_index = array[index_id].tags.findIndex(el => el.id ==id_to_delete)
            array[index_id].tags.splice(tag_index,1)

            let array_of_props = ["seg","ter","qua","qui","sex","sab","dom"]
            array[index_id].week_schedule.forEach( week_row => {
                for(let i in array_of_props){
                    if(week_row[array_of_props[i]].tag == id_to_delete){
                        week_row[array_of_props[i]].tag = ""
                    }
                }
            })

            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })

    socket.on('create_task', ({user_id,tag_id,name,date,text}) => {
        const new_task = {
            id:get_a_new_id(),
            user_id,
            tag_id,
            name,
            date,
            text,
        }
        
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == user_id)

        if(index_id != -1){
            const tag_index = array[index_id].tags.findIndex(el => el.id ==tag_id)
            array[index_id].tags[tag_index].tasks.push(new_task)
            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))

    })
    socket.on('delete_task_by_id', ({user_id,tag_id,id}) => {
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == user_id)

        if(index_id != -1){
            const tag_index = array[index_id].tags.findIndex(el => el.id ==tag_id)
            const task_index = array[index_id].tags[tag_index].tasks.findIndex(el => el.id == id)
            array[index_id].tags[tag_index].tasks.splice(task_index,1)

            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })
    socket.on('edit_task', ({task,new_task})=>{
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == task.user_id)

        if(index_id != -1){
            const tag_index = array[index_id].tags.findIndex(el => el.id ==task.tag_id)
            const task_index = array[index_id].tags[tag_index].tasks.findIndex(el => el.id == task.id)
            array[index_id].tags[tag_index].tasks.splice(task_index,1,new_task)

            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })
    
    socket.on('create_event', ({user_id ,name, date, text}) => {
        
        const new_event = {
            id:get_a_new_id(),
            user_id,
            name,
            date,
            text,
        }
        
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == user_id)

        if(index_id != -1){
            array[index_id].events.push(new_event)
            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })
    socket.on('delete_event_by_id', ({user_id,id}) => {
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == user_id)

        if(index_id != -1){
            const event_index = array[index_id].events.findIndex(el => el.id == id)
            array[index_id].events.splice(event_index,1)
            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })
    socket.on('edit_event', ({event,new_event})=>{
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == event.user_id)

        if(index_id != -1){
            const event_index = array[index_id].events.findIndex(el => el.id == event.id)
            array[index_id].events.splice(event_index,1,new_event)

            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })

    socket.on('create_note', ({user_id ,name, text}) => {
        
        const new_note = {
            id:get_a_new_id(),
            user_id,
            name,
            text,
        }
        
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == user_id)

        if(index_id != -1){
            array[index_id].notes.push(new_note)
            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })
    socket.on('delete_note_by_id', ({user_id,id}) => {
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == user_id)

        if(index_id != -1){
            const note_index = array[index_id].notes.findIndex(el => el.id == id)
            array[index_id].notes.splice(note_index,1)
            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })
    socket.on('edit_note', ({note,new_note})=>{
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == note.user_id)

        if(index_id != -1){
            const note_index = array[index_id].notes.findIndex(el => el.id == note.id)
            array[index_id].notes.splice(note_index,1,new_note)

            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })

    socket.on('create_week_row', ({week_row,user_id}) => {
        
        const new_week_row = week_row
        new_week_row.id = get_a_new_id()
        
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == user_id)

        if(index_id != -1){
            array[index_id].week_schedule.push(new_week_row)
            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })
    socket.on('edit_week_row', ({week_row,new_week_row})=>{
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == week_row.user_id)

        if(index_id != -1){
            const event_index = array[index_id].week_schedule.findIndex(el => el.id == week_row.id)
            array[index_id].week_schedule.splice(event_index,1,new_week_row)

            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })
    socket.on('delete_week_row_by_id', ({user_id,id}) => {
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == user_id)

        if(index_id != -1){
            const week_row_index = array[index_id].week_schedule.findIndex(el => el.id == id)
            array[index_id].week_schedule.splice(week_row_index,1)
            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })

    socket.on('change_user_color', ({user_id,color,text_color})=>{
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == user_id)

        if(index_id != -1){
            array[index_id].color = color
            array[index_id].text_color = text_color

            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })
    
    socket.on('change_tag_color', ({user_id,tag_id,color,text_color})=>{
        let array = db
        .get("users")
        .value();
        
        let index_id = array.findIndex((el) => el.id == user_id)
        
        if(index_id != -1){
            const tag_index = array[index_id].tags.findIndex(el => el.id == tag_id)
            array[index_id].tags[tag_index].color = color
            array[index_id].tags[tag_index].text_color = text_color

            db.get("users")
            .assign(array) 
            .write();
        }
        io.emit('update_data_users', value("users"))
    })

    // socket.on('disconnect', function () {

    // })
});


