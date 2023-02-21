import React from 'react';
import renderer from 'react-test-renderer';
import RegularText from '../RegularText';

test('Should render "test" Text', () => {
  const tree = renderer.create(<RegularText>test</RegularText>).toJSON();
  expect(tree).toMatchSnapshot();
});
