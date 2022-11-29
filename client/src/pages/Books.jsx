import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import "../style.css"


const Books = () => {
  const [books, setBooks] = useState([])//我怀疑这里是一个字典

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books")//这里是你要输入的链接
        setBooks(res.data);// 这里是当后端布置完cors后进行的拿去数据
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
    fetchAllBooks()
  }, [])
  //这上面这一堆是要和后端交互的，要求后端有创造一个对应的对象

  const handleDelete = async (id)=>{
    try{
      await axios.delete("http://localhost:8800/books/"+id)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }     //这个是删除功能

  return <div>
    <h1>Book show</h1>
    <div className='books'>
      {books.map(book => (
        <div className="book" key={book.id}>
          {book.cover && <img src={book.cover} alt='' />}
          <h2>{book.title}</h2>
          <p>{book.desc}</p>
          <span>{book.price}</span>

          <button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
          <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
          {/* 一种动态跳转页面还带着id的写法 
          和delete不一样，因为delete仅仅是删除不用跳转*/}
        </div>
      ))}
    </div>
    <button><Link to="/add">Add new Book</Link></button>

    {/* link标签是用于连接与该页面相关的其他页面的标签，但是，此标签与网站的外观无直接关系。

所以基本上它是在head标签中写的。 
区分react中Link 和正常的link标签 */}
  </div>

}

export default Books