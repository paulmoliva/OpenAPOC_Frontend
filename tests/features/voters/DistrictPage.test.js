import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DistrictPage } from 'src/features/voters/DistrictPage';

describe('voters/DistrictPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      voters: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DistrictPage {...props} />
    );

    expect(
      renderedComponent.find('.voters-district-page').node
    ).to.exist;
  });
});
