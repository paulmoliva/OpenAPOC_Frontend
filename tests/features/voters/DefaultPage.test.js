import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/voters/DefaultPage';

describe('voters/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      voters: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.voters-default-page').node
    ).to.exist;
  });
});
