import {all, call, put, take, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
// import * as Navigation from '../Utils/HelperNav';
import {ActionCity, setListData, setLoading, setCurrentData} from './Action';

// function* GetSagaWeather(payload) {
//   try {
//     yield put(setLoading(true));
//     // const config = {
//     //   method: 'GET',
//     //   url: `https://api.openweathermap.org/data/2.5/forecast?q=${payload.city}&units=metric&lang=id&appid=7e2e0eda0053587d8fc383a0a9d1280e`,
//     //   headers: {
//     //     'X-CMC_PRO_API_KEY': '8f620108-3fba-4670-8e2a-fecaa8f50db9',
//     //   },
//     // };
//     const config = {
//       method: 'GET',
//       url: `https://api.openweathermap.org/data/2.5/forecast?lat=0.863795&lon=99.56316&appid=7e2e0eda0053587d8fc383a0a9d1280e`,
//       headers: {
//         'X-CMC_PRO_API_KEY': '8f620108-3fba-4670-8e2a-fecaa8f50db9',
//       },
//     };
//     const respond = yield axios.get(config.url, {headers: config.headers});
//     console.log('respond city', respond);
//     // yield put(setListData(respond.data.list));

//     // yield Navigation.navigate({
//     //   name: 'Weather',
//     //   params: {},
//     // });
//   } catch (error) {
//     console.log('error data', error);
//   } finally {
//     yield put(setLoading(false));
//   }
// }

function* GetSagaCurrentWeather(payload) {
  try {
    const config = {
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/forecast?lat=${payload.lat}&lon=${payload.lon}&appid=7e2e0eda0053587d8fc383a0a9d1280e&units=metric`,
      headers: {
        'X-CMC_PRO_API_KEY': '8f620108-3fba-4670-8e2a-fecaa8f50db9',
      },
    };
    const config2 = {
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${payload.lat}&lon=${payload.lon}&appid=7e2e0eda0053587d8fc383a0a9d1280e&units=metric`,
      headers: {
        'X-CMC_PRO_API_KEY': '8f620108-3fba-4670-8e2a-fecaa8f50db9',
      },
    };
    const respond = yield axios.get(config.url, {headers: config.headers});
    const respondCurr = yield axios.get(config2.url, {
      headers: config2.headers,
    });

    yield put(setListData(respond.data.list));
    yield put(setCurrentData(respondCurr));
  } catch (error) {
    console.log('error data', error);
  } finally {
    yield put(setLoading(false));
  }
}
export const WeatherSaga = function* () {
  yield takeLatest('CURRENTLOC', GetSagaCurrentWeather);
};
