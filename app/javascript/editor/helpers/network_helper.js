//TODO Move to channels
class NetworkHelper {
    performScript(script,key){
        return fetch('/perform', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({script: script, key: key})
        })
            .then((response)=>response.json())
            .then((data)=>{return data})
    }
}

export {NetworkHelper}