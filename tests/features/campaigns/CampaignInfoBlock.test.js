import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { CampaignInfoBlock } from 'src/features/campaigns/CampaignInfoBlock';

describe('campaigns/CampaignInfoBlock', () => {
  it('renders node with correct class name', () => {
    const props = {
      campaigns: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CampaignInfoBlock {...props} />
    );

    expect(
      renderedComponent.find('.campaigns-campaign-info-block').node
    ).to.exist;
  });
});
