import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button';

test('Should render default Button', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Should render primary Button', () => {
  const tree = renderer.create(<Button primary />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Should render secondary Button', () => {
  const tree = renderer.create(<Button secondary />).toJSON();
  expect(tree).toMatchSnapshot();
});
