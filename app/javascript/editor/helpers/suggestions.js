async function Suggestions(){
   return fetch('/api/suggestions')
        .then(response=>response.json());

}

export {Suggestions}