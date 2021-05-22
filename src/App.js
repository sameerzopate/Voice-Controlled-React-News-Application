import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import './App.css'


import { NewsCards } from './components';
import useStyles from './styles';
// import Modal from './components/Modal/Modal';



function App() {

  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(()=>{
    alanBtn({
      key:'4e6fc75fda5973df17e7d11a320a28942e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    
    <div className='Main-app'>

        <div className={classes.logoContainer}>
          {newsArticles.length ? (
            <div className={classes.infoContainer}>
              <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
              <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
            </div>
          ) : null}
          <img src="https://www.voicesummit.ai/hubfs/alan-logo-vertical-color.png" className={classes.alanLogo} alt="logo" />
        </div>

      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      
      {!newsArticles.length ? (

        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/adrian-hajdin/"> Sameer Zopate</a> -
            <a className={classes.link} href="http://youtube.com/javascriptmastery"> Alan AI News App</a>
          </Typography>
        </div>

      ) : null}
      
    </div>
    
  );
};

export default App;


// '904b6ea5d4124939909e78b9b0861d72'
