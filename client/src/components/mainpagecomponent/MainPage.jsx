import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";

function  MainPage(){
//   const initialFormData = {
//     name: '',
//     price: '',
//     domain: '',
//     programType: 'ft',
//     registrations: 'yes',
//     description: '',
//     placementAssurance: 'Yes',
//     imageUrl: '',
//     universityName: '',
//     facultyProfile: '',
//     learningHours: '',
//     duration: '',
//     certificateDiploma: '',
//     eligibilityCriteria: '',
//   };

//   const [formData, setFormData] = useState(initialFormData);
  // const [validated, setValidated] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSaveDraft = () => {
//     // Add logic to save draft
//     console.log('Saving draft:', formData);
//   };

//   const handleSaveProgram = () => {
//     // Validate form
//     const form = document.getElementById('programForm');
//     if (form.checkValidity() === false) {
//       setValidated(true);
//       return;
//     }

//     // Add logic to save program
//     console.log('Saving program:', formData);
//   };

//   const handleDelete = () => {
//     // Add logic to delete program
//     console.log('Deleting program');
//   };
console.log("aaye");
const [programs, setPrograms] = useState([]);
const [formData, setFormData] = useState({
  name: '',
  price: '',
  domain: '',
  type: '',
  registrations: '',
  description: '',
  placementAssurance: '',
  imageUrl: '',
  universityName: '',
  facultyProfile: '',
  learningHours: '',
  certificate: '',
  eligibilityCriteria: '',
});


const [isEditing, setIsEditing] = useState(false);
const [selectedProgram, setSelectedProgram] = useState(null);
const [editedProgram, setEditedProgram] = useState({ ...selectedProgram });


const handleEditClick = () => {
  setIsEditing(true);
};

const handleSaveClick = () => {
  // Perform API call to update the program details
  onEditSubmit(editedProgram);

  // Disable editing mode after saving
  setIsEditing(false);
};

const handleCancelClick = () => {
  // Reset the editedProgram to the original selectedProgram
  setEditedProgram({ ...selectedProgram });

  // Disable editing mode
  setIsEditing(false);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEditedProgram((prevProgram) => ({
    ...prevProgram,
    [name]: value,
  }));
};
const [searchInput, setSearchInput] = useState('');
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
const onEditSubmit = async (editedProgram) => {
  try {
    // Make an API call to update the program details
    const response = await fetch(`/programs/updateprogram/${selectedProgram.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProgram),
    });

    if (response.ok) {
      // Update the state with the edited program details
      setSelectedProgram(editedProgram);
      console.log('Program details updated successfully.');
    } else {
      console.error('Failed to update program details.');
    }
  } catch (error) {
    console.error('Error updating program details:', error);
  }
};

useEffect(() => {
  // Function to fetch programs from the API
  const fetchPrograms = async () => {
    try {
      const response = await fetch('/getallprograms');
      const data = await response.json();
      // Assuming the API response is an array of programs
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  // Call the fetchPrograms function when the component mounts
  fetchPrograms();
}, []); // The empty dependency array ensures that the effect runs only once when the component mounts

const handleProgramxClick = (programId) => {
  // Handle the program click
  console.log('Program clicked:', programId);
};
const handleSaveDraft = () => {
  // Implement save draft logic here
  axios.post('/programs/save')
  .then(response => {
      console.log(response.data);
  })
  .catch(error => {
      console.error(error);
  });
  console.log('Save Draft:', formData);
};

const handleUpdate = () => {
  // Implement save logic here
  axios.post(`/programs/updateprogram/${selectedProgram.id}`,selectedProgram)
  .then(response => {
      console.log(response.data);
  })
  .catch(error => {
      console.error(error);
  });
  console.log('Save:', formData);
};
const handleSave = () => {
  // Implement save logic here
  axios.post('/programs/save',formData)
  .then(response => {
      console.log(response.data);
  })
  .catch(error => {
      console.error(error);
  });
  console.log('Save:', formData);
};

const handleDelete = () => {
  axios.post(`/programs/deleteprogram/${selectedProgram.id}`,)
  .then(response => {
      console.log(response.data);
  })
  .catch(error => {
      console.error(error);
  });
  // Implement delete logic here
  console.log('Delete');
};



  // const [searchInput, setSearchInput] = useState('');

  const handleProgramClick = (program) => {
    if (selectedProgram === null) {
      console.log("hello");
      setSelectedProgram(program);
    }
    else{
    axios.get(`/programs/getprogrambyid/${program}`,)
    .then(response => {
        console.log(response.data);
        setSelectedProgram(response.data);
    })
    .catch(error => {
        console.error(error);
    });
    // Implement delete logic here
    console.log('Delete');
  }
  };

  const renderProgramContent = () => {
    if (selectedProgram === null) {
      return (
        <div>
          <h2>Add Program</h2>
          <p>* Required to save as Program</p>
          <Form>
        <Row>
          <Col>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formDomain">
              <Form.Label>Domain</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Domain"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="formPlacementAssurance">
  <Form.Label> </Form.Label>
  <Form.Check
    type="checkbox"
    label="Placement Assurance"
    name="placementAssurance"
    checked={formData.placementAssurance}
    onChange={handleChange}
  />
</Form.Group>
  </Col>
        </Row>
<h3>Information</h3>
        <Row>
  <Col>
    <Form.Group controlId="formName">
      <Form.Label>Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
  <Col>
  <Form.Group controlId="formProgramType">
  <Form.Label>Program Type</Form.Label>
  <div>
    <Form.Check
      inline
      type="radio"
      label="FT"
      name="type"
      value="FT"
      checked={formData.type === "FT"}
      onChange={handleChange}
    />
    <Form.Check
      inline
      type="radio"
      label="PT"
      name="type"
      value="PT"
      checked={formData.type === "PT"}
      onChange={handleChange}
    />
  </div>
</Form.Group>
  </Col>
  <Col>
  <Form.Group controlId="formRegistrations">
  <Form.Label>Registrations Open</Form.Label>
  <div>
    <Form.Check
      inline
      type="radio"
      label="Yes"
      name="registrations"
      value="Yes"
      checked={formData.registrations === "Yes"}
      onChange={handleChange}
    />
    <Form.Check
      inline
      type="radio"
      label="No"
      name="registrations"
      value="No"
      checked={formData.registrations === "No"}
      onChange={handleChange}
    />
  </div>
</Form.Group>
  </Col>
</Row>

<Row>
  <Col>
    <Form.Group controlId="formUniversityName">
      <Form.Label>University Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter University Name"
        name="universityName"
        value={formData.universityName}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
  <Col>
    <Form.Group controlId="formCertificateDiploma">
      <Form.Label>Certificate/Diploma</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Certificate/Diploma"
        name="certificate"
        value={formData.certificate}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
  <Col>
    <Form.Group controlId="formFacultyProfile">
      <Form.Label>Faculty Profile</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Faculty Profile (LinkedIn URL)"
        name="facultyProfile"
        value={formData.facultyProfile}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
</Row>
<Row>
  <Col>
    <Form.Group controlId="formLearningHours">
      <Form.Label>Learning Hours/Duration</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Learning Hours"
        name="learningHours"
        value={formData.learningHours}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
  <Col>
    <Form.Group controlId="formEligibilityCriteria">
      <Form.Label>Eligibility Criteria</Form.Label>
      <Form.Control
        as="textarea"
        placeholder="Enter Eligibility Criteria"
        name="eligibilityCriteria"
        value={formData.eligibilityCriteria}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
  <Col>
    <Form.Group controlId="formImageUrl">
      <Form.Label>Image URL</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Image URL"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
</Row>

<Row>
  
  <Col>
    <Form.Group controlId="formDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control
        as="textarea"
        placeholder="Enter Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
</Row>

<Row>
  <Col>
    <Button variant="primary" onClick={handleSaveDraft}>
      Save Draft
    </Button>
  </Col>
  <Col>
    <Button variant="success" onClick={handleSave}>
      Save
    </Button>
  </Col>
  <Col>
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  </Col>
</Row>
      </Form>
        </div>
      );
    }

    // You can customize the content based on the selected program
    return (
      <div>
        {/* <h2>{selectedProgram}</h2> */}
        {/* Add specific content for the selected program */}
        {/* i wan two buttons to update and delete  */}

        
      <h2>{selectedProgram.name}</h2>
      <div className="card ">
        <img src={selectedProgram.imageUrl} className="card-img-top" alt={selectedProgram.name} />
        <div className="card-body">
          <h5 className="card-title">Details</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Price: {selectedProgram.price}</li>
            <li className="list-group-item">Domain: {selectedProgram.domain}</li>
            <li className="list-group-item">Type: {selectedProgram.type}</li>
            {/* Add other details */}
          </ul>
          <p className="card-text mt-3">{selectedProgram.description}</p>
        </div>
      </div>

      {isEditing ? (
        // Render input fields for editing mode
        <div className="mt-3">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedProgram.name}
            onChange={handleInputChange}
            className="form-control"
          />

          {/* Add other input fields for editing other properties */}
          
          <button className="btn btn-success me-2" onClick={handleSaveClick}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      ) : (
        // Render edit and delete buttons for non-editing mode
        <div className="mt-3">
          <button className="btn btn-primary me-2" onClick={handleEditClick}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: '40px' }}>
        <a className="navbar-brand" href="#">Your Logo</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/signup">Signup<span className="sr-only"></span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* <div style={{ borderRight: '1px solid #ccc', height: 'calc(100vh - 60px)', position: 'absolute', top: '60px', left: '0' }}></div> */}
      {/* Content */}
      <div className="container-fluid mt-4">
        {/* First Half */}
        <div style={{ borderRight: '1px solid #ccc', height: '100%', position: 'absolute', top: '40px', left: '25%', zIndex: 1 }}></div>

        <div className="row">
          <div className="col-md-3" style={{ paddingRight: '15px', }}>
            
          <div
      id="sidenav-10"
      data-mdb-close-on-esc="false"
      className="sidenav"
      data-mdb-sidenav-init
      data-mdb-hidden="false"
      data-mdb-position="absolute"
      data-mdb-focus-trap="false"
      data-mdb-scroll-container="#scroll-container"
      role="navigation"
    >
    <div className="container-fluid">
    <div className="row">
        <div className="col-10">
            <h1 className="py-4">Programs</h1>
        </div>
        <div className="col-2 text-right">
            <button type="button" className="btn btn-primary rounded-circle" onClick={() => handleProgramClick(null)}>
                +
            </button>
        </div>
    </div>
    <hr className="m-0" />
</div>
      <ul id="scroll-container" className="sidenav-menu">
        <li className="sidenav-item">
          <div className="input-group rounded my-2">
            <div className="form-outline w-auto" data-mdb-input-init>
              <input
                id="search-input-sidenav"
                type="search"
                className="form-control"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <label className="form-label" htmlFor="search-input-sidenav">
                Search
              </label>
            </div>
          </div>
        </li>
        <li className="sidenav-item" onClick={() => handleProgramClick('Program 1')}>
          <a className="sidenav-link">
            <i className="far fa-smile pe-3"></i>
            <span>Program 1</span>
          </a>
        </li>
        {programs.map((program) => (
            <li key={program.id} className="sidenav-item" onClick={() => handleProgramClick(program.id)}>
              <a className="sidenav-link">
                {/* Assuming program.icon is the class for the icon */}
                <i className={`far ${program.icon} pe-3`}></i>
                <span>{program.name}</span>
              </a>
              <hr className="mt-0 mb-2" />
            </li> 
          ))}
        
        {/* Add other list items as needed */}
      </ul>

      <div className="text-center" style={{ minHeight: '3rem' }}>
        <hr className="mt-0 mb-2" />
        <small>mdbootstrap.com</small>
      </div>
    </div>
          </div>
        
          {/* Second Half */}
          <div className="col-md-9"style={{ paddingLeft: '15px' }}>
          {renderProgramContent()}
          </div>
        </div>
      </div>
    </div>

  );
}

export default  MainPage;
