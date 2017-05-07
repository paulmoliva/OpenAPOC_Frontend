import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TopNav } from 'src/features/common/TopNav';

describe('common/TopNav', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TopNav {...props} />
    );

    expect(
      renderedComponent.find('.common-top-nav').node
    ).to.exist;
  });
});
