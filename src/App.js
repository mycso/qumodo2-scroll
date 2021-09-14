import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Users from './components/Users';
// import Pagination from './components/Pagination';
import './App.css';

function App() {
  const [ dataState, setDataState ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(true);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ usersPerPage ] = useState(8);

  function handleSearch () {
    fetch(`https://api.github.com/search/repositories?q=${searchTerm}&page=${currentPage}&per_page=30`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message) {
        setError(data.message);
      } else {
        setDataState(data.items);
        setLoading(false);
        setCurrentPage(currentPage + 1)
      }
    })
  }

  function fetchNextPage () {
    fetch(`https://api.github.com/search/repositories?q=${searchTerm}&page=${currentPage}&per_page=30`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message) {
        setError(data.message);
      } else {
        setDataState([...dataState, ...data.items]);
        setLoading(false);
        setCurrentPage(currentPage + 1)
      }
    })
  }

  // get current info
  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = dataState.slice(indexOfFirstUser, indexOfLastUser);
  
  //Change page 
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <div className="navbar">
        Github Search
      </div>
      <div className="search">
      <Form>
        <Form.Group>
          <Form.Input name='github user' placeholder='Github user' onChange={event => {setSearchTerm(event.target.value)}}/>
          <Button data-testid="submit" type='submit' onClick={handleSearch}>Submit</Button>
        </Form.Group>
      </Form>
      {/* <Pagination 
        usersPerPage={usersPerPage} 
        totalUsers={dataState.length} 
        paginate={paginate} 
      /> */}
      </div>
      <Users users={dataState} searchTerm={searchTerm} loading={loading} />
      <Button data-testid="submit" type='submit' onClick={fetchNextPage}>Load More</Button>
    </div>
  );
}

export default App;
