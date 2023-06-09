import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { FastfoodContext } from '../context/FastfoodContext';
import FastfoodFinder from '../apis/FastfoodFinder';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const FastfoodDetailPage = () => {
  const { id } = useParams();
  const { selectedFastfood, setSelectedFastfood } = useContext(FastfoodContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FastfoodFinder.get(`/${id}`);
        console.log(response);
        setSelectedFastfood(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {selectedFastfood && (
        <>
          <h1 className='text-center display-1'>{selectedFastfood.fastfood.name}</h1>
          <div className="mt-3">
            <Reviews reviews={selectedFastfood.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default FastfoodDetailPage;
