function clone(obj) {
   if (null == obj || "object" != typeof obj) return obj;
   var copy = obj.constructor();
   for (var attr in obj) {
       if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
   }
   return copy;
}
function cloneobj(obj) {
   var copy;

   // Handle the 3 simple types, and null or undefined
   if (null == obj || "object" != typeof obj) return obj;

   // Handle Date
   if (obj instanceof Date) {
       copy = new Date();
       copy.setTime(obj.getTime());
       return copy;
   }

   // Handle Array
   if (obj instanceof Array) {
       copy = [];
       for (var i = 0, len = obj.length; i < len; i++) {
           copy[i] = clone(obj[i]);
       }
       return copy;
   }

   // Handle Object
   if (obj instanceof Object) {
       copy = {};
       for (var attr in obj) {
           if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
       }
       return copy;
   }

   throw new Error("Unable to copy obj! Its type isn't supported.");
}

function convert_date_to_string(date){
    // console.log(date)
    const d = (new Date(date)).toISOString().substring(0, 10)
    const day = d.slice(8,10)
    const month = d.slice(5,7)
    const year = d.slice(2,4)
    return `${day}/${month}/${year}`
}
function convert_time_to_minutes(string){
    return 60*parseInt(string.slice(0,2)) + parseInt(string.slice(3))
}
function get_time(date){
    const d = new Date(date)
    return d.getTime()

}