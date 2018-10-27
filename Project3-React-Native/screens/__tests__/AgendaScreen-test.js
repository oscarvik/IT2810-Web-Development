import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import AgendaScreen from "../AgendaScreen";

it('MapScreen renders correctly', async () => {
    const tree = renderer
        .create(<AgendaScreen/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
