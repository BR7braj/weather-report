import "./index.css";

import React from "react";
import { Typography } from 'antd';
const { Title } = Typography;

export default  function AppHeader () {

    return (
    <div className = "app-header"><Title level ={1}>
        Weather App
    </Title>
    </div>)

}