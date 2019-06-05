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
      if (value !== null) {
        console.log(value);
        return Promise.resolve(value)
      }
     } catch (error) {
       // Error retrieving data
       console.log('_retrieveData err',Promise.resolve(error))
     }
  }

export function clearData(key){
    AsyncStorage.clear()
}

export async function wrappedFetch(url, method, query={}){
    const token = await retrieveData('token')
    let headers = token ? { Authorization: 'Bearer ' + token } : {}
    if(method === 'get'){
        return new Promise(
          function(resolve, reject){
            fetch(url, {
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
                resolve(responseJson)
            }).catch(error => reject(error))
          })
    }
    if(method === 'post'){
        headers['content-type'] = 'application/json'
        return new Promise(
          function(resolve, reject){
            fetch(
            url,
            {
                method: 'POST',
                headers,
                body: JSON.stringify(query)
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.error_code) return
                resolve(responseJson)
            }).catch(error => reject(error))
          }
        )
    }
}