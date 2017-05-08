import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LoadingSpinner } from 'src/features/common';

describe('common/LoadingSpinner', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <LoadingSpinner />
    );

    expect(
      renderedComponent.find('.common-loading-spinner').node
    ).to.exist;
  });
});
