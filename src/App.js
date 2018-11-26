import React, { Component } from 'react';
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
    //state change will trigger udpate of component
    if (search) {
			jokes = jokes.filter(row => {
				return String(row.id).includes(search) || row.type.includes(search) ||row.setup.includes(search) || row.punchline.includes(search)
			})
		}

    const columns = [{
      Header: 'Id',
      accessor: 'id',
      headerClassName: 'd-none d-md-block col-md-4',
      className: 'd-none d-md-block col-md-4',
    }, {
      Header: 'Type',
      accessor: 'type',
      headerClassName: 'd-none d-md-block col-md-4',
      className: 'd-none d-md-block col-md-4',
    }, {
      Header: 'Setup',
      accessor: 'setup',
      headerClassName: 'col-md-4 col-sm-2 ',
      className: 'col-md-4 col-sm-2',
    }, {
      Header: 'Punch Line',
      accessor: 'punchline',
      headerClassName: 'col-md-4 col-sm-2 ',
      className: 'col-md-4 col-sm-2 ',
    }]


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <header>
            <div class="container-fluid">
              <div class="row">
                <div class="col-4">
                    <a
                    className="App-link"
                    href="https://github.com/rfrancisco83/fe-search"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Git Repo for FE Project
                  </a>
                </div>
                <div class="col-4">
                  <a
                    className="App-link"
                    href="https://github.com/rfrancisco83/search-api"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Git Repo for REST API
                  </a>
                </div>
                <div class="col-4">Demo app displaying search and REST API.</div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="float-left d-block">
                    <input 
                      value={this.state.search}
                      placeholder='Search...'
                      onChange={e => this.setState({search: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>
          
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
