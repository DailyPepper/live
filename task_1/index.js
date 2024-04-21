import { encoded, translations } from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

export const decodeFields = (encoded, translations) => {
    return encoded.map((item)=>{
        const decodedItem = {...item}
        for(const key in decodedItem){
            if(key.endsWith('Id') && !['groupId', 'service', 'formatSize', 'ca'].includes(key)){
                const id = decodedItem[key]
                decodedItem[key] = translations[id] || id
            }
            return decodedItem
        }
    })
}
const decoded = decodeFields(encoded, translations);
console.log(decoded)
console.log('end')
