import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './components/Home'
import RootLayout from './layout/RootLayout'
import { BrowserRouter,createBrowserRouter,RouterProvider } from 'react-router-dom'
import FitFeatures from './components/FitFeatures'
import HowItWorks from './components/HowItWorks'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Signup from './components/Signup'
import Feeds from './components/Feeds'
import Browse from './components/Browse'
import { Challenge } from './components/Challenge'
import { challengeLoader } from './components/Challenge'
import MyChallenge from './components/MyChallenge'
import BMI from './components/BMI'
import OTPAuthentication from './components/OTPAuthentication'

const router=createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    errorElement:<NotFound />,

    children:[
      {
        path:'/',
        element:<Home/>        
      },
      {
        path:'/features',
        element:<FitFeatures/>        
      },
      {
        path:'/howitworks',
        element:<HowItWorks/>,
              
      },
      {
        path:'/signin',
        element:<Login/>,
        
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/feeds',
        element:<Feeds/>,
      },
      {
        path:'/browse',
        element:<Browse/>,
        // loader:chlngDetailLoader,        
      },
      {
        path:'/challenge/:id',
        element:<Challenge/>,
        loader:challengeLoader,
      },      
      {
        path:'/mychallenge/:chlngid/:userid/:duration/:enddate/:daysPass/:title/:cat/:goal',
        element:<MyChallenge/>,
      },
      {
        path:'/BMI',
        element:<BMI/>,
      },
      {
        path:'/otpauth/:newuserid',
        element:<OTPAuthentication/>,
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
