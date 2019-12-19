import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './Library.css'
import './Customers.css'

class Customers extends Component {
  constructor(props) {
    super();

    this.state = {
      customers: [],
      error: '',
      currentPage: 1,
    };
  }

  componentDidMount() {
    axios.get(`${this.props.url}`, {
      params: {
        "sort": "name",
        "p": 1,
        "n": 10
      }})
      .then((response) => {
        this.setState({ customers: response.data });
        console.log(this.state.customers)
        console.log(`total customers ${this.state.customers.length}`)
      })
      .catch((error) => {
        console.log(error)
        this.setState({ error: error.errors });
      });
  }

  nextPage = () => {
    axios.get(`${this.props.url}`, {
      params: {
        "sort": "name",
        "p": this.state.currentPage + 1,
        "n": 10
      }})

      .then((response) => {
        this.setState({ 
          customers: response.data,
          currentPage: this.state.currentPage + 1,
         });
        console.log(this.state.customers)
      })
      .catch((error) => {
        console.log(error)
        this.setState({ error: error.errors });
      });
  }

  previousPage = () => {
    if (this.state.currentPage - 1 > 0) {
      axios.get(`${this.props.url}`, {
        params: {
          "sort": "name",
          "p": this.state.currentPage -1,
          "n": 10
        }})

        .then((response) => {
          this.setState({ 
            customers: response.data,
            currentPage: this.state.currentPage - 1,
          });
          console.log(this.state.customers)
        })
        .catch((error) => {
          console.log(error)
          this.setState({ error: error.errors });
        });
    }
  }


  render() {
 
        return (
          // const numberPages = Math.floor(this.state.totalResults / 10)

          <div key={customer.id} className={cardColor}> 
            <div className="movie-card__content">
              <div >
                <h3>{customer.name}</h3>
                
                <p>Account Credit: ${customer.account_credit}
                </p>
                <p>Checked Out: {customer.movies_checked_out_count}
                </p>

                <p><Button variant="primary"
                  onClick={() => this.props.selectCustomerCallback(customer)}
                >
                Select Customer
                </Button>
                </p>
              </div>
            </div>
          </div>
        )
      });

    return (

    )
  }
}

Customers .propTypes = {
  url: PropTypes.string.isRequired,
}

export default Customers;


{/* <p>Address:
                  <br />{customer.address}
                  <br />{customer.city}, {customer.state} {customer.postal_code}</p>

                <p>Phone: 
                  <br />{customer.phone}</p>

                <p>Registered At:
                  <br />{customer.registered_at}
                </p> */}