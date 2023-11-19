const axios = require('axios');
const fs = require('fs');

const BASE_URL = 'https://api.mangadex.org';

async function getAllManga() {
  const response = await axios.get(`${BASE_URL}/manga`);
  return response.data.data[0];
}

(async () => {
  const mangaList = await getAllManga();
  console.log(mangaList);
})();

// const mangaID = 'c1c408f6-3dec-4d62-b6b3-b57e615d933c';
// const chapterId = '4f3db48d-2c86-4ee8-8b89-76b02d9eba8e';

// async function getAllChapters(mangaId) {
//     const response = await axios.get(`${BASE_URL}/manga/${mangaId}/feed`);
//     return response.data.data;
// }

// (async () => {
//     const chapters = await getAllChapters(mangaID);
//     console.log(chapters);
// })();

// async function getChapterPageImageUrl(chapterId) {
//   const response = await axios.get(`${BASE_URL}/at-home/server/${chapterId}`);
//   const serverUrl = response.data.baseUrl;
//   const hash = response.data.chapter.hash;
//   const images = response.data.chapter.data.map(image => {
//     return `${serverUrl}/data/${hash}/${image}`
//   })
//   return images;
// }

// (async () => {
//   const imageUrl = await getChapterPageImageUrl(chapterId);
//   console.log(imageUrl);
// })();

async function getMangaCover(mangaId) {
  const response = await axios.get(`${BASE_URL}/cover?manga[]=${mangaId}`);
  console.log(response.data);
  const cover = response.data.data;
  return cover ? cover[0].attributes.fileName : null;
}

(async () => {
  const coverFilename = await getMangaCover(mangaID);
  if (coverFilename) {
    const imageUrl = coverFilename;
    console.log(imageUrl);
  } else {
    console.log('No cover found for manga ID');
  }
})();

// retrieve popular new titles:
// async function getPopularNewTitles() {
//     const response = await axios.get(`${BASE_URL}/manga?limit=10&order[updatedAt]=desc`);
//     return response.data.data[2];
// }

// (async () => {
//     const popularNewTitles = await getPopularNewTitles();
//     console.log(popularNewTitles);
// })();

// // retrieve the latest updates:
// async function getLatestUpdates() {
//     const response = await axios.get(`${BASE_URL}/chapter?limit=10&order[publishAt]=desc`);
//     return response.data.data;
// }

// (async () => {
//     const latestUpdates = await getLatestUpdates();
//     console.log(latestUpdates);
// })();

// // transform those lists tags into lists of UUIDs using the /manga/tags resource.

// async function getTagId(tagName) {
//     const response = await axios.get(`${BASE_URL}/manga/tag`);
//     const tag = response.data.data
//         .filter(tag => tagName.includes(tag.attributes.name.en))
//         .map(tag => tag.id);
//     if (tag) {
//         console.log(tag);
//         return tag;
//     } else {
//         throw new Error(`Tag "${tagName}" not found`);
//     }
// }


// // retrieve recently added manga:

// async function getRecentlyAddedManga() {
//     const response = await axios.get(`${BASE_URL}/manga?limit=10&order[createdAt]=desc`);
//     return response.data.data;
// }

// (async () => {
//     const recentlyAddedManga = await getRecentlyAddedManga();
//     console.log(recentlyAddedManga);
// })();

// // retrieve seasonal manga:

// // Define the start and end dates for each season
// const seasons = {
//     'Winter': { startMonth: 11, startDate: 21, endMonth: 2, endDate: 20 },
//     'Spring': { startMonth: 2, startDate: 21, endMonth: 5, endDate: 21 },
//     'Summer': { startMonth: 5, startDate: 22, endMonth: 8, endDate: 22 },
//     'Fall': { startMonth: 8, startDate: 23, endMonth: 11, endDate: 20 },
// };

// // Get the current season based on the current date
// function getCurrentSeason() {
//     const now = new Date();
//     const month = now.getMonth();
//     const date = now.getDate();
//     for (let season in seasons) {
//         const start = seasons[season].startDate;
//         const end = seasons[season].endDate;
//         const startMonth = seasons[season].startMonth;
//         const endMonth = seasons[season].endMonth;
//         if ((month > startMonth || (month === startMonth && date >= start)) && (month < endMonth || (month === endMonth && date <= end))) {
//             return season;
//         }
//     }
//     return null;
// }

// async function getSeasonalManga(season = getCurrentSeason(), year = new Date().getFullYear()) {
//     // Construct the date range for the specified season and year
//     const startDate = new Date(Date.UTC(year, seasons[season].startMonth, seasons[season].startDate, 0, 0, 0));
//     const endDate = new Date(Date.UTC(year, seasons[season].endMonth, seasons[season].endDate, 23, 59, 59));

//     // Format the dates for the API request
//     const startDateString = startDate.toISOString().split('.')[0];
//     const endDateString = endDate.toISOString().split('.')[0];
//     console.log(startDateString);

//     // Make the API request to retrieve seasonal manga
//     const response = await axios.get(`${BASE_URL}/manga?limit=100&order[relevance]=desc&order[latestUploadedChapter]=desc&order[updatedAt]=desc&createdAtSince=${startDateString}&year=2023`);
//     return response.data.data[0];
// }

// (async () => {
//     const seasonalManga = await getSeasonalManga();
//     console.log(seasonalManga);
// })();

// (async () => {
//   const resp = await axios({
//     method: 'GET',
//     url: `${BASE_URL}/statistics/manga/${mangaID}`
//   });

//   const { rating, follows } = resp.data.statistics[mangaID];

//   console.log(
//     'Mean Rating:', rating.average, '\n' +
//   'Bayesian Rating:', rating.bayesian, '\n' +
//   'Follows:', follows
//   );
// })();


/*

[
  {
    "_id": "64600bc19f52569e7fc8d7a6",
    "username": "Daniel Asakpa",
    "email": "daniel@gmail.com",
    "password": "$2b$10$EA0z6gG1RS5Uk49fSwboNO.L9HUZZmFmbbm0WMznuAdiRdfcHIZ8e",
    "created_at": "2023-05-13T22:14:25.262Z",
    "__v": 0
  }

{
  "message": "Authentication successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDYwMGJjMTlmNTI1NjllN2ZjOGQ3YTYiLCJpYXQiOjE2ODQwODU0MjMsImV4cCI6MTY4NDA4OTAyM30.fFFaxgNM-CDhDtI_G3mmNAmaDvvt6yGwjOfhPXICCYA"
}


{
  "apiMangaId": "7c145eaf-1037-48cb-b6ba-f259103b05ea",
  "userId": "64600bc19f52569e7fc8d7a6",
  "reading_status": "ongoing",
  "cover_photo": "https://occ-0-34-1123.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABYxJFBDckfZw1YUEIPwyuIg43Kw_HUBLvnCcgdOlvvf5Nc90SF3HSAi5L8uLyBqjziKBY-kGD2wu2JAqVsdHVR0frb6qG26I_U5v.jpg?r=77f",
  "title": "Naruto",
  "description": "Naruto is a popular Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks to become the strongest and most respected ninja in his village."
}

manga ID
64610a472f57b9c0675d833f
64611bfade1702ebf2b2f780
  */