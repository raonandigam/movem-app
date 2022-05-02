import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Appbar, Menu} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Dispatch
import {logOut} from '../../Redux/authSlice';
import {updateMessage} from '../../Redux/snackBarMessageSlice';
import {resetUserDetails} from '../../Redux/userSlice';

function AppBarComponent({navigation, back, ...restData}) {
  const {userName} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <Appbar>
        {back ? (
          <>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title={restData.route?.name} />
          </>
        ) : (
          <Appbar.Content title={userName} />
        )}
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="account-circle"
              color="white"
              onPress={openMenu}
            />
          }
          contentStyle={{
            marginTop: '20%',
          }}>
          <Menu.Item
            icon={() => (
              <Icon name="shield-account" size={23} color="#6200ee" />
            )}
            onPress={() => {
              navigation.navigate('Account');
              closeMenu();
            }}
            title="Account"
          />
          <Menu.Item
            icon={() => <Icon name="logout" size={23} color="#6200ee" />}
            onPress={() => {
              dispatch(logOut());
              dispatch(resetUserDetails());
              dispatch(
                updateMessage({
                  type: 'success',
                  message: 'Successfully Logged Out.',
                }),
              );
            }}
            title="Log Out"
          />
        </Menu>
      </Appbar>
    </SafeAreaView>
  );
}

export default AppBarComponent;
