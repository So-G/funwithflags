import React, { useEffect } from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import Article from "../components/Article";

const News = () => {
  const [newsData, setNewsData] = React.useState([]);
  const [author, setAuthor] = React.useState("");
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get("http://localhost:3003/articles")
      .then((res) => setNewsData(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 8) {
      setError(true);
    } else {
      axios
        .post("http://localhost:3003/articles", {
          author: author,
          content: content,
          date: Date.now(),
        })
        .then(() => {
          setError(false);
          setAuthor("");
          setContent("");
          getData();
        });
    }
  };

  return (
    <div className='news-container'>
      <Logo />
      <Navigation />
      <h1>News</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setAuthor(e.target.value)}
          type='text'
          placeholder='Nom'
          value={author}
        />
        <textarea
          style={{ border: error ? "1px solid red" : "none" }}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Message'
          value={content}
        ></textarea>
        {error && <p>Veuillez écrire un minimum de 140 caractères</p>}
        <input type='submit' value='Envoyer' />
      </form>
      <ul>
        {newsData
          .sort((a, b) => b.date - a.date)
          .map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </ul>
    </div>
  );
};

export default News;
