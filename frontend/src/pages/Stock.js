import React, { useState, useEffect } from "react";
import LineChart from "../components/charts/LineChart";
import { CommentField } from "../components/CommentField";
import { CommentBox } from "../components/CommentBox";
import { useParams } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
//import { io } from "socket.io-client";

//const socket = io("http://localhost:4000")


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
  const [comments, setComments] = useState([]);
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

  // const handleServerResponse = () => {
  //   console.log("refetching the new comments")
  //   fetchComments();
  // };

  // socket.on("serverResponse", (updatedComments) => {
  //   setComments(updatedComments);
  // });



  // useEffect(() => {
  //   fetchComments();

  //   // Subscribe to the stock updates using the socket
  //   //socket.emit("subscribe", ticker);

  //   // Listen for new comments from the socket
  //   socket.on("newComment", handleNewComment);
    
    

  //   return () => {
  //     socket.off("newComment", handleNewComment);
  //     socket.disconnect();
  //   }

  // }, []);

  // const fetchComments = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:${4000}/api/comments/${ticker}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         cache: "default",
  //       }
  //     );
  //     const responseData = await response.json();
  //     console.log(responseData);
  //     setComments(responseData.reverse());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //const sortedComments = comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleNewComment = async(newComment) =>{
    setComments([...comments, newComment])
   // window.location.reload();
 
  }
  
  return (
    <div style={{ width: 700 }}>
      <LineChart chartData={chartData} ticker={ticker} />
      {/* <CommentField ticker={ticker} setComments={handleNewComment} /> */}
      <br></br>
      <div className="comment-section">
      {/* {comments.map((comment, index) => (
    <div key={index}>
      <CommentBox userName={comment.userReference} 
      id={comment._id}
      date={comment.createdAt} 
      content={comment.content} 
      likes={comment.likes}/>
      <br></br>
    </div>
  ))} */}
      </div>     
    </div>
  );
}

export default Stock;
