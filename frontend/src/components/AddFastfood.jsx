import React, { useContext, useState } from 'react';
import FastfoodFinder from '../apis/FastfoodFinder';
import { FastfoodContext } from '../context/FastfoodContext';

const AddFastfood = () => {
  const {addFastfoods} = useContext(FastfoodContext);
  const [name, setName] = useState("");
  const [location, setLocaion] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await FastfoodFinder.post("/", {
        name,
        location,
        price_range: priceRange,

      });
      addFastfoods(response.data.data);
      console.log(response);
    } catch (err) {
      console.log(err)
    }
  }


  const inputStyle = {
    border: '2px solid darkred',
    borderRadius: '8px',
    padding: '8px',
  };

  const selectStyle = {
    border: '2px solid darkred',
    borderRadius: '8px',
    padding: '8px',
  };

  const buttonStyle = {
    border: '2px solid darkred',
    borderRadius: '8px',
    padding: '8px',
  };

  return (
    
    <div className="mb-4">
      <form action="">
        <div className="d-flex">
          <div className="flex-grow-1">
            <input value={name}  onChange ={e =>setName(e.target.value)} type="text" className="form-control" style={inputStyle} placeholder="Name" />
          </div>
          <div className="flex-grow-1 mx-2">
            <input value={location}  onChange ={e =>setLocaion(e.target.value)} className="form-control" style={inputStyle} type="text" placeholder="Location" />
          </div>
          <div className="flex-grow-2">
            <select  value={priceRange}  onChange ={e =>setPriceRange(e.target.value)} className="form-select" style={selectStyle}>
              <option value="" disabled>Price Range</option>
              <option value="1">*</option>
              <option value="2">**</option>
              <option value="3">***</option>
              <option value="4">****</option>
              <option value="5">*****</option>
            </select>
          </div>
          <div className="ml-2">
            <button onClick={handleSubmit} type="submit" className="btn btn-primary" style={buttonStyle}>Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFastfood;
