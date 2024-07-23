import React, { useState, useEffect } from 'react';

const ApiFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

  //API to fetch data
  const fetchData = async () => {
    setLoading(true); //set loading to show loading prompt
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
      if (!response.ok) { //if error
        throw new Error('Network response was not ok'); 
      }
      const newData = await response.json();
      setData(newData);
      setLoading(false); 
    } catch (error) {
      setError('Fetching error: ', error); //Debugging code for fetch
      setLoading(false);
    }
  };

  //re-renders when limit changes
  useEffect(() => {
    fetchData();
  }, [limit]);

  //handles infinite scroll 
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
      setLimit((prevLimit) => prevLimit + 10);
    }
  };

  //re renders when value of loading changes
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  if (error) {
    return <div><h1>Error: {error.message}</h1></div>;
  }

  return (
    <div>
      <h1>Data from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {loading && <div>Loading more data...</div>}
    </div>
  );
};

export default ApiFetch;
