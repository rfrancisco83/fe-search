import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      jokes: []
    };
  }


  componentDidMount() {
    fetch("http://localhost:8080/jokes")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            jokes: result.results
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, jokes } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <header className="App-header"></header>
          <ul>
            {jokes.map(joke => (
              <li key={joke.id}>
                {joke.id} {joke.type} {joke.setup} {joke.punchline}
              </li>
            ))}
          </ul>
        </div>
        
      );
    }
  }
}

export default App;
