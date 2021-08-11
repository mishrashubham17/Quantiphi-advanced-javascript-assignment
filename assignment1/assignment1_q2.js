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
      repo.name = item.name;
      repo.full_name = item['full_name'];
      repo.private = item['private'];
      repo.owners.login = item['owner']['login'];
      repo.licenseName = item['license'];
      repo.score = item['score'];
      return repo;
}
