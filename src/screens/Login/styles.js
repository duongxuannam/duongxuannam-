import { StyleSheet } from 'react-native';
import Screen from 'utils/screen';

const { height, width } = Screen;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  imageBackground: { flex: 1, height: null, width: null },
  contentBox: { height: height / 3, justifyContent: 'center' },
  signInTitle: { fontSize: 20, fontWeight: 'bold' },
  buttonSignIn: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  buttonFacebook: {
    backgroundColor: '#2E71DC',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  facebookTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  textInputAnimatedBox: {
    height: height / 3,
    ...StyleSheet.absoluteFill,
    top: null,
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  animatedCloseButtonBox: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  closeButtonTitle: {
    fontSize: 15,
  },
});
