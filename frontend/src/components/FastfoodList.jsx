import React, {useContext, useEffect} from 'react';
import FastfoodFinder from '../apis/FastfoodFinder';
import { FastfoodContext } from '../context/FastfoodContext';
import { useNavigate } from 'react-router';

const FastfoodList = (props) => {
    const {fastfood, setFastfood} = useContext(FastfoodContext);
    let navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await FastfoodFinder.get("/");
                console.log(response.data);
                setFastfood(response.data);
            } catch (err) {
                console.error(err);
            }
        }
       fetchData();

    },[]);
    const handleDelete = async (e, id) => {
      e.stopPropagation();
      try {
        const response = await FastfoodFinder.delete(`/${id}`);
        setFastfood(fastfood.filter(todos => {
          return todos.id !== id;
        }))
      } catch (err) {
        console.log(err)
      }
    };

    const handleUpdate = (e, id) => {
      e.stopPropagation();
      navigate(`/fastfood/${id}/update`);
    }

    const handleRestaurantSelect = (id) => {
      navigate(`/fastfood/${id}`);
    }
  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead className="table-danger">
          <tr>
            <th scope="col">Fastfood</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
            {fastfood && fastfood.map((todos) =>  {
                return(
                    <tr  onClick={() => handleRestaurantSelect(todos.id)} key={todos.id}>
                       <td>{todos.name}</td>
                       <td>{todos.location}</td>
                       <td>{"*".repeat(todos.price_range)}</td>
                       <td>reviews</td>
                       <td>
                        <button onClick={(e) => handleUpdate(e, todos.id)} className="btn btn-success">Update</button>
                        </td>
                       <td>
                        <button onClick={(e) => handleDelete(e, todos.id)} className="btn btn-warning">Delete</button>
                        </td>
                    </tr> 
                )

            })}
        {/*
          <tr>
            <td>Burger</td>
            <td>New York</td>
            <td>**</td>
            <td>Rating</td>
            <td><button className="btn btn-success">Update</button></td>
            <td><button className="btn btn-warning">Delete</button></td>
          </tr>
          <tr>
            <td>Burger</td>
            <td>New York</td>
            <td>**</td>
            <td>Rating</td>
            <td><button className="btn btn-success">Update</button></td>
            <td><button className="btn btn-warning">Delete</button></td>
          </tr>
        */}
        </tbody>
      </table>
    </div>
  );
};

export default FastfoodList;
