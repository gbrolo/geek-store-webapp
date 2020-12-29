import React from "react"
import SEO from "../components/seo"

import ProductsContainer from '../components/ProductsContainer/Loadable'
import ComponentWrapper from "../components/ComponentWrapper"

const IndexPage = () => (
  <ComponentWrapper>
    <SEO title="Geek Store" />
    <ProductsContainer />
  </ComponentWrapper>
)

export default IndexPage
