import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, setPage } from "./redux/slice/postSlice";
// import imageLoader from './loader.gif';

function Post() {
  const dispatch = useDispatch();
  const { data, loading, page, hasMore } = useSelector((state) => state.post);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(setPage(page + 1));
    }
  };

  useEffect(() => {
    dispatch(fetchPost(page));
  }, [dispatch, page]);

  return (
    <div className="container-fluid">
      <h3 className="text-center mt-3 mb-0">Welcome to Crypto Currency!!</h3>
      <div className="row">
        {data &&
          data.map((post) => (
            <div className="col-lg-3 mt-5 mb-3">
              <div key={post.userId}>
                <div className="card profile-card-5">
                  <div className="card-body pt-0">
                    <div>
                      <h6 className="card-title">{post.id}</h6>
                    </div>
                    <div>
                      <h6 className="card-title">Coin Title:{post.title}</h6>
                    </div>
                    <p className="card-text">
                      <h6 className="card-title">Coin Body: {post.body}</h6>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {loading && <p className="text-center">Loading...</p>}
        {!loading && hasMore && (
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
        {!hasMore && <p>No more data to load.</p>}
      </div>
    </div>
  );
}

export default Post;
