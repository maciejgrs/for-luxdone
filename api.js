let arr;

const fetchApi = async (study) => {
  try {
    let res = await fetch(`https://restcountries-v1.p.rapidapi.com/all`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
      },
    }).then((res) => res.json());
    if (!study) {
      arr = sortFetchedData(res, target);
      buildQuiz(arr);
    } else {
      arr = [...res];
    }
  } catch (err) {
    console.log(err);
  }
};

const sortFetchedData = (res, level) => {
  switch (level) {
    case "1":
      return filterRes(res, 99999, true);

    case "2":
      return filterRes(res, 1999999, false);
    case "3":
      return filterRes(res, 99999, false);

    case "4":
      return res;
  }
  return res;
};

const filterRes = (res, population, bool) => {
  if (bool) {
    res = res.filter((el) => {
      if (el.population > 99999 && el.region === "Europe") {
        return el;
      }
    });
  } else {
    res = res.filter((el) => {
      if (el.population > population) {
        return el;
      }
    });
  }

  return res;
};

const filterData = (arr, text) => {
  const filteredData = arr.filter((el) => {
    if (text && text.length > 0) {
      if (el.name.toLowerCase() === text.toLowerCase()) {
        const capital = document.createElement("div");
        capital.innerText = `${el.name} - ${el.capital}`;
        container.appendChild(capital);
        return el.capital;
      }
    } else {
      return el;
    }
  });

  return filteredData;
};
