import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardImg,
  Row,
  Tooltip,
} from "reactstrap";
import { Layout } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../redux/actions";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import blogs from "../../images/blog-post.jpg";
import { FaList, FaTags, FaArrowLeft } from "react-icons/fa";
import Loader from "react-loader-spinner";

const SinglePost = () => {
  const dispatch = useDispatch();

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const { id } = useParams();

  const { loading, post } = useSelector((state) => ({
    loading: state.postReducers.getSinglePost.loading,
    post: state.postReducers.getSinglePost.post,
  }));

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <Container className="home-bg" fluid={true}>
        <Container>
          <Row className="singlepost-layout bg-white">
            {loading ? (
              <Loader type="Oval" color="#00BFFF" height={40} width={40} className="my-2" />
            ) : (
              <>
                {post !== null && (
                  <>
                    <Link to="/">
                      <FaArrowLeft id="hometooltip" className="icon-arrow" />
                      <Tooltip
                        placement="bottom"
                        isOpen={tooltipOpen}
                        toggle={toggle}
                        target="hometooltip"
                      >
                        Back to home
                      </Tooltip>
                    </Link>

                    <Card className="shadow mt-3 single-post-card">
                      <CardBody>
                        <CardTitle className="single-blog-title text-info">
                          {post.title}
                        </CardTitle>
                        <CardText>
                          <FaTags />
                          Tags :
                          {post.tags.map((tag) => (
                            <span className="tags-button bg-info font-weight-bold">
                              #{tag.title}
                            </span>
                          ))}
                          <FaList className="ml-1" /> Categories :
                          {post.categories.map((post) => (
                            <span className="tags-button bg-info font-weight-bold">
                              #{post.title}
                            </span>
                          ))}
                        </CardText>
                        <CardText>
                          by
                          <span className="font-weight-bold ml-1">
                            {post.user !== null && post.user.username}
                          </span>
                          <Moment
                            format="MMM DD, YYYY"
                            className="text-secondary ml-3"
                          >
                            {post.created_at}
                          </Moment>
                        </CardText>
                        <CardImg
                          className="singlepost-card-image"
                          alt="Blog"
                          src={
                            post.featured_media
                              ? `https://infblogdemo.herokuapp.com${post.featured_media.url}`
                              : blogs
                          }
                        ></CardImg>
                        <CardText className="card-text mt-2">
                          {post.content}
                        </CardText>
                      </CardBody>
                    </Card>
                  </>
                )}
              </>
            )}
          </Row>
        </Container>
      </Container>
    </Layout>
  );
};

export default SinglePost;
