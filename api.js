let region = 'Europe'
let arr

const fetchApi = async (region) => {
    try {
      const res = await fetch(`https://restcountries-v1.p.rapidapi.com/region/${region}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "35426aa0dfmsh1a9124fb110217dp1aeabbjsne9375541532e",
            "x-rapidapi-host": "restcountries-v1.p.rapidapi.com"
        }
      }).then((res) => res.json());
     
      let arr = res.sort(() => Math.random() - Math.random()).slice(0, 4)
    
      buildQuiz(arr)
     
      
    } catch (err) {
      console.log(err);
    }
  };

   