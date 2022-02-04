import { AddTodoList } from './components/AddTodoList';
import { ResetDatabaseButton } from './components/ResetDatabaseButton';
import { TodoLists } from './components/TodoLists';
import './App.css';

function App() {
  return (
    <div>
      <TodoLists />
      <AddTodoList />
      <ResetDatabaseButton />
    </div>
  );
}

export default App;
