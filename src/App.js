import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// JS (Webpack)
import 'react-table/react-table.css'
import ReactTable from 'react-table';
import ReactTableDefaults from 'react-table';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      jokes: [],
      search: ''
    };

    Object.assign(ReactTableDefaults, {
      column: {
        style: {
          width: 10
        }
      }
    });
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
    //state change will trigger udpate of component
    if (search) {
			jokes = jokes.filter(row => {
				return String(row.id).includes(search) || row.type.includes(search) ||row.setup.includes(search) || row.punchline.includes(search)
			})
		}

    const columns = [{
      Header: 'Id',
      accessor: 'id',
      headerClassName: 'hidden-md-down w-auto',
      className: 'hidden-md-down w-auto',
      maxWidth: '10%'
      
    }, {
      Header: 'Type',
      accessor: 'type',
      headerClassName: 'hidden-md-down w-auto',
      className: 'hidden-md-down w-auto',
      maxWidth: '30%'
    }, {
      Header: 'Setup',
      accessor: 'setup',
      headerClassName: 'w-auto',
      className: 'w-auto',
      maxWidth: '30%' 
    }, {
      Header: 'Punch Line',
      accessor: 'punchline',
      headerClassName: 'w-auto',
      className: 'w-auto',
      maxWidth: '30%'
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
            className="container-fluid -striped -highlight"
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
