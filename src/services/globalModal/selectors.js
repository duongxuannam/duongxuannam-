const getIsVisible = state => state.services.globalModal.isVisible;
const getModalName = state => state.services.globalModal.modalName;
const getModalProps = state => state.services.globalModal.modalProps;

const GlobalModalSeletor = {
  getIsVisible,
  getModalName,
  getModalProps,
};

export default GlobalModalSeletor;
