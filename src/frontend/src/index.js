import "./App.css"
import "./index.css"
import {createRoot} from 'react-dom/client';

import Main from "./Main";

// 👇️ IMPORTANT: make sure to specify correct ID
// must be the ID of the div element in your index.html file
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
    <Main />
);