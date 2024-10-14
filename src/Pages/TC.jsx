import React from "react";
import GlobalHeader from "../Components/GlobalHeader";
import { Col, Container, Row } from "react-bootstrap";
import Typed from "react-typed";
import GlobalFooter from "../Components/GlobalFooter";
const TC = () => {
  return (
    <div className="bg-white">
      <GlobalHeader theme="light" />
      <section className="bg-lightgray py-[40px] sm:py-[30px]">
        <Container>
          <Row className="xs:text-center">
            <Col
              xl={8}
              lg={6}
              className="flex md:justify-center md:mb-[15px] sm:block sm:text-center sm:mb-[9px]"
            >
              <h1 className="text-lg leading-[28px] text-darkgray font-medium mb-0 font-serif inline-block">
                Terms of Use
              </h1>
              <span className="font-serif text-md leading-[28px] relative pl-[25px] ml-[30px] block sm:p-0 before:absolute before:bg-darkgray before:content-[''] before:h-[12px] before:top-[8px] before:w-[2px] before:left-0 sm:before:hidden sm:ml-0">
                Last Updated : 12th October 2024
              </span>
            </Col>
            <Col
              xl={4}
              lg={6}
              className="breadcrumb justify-end px-[15px] text-sm font-serif m-0 md:justify-center"
            >
              <ul>
                <li className="!leading-[30px]">
                  {/* <Link aria-label="link for" to="/support"> */}
                  <Typed
                    className="font-semibold text-[#3eb489]"
                    strings={[
                      "PDI",
                      "Property Development Investments",
                      "Property Data Insights",
                    ]}
                    typeSpeed={80}
                    backSpeed={80}
                    loop
                    showCursor
                    cursorChar="|"
                  />
                  {/* </Link> */}
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className="items-center justify-center">
            <Col lg={9} md={12} className="col-12">
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                Terms of Use Introduction
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Welcome to app.pdimarketplace.com (the "Website"). The Website
                is operated by PDI Marketplace Kenya ("we," "our," or "us"). By
                accessing or using the Website, you ("User," "you") agree to
                comply with and be bound by the following terms and conditions
                (the "Terms of Use"). If you do not agree with these terms,
                please refrain from using the Website.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                1. Acceptance of Terms
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                By accessing or using our Website, you confirm that you have
                read, understood, and agree to be bound by these Terms of Use,
                along with our Privacy Policy. If you do not agree to these
                Terms, you must stop using our Website and services.
              </p>
              {/* <Lists theme="list-style-06" data={ListData} animationDelay={0} /> */}
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                2. Services Provided
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                PDI Marketplace Kenya provides data analysis services for
                property data. Users can obtain property insights through our
                platform by using tokens. Each search or analysis on our Website
                requires one token. Tokens can be obtained via:
                <ul className="list-style-06">
                  <li>A monthly subscription plan.</li>
                  <li>Direct purchases.</li>
                </ul>
                Upon signing up, each User will receive 3 free tokens to try out
                the platform. After the initial free tokens are used, additional
                tokens must be purchased or obtained via subscription.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                3. Account Registration
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                To access the services provided on the Website, you must create
                an account by providing accurate and complete information. You
                are responsible for maintaining the confidentiality of your
                account information and for all activities conducted under your
                account.
                <ul className="list-style-06">
                  <li>
                    You must notify us immediately of any unauthorized use of
                    your account.
                  </li>
                  <li>
                    We reserve the right to suspend or terminate accounts that
                    are suspected of breaching these Terms of Use or engaging in
                    fraudulent activity.
                  </li>
                </ul>
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                4. Tokens and Subscriptions
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                <ul className="list-style-06">
                  <li>
                    Free Tokens: Upon signing up, you will be granted 3 free
                    tokens to use the platform.
                  </li>
                  <li>
                    Monthly Subscription: Users can subscribe to our monthly
                    plan, which will provide a fixed number of tokens each
                    month.
                  </li>
                  <li>
                    Direct Purchase: Users can purchase additional tokens
                    directly without subscribing.
                  </li>
                </ul>
                Subscription tokens are valid only for the month they are issued
                and cannot be rolled over or refunded unless otherwise stated.
                Unused subscription tokens expire at the end of the subscription
                period or purchase cycle.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                5. Payments
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                All payments for subscriptions and token purchases must be made
                through the payment methods we provide on the Website. We
                reserve the right to change our pricing structure at any time,
                but any price changes will not affect the cost of tokens or
                subscriptions already purchased.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                6. Cancellation and Refund Policy
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                <ul className="list-style-06">
                  <li>
                    Subscriptions: You may cancel your subscription at any time
                    by managing your account settings. Cancellation will take
                    effect at the end of the current subscription period, and no
                    refunds will be provided for unused tokens.
                  </li>
                  <li>
                    Purchases: Tokens purchased directly are non-refundable and
                    will not expire as long as the User account remains active.
                  </li>
                </ul>
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                7. User Conduct
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                By using our Website, you agree not to:
                <ul className="list-style-06">
                  <li>
                    Use the Website in any way that violates any applicable
                    local, national, or international law or regulation.
                  </li>
                  <li>
                    Engage in any activity that disrupts or interferes with the
                    Website’s functionality or security.
                  </li>
                  <li>
                    Attempt to gain unauthorized access to any part of the
                    Website, other User accounts, or any systems or networks
                    connected to the Website.
                  </li>
                  <li>
                    Use automated systems (e.g., bots, spiders) to interact with
                    the Website without our prior written consent.
                  </li>
                </ul>
                We reserve the right to suspend or terminate your account if you
                violate any of these terms.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                8. Intellectual Property
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                All content on the Website, including text, graphics, logos,
                images, data compilations, and software, is the intellectual
                property of PDI Marketplace Kenya or its licensors and is
                protected by applicable copyright, trademark, and other
                intellectual property laws.
                <ul className="list-style-06">
                  <li>
                    You may not reproduce, distribute, or create derivative
                    works of any content on the Website without our express
                    written permission.
                  </li>
                </ul>
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                9. Disclaimers and Limitation of Liability
              </h6>
              <ul className="list-style-06">
                <li>
                  No Warranty: The Website and the services are provided on an
                  "as-is" and "as-available" basis without warranties of any
                  kind, whether express or implied. We do not guarantee that the
                  Website will be error-free, uninterrupted, or free of harmful
                  components.
                </li>
                <li>
                  Limitation of Liability: To the fullest extent permitted by
                  law, we shall not be liable for any direct, indirect,
                  incidental, consequential, or punitive damages arising from
                  your use of or inability to use the Website or services, even
                  if we have been advised of the possibility of such damages.
                </li>
              </ul>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                10. Indemnification
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                You agree to indemnify, defend, and hold harmless PDI
                Marketplace Kenya, its directors, officers, employees, and
                agents from and against any and all claims, damages,
                liabilities, costs, or expenses arising out of or related to:
                <ul className="list-style-06">
                  <li>Your use of the Website or services.</li>
                  <li>Any violation of these Terms of Use.</li>
                  <li>Any violation of applicable laws or regulations.</li>
                </ul>
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                11. Changes to These Terms
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                We reserve the right to modify these Terms of Use at any time.
                Any changes will be effective immediately upon posting the
                revised terms on the Website. Your continued use of the Website
                after the changes are posted constitutes your acceptance of the
                new Terms of Use.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                12. Governing Law
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                These Terms of Use and any disputes related to them or your use
                of the Website shall be governed by and construed in accordance
                with the laws of Kenya, without regard to conflict of law
                principles.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                13. Dispute Resolution
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                In the event of any disputes arising from or relating to these
                Terms of Use, the parties agree to first attempt to resolve the
                dispute through informal discussions. If the dispute is not
                resolved informally, it shall be submitted to binding
                arbitration in Nairobi, Kenya.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                14. Severability
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                If any provision of these Terms of Use is found to be invalid,
                illegal, or unenforceable, the remaining provisions shall
                continue in full force and effect.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                15. Termination
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                We reserve the right to suspend or terminate your access to the
                Website at any time, for any reason, including but not limited
                to violations of these Terms of Use. Upon termination, your
                right to use the Website will immediately cease, and any unused
                tokens will be forfeited.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                16. Contact Information
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                If you have any questions about these Terms of Use or need
                further assistance, please contact us at:
                <br />
                <ul className="list-style-03">
                  <li>PDI Marketplace Kenya</li>
                  <li>New Rehema House, Nairobi</li>
                  <li>Email: info@pdimarketplace.com</li>
                </ul>
              </p>
              By using the Website, you acknowledge that you have read and agree
              to these Terms of Use. If you do not agree with these terms,
              please discontinue your use of the Website.
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <GlobalFooter
        theme="dark"
        className="bg-[#262b35] text-slateblue gym-fitness-footer"
      />
    </div>
  );
};

export default TC;
