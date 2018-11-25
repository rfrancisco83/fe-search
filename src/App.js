import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// JS (Webpack)
import 'react-table/react-table.css'
import ReactTable from "react-table";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      jokes: [],
      search
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

    const columns = [{
      Header: 'Id',
      accessor: 'id' 
    }, {
      Header: 'Type',
      accessor: 'type'
    }, {
      Header: 'Setup',
      accessor: 'setup' 
    }, {
      Header: 'Punch Line',
      accessor: 'punchline'
    }]


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          {/* <header className="App-header"></header> */}

          <h1>React-Table - Basic Example</h1>
				  Search: 
          <input 
            value={this.state.search}
            onChange={e => this.setState({search: e.target.value})}
          />

          <ReactTable
            data={jokes}
            columns={columns}
            defaultSorted={[
              {
                id: "setup",
                desc: false
              }
            ]}
            filterable={true}
          />
        </div>
        
      );
    }
  }
}

export default App;
