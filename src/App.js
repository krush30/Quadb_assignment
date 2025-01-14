import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Body from './Body';

function App() {
  return (
    <Provider store={store}>
      <Body />
    </Provider>
  );
}

export default App;
