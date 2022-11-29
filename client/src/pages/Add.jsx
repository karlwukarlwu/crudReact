import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';


const Add = () => {
  const [book, setBooks] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setBooks(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };//传说中的钩子。。。

  const handleClick = async e =>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/books",book)
      navigate("/")//提交以后回到主页
    }catch(err){
      console.log(err)
    }
  }//这个是提交的功能

  console.log(book)

  return (
    <div className='form'>
      <h1>Add a new Book</h1>
      <input type="text" placeholder="title" onChange={handleChange} name='title' />
      <input type="text" placeholder="desc" onChange={handleChange} name='desc' />
      <input type="number" placeholder="price" onChange={handleChange} name='price' />
      <input type="text" placeholder="cover" onChange={handleChange} name='cover' />
      {/* onchange 搭配上面的钩子动态获取输入 */}

      <button className='formButton' onClick={handleClick}>Add</button>
      {/* 有一种说法是如果没有add 上去是因为这里的传入参数和index 的 
      app.post 的 const q 和value定义的不符 */}

    </div>
  )
}

export default Add