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
      let owner = {
        login: item.owner.login
    };
      try{
        let res = await fetch(item.owner.url);
        repo.name = res.name;
      }catch{
        repo.name = "";
    }
    try{
        res = await fetch(item.owner.followers_url);
        repo.followersCount = res.length;
      }
    catch{
        repo.followersCount = 0;
    }
    try{
        res = await fetch(item.owner.following_url.split("{")[0]);
        repo.followingCount = res.length;
    }
    catch{
        repo.followingCount = 0;
    }
    let numberOfBranch;
    try{
        res = await fetch(item.branches_url.split("{")[0]);
        numberOfBranch = res.length;
      }
    catch{
        numberOfBranch = 0;
    }
      repo.name = item.name;
      repo.full_name = item['full_name'];
      repo.private = item['private'];
      repo.owner = owner;
      repo.licenseName = item['license'];
      repo.score = item['score'];
      repo.numberOfBranch=numberOfBranch;
      return repo;
}
//fetch for follower_url,following_url,name,nameBranch is not working due to api limitation 
