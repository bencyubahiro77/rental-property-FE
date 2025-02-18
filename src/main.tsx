import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import {store} from './redux/store.ts'
import { Provider } from 'react-redux'
import { Toaster } from "@/components/ui/toaster";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <React.StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <App />
            <Toaster />
         </Provider>
      </BrowserRouter>
   </React.StrictMode>
);