import React, { useState, useEffect } from "react";
import * as api from "./api";

import "./styles/review_style.css";
import { FaStar } from "react-icons/fa";
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function App() {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = React.useState(0);
  const [hoverValue, setHoverValue] = React.useState(undefined);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  c
  const [review, setReview] = useState({});
  const [reviews, setReviews] = useState([]);
  useEffect(
    () => {
      const fetchData = async () => {
        const result = await api.readReviews();
        // console.log(result);
        setReviews(result.data);
      };
      fetchData();

     
    },
   
    []
  );
  const createReview = async () => {
    try {
      console.log(review);
      const data = await api.createReview(review);
      setReview([...reviews, data]);
    } catch (error) {
      console.log(error);
    }
  };
  let [reviewCount, setreviewCount] = useState([]);
  const setCountFxn = (no) => {
    setReview(no);
  };
  return (
    <>
      <form>
        <div style={styles.container}>
          <h2>RATE OUR SERVICE</h2>

          <div style={styles.stars}>
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                  color={
                    (hoverValue || currentValue) > index
                      ? colors.orange
                      : colors.grey
                  }
                  onClick={() => {
                    setReview({ ...review, Rating: index + 1 });
                  }}
                  onMouseOver={() => handleMouseOver(index + 1)}
                />
              );
            })}
          </div>
          <div>
            <input
              type="text"
              placeholder="input your name"
              required
              style={styles.input}
              value={review.Name}
              onChange={(e) => setReview({ ...review, Name: e.target.value })}
            />
          </div>

          <textarea
            placeholder="what's your feedback"
            required
            style={styles.textarea}
            value={review.review}
            onChange={(e) => setReview({ ...review, review: e.target.value })}
          />
          <button
            type="submit"
            style={styles.button}
            class="btn btn-primary"
            onClick={createReview}
          >
            submit
          </button>
        </div>
      </form>

      <section id="reviews">
        <div className="reviews-heading">
          <span>REVIEWS FROM CUSTOMERS</span>
        </div>

        <div className="container">
          <div className="row">
            {reviews.map((review, i) => ( // calling the api
              <div className="col-md-6">
                <div className="reviews-box">
                  <div className="box-top">
                    <div className="profile">
                    
                      <div class="name-user">
                        <strong>{review.Name}</strong>
                      </div>
                    </div>

                    <div style={styles.stars}>
                      {Array.from({ length: review.Rating }).map((i) => (
                        <FaStar key={i} size={18} color={colors.orange} />
                      ))}
                    </div>
                  </div>

                  <div className="client-comment">{review.review}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const styles = {
  container: {
    align: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 0 20px 0 #999",
    width: "30%",
    margin: "50px auto",
    flexDirection: "column",
  },
  input: {
    borderRaduis: 5,
    width: 300,
    margin: "10px 0",
    marginDown: "15px",
    minHeight: 30,
    padding: 1,
    height: "20px",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRaduis: 5,
    width: 300,
    margin: "20px 0",
    minHeight: 100,
    padding: 10,
  },

  button: {
    border: "1px solid #a9a9a9",
    borderRaduis: 5,
    width: 300,
    padding: 10,
    margin: "20px 0",
  },
};
export default App;
