import React from "react";
import { connect } from "react-redux";

import { Select, Button, Row, Col } from "antd";
import "./index.css";
import {
  getAllCountries,
  getAllStatesOfCountry,
  getAllCitiesOfStates,
} from "../../actions/countryActions";

import { fetchWeather } from "../../actions/locationActions";

const { Option } = Select;

const countryData = getAllCountries();


function LocationSelector(props) {
  const [activeCountry, setActiveCountry] = React.useState();

  const [activeState, setActiveState] = React.useState();

  const [activeCity, setActiveCity] = React.useState();

  const handleCountryChange = (value) => {
    setActiveCountry(value);
    setActiveState(getAllStatesOfCountry(value)[0]?.isoCode || null);
  };

  const handleStateChange = (value) => {
    setActiveState(value);
  };

  const handleCityChange = (value) => {
    setActiveCity(value);
  };

  const handleClick = (cityName, citiesList) => {
    const currentCity = citiesList.filter((item) => {
      return item.name === cityName;
    });
    props.fetchWeather(currentCity[0].latitude, currentCity[0].longitude);
  };

  const handleReset = () => {
    setActiveCountry();
    setActiveState();
    setActiveCity();
  };

  const cities = getAllCitiesOfStates(activeCountry, activeState);

  return (
    <Row gutter={16} justify="space-between">
      <Col span={6}>
        <Select
          showSearch
          defaultValue="Select a country"
          style={{ width: 220 }}
          onChange={handleCountryChange}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {countryData.map((country) => (
            <Option key={country.isoCode}>{country.name}</Option>
          ))}
        </Select>
      </Col>
      <Col span={6}>
        <Select
          showSearch
          style={{ width: 220 }}
          value={activeState}
          defaultValue = "State"
          onChange={handleStateChange}
          optionFilterProp="children"
          disabled={!Boolean(activeCountry)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {getAllStatesOfCountry(activeCountry).map((state) => (
            <Option key={state.isoCode}>{state.name}</Option>
          ))}
        </Select>
      </Col>
      <Col span={6}>
        <Select
          showSearch
          style={{ width: 220 }}
          value={activeCity}
          defaultValue = "City"
          onChange={handleCityChange}
          optionFilterProp="children"
          disabled={!Boolean(activeCountry) && !Boolean(activeState)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {
            cities.map((city) => (
              <Option key={city.name} latitude={city.latitude}>
                {city.name}
              </Option>
            ))
          }
        </Select>
      </Col>
      <Col span={6} id="btn-container">
        <Button
          type="primary"
          disabled={
            !Boolean(activeCountry) &&
            !Boolean(activeState) &&
            !Boolean(activeCity)
          }
          onClick={() => {
            handleClick(activeCity, cities);
          }}
        >
          Get Report
        </Button>
        <Button
          type="primary"
          disabled={
            !Boolean(activeCountry) &&
            !Boolean(activeState) &&
            !Boolean(activeCity)
          }
          onClick={() => {
            handleReset(activeCity, cities);
          }}
        >
          Reset
        </Button>
      </Col>
    </Row>
  );
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps, {
  fetchWeather: fetchWeather,
})(LocationSelector);
