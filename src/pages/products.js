import React, { Component } from 'react'
import { StaticQuery } from 'gatsby';
import Layout from '../components/layout'
class Product extends Component {

  // constructor(){
  //   this.handleSubmit
  // }

  componentDidMount() {
    this.stripe = window.Stripe('pk_test_otlCMQr27HLAResnZt09JSUi00mY7pkTeq');
  }

  handleSubmit(sku) {
    return event => {
      event.preventDefault();
      this.stripe.redirectToCheckout({
        items: [
          // Replace with the ID of your SKU
          {sku: sku, quantity: 1}
        ],
        successUrl: 'http://localhost:8000/success',
        cancelUrl: 'http://localhost:8000/cancel',
      }).then(function (result) {
        console.error(result.error.message)
      });
    }
  }

  render() {
    const{id, currency, price, name} =this.props

    const priceFloat = (price/100).toFixed(2)
    const formattedPrice = Intl.NumberFormat('en-US', {style: 'currency', currency}).format(priceFloat)

    

    return( 
      <div>
        <form onSubmit={this.handleSubmit(id)}>
          {name} {formattedPrice})
          <button type='submit'>Buy Now</button>
        </form>
      </div>
    )
  }
}

export default () => (
  <StaticQuery
  query={
    graphql`
    {
      allStripeSku {
        edges {
          node {
            id
            currency
            price
            attributes {
              name
            }
          }
        }
      }
    }
    

    `}
  render={data => (
    <Layout>
      {data.allStripeSku.edges.map(({node:sku}) => (
          <Product
            id={sku.id}
            currency={sku.currency}
            price={sku.price}
            name={sku.attributes.name}

          />        
        ))}
    </Layout>
  )}
  />
)