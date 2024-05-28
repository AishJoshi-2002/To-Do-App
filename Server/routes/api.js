const express = require("express");
const router = express.Router();

const cors = require('cors'); // cross origin resource sharing
router.use(cors());

//npm install mysql
const mysql = require("mysql");

// connection pool
const pool = mysql.createPool({ // connection created
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "todo",
    port: "3306"
});


router.get('/', (req, res) => {
    res.send("From API route");
})


// LOGIN: it checks in the user details table that whether it is existing user or not
// if YES then checks the password, else redirects to the signUp page
router.post('/login', (req, res) => {

    let auth = req.headers.authorization;

    console.log(auth);
    if (auth != null && auth.startsWith("Basic ")) {
        const encoded = auth.substring("Basic ".length).trim();
        const decoded = atob(encoded);
        const colon = decoded.indexOf(':');
        const email = decoded.substring(0, colon);
        const password = decoded.substring(colon + 1);

        pool.getConnection((error, con) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Connected Successfully");
                con.query(`select * from details where email="${email}"`, (error, result) => {
                    if (error) {
                        res.send(error);
                    }
                    else {
                        if (result.length > 0) {
                            con.query(`select * from details where email="${email}" && password="${password}"`, (error2, result2) => {
                                if (error2) {
                                    res.send(error2);
                                }
                                else {
                                    if (result2.length > 0) {
                                        res.send({ message: "logged in" });
                                    }
                                    else {
                                        res.send({ message: "Incorrect password" });
                                    }
                                }
                            })
                        }
                        else {
                            res.send({ message: "SignUp required" });
                        }
                    }
                    con.release();
                });
            }
        });
    }
})


// SIGNUP: it checks whether there is an existing account with the email
// if YES then redirects to login page with alert as uaser already exists, else creates an account 
router.post('/signup', (req, res) => {
    let auth = req.headers.authorization;

    console.log("Auth " + auth);
    if (auth != null && auth.startsWith("Basic ")) {
        const encoded = auth.substring("Basic ".length).trim();
        const decoded = atob(encoded);
        const colon = decoded.indexOf(':');
        const email = decoded.substring(0, colon);
        const password = decoded.substring(colon + 1);

        pool.getConnection((error, con) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Connected Successfully");
                con.query(`insert into details values("${email}", "${password}")`, (error) => {
                    console.log("Query in process");
                    if (error) {
                        res.send({message: "User already exist"});
                        console.log(error.message);
                    }
                    else {
                        res.send({message: "signed in"});
                    }
                    con.release();
                });
            }
        }); 
    }
})


// ADDING TO TODO DATA: for the table tododata, email works as an foreign key to sort tasks of different users
router.post('/addTask', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let dueDate = req.body.dueDate;

    let auth = req.headers.authorization;

    console.log(auth);
    if (auth != null && auth.startsWith("Basic ")) {
        const encoded = auth.substring("Basic ".length).trim();
        const decoded = atob(encoded);
        const colon = decoded.indexOf(':');
        const email = decoded.substring(0, colon);

        pool.getConnection((error, con) => {
            if (error) {
                console.log(error);
            }
            else {
                con.query(`insert into tododata (email, title, description, createDate, dueDate ) values("${email}", "${title}", "${description}", CURRENT_DATE(), "${dueDate}")`, (error, result) => {
                    if (error) {
                        res.send({message: "error"});
                        console.log(error.message);
                    }
                    else {
                        res.send({message: "todo created"});
                    }
                    con.release();
                });
            }
        });
    }
})

// ___________________________________________________________________________________________


