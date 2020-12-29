import React from "react";
import renderer from "react-test-renderer";

import Loading from '../index';

describe("Loading", () => {
  it("renders a Loading spinner correctly", () => {
    const tree = renderer
      .create(
        <Loading 
          render={true}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
