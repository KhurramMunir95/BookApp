import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [price, setPrice] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:3000/books/detail/${id}`)
    .then(res => {
       setTitle(res.data.title);
       setAuthor(res.data.author);
       setDescription(res.data.description);
       setPublishedYear(res.data.publishedYear);
       setPrice(res.data.price);
       setLoading(false);
    })
    .catch(err => {
       console.log(err);
       setLoading(false);
    })

  }, []);

  const handleEditBook = async() => {
    const data = {
      title,
      author,
      description,
      publishedYear,
      price
    }
    setLoading(true);
    axios
      .put(`http://localhost:3000/books/update/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            className='w-full px-4 py-2 border border-gray-300 rounded-md'
            type='text'
            placeholder='Enter title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            className='w-full px-4 py-2 border border-gray-300 rounded-md'
            type='text'
            placeholder='Enter Author Name'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input
            className='w-full px-4 py-2 border border-gray-300 rounded-md'
            type='text'
            placeholder='Enter book description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            className='w-full px-4 py-2 border border-gray-300 rounded-md'
            type='text'
            placeholder='Enter publish year'
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Price</label>
          <input
            className='w-full px-4 py-2 border border-gray-300 rounded-md'
            type='text'
            placeholder='Enter book price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}

export default EditBook