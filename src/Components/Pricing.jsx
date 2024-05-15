import { Tab } from "bootstrap";
import React from "react";
import { Col, Container, Row, Tabs } from "react-bootstrap";
import PricingTable from "./PricingTable";
import { pricingDataMonth, pricingDataYear } from "../Data/Pricing";

const Pricing = () => {
  return (
    <Row className="justify-center">
      <Col xs={12} xl={10} lg={11} className="switch-tab">
        <Tabs defaultActiveKey="monthly">
          <Tab eventKey="monthly" title="MONTHLY">
            <PricingTable
              grid="row row-cols-1 gap-y-10 row-cols-md-3 items-center"
              theme="pricing-table-style-04"
              className="mt-4"
              data={pricingDataMonth}
            />
          </Tab>
          <Tab eventKey="yearly" title="YEARLY">
            <PricingTable
              grid="row row-cols-1 row-cols-md-3 gap-y-10 items-center"
              theme="pricing-table-style-04"
              className="mt-4"
              data={pricingDataYear}
            />
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Pricing;
