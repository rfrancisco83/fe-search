import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// JS (Webpack)
import 'react-table/react-table.css'
import ReactTable from 'react-table';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      jokes: [],
      search: ''
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
    let { error, isLoaded, jokes, search } = this.state;

    //filter the results prior to rendering
    //state change will 
    if (search) {
			jokes = jokes.filter(row => {
				return String(row.id).includes(search) || row.type.includes(search) ||row.setup.includes(search) || row.punchline.includes(search)
			})
		}

    const columns = [{
      Header: 'Id',
      accessor: 'id',
      className: 'hidden-xs'
    }, {
      Header: 'Type',
      accessor: 'type',
      className: 'hidden-xs'
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
        <div className="App container-fluid">
          
          <input 
            value={this.state.search}
            placeholder='Search...'
            onChange={e => this.setState({search: e.target.value})}
          />

          <ReactTable
            className="table-responsive -striped -highlight"
            data={jokes}
            columns={columns}
            defaultSorted={[
              {
                id: "setup",
                desc: false
              }
            ]}
          />
        </div>
        
      );
    }
  }
}

export default App;
