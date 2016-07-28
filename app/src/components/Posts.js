import React from 'react';

const Posts = (props) =>
  <ul>
  {
    props.posts.map((post, i) =>
      <li key={i}>{post.name}</li>
    )
  }
  </ul>;

export default Posts;

Posts.propTypes = {
  posts: React.PropTypes.array.isRequired,
};
