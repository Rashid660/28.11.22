const os = require('os')
console.log(`free memory: ${
    os.freemem()
}`);

const fs = require('fs')
const files = fs.readdirSync('./')

console.log(`sync:' ${files}`);


const sqlite3 = require('sqlite3').verbose();
const db_file_loc = './db/db1.db'

const db = new sqlite3.Database(db_file_loc, (err) => {
    if (err) {
        console.log(`failed to connect to ${db_file_loc}`);
    } else {
        console.log(`successfully connected to ${db_file_loc}`);
    }
})

function open_db(){

db.serialize(() => {
    db.each("SELECT * FROM COMPANY", (err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.table(row);
        }
    })
});

}


db.serialize(() => {
    db.each("SELECT * FROM COMPANY WHERE SALARY > 30000;", (err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.table(row);
        }
    })
});


const data = [
    3423,
    'DAN',
    37,
    'Washington',
    1
]


// const sql_insert = `INSERT INTO COMPANY (ID, NAME, AGE, ADDRESS , SALARY)
//                      VALUES(?,?,?,?,?);`

// db.serialize(() => {
//     db.run(sql_insert, data, err => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(`${data} Inserted`);
//         }
//     })
// })


function update_salary_by_id(db, id, new_salary ){
    const sql_update = `UPDATE COMPANY
                        SET SALARY = ?
                        WHERE ID = ?`

     db.run(sql_update,[new_salary,id],err => {
        if(err){
            console.log(err);
        }
        else{
            console.log(`new salary is ${new_salary}`);
        }
     })
}

update_salary_by_id(db,3, 1111)