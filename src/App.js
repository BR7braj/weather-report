import "./App.css";

import { connect } from "react-redux";
import { useEffect } from "react";
import { Layout, Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";

import { fetchWeather } from "./actions/locationActions";
import AppHeader from "./components/AppHeader";
import AppTitle from "./components/AppTitle";
import LocationSelector from "./components/LocationSelector";
import LocationReport from "./components/LocationReport";

const { Header, Footer, Content } = Layout;

function App(props) {

  //used to get the location of the user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        props.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        console.error("Not able to fetch user current location");
      },
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
    );
  }, []);


  const locSummary =
    props?.weather?.weathe?.weather[0].main ||
    null + " : " + props?.weather?.weather?.weather[0].description ||
    null;

 

  const renderContent = () => {
    if (props.weather.weather !== undefined) {
      return (
        <>
          <AppTitle
            locName={props?.weather?.weather?.name ?? "Location"}
            locSummary={locSummary}
          ></AppTitle>
          <LocationSelector></LocationSelector>
          <LocationReport style = {{padding : "100px 20px"}}></LocationReport>
        </>
      );
      } else if (props.weather.weather === undefined) {
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return <Spin indicator={antIcon} />;
    }
  };

  return (
    <Layout>
      <Header>
        <AppHeader></AppHeader>
      </Header>
      <Content>{renderContent()}</Content>
      <Footer></Footer>
    </Layout>
  );
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps, {
  fetchWeather: fetchWeather,
})(App);
