import React, { Component } from 'react';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, CustomInput} from 'reactstrap';
import Checkbox from "./Checkbox";

const options = ["One", "Two", "Three"];

class App extends Component {
  state = {
    burgers: [],
    newBurgerData:{
      name:'',
      ingredients: []
    },
      checkboxes: options.reduce(
        (options, option) => ({
          ...options, 
          [option]: false
        }),
        {}
      ),
    newBurgerModal: false
  };

  componentDidMount(){
    fetch('http://us-central1-burgers-158df.cloudfunctions.net/api/burgers/all')
      .then(response => response.json())
      .then(data => {
        this.setState({burgers: data});
      })
    }

  delBurger(id){
    fetch('http://us-central1-burgers-158df.cloudfunctions.net/api/burgers/',id)
  }
  

  toggleNewBurgerModal(){
    this.setState({
      newBurgerModal: !this.state.newBurgerModal,
    })  
  }

  handleChange = value => {
    this.setState({...this.state, newBurgerData: {...this.state.newBurgerData, name: value}});
    console.log(this.state)
  }

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    console.log(this.state)
    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        this.setState({...this.state, newBurgerData: {...this.state.newBurgerData, ingredients: [...this.state.newBurgerData.ingredients, checkbox]}});
      });
      console.log(this.state.newBurgerData)
      fetch('http://us-central1-burgers-158df.cloudfunctions.net/api/burgers/create', {
        method: 'POST',
        body:JSON.stringify(this.state.newBurgerData),
      });
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => options.map(this.createCheckbox);


  render(){
    return (
      
      
      <div className="App container">

      <Button color="primary" onClick={this.toggleNewBurgerModal.bind(this)}>Add New Burger</Button>
      <Modal isOpen={this.state.newBurgerModal} 
              toggle={this.toggleNewBurgerModal.bind(this)} className={this.props.className}>
        <ModalHeader toggle={this.toggleNewBurgerModal.bind(this)}>Create New Burger</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Burger name</Label>
            <input name="name" value={this.state.newBurgerData.name} onChange={e => this.handleChange(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
            <button type="submit" className="btn btn-primary">
              Add Ingredients
            </button>
            </form>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleNewBurgerModal.bind(this)}>Add Burger</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewBurgerModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table> 
          <thead>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>

            </tr>
          </thead>

          <tbody>
          {this.state.burgers.length > 0 ? 
            (
              this.state.burgers.map(burger => (
            <tr>
            <td>{burger.data.name}</td>
            <td>{burger.data.ingredients}</td>
            <td>
            <Button color ="success" size= "sm" className="mr-2">Edit</Button>
            <Button onClick={this.delBurger(burger.id)} color ="danger" size= "sm">Delete</Button>
            </td>
            </tr>
            ))): (
              <tr>
              </tr>
            )
            }
          </tbody>
        </Table>
       
      </div>
    );
  }
}
 

export default App;
