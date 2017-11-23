const mysqkl = require('mysql');

let db = mysqkl.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'20171113'}
);

db.query('select * from user_table where id=\'1\'',(err,data)=>{
    if(err) {
        console.log(err);
    } else{
        console.log(data);
        console.log(data[0].username)
    }
});

console.log(db);

