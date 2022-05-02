import * as React from 'react';
import { Button, Dialog, Portal, Paragraph } from 'react-native-paper';

const DialogAction = (props) => {

  const redirectToKyc = () => {
      props.showHideModal(true);
      props.navigation.navigate('VerifyKYC');
  }

  return (
    <Portal>
      <Dialog visible={true}>
        <Dialog.Content>
          <Paragraph>Your KYC is not verified. Please Update to continue</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={redirectToKyc}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAction;