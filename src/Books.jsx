import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import booksData from './booksData.json'
import './styles/book.scss'

const Books = ({ basket, updateBasket }) => {
  const categories = ['horror', 'fantasy', 'mystery', 'sci-fi']
  const [activeCategories, updateActiveCategories] = useState([])
  const [booksArr, updateBooksArr] = useState(booksData.books)

  const toggleItem = (array, value, updateArray) => {
    const existInArray = array.findIndex(item => item === value);
    if (existInArray >= 0) {
      const updatedArray = [...array]
      updatedArray.splice(existInArray, 1)
      updateArray(updatedArray)
    } else {
      updateArray([...array, value])
    }
  }

  const addToBasket = (book) => {
    const existInArray = basket.findIndex(item => item.id === book.id);
    if (existInArray >= 0) {
      const updatedArray = [...basket]
      updatedArray.splice(existInArray, 1)
      updateBasket(updatedArray)
    } else {
      updateBasket([...basket, book])
    }
  }


  useEffect(() => {
    if (activeCategories.length) {
      updateBooksArr(booksData.books.filter(list => activeCategories.find(category => category === list.category)));
    } else {
      updateBooksArr(booksData.books)
    }
  }, [activeCategories])

  console.log(basket);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center">
          <h3 className='mb-3'>Categories</h3>
          {categories.map(category =>
            <button className={`filter__button mb-3${activeCategories.find(list => list === category) ? ' filter__button--active' : ''} ml-3`} key={category} onClick={() => toggleItem(activeCategories, category, updateActiveCategories)}>{category}</button>
          )}
        </div>
      </div>
      <div className="row justify-content-center justify-content-sm-start mt-5">
        {booksArr.length ?
          booksArr.map((book) => (
            <div className="col-6 col-md-3" key={book.id}>
              <div className="book">
                <img className='book__img' src={book.image} alt="" />
                <h3 className='book__title'>{book.title}</h3>
                <p className='book__description'>{book.description}</p>
                <button type='button' className={`book__button ${basket.find(item => item.id === book.id) ? 'book__button--active' : ''}`} onClick={() => addToBasket(book)}>{basket.find(item => item.id === book.id) ? 'Remove' : 'Add'}</button>
              </div>
            </div>
          ))
          :
          <div className="col">
            <h4>unfortunately we don't have any books available.</h4>
          </div>}
      </div>

    </div>
  )
}
export default Books;