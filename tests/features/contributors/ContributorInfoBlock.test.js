import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ContributorInfoBlock } from 'src/features/contributors/ContributorInfoBlock';

describe('contributors/ContributorInfoBlock', () => {
  it('renders node with correct class name', () => {
    const props = {
      contributors: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ContributorInfoBlock {...props} />
    );

    expect(
      renderedComponent.find('.contributors-contributor-info-block').node
    ).to.exist;
  });
});
