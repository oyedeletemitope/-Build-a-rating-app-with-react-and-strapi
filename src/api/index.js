import axios from 'axios';
const url = "http://localhost:1337/reviews";
export const readReviews = ()=>axios.get(url);
export const createReview = newReview =>axios.post(url,newReview);

