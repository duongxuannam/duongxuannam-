import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProfileSelector from 'data/profile/selectors';
import {getProfile} from 'data/profile/actions';
import Home from './ChooseType';

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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
