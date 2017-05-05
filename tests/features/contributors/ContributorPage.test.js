import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ContributorPage } from 'src/features/contributors/ContributorPage';

describe('contributors/ContributorPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      contributors: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ContributorPage {...props} />
    );

    expect(
      renderedComponent.find('.contributors-contributor-page').node
    ).to.exist;
  });
});
