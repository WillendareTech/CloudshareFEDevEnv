import fetch from 'isomorphic-fetch';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';


export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit,
  };
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit,
  };
}

function receivePosts(_reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit: _reddit,
    posts: json,
    receivedAt: Date.now(),
  };
}

function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit,
  };
}

function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit));
    return fetch(`https://api.github.com/users/${reddit}/repos`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)));
  };
}

function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit));
    }
    return null;
  };
}