// EDIT TASK DATA FROM DATABASE: uses the id for raccessing the particular todo_task
router.patch('/edit', (req, res) => {
    let id = req.headers.id;
    let title = req.body.title;
    let description = req.body.description;
    let dueDate = req.body.dueDate;

    let auth = req.headers.authorization;

    console.log(auth);
    console.log(description);
    if (auth != null && auth.startsWith("Basic ")) {
        const encoded = auth.substring("Basic ".length).trim();
        const decoded = atob(encoded);
        const colon = decoded.indexOf(':');
        const email = decoded.substring(0, colon);

        
        pool.getConnection((error, con) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Connected Successfully");
                con.query(`update tododata set id = ${id} , title = "${title}" , description = "${description}", dueDate = "${dueDate}" where id = ${id}`, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        if (!result) {
                            console.log("Login/Signup");
                        }
                        else {
                            res.send(result);
                            console.log("todo created");
                        }
                    }
                    con.release();
                });
            }
        });
    }
})


// MARKING TASK AS DONE: uses id for marking the task as done by updating the compDate with the CURRENT_DATE()
router.delete('/done', (req, res) => {
    
    const id = req.headers.id;

    let auth = req.headers.authorization;

    console.log(auth);
    if (auth != null && auth.startsWith("Basic ")) {
        const encoded = auth.substring("Basic ".length).trim();
        const decoded = atob(encoded);
        const colon = decoded.indexOf(':');
        const email = decoded.substring(0, colon);

        pool.getConnection((error, con) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Connected Successfully");
                con.query(`update tododata set compDate = CURRENT_DATE() where id = ${id}`, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    else{
                        res.send({message: "marked as done"});
                    }
                })
            }
            con.release();
        });
    }
})


// FETCHING DATA FROM DATABASE: fetches the tasks for the logged in user where compDate = NULL
router.post('/fetch', (req, res) => {

    let auth = req.headers.authorization;

    console.log(auth);
    if (auth != null && auth.startsWith("Basic ")) {
        const encoded = auth.substring("Basic ".length).trim();
        const decoded = atob(encoded);
        const colon = decoded.indexOf(':');
        const email = decoded.substring(0, colon);
        const password = decoded.substring(colon + 1);

        pool.getConnection((error, con) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Connected Successfully");
                con.query(`select * from tododata where compDate IS NULL && email = "${email}"`, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        if (!result) {
                            console.log("Not an User");
                        }
                        else {
                            res.send(result);
                            // console.log(result[0].title);
                            console.log("todo list fetched");
                        }
                    }
                });
            }
            con.release();
        });
    }
})


// DELETE DATA FROM DATABASE: it deletes all incompleted tasks from the todo_list
router.delete('/delete', (req, res) => {

    let auth = req.headers.authorization;

    console.log(auth);
    if (auth != null && auth.startsWith("Basic ")) {
        const encoded = auth.substring("Basic ".length).trim();
        const decoded = atob(encoded);
        const colon = decoded.indexOf(':');
        const email = decoded.substring(0, colon);

        pool.getConnection((error, con) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Connected Successfully");
                con.query(`delete * from tododata where compDate IS NULL && email = "${email}"`, (error, result) => {
                    if (error) {
                        console.log(error.message);
                    }
                    else {
                        if (!result) {
                            console.log("Cannot clear List");
                        }
                        else {
                            res.send(result);
                            console.log("List cleared");
                        }
                    }
                });
            }
            con.release();
        });
    }
})

// _______________________________________


// FETCHING COMPLETED TASKS FROM DATABASE: fetches the tasks for the logged in user where compDate = NOT NULL
router.post('/fetchcomp', (req, res) => {

    let auth = req.headers.authorization;

    console.log(auth);
    if (auth != null && auth.startsWith("Basic ")) {
        const encoded = auth.substring("Basic ".length).trim();
        const decoded = atob(encoded);
        const colon = decoded.indexOf(':');
        const email = decoded.substring(0, colon);
        const password = decoded.substring(colon + 1);

        
        pool.getConnection((error, con) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Connected Successfully");
                con.query(`select * from tododata where compDate IS NOT NULL && email = "${email}"`, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        if (!result) {
                            console.log("Not an User");
                        }
                        else {
                            res.send(result);
                            console.log("completed tasks fetched");
                        }
                    }
                    con.release();
                });
            }
        });
    }
})


module.exports = router;

