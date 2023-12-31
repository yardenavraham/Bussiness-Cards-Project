
import { useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { jsPDF } from "jspdf";
import CardComp from './Components/CardComp';
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

  //useStates
  const [item, setItem] = useState({
    'name': '',
    'title': '',
    'image': '',
    'phone': '',
    'type': '',
    'site': ''
  });
  const [items, setItems] = useState([])

  //useEffect

  useEffect(() => {
    const fetchData = async () => {
      const result = await getItems();
      console.log('fetch data;m', result)
      setItems(result)
    }
    fetchData()
  }, [])

  //Functions

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const result = await createItem(item);

    setItems([...items, result]);
  }

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
      
      //Download PDF card

      var doc = new jsPDF()

      var startY = 10; // Starting Y position for text and image

      doc.text(item.name + '\n' + item.phone + '\n' + item.type + '\n' + item.email + '\n' + item.site, 10, startY);

      var img = new Image();
      img.src = item.image;

      // Wait for the image to load
      img.addEventListener('load', function () {
        doc.addImage(img, 'PNG', 10, startY + 30, 50, 50); // Adjust the coordinates and size as per your requirements

        // Save the PDF
        doc.save('bussiness-card.pdf');
      });

      //Save to mongoDB
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

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {items?.map(item => (
            <CardComp item={item}></CardComp>
          ))}
        </div>
      </div></div >
  );
}

export default App;
