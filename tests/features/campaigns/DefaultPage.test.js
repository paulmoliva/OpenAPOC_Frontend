import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/campaigns/DefaultPage';

describe('campaigns/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      campaigns: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.campaigns-default-page').node
    ).to.exist;
  });
});
