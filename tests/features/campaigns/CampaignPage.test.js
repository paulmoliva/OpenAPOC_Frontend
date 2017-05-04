import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { CampaignPage } from 'src/features/campaigns/CampaignPage';

describe('campaigns/CampaignPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      campaigns: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CampaignPage {...props} />
    );

    expect(
      renderedComponent.find('.campaigns-campaign-page').node
    ).to.exist;
  });
});
