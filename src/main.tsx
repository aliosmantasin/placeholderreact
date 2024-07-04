import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/style/index.css"
import Routes from '../src/pages/Routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={Routes} />
  </>,
);