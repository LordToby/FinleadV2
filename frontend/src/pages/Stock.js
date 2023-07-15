import React, { useState, useEffect } from "react";
import LineChart from "../components/charts/LineChart";
import { CommentField } from "../components/CommentField";
import { CommentBox } from "../components/CommentBox";
import { useParams } from "react-router-dom";

const StockData = [
  {
    id: 1,
    year: 2016,
    stockPrice: 80000,
  },
  {
    id: 2,
    year: 2017,
    stockPrice: 45677,
  },
  {
    id: 3,
    year: 2018,
    stockPrice: 78888,
  },
  {
    id: 4,
    year: 2019,
    stockPrice: 90000,
  },
  {
    id: 5,
    year: 2020,
    stockPrice: 4300,
  },
];
function Stock() {
  const { ticker } = useParams();
  const [chartData, setChartData] = useState({
    labels: StockData.map((data) => data.year),
    datasets: [
      {
        data: StockData.map((data) => data.stockPrice),
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:${4000}/api/comments/${ticker}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "default",
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      setComments(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const sortedComments = comments.sort(
    (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
  );

  const handleNewComment = async (commentData) => {
    console.log("Så kører vi! Som Italiensk Peter altid sagde.. ");
    setComments([...comments, commentData]);
    await fetchComments();
  };

  return (
    <div style={{ width: 700 }}>
      <LineChart chartData={chartData} ticker={ticker} />
      <CommentField ticker={ticker} setComments={handleNewComment} />
      <br></br>
      <div className="comment-section">
        {comments.reverse().map((comment, index) => (
          <div key={index}>
            <CommentBox
              userName={comment.userReference}
              date={comment.createdAt}
              content={comment.content}
              likes={comment.likes}
            />
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stock;
