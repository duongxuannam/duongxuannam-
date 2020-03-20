const getIsVisible = state => state.services.globalToast.isVisible;
const getToastProps = state => state.services.globalToast.toastProps;

const GlobalToastSelector = {
  getIsVisible,
  getToastProps,
};

export default GlobalToastSelector;
