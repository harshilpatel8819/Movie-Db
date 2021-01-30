import 'antd/dist/antd.css';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import Movie from './screen/Movie/Movie';
import store from './store/store';


const App: FC = () => <Provider store={store}><Movie /> </Provider>;

export default App;
