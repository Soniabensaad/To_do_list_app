import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FastfoodContext } from '../context/FastfoodContext';
import FastfoodFinder from '../apis/FastfoodFinder';
import { useNavigate } from 'react-router';
const UpdateFastfood = (props) => {
    const {id} = useParams();
    let navigate = useNavigate();
    const {fastfood} = useContext(FastfoodContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          const response = await FastfoodFinder.get(`/${id}`);
          console.log(response.data);
          setName(response.data.name || "");
          setLocation(response.data.location || "");
          setPriceRange(response.data.price_range || "");
        };
        fetchData();
    }, [id]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFastfood = await FastfoodFinder.put(`/${id}`, {
          name,
          location,
          price_range: priceRange,
        });
        navigate("/");

        
      };

      
  return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
    
    <form action="">
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="name">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} id="name" className="form-control" type="text" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="location">Location</label>
        <input  value={location} onChange={(e) => setLocation(e.target.value)} id="location" className="form-control" type="text" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="price_range">Price Range</label>
        <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)} id="price_range" className="form-control" type="number" />
      </div>
      <button type="submit"  onClick={handleSubmit} style={{ marginTop: '10px' }} className="btn btn-danger">Submit</button>
    </form>
  </div>

  )
}

export default UpdateFastfood
