export const ActionCity = city => {
  return {
    type: 'CITY',
    city,
  };
};
export const ActionGetCurrentLatLon = (lat, lon) => {
  return {
    type: 'CURRENTLOC',
    lat,
    lon,
  };
};
export const setListData = payload => {
  return {
    type: 'SET_LIST_DATA',
    payload,
  };
};
export const setCurrentData = payload => {
  return {
    type: 'SET_CURRENT_DATA',
    payload,
  };
};
export const setLoading = payload => {
  return {
    type: 'SET_LOADING',
    payload,
  };
};
