import { AsyncStorage } from "react-native"

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
        return value
      }
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
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    if(method === 'post'){
        headers['content-type'] = 'application/json'
        return fetch(
            url,
            {
                method: 'POST',
                headers,
                body: JSON.stringify(query),
            }
            )
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}