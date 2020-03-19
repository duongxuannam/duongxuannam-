import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileSelector from 'data/profile/selectors';
import { getProfile } from 'data/profile/actions';
import Login from './Login';

const mapStateToProps = state => ({
  userName: ProfileSelector.getUserName(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProfile,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
