 

const fetchApi = async () => {
try {
  const res = fetch("https://restcountries-v1.p.rapidapi.com/all", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "35426aa0dfmsh1a9124fb110217dp1aeabbjsne9375541532e",
		"x-rapidapi-host": "restcountries-v1.p.rapidapi.com"
	}
})
.then((res) => res.json())
console.log(res);
}
catch (err) {
    console.log(err);
}
}
fetchApi()