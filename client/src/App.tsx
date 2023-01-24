import { MainLayout } from 'components/layouts/MainLayout';
import { Counter } from 'features/counter/Counter';
import './App.css';

function App() {
   return (
      <div className="App">
         <MainLayout>
            <Counter />
         </MainLayout>
      </div>
   );
}

export default App;
