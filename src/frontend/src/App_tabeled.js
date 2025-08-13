// import './App.css';
// import {useEffect, useState} from "react";
// import axios from "axios";
// import {Grid} from "@mui/material";
//
// import ResponsiveAppBar from './components/ResponsiveAppBar'
// import MyMap from "./components/map/MyMap";
//
// const App = () => {
//     const API_URL = "http://localhost:8080/books";
//     const [artillery, setBooks] = useState([]);
//     const [inputAuthor, setInputAuthor] = useState("");
//     const [inputTitle, setInputTitle] = useState("");
//     const [favCheck, setFavCheck] = useState(false);
//
//     const handleChangeAuthor = (event) => {
//         setInputAuthor(event.target.value);
//     }
//     const handleChangeTitle = (event) => {
//       setInputTitle(event.target.value)
//     }
//
//     const fetchBooks = () => {
//         axios.get(API_URL).then((r) => setBooks(r.data)).catch((e) => console.log(e));
//     }
//
//     useEffect(fetchBooks, []);
//
//     const addAuthor = (event) => {
//         event.preventDefault();
//         console.log(inputAuthor);
//         console.log(inputTitle)
//         axios.post(API_URL, {title: inputTitle,
//             author: inputAuthor, favorite: false
//         }
//         ).then(function () {
//             fetchBooks();
//         })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }
//
//     const handleFavorite = async (id, favorite) => {
//         const res_2 = await axios.get('http://localhost:8080/books/'+id).then(
//             (r) => {
//
//                 if(r.data.favorite === true) {
//                     favorite = false;
//                 } else if(r.data.favorite === false) {
//                     favorite = true;
//                 }
//                 const res =  axios.patch('http://localhost:8080/books/'+id, { favorite: favorite })
//                     .then((r) => (fetchBooks()));
//
//             }
//         )
//     }
//
//     const handleDelete=(id) =>{
//         axios.delete(API_URL+"/"+id).then(fetchBooks);
//     }
//   return (<div className="App">
//         <header className="App-header">
//         <MyMap  />
//             <Grid container spacing={2} columns={12}>
//                 <Grid item xs={12}>
//                      <ResponsiveAppBar />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <h1>My Library</h1>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <label htmlFor="Title">Title: </label>
//                   <input name="title" onChange={handleChangeTitle}/> <br /><br />
//                     <label htmlFor="Author">Author: </label>
//                     <input name="author" onChange={handleChangeAuthor}/>
//                     <button type="button" onClick={addAuthor}>Add Book</button>
//                 </Grid>
//                 <Grid item xs={2}>
//                   <br />
//                 </Grid>
//                 <Grid item xs={8}>s
//                     <div className="artillery">
//                         {artillery.map((artillery) => (
//                             <ul>
//                                 <li> {(artillery.favorite) ?   <b>{artillery.title}</b> : artillery.title } {artillery.author}
//
//                                     |
//
//                                     <button type="button" onClick={() => handleFavorite(artillery.id, artillery.favorite)}>Favorite</button>
//
//                                     |
//
//                                     <button type="button" onClick={() => handleDelete(artillery.id)}>Remove</button>
//                                 </li>
//                             </ul>
//                         ))}
//                     </div>
//                 </Grid>
//                 <Grid item xs={2}>
//                     <br />
//                 </Grid>
//             </Grid>
//
//         </header>
//     </div>
// );
// }
//
// export default App;
