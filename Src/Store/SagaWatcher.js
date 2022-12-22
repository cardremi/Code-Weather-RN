import {all} from 'redux-saga/effects';
import {WeatherSaga} from '../Components/Saga'
export function* SagaWatcher() {
  yield all([WeatherSaga()]);
}
