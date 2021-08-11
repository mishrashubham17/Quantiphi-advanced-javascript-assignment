const url='https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json';
const fetch = require("node-fetch");
async function movies(){
    const response=await fetch(url)
    if(response.status===200){
        let data= await response.json();
        let actor= new Map();
        let genre= new Map();
        data.forEach((data)=>{
            movieName=data['title']
            if(data['cast'].length >0){
                data['cast'].forEach(castName=>{
                    if(actor.has(castName)){
                        let val=actor.get(castName);
                        val.push(movieName)
                        dictActor.set(castName,val)
                    }else{
                        dictActor.set(castName,[movieName,])
                    }
                })
            }
            if(data['genres'].length >0){
                data['genres'].forEach(genere=>{
                    if(genre.has(genere)){
                        let val=genre.get(genere);
                        val.push(movieName)
                        genre.set(genere,val)
                    }else{
                        genre.set(genere,[movieName,])
                    }
                })
            }
        });
        let actors=[];
        let Genres =[];
        actor.forEach((i,k)=>{
            actors.push({
                Name:k,
                Movies:i
            });
        });
        genre.forEach((i,k)=>{
            Genres.push({
                Type:k,
                Movies:i
            });
        });
        result={
            actors,
            Genres
        }
        console.log(result)
    }else{
        console.log("response not received!!");
    }
}
movies()