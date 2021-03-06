import React, { useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { allCategories } from "../../redux/actions";
import { Layout } from "../../components";
import Loader from "react-loader-spinner";

const AllCategories = () => {
  const dispatch = useDispatch();

  const { loading, categoriesData } = useSelector((state) => ({
    loading: state.categoryReducers.allCategories.loading,
    categoriesData: state.categoryReducers.allCategories.categoriesData,
  }));

  useEffect(() => {
    dispatch(allCategories());
  }, [dispatch]);

  return (
    <Layout>
      <Container fluid className="home-bg">
        <Row className="shadow tags-title-container bg-white">
          <Col sm="12" className="tags-title">
            Categories
          </Col>
          <Col sm="12">
            {loading ? (
              <Loader
                type="Oval"
                color="#00BFFF"
                height={40}
                width={40}
                className="my-2"
              />
            ) : (
              <>
                {categoriesData !== null &&
                  categoriesData
                    .sort((a, b) =>
                      new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                    )
                    .map((category) => (
                      <Button className="tags-title-button">
                        #{category.title}
                      </Button>
                    ))}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AllCategories;
