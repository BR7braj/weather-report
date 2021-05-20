import React from "react";

import "./index.css";

import { PageHeader } from "antd";

export default function AppTitle(props) {
  return (
    <PageHeader
      id="page-header"
      className="site-page-header"
      title={"Get Comprehensive Weather Report"}
      subTitle={"Select Country, state, City and Click on GET Report"}
    />
  );
}
