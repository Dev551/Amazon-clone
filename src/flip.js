import React, { forwardRef } from "react";
import FlipMove from "react-flip-move";

const FunctionalArticle = forwardRef((props, ref) => (
  <div ref={ref}>{props.articleName}</div>
));

const TopArticles = ({ articles }) => (
  <FlipMove>
    {articles?.map((article) => (
      <FunctionalArticle key={article.id} {...article} />
    ))}
  </FlipMove>
);

export default TopArticles;
