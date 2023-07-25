import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const fetchArticles = () => {
    axios
      .get(
        `http://localhost:5001/app-api/v1/photo-gallery-feed-page/page/${page}`
      )
      .then((response) => {
        console.log(response.data, "0");
        setArticles((prevArticles) => [
          ...prevArticles,
          ...response.data.nodes.map((node) => node.node),
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };
  console.log({ articles });
  return (
    <div className="App">
      {articles?.map((article, index) => (
        <div className="item" key={index}>
          <div >
          <img
            style={{ width: "250px",height:'165px', borderRadius:'20%' }}
            src={article.field_photo_image_section}
            alt={article.title}
          />
          </div>
          <div style={{marginLeft:'2%'}}>
          <h2>{article.title}</h2>
          <p style={{color:'gray'}}>{article.path}</p>
          </div>
          
          
        </div>
      ))}
      <div className="loading" ref={loader}>
        <h2>Load More...</h2>
      </div>
    </div>
  );
}

export default App;
