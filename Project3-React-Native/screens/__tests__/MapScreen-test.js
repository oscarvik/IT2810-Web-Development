import "react-native";
import React from "react";
import MapScreen from "../MapScreen";

import renderer from "react-test-renderer";

it('MapScreen renders correctly', async () => {
    const tree = renderer
        .create(<MapScreen/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
