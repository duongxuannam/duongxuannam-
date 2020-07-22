// //-------------------------------------------------------------------------------------------------
// // Create a singleton instance of the bugsnag client so we don't have to duplicate our configuration
// // anywhere.
// //-------------------------------------------------------------------------------------------------
// import { Client, Configuration } from 'bugsnag-react-native';
// import Config from 'react-native-config';
// import Constants from './constants';
// import Platform from './platform';

// export default class BugSnagManager {
//   static myInstance = null;

//   client = null;

//   /**
//    * @returns {BugSnagManager}
//    */
//   static getInstance() {
//     if (BugSnagManager.myInstance == null) {
//       BugSnagManager.myInstance = new BugSnagManager();
//     }
//     return BugSnagManager.myInstance;
//   }

//   /**
//    * Set client
//    */
//   init = () => {
//     if (Platform.isBuildTest || Platform.isProduction) {
//       const config = new Configuration(Config.BUGSNAG_API_KEY);
//       const semanticVersion = Platform.jsVersion;
//       if (semanticVersion) {
//         config.appVersion = semanticVersion;
//       }
//       config.codeBundleId = Constants.CODE_BUNDLE_ID;
//       if (Platform.isBuildTest) {
//         config.releaseStage = 'development';
//       }
//       if (Platform.isProduction) {
//         config.releaseStage = 'production';
//       }
//       this.client = new Client(config);
//     }
//   };

//   /**
//    * Set user
//    * @param {Number} id
//    */
//   setUser = (id, name) => {
//     if (Platform.isBuildTest || Platform.isProduction) {
//       this.client.setUser(id, name);
//     }
//   };

//   /**
//    * Leave bread crumb
//    * @param {String} name
//    * @param {Object} metaData
//    */
//   leaveBreadcrumb = (name, metaData) => {
//     if (Platform.isBuildTest || Platform.isProduction) {
//       this.client.leaveBreadcrumb(name, metaData);
//     }
//   };

//   notify = (error, beforeSendCallback, blocking, postSendCallback) => {
//     if (Platform.isBuildTest || Platform.isProduction) {
//       this.client.notify(error, beforeSendCallback, blocking, postSendCallback);
//     }
//   };
// }
