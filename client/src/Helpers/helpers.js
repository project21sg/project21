
/*
    Unpacks an object into a key value pair, into the correct components.
*/
export function unpackObjectToText(object, exclusions) {
    return Object.keys(object).map((key) => {
        if(object[key] instanceof Object) {
            return this.unpackObjectToText(object[key]);
        } else {
            // return <Text>{key}: {object[key]}</Text>
        }
    })
}