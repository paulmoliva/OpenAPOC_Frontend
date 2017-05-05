import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/contributors/DefaultPage';

describe('contributors/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      contributors: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.contributors-default-page').node
    ).to.exist;
  });
});
