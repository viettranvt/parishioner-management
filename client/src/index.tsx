import { CssBaseline } from '@mui/material';
import dateFnsVi from 'date-fns/locale/vi';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import App from './App';
import { history, store } from './app/store';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
registerLocale('vi', dateFnsVi);

root.render(
   <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <Router history={history}>
            <CssBaseline />
            <App />
         </Router>

         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
      </LocalizationProvider>
   </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
