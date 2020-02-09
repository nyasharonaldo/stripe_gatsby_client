import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { render } from "react-dom"

class Button extends React.Component{
  componentDidMount() {
    this.stripe = window.Stripe('pk_test_otlCMQr27HLAResnZt09JSUi00mY7pkTeq');
  }

  render() {
    return (
      <form onSubmit={event => {
        event.preventDefault();
        this.stripe.redirectToCheckout({
          items: [
            // Replace with the ID of your SKU
            {sku: 'sku_GhjCvhjY6sLjAf', quantity: 1},
            {sku: 'sku_GhjiCVtYwfdqdH', quantity: 1}
          ],
          successUrl: 'http://localhost:8000/success',
          cancelUrl: 'http://localhost:8000/cancel',
        }).then(function (result) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        });
      }
    }>
      <button type='submit'>Buy Pants</button>
    </form>
    )
  }
}


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <Button/>
  </Layout>
)

export default IndexPage
