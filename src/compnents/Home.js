import React from 'react'
import Notes from './Notes';

const Home = (props) => {
  const {showAlert} = props;
  return (
    <div className='contaier my-3'>
      
      <Notes showAlert = {showAlert}></Notes>
    </div>
  )
}

export default Home
