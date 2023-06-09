import React from 'react'
import Header from '../components/Header'
import AddFastfood from '../components/AddFastfood'
import FastfoodList from '../components/FastfoodList'

const Home = () => {
  return (
    <div>
      <Header/>
      <AddFastfood/>
      <FastfoodList/>
    </div>
  )
}

export default Home
