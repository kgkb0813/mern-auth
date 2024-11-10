
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';

export default function App() {
  return (
    // <BrowserRouter>
    <BrowserRouter
      future={{v7_relativeSplatPath: true, v7_startTransition: true}}  // Warning Message 제거
    >
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}





// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import Profile from './pages/Profile';
// import Header from './components/Header';

// const router = createBrowserRouter([
//   { path: '/', element: (<> <Header /> <Home /> </>) },
//   { path: '/about', element: (<> <Header /> <About /> </>) },
//   { path: '/sign-in', element: (<> <Header /> <SignIn /> </>) },
//   { path: '/sign-up', element: (<> <Header /> <SignUp /> </>) },
//   { path: '/profile', element: (<> <Header /> <Profile /> </>) },
// ]);

// function App() {
// <RouterProvider
//   router={router}
//   future={{ v7_relativeSplatPath: true }} // Warning Message 제거
// />
// }

// export default App;







