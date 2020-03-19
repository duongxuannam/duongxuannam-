import get from 'lodash/get';

const getPartners = state => get(state.data.partner, 'partners', []);

const PartnerSelector = {
  getPartners,
};

export default PartnerSelector;
