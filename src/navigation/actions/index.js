import React from 'react';

import { CommonActions } from '@react-navigation/native';
import Routes from 'navigation/routes';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

/**
 * go back
 */
export const navigateBack = () => CommonActions.goBack();

/**
 * Auth Stack
 */
export const resetAuthStack = () => {
  console.log('navigationRef', navigationRef.current.getRootState());
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: Routes.AUTH_STACK }],
    })
  );
};
