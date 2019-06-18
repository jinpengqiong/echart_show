import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(key, value){
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
      console.log('_storeData err', error)
    }
  }

export async function retrieveData(key){
    try {
      const value = await AsyncStorage.getItem(key);
      return value
     } catch (error) {
       // Error retrieving data
       console.log('_retrieveData err',error)
     }
  }

export function clearData(key){
    AsyncStorage.clear()
}

export async function wrappedFetch(url, method, query={}){
    const token = await retrieveData('token')
    let headers = token ? { Authorization: 'Bearer ' + token } : {}
    if(method === 'get'){
        return fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': token ? { Authorization: 'Bearer ' + token } : {},
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.error_code) return
                return Promise.resolve(responseJson)
            }).catch(error => Promise.reject(error))
    }
    if(method === 'post'){
        headers['content-type'] = 'application/json'
        return fetch(
            url,
            {
                method: 'POST',
                headers,
                body: JSON.stringify(query)
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.error_code) return
                return Promise.resolve(responseJson)
            }).catch(error => Promise.reject(error))
    }
}