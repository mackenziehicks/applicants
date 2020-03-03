import React, { useState, useEffect } from 'react';
import Applicant from './components/applicant'

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [applicants, setApplicants] = useState([]);
  
  async function fetchData() {
    const res = await fetch('https://private-041255-sakura3.apiary-mock.com/applicants');

    if (res.ok) {
      const data = await res.json();
      setApplicants(data);
    } else {
      console.error(res.error);
    }
  }
  
  const sortApplicants = (event) => {
    let copy = [...applicants];

    let sorted = copy.sort((a,b) => {
      if (event.target.value === 'credit_indicator') {
        return a[event.target.value] < b[event.target.value] ? 1 : -1;
      }
      return a[event.target.value] > b[event.target.value] ? 1 : -1;
    });

    setApplicants(sorted);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="container my-3">
      <Row className="justify-content-center"> 
        <Col xs lg="8">
          <div className="d-flex justify-content-between align-items-center">
            <h1 style={{color: '#277ba0'}}>Applicants</h1>
            <Form.Group>
              <Form.Control as="select" onChange={sortApplicants} defaultValue="null">
                <option value="null" disabled>Sort</option>
                <option value="created_at">Application date</option>
                <option value="last_name">Last name</option>
                <option value="credit_indicator">Credit indicator</option>
              </Form.Control>
            </Form.Group>
          </div>
          {applicants.map((applicant) => <Applicant key={applicant.id} applicant={applicant} />)}
        </Col>
      </Row>
    </Container>
  );
}

export default App;