const axios = require('axios');
const { faker } = require('@faker-js/faker');

// // create manga test
// const createManga = async (mangaData) => {
//     try {
//         const response = await axios.post('http://localhost:5000/api/manga', mangaData);
//         console.log('Manga created:', response.data);
//     } catch (error) {
//         console.error('Error creating manga:', error);
//     }
// };

// for (let i = 0; i < 100; i++) {
//     const mangaData = {
//         apiMangaId: faker.string.hexadecimal({ length: 24 }),
//         userId: "64600bc19f52569e7fc8d7a6",
//         title: faker.lorem.words(3),
//         description: faker.lorem.paragraph(),
//         coverPhoto: faker.image.avatar(),
//         readingStatus: faker.helpers.arrayElement(['Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read']),
//         rating: faker.number.int({ min: 0, max: 5 }),
//     };

//     createManga(mangaData);
// }

// // get all manga data from database and add all the mangas to a reading list
// axios.get('http://localhost:5000/api/manga')
//     .then(response => {
//         const mangaList = response.data.mangaList;
//         const mangaIds = mangaList.map(manga => manga._id);
//         console.log('Manga IDs:', mangaIds);

//         const addNewMangaToReadingList = async (listId, mangaId) => {
//             try {
//                 const response = await axios.post(`http://localhost:5000/api/readingList/${listId}/mangas`, { listId, mangaId });
//                 console.log(`Manga ${mangaId} added to reading list ${listId}`);
//             } catch (error) {
//                 console.error(`Error adding manga ${mangaId} to reading list ${listId}:`, error);
//             }
//         };

//         const readingListId = '646015545cdc2a6d9d61b1f4';

//         mangaIds.forEach(mangaId => {
//             addNewMangaToReadingList(readingListId, mangaId);
//         });
//     })
//     .catch(error => {
//         console.error('Error retrieving manga data:', error);
//     });