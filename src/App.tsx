import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import { persistor, store } from './redux/store';
import router from './routes/All.routes';
import './styles/index.css';

function App() {
  const [windowHeight, setWindowHeight] = useState(false);

  useEffect(() => {
    Aos.init({
      offset: 20,
    });
    const handleScroll = () => {
      setWindowHeight(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        {!windowHeight && (
          <button type="button" className="scrollToDown cursor-default" />
        )}
        {/* scroll to top */}
        {windowHeight && (
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="scrollToTop"
          />
        )}
      </PersistGate>
      <Toaster />
    </Provider>
  );
}

export default App;
