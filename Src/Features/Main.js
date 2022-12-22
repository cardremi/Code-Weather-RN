import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  Dimensions,
  ScrollView,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import {connect} from 'react-redux';
import {
  ActionCity,
  ActionGetCurrentLatLon,
  setLoading,
} from '../Components/Action';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GetLocation from 'react-native-get-location';
import moment from 'moment';

function Main(props) {
  const [refreshing, setRefreshing] = useState(true);
  var {Windowheight, _} = Dimensions.get('window');

  const onRefresh = useCallback(() => {
    props.setLoading(true);
  }, []);

  useEffect(() => {
    if (props.isLoading) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          console.log('location', location);
          props.ActionGetCurrentLatLon(location.latitude, location.longitude);
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    }
  }, [props.isLoading]);

  useEffect(() => {
    setRefreshing(props.isLoading);
  }, [props.isLoading]);

  const cardWeather1 = val => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'grey', fontSize: 12}}>
          {`${val.item.dt_txt}`.substring(10, 16)}
        </Text>
        <Image
          source={{
            uri: `http://openweathermap.org/img/wn/${val.item.weather[0].icon}@2x.png`,
          }}
          style={{width: 50, height: 50}}
          resizeMode={'contain'}
        />
        <Text
          style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}
          adjustsFontSizeToFit>
          {parseInt(val.item.main.temp) + '\u00b0' + 'C'}
        </Text>
      </View>
    );
  };

  const cardWeather2 = (val, idx) => {
    return (
      <View
        key={`${idx}`}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: 'white',
          width: '97%',
          paddingHorizontal: 4,
        }}>
        <View>
          <Text style={{fontSize: 15, fontWeight: '700', color: 'white'}}>
            {moment.unix(val.dt).format('ddd MMM DD')}
          </Text>
        </View>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 15, fontWeight: '700', color: 'white'}}>
            {`${parseInt(val.main.temp_max) + '\u00b0' + 'C'}/${
              parseInt(val.main.temp_min) + '\u00b0' + 'C'
            }`}
          </Text>
          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${val.weather[0].icon}@2x.png`,
            }}
            style={{width: 46, height: 46}}
            resizeMode={'contain'}
          />
          <MaterialIcons name="keyboard-arrow-right" size={26} color="grey" />
        </View>
      </View>
    );
  };

  return (
    <View style={{height: Windowheight}}>
      <ScrollView
        contentContainerStyle={styles.cover}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.body}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '95%',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 2}}>
              <Feather name="search" size={22} color="white" />
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.text1}>
                {props.currentData?.data?.name}
              </Text>
              <Foundation
                name="marker"
                size={20}
                color="white"
                style={{paddingTop: 3, paddingLeft: 2}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Image
                style={styles.tinyLogo}
                source={require('../Assets/control.png')}
                resizeMode={'contain'}
              />
            </View>
          </View>
          <View style={styles.inputPosition}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/wn/10d@2x.png`,
                }}
                style={{width: 62, height: 62}}
                resizeMode={'contain'}
              />
              <View>
                <Text style={{fontSize: 16, color: 'white'}}>
                  {props.currentData?.data?.weather[0]?.description}
                </Text>
                <Text style={{fontSize: 12, color: 'grey'}}>
                  {props.currentData?.data?.weather[0]?.main}
                </Text>
              </View>
            </View>
            <Text style={{fontSize: 65, color: 'white'}}>
              {parseInt(props.currentData?.data?.main?.temp) + '\u00b0' + 'C'}
            </Text>
            <Text style={{fontSize: 12, color: 'grey'}}>
              {'Feels like ' +
                parseInt(props.currentData?.data?.main?.feels_like) +
                '\u00b0' +
                'C'}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingBottom: 8,
            }}>
            <Text style={{fontSize: 14, color: 'white', fontWeight: '700'}}>
              No precipitation within an hour
            </Text>
            <View
              style={{
                backgroundColor: '#696969',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: 8,
                paddingVertical: 10,
                borderRadius: 8,
                marginVertical: 10,
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{fontSize: 12.5, color: 'white', fontWeight: 'bold'}}
                  adjustsFontSizeToFit
                  numberOfLines={1}>
                  {`Wind: ${props.currentData?.data?.wind?.speed}m/s`}
                </Text>
                <Text
                  style={{fontSize: 12.5, color: 'white', fontWeight: 'bold'}}
                  adjustsFontSizeToFit
                  numberOfLines={1}>
                  {`Pressure: ${props.currentData?.data?.main?.pressure}hPa`}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{fontSize: 12.5, color: 'white', fontWeight: 'bold'}}
                  adjustsFontSizeToFit
                  numberOfLines={1}>
                  {`Humidity: ${props.currentData?.data?.main?.humidity}%`}
                </Text>
                <Text
                  style={{fontSize: 12.5, color: 'white', fontWeight: 'bold'}}
                  adjustsFontSizeToFit
                  numberOfLines={1}>
                  {`Visibility: ${parseFloat(
                    props.currentData?.data?.visibility / 1000,
                  )}km`}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{fontSize: 12.5, color: 'white', fontWeight: 'bold'}}
                  adjustsFontSizeToFit
                  numberOfLines={1}>
                  UV Index: 0.0
                </Text>
                <Text
                  style={{fontSize: 12.5, color: 'white', fontWeight: 'bold'}}
                  adjustsFontSizeToFit
                  numberOfLines={1}>
                  {`Dew Point: ${
                    parseInt(props.currentData?.data?.main?.feels_like) +
                    '\u00b0' +
                    'C'
                  }`}
                </Text>
              </View>
            </View>
          </View>
          <FlatList
            data={props.ListData}
            renderItem={cardWeather1}
            horizontal
            keyExtractor={(_, idx) => idx.toString()}
            style={{marginBottom: 20}}
          />
          {props.ListData.map((val, idx) => {
            return cardWeather2(val, idx);
          })}
        </View>
      </ScrollView>
    </View>
  );
}
const mapStateToProps = state => ({
  ListData: state.dataReducer.ListData,
  currentData: state.dataReducer.currentData,
  isLoading: state.dataReducer.isLoading,
});

const mapDispatchToProps = {
  ActionCity,
  ActionGetCurrentLatLon,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  cover: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#080808',
    paddingTop: 20,
    paddingHorizontal: 8,
  },
  input: {
    borderRadius: 10,
    borderWidth: ms(2),
    borderColor: 'black',
    fontWeight: '700',
    padding: ms(20),
    fontSize: ms(20),
    width: ms(320),
    height: ms(60),
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  inputPosition: {
    paddingVertical: ms(20),
    alignItems: 'center',
  },
  body: {
    alignItems: 'center',
    marginBottom: 40,
  },
  tinyLogo: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});
