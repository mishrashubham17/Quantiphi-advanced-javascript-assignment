const fetch = require("node-fetch");
const getusers= async ()=> {
    let win_user=[];
    let url = 'http://api.nobelprize.org/v1/prize.json';
    try {
        let res = await fetch(url);
        let new_res=await res.json();
        new_res['prizes'].forEach((user)=>{
            if((user['year']>=2000 && user['year']<=2019) && user['category']=='chemistry')
            {
                user['laureates'].forEach((winner)=>{
                        let name=winner['firstname']+" "+winner['surname']
                        win_user.push(name);
                })
            }
        })
        console.log(win_user);
    } catch (error) {
        console.log(error);
    }
    return win_user;
}
 getusers();

/*Output:
[
  'John Goodenough',       
  'M. Stanley Whittingham',
  'Akira Yoshino',
  'Frances H. Arnold',     
  'George P. Smith',       
  'Sir Gregory P. Winter', 
  'Jacques Dubochet',
  'Joachim Frank',
  'Richard Henderson',
  'Jean-Pierre Sauvage',
  'Sir J. Fraser Stoddart',
  'Bernard L. Feringa',
  'Tomas Lindahl',
  'Paul Modrich',
  'Aziz Sancar',
  'Eric Betzig',
  'Stefan W. Hell',
  'William E. Moerner',
  'Martin Karplus',
  'Michael Levitt',
  'Arieh Warshel',
  'Robert J. Lefkowitz',
  'Brian Kobilka',
  'Dan Shechtman',
  'Richard F. Heck',
  'Ei-ichi Negishi',
  'Akira Suzuki',
  'Venkatraman Ramakrishnan',
  'Thomas A. Steitz',
  'Ada E. Yonath',
  'Osamu Shimomura',
  'Martin Chalfie',
  'Roger Y. Tsien',
  'Gerhard Ertl',
  'Roger D. Kornberg',
  'Yves Chauvin',
  'Robert H. Grubbs',
  'Richard R. Schrock',
  'Aaron Ciechanover',
  'Avram Hershko',
  'Irwin Rose',
  'Peter Agre',
  'Roderick MacKinnon',
  'John B. Fenn',
  'Koichi Tanaka',
  'Kurt Wüthrich',
  'William Knowles',
  'Ryoji Noyori',
  'Barry Sharpless',
  'Alan Heeger',
  'Alan MacDiarmid',
  'Hideki Shirakawa'
]*/