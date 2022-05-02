import React from 'react';
import {View} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';

function InputComponent({
  textLabel,
  onChangeText,
  textValue,
  mode = 'outlined',
  helperVisible = false,
  errorMessage = '',
  renderKeyboardType = 'default',
  secureTextEntry = false,
  ...customOptions
}) {
  return (
    <View>
      <TextInput
        label={textLabel}
        value={textValue}
        onChangeText={updatedText => onChangeText(updatedText)}
        mode={mode}
        keyboardType={renderKeyboardType}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        {...customOptions}
      />
      <HelperText type="error" visible={helperVisible}>
        {errorMessage}
      </HelperText>
    </View>
  );
}

export default InputComponent;
