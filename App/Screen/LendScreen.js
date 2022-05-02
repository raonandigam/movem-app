import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Button, List, Chip} from 'react-native-paper';
// Components
import CustomModal from '../Components/Modal';
import Spacer from '../Components/Spacer';
import SkeletonLoader from '../Components/SkeletonLoader';
// Services
import {getPendingRequests} from '../Services/lendService';
import {updateMessage} from '../../Redux/snackBarMessageSlice';
import {maskID} from '../Services/const';

const LendScreen = props => {
  const {jwtToken} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onScrollRefresh = async () => {
    setRefreshing(true);
    const response = await getPendingRequests(jwtToken);
    if (response.status === 201) {
      setPendingRequest(response.body);
      setRefreshing(false);
      dispatch(
        updateMessage({
          type: 'success',
          message: 'Updated Successfully',
        }),
      );
      return;
    }
    setRefreshing(false);
    dispatch(
      updateMessage({
        type: 'error',
        message: `Error (${response.status}) - ${response.message}`,
      }),
    );
  };

  useEffect(() => {
    const getPendingRequest = async () => {
      const response = await getPendingRequests(jwtToken);
      if (response.status === 201) {
        setPendingRequest(response.body);
      }
    };
    getPendingRequest();
  }, []);

  if (!pendingRequest) {
    return <SkeletonLoader />;
  }

  if (pendingRequest.length === 0) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/image/empty.png')}
          style={styles.emptyImg}
        />
        <Text style={styles.textStyles}>No Requests</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={{alignSelf: 'center'}}>
        <Text style={styles.textStyles}>Borrow Requests</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Filter</Text>
        </Pressable>
      </View>
      <Spacer />
      <ScrollView
        contentContainerStyle={{paddingBottom: 150}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onScrollRefresh} />
        }>
        <Button
          labelStyle={styles.infoText}
          icon="progress-download"
          mode="text">
          Pull down to refresh
        </Button>
        {pendingRequest.map((details, index) => (
          <Card key={index} style={styles.MainCard}>
            <Card.Content>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Text style={styles.title}>ID : {maskID(details._id)} </Text>
                  <Text style={styles.title}>Rate : {details.rate} </Text>
                  <Text style={styles.title}>Amount : {details.amount}</Text>
                  <Text style={styles.title}>Tenor : {details.tenor} year</Text>
                  <Text style={styles.title}>
                    Collateral : {details.collateral}
                  </Text>
                </View>
                <View style={styles.statusChip}>
                  <Chip icon="information">
                    {details.is_pending ? 'PENDING' : 'Success'}
                  </Chip>
                </View>
              </View>
              {details?.borrower && (
                <View>
                  <Spacer />
                  <List.Accordion title="Borrower Details">
                    <List.Item
                      title={
                        <Text style={styles.listItem}>
                          ID :{maskID(details?.borrower._id)}
                        </Text>
                      }
                    />
                    <List.Item
                      title={
                        <Text style={styles.listItem}>
                          Name : {details?.borrower.name}
                        </Text>
                      }
                      style={{marginTop: -22}}
                    />
                    <List.Item
                      title={
                        <Text style={styles.listItem}>
                          Email : {details?.borrower.email}
                        </Text>
                      }
                      style={{marginTop: -22}}
                    />
                  </List.Accordion>
                  <Spacer />
                </View>
              )}

              <View
                style={{
                  marginTop: 30,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Button
                  mode="outlined"
                  style={styles.bottomButton}
                  icon="arrow-right"
                  onPress={() =>
                    props.navigation.navigate('Lend Details', {...details})
                  }
                  contentStyle={{
                    flexDirection: 'row-reverse',
                  }}>
                  Lend
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      {/* Custom Moadal Render */}
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  textStyles: {
    margin: 10,
    alignContent: 'center',
    fontSize: 25,
  },
  emptyImg: {
    width: 500,
    height: 400,
    transform: [{scale: 0.5}],
  },
  statusChip: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  MainCard: {
    flex: 1,
    borderRadius: 20,
    padding: 5,
    margin: 10,
    elevation: 10,
  },
  listItem: {
    fontSize: 12,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '100%',
    alignSelf: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  LRbutton: {
    borderRadius: 10,
    marginTop: '10%',
    elevation: 2,
    width: '75%',
    alignSelf: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 10,
    textTransform: 'capitalize',
  },
});

export default LendScreen;
