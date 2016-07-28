import React from 'react';
import { connect } from 'react-redux';
import { selectReddit, invalidateReddit, fetchPostsIfNeeded } from '../actions/asyncActions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class AsyncApp extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedReddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedReddit));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedReddit));
    }
  }

  handleChange(nextReddit) {
    this.props.dispatch(selectReddit(nextReddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { dispatch, selectedReddit } = this.props;
    dispatch(invalidateReddit(selectedReddit));
    dispatch(fetchPostsIfNeeded(selectedReddit));
  }

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props;
    console.log(this.props);
    return (
      <div>
        <Picker
          value={selectedReddit}
          onChange={this.handleChange}
          options={['kabessC', 'followcat']}
        />
        <p>
        {lastUpdated &&
          <span>
            Last updated at {new Date(lastUpdated).toLocalTimeString()}.
            {' '}
          </span>
        }
        {!isFetching &&
          <a
            href="#"
            onClick={this.handleRefreshClick}
          >
          Refresh
          </a>
        }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <div
            style={{ opacity: isFetching ? 0.5 : 1 }}
          >
            <Posts posts={posts} />
          </div>
        }
      </div>
    );
  }
}


AsyncApp.propTypes = {
  selectedReddit: React.PropTypes.string.isRequired,
  posts: React.PropTypes.array.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  lastUpdated: React.PropTypes.number,
  dispatch: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts,
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(AsyncApp);
