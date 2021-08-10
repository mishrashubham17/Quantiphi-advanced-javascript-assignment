let json = require('./battles.json');
function findOcc(arr, key){
    let arr2 = [];
      
    arr.forEach((x)=>{
       if(arr2.some((val)=>{ return val[key] == x[key] })){
         arr2.forEach((k)=>{
           if(k[key] === x[key]){ 
             k["occurrence"]++
           }
        })
           
       }else{
         let a = {}
         a[key] = x[key]
         a["occurrence"] = 1
         arr2.push(a);
       }
    })
    let max=arr2[0]['occurrence']
    let find_value_count;
    arr2.forEach((x)=>{
        if(x['occurrence']>=max)
        {
            find_value_count=x[key];
            max=x['occurrence'];
        }
    })
    return(find_value_count);
}
let attacker_king=findOcc(json,"attacker_king")
let defender_king=findOcc(json,"defender_king")
let region=findOcc(json,"region")
let name=findOcc(json,"name")
let win=0;
let loss=0;
json.forEach((x)=>{
    if(x['attacker_outcome']!=''){
        if(x['attacker_outcome']=='win'){
            win++;
        }
        else{
            loss++;
        }
    }
    
})
const unique_battle_type = [...new Set(json.map(item => item.battle_type))]
unique_battle_type.splice(-1,1)

const defender_size_count = json.map(data=>parseInt(data['defender_size']));

function filter_defender(arr) {
    return arr.filter(Boolean);
 }
const new_defender=filter_defender(defender_size_count)
const sum = new_defender.reduce((a, b) => a + b, 0);
const avg = parseInt((sum / new_defender.length)) || 0;

min_defender=Math.min(...new_defender)  
max_defender=Math.max(...new_defender) 


output={}

output['most_active']=Object.assign({'attacker_king':attacker_king,'defender_king':defender_king,'region':region,'name':name})
output['attacker_outcome']=Object.assign({'win':win,'loss':loss})
output['battle_type']=unique_battle_type
output['defender_size']=Object.assign({'average':avg,'max':max_defender,'min':min_defender})
console.log(output)
