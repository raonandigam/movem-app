import React from 'react';
import {View, Text} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';

function SkeletonLoader(props) {
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ContentLoader
        speed={2}
        width={200}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#4d22b3"
        foregroundColor="#919191"
        {...props}>
        <Rect x="50" y="6" rx="4" ry="4" width="343" height="38" />
        <Rect x="8" y="6" rx="4" ry="4" width="35" height="38" />
        <Rect x="50" y="55" rx="4" ry="4" width="343" height="38" />
        <Rect x="8" y="55" rx="4" ry="4" width="35" height="38" />
        <Rect x="50" y="104" rx="4" ry="4" width="343" height="38" />
        <Rect x="8" y="104" rx="4" ry="4" width="35" height="38" />
      </ContentLoader>
      <Text>Loading...</Text>
    </View>
  );
}

export default SkeletonLoader;
