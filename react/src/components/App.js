// App.js
import React, { Component } from 'react';
import GroceryForm from './GroceryForm';
import GroceryList from './GroceryList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries: [],
      name: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: "/api/groceries",
      contentType: "application/json"
    })
    .done(data => {
      this.setState({ groceries: data["groceries"]})
    })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let newGrocery = JSON.stringify({
      grocery: {
        name: this.state.name
      }
    });
    $.ajax({
      method: "POST",
      url: "/api/groceries",
      contentType: "application/json",
      data: newGrocery
    })
    .done(data => {
      let newGroceries = [...this.state.groceries, data["grocery"]];
      this.setState({
        groceries: newGroceries,
        name: ''
      })
    })
  }

  handleButtonClick(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/groceries/" + id,
    })
    .done( () => {
      let newGroceries = this.state.groceries.filter(grocery => {
        return grocery.id !== id;
      });
      this.setState({ groceries: newGroceries });
    })
  }

  handleChange(event) {
    let newName = event.target.value;
    this.setState({ name: newName });
  }

  render() {
    return(
      <div className="small-4 small-centered columns app">
        <h1 className="text-center">Grocery List React</h1>
        <GroceryForm
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
          name={this.state.name}
        />
        <GroceryList
          groceries={this.state.groceries}
          handleButtonClick={this.handleButtonClick}
        />
      </div>
    );
  }
}

export default App;
