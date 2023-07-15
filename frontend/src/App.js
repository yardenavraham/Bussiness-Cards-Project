
import { useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';
// import { createItem, getItems } from './functions';
import './App.css';
import {
  Button,
  Box,
  Container,
  FormControl,
  Typography,
  Grid, TextField
} from "@mui/material";
import axios from 'axios';


function App() {
  const url = "http://localhost:5000/items";
  // const getItems = () => axios.get(url);
  // const createItem = (item) => axios.post(url, item);
  const [item, setItem] = useState({
    'name': '',
    'title': '',
    'image': '',
    'phone': '',
    'type': '',
    'site': ''
  });
  const [items, setItems] = useState([])
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const result = await createItem(item);

    setItems([...items, result]);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getItems();
      console.log('fetch data;m', result)
      setItems(result)
    }
    fetchData()
  }, [])


  const getItems = async () => {
    try {
      const { data } = await axios.get(url);
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const createItem = async (item) => {
    try {
      const { data } = await axios.post(url, item);
      return data
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="App">
      <h1 style={{
        fontFamily: "Comic Sans MS, Comic Sans, cursive",
        fontWeight: '400',
        color: '#656e91'
      }}>My bussiness cards</h1>
      <div className="container" >
        <form action="" onSubmit={onSubmitHandler}>
          <div >
            <button>ADD CARD</button>
          </div>
          <div style={{ margin: '2rem' }}>
            <TextField onChange={e => setItem({ ...item, name: e.target.value })} id="outlined-basic" label="Name" variant="outlined" />
            <TextField onChange={e => setItem({ ...item, phone: e.target.value })} id="outlined-basic" label="Phone" variant="outlined" />
            <TextField onChange={e => setItem({ ...item, type: e.target.value })} id="outlined-basic" label="Type" variant="outlined" />
            <TextField onChange={e => setItem({ ...item, site: e.target.value })} id="outlined-basic" label="Site" variant="outlined" />
            <TextField onChange={e => setItem({ ...item, email: e.target.value })} id="outlined-basic" label="Email" variant="outlined" />

            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => setItem({ ...item, image: base64 })}
            /></div>

        </form>
        {items?.map(item => (

          <div className="card" key={item._id} style={{ border: '3px solid #1976d2', margin: '5px' }}>
            <p>{item.name}</p>
            <p>{item.phone}</p>
            <p>{item.type}</p>
            <p>{item.email}</p>
            <p>{item.site}</p>
            <img className="activator" style={{
              objectFit: 'cover',
              width: '100px',
              height: '100px'
            }} src={item.image} />
          </div>
        ))}
      </div></div>
  );
}

export default App;
