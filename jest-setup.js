/* eslint-disable no-undef */
import Enzyme, { shallow, render, mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

jest.mock('react-native-device-info', () => {
  return {
    hasNotch: jest.fn(),
    getModel: jest.fn(),
    getDeviceId: jest.fn(),
    getUniqueId: jest.fn(),
    getVersion: jest.fn(),
    getSystemVersion: jest.fn(() => '7.0.1'),
  };
});

Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;
global.mount = mount;
