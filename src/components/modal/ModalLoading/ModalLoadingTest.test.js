import React from 'react';
import { shallow } from 'enzyme';
import ModalLoading from './ModalLoading';

const setup = propOverrides => {
  const props = {
    clearModal: jest.fn(),
    onCloseFunc: jest.fn(),
    navigateToHelpCenter: jest.fn(),
    hideModal: jest.fn(),
    ...propOverrides,
  };
  const wrapper = shallow(<ModalLoading {...props} />);
  return {
    props,
    wrapper,
  };
};

describe('ModalLoading check snapshot', () => {
  test('should match snapshot', () => {
    const { wrapper } = setup({
      clearModal: jest.fn(),
      logout: jest.fn(),
    });
    expect(wrapper).toMatchSnapshot();
  });
});
