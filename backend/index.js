import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"//因为建的数据库叫test 造的表叫books
});

app.use(express.json())//用postman 进行测试的，接下来用client连接react ，换一种方式

app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is the backend")//http://localhost:8800/ 输入这一行看效果
})

app.get("/books", (req, res) => { //查
    const q = "SELECT * FROM books"
    // 你要操作的语句
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })//数据库调用 写好的语句 返回要么err 要么data
})

app.post("/books", (req, res) => { //增
    const q = "INSERT INTO books(`title`,`desc`,`price`,`cover`) VALUES (?)"
    // 活久见你妈的这个不是单引号 是1旁边的那个符号
    // const values = ["title from backend", "desc from backend", "cover from backend"]
    // 这么写保险性高
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]//搭配postman 软件一起使用

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created successfully");
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been deleted successfully.")
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "UPDATE books SET `title`= ?, `desc`= ? ,`price` = ?,`cover`= ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]


    db.query(q, [...values, bookId], (err, data) => {//...values 给values  然后bookId给 id=？
        if (err) return res.json(err)
        return res.json("Book has been updated successfully.")
    });
});


app.listen(8800, () => {
    console.log("Connected to backend!!!")
})