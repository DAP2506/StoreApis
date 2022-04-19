const db = require('../database');


const addUser = (name, phoneNumber, address) => {
    try {
        let add_user_query = `INSERT INTO hotnot_store.user (name,phoneNumber,address) VALUES ('${name}', '${phoneNumber}', '${address}')`

        db.query(add_user_query, async (err, data) => {
            if (err) return 0;

            console.log(data.insertId);

            return data.insertId;
        })

    }
    catch (err) {
        console.log(err);
        return err;
    }



}

module.exports = addUser;