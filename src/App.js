import logo from './logo.svg';
import './App.css';
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [categories, setCategories] = React.useState([]);
  const [bookmarks, setBookmarks] = React.useState([]);
  const [category, setCategory] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [isAddNewCategory, setIsAddNewCategory] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCategoryChange = (event) => {
    console.log(event.target.value)
    setCategory(event.target.value);
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  }
  const onUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const onsubmit = (event) => {
    const categories = localStorage.getItem('categories');
    if(categories){
      let parsedData = JSON.parse(categories);
      if(parsedData.indexOf(category)===-1){
        parsedData.push(category)
        setCategories(parsedData)
        localStorage.setItem('categories', JSON.stringify(parsedData))
      }

    }else{
      let categories = []
      categories.push(category)
      setCategories(categories)
      localStorage.setItem('categories', JSON.stringify(categories))
    }


    // for bookmark
    let bookmark = {
      category,
      url,
      title
    }
    const bookmarks = localStorage.getItem('bookmarks')
    if(bookmarks){
      let parsedData = JSON.parse(bookmarks)
      parsedData.push(bookmark)
      setBookmarks(parsedData)
      localStorage.setItem('bookmarks', JSON.stringify(parsedData))
    }else{
      let bookmarks = []
      bookmarks.push(bookmark)
      setBookmarks(bookmarks)
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }

    setIsAddNewCategory(false)
    handleClose()
    console.log(categories)
  }

  useEffect(()=>{
    const categories = localStorage.getItem('categories')
    const bookmarks = localStorage.getItem('bookmarks')
    if(categories){
      setCategories(JSON.parse(categories))
    }
    if(bookmarks){
      setBookmarks(JSON.parse(bookmarks))
    }
  },[])
  return (
    <div className="App">
      <div className="btn_container">
      <Button variant="contained">Add Category</Button>
      <Button variant="contained" onClick={handleClickOpen}>Add Bookmark</Button>
      </div>

      <div className='cat_book_container'>
      <div>
        {
          categories.map((res,i)=>{
            return (
              <div key={i}>
                <li>{res} - <Button variant="contained">Details</Button></li>
              </div>
            )
          })
        }
      </div>
      <div className='book_container'>
        {
          bookmarks.map((res,i)=>{
            return (
              <Card key={i} sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <a href={res.url} target='_blank'>{res.title}</a>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {res.url}
                  </Typography>
                  <Typography variant="body2">
                    {res.category}
                  </Typography>
                </CardContent>
              </Card>
            )
          })
        }
      </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Bookmark</DialogTitle>
        <DialogContent>
          <TextField
            onChange={onTitleChange}
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={onUrlChange}
            autoFocus
            margin="dense"
            id="name"
            label="URL"
            type="text"
            fullWidth
            variant="standard"
          />
          <div className='category_field'>
          <TextField
          id="outlined-select-currency"
          select
          label="Select Category"
          value={category}
          onChange={onCategoryChange}
          variant="filled"
          fullWidth
          disabled={isAddNewCategory}
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <IconButton aria-label="delete" onClick={()=>setIsAddNewCategory(true)}>
          <AddIcon/>
        </IconButton>
        </div>
        {
          isAddNewCategory&&
          <TextField
            onChange={onCategoryChange}
            autoFocus
            margin="dense"
            id="name"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
          />
        }
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onsubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
