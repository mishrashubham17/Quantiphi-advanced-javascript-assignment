let result = [];
const githubAPI = async () => {
    console.log("Question 2")
    let query = "";
    query = $("#github").val();
    const url = "https://api.github.com/search/repositories?q="    
    let new_res=[];
    let res = await fetch(url+query);
    new_res=await res.json();
    new_res['items'].forEach((data)=>{
        result.push((extractGithubInfo(data)))
    })
    console.log(result);
}

const extractGithubInfo = async (item) => {
    const resultTemplate = {
        name: "",
        full_name: "",
        private: "",
        owners: {
          login: "",
          name: "",
          followersCount: "",
          followingCount: "",
        },
        licenseName: "",
        score: "",
        numberOfBranch: ""
      }
      let repo = {
        ...resultTemplate
      };
      try{
        let res = await fetch(item.owner.url);
        let new_res=await res.json()
        repo.owners.name = new_res.name;
      }catch{
        repo.owners.name = "";
    }
    try{
        res = await fetch(item.owner.followers_url);
        let new_res=await res.json()
        repo.owners.followersCount = new_res.length;

      }
    catch{
        repo.owners.followersCount = 0;
    }
    try{
        res = await fetch(item.owner.following_url.split("{")[0]);
        let new_res=await res.json()
        repo.owners.followingCount = new_res.length;
    }
    catch{
        repo.owners.followingCount = 0;
    }
    let numberOfBranch;
    try{
        res = await fetch(item.branches_url.split("{")[0]);
        let new_res=await res.json()
        numberOfBranch = new_res.length;
      }
    catch{
        numberOfBranch = 0;
    }
      repo.name = item.name;
      repo.owners.login = item['owner']['login'];
      repo.full_name = item['full_name'];
      repo.private = item['private'];
      repo.licenseName = item['license'];
      repo.score = item['score'];
      repo.numberOfBranch=numberOfBranch
      return repo;
}

