import React from 'react';
import SetupAxios from 'utils/setupAxios';

class CommonService extends React.PureComponent {
  constructor(props) {
    super(props);
    SetupAxios.setupOnResponseInterceptors(this.onReceivedToken, this.onUnauthorized);
  }

  componentDidMount() {
    // const { checkAutoLogin } = this.props;
    // checkAutoLogin();
  }

  /** update axios header token when received new one */
  onReceivedToken = newToken => {
    // const { updateToken, token } = this.props;
    // if (newToken !== token) {
    //   updateToken(newToken);
    //   SetupAxios.setHeaderToken(token);
    // }
  };

  onUnauthorized = () => {
    // const { logout, sessionStatus } = this.props;
    // if (sessionStatus !== SESSION_STATUS.AUTHORIZED || this.alreadyDisplayUnauthorized) {
    //   return;
    // }
    // this.alreadyDisplayUnauthorized = true;
    // Alert.alert(l10n.alert, l10n.session_expired_description, [
    //   {
    //     text: l10n.close,
    //     onPress: () => logout(),
    //   },
    // ]);
  };

  render() {
    return null;
  }
}

export default CommonService;
