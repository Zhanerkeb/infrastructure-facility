import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { history } from './utils';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ConnectedRouter history={history}> */}
        <BrowserRouter>
        <ConfigProvider
          locale={locale}
          theme={{
            token: {
              colorPrimary: '#7F8BF6',
              fontFamily: 'Montserrat',
              colorFillSecondary: '#E8E8E8',
              colorTextBase: '#000',
              colorTextSecondary: '#707070',
              colorSuccessBg: '#2DF229',

            },
          }}
        >
          <App />
        </ConfigProvider>
   
        </BrowserRouter>
      {/* </ConnectedRouter> */}
    </Provider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
