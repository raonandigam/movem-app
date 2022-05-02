import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';

function SafeView({children}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SafeView;
