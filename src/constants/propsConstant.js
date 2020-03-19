import PropTypes from 'prop-types';

export const doNothing = () => null;

export const NotificationProps = {
  notification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    heading: PropTypes.shape({
      vi: PropTypes.string,
      en: PropTypes.string,
    }),
    content: PropTypes.shape({
      vi: PropTypes.string,
      en: PropTypes.string,
    }),
    type: PropTypes.string,
  }),
};

export const NavigationProps = {
  navigationObject: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
};
