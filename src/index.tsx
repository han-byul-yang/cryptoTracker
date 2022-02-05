import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ThemeProvider} from "styled-components";
import {QueryClient, QueryClientProvider} from 'react-query'
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    <QueryClientProvider client={queryClient}>
    <App /> {/*ThemeProvider로 감싸면 App에서 ThemeProvider의 모든 것에 접근 할 수 있음*/}
    </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
