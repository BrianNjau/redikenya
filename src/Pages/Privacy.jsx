import React from "react";
import GlobalHeader from "../Components/GlobalHeader";
import { Col, Container, Row } from "react-bootstrap";
import Typed from "react-typed";
import GlobalFooter from "../Components/GlobalFooter";
const Privacy = () => {
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
                Privacy policy
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
                Policy Introduction
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                PDI Marketplace Kenya ("we," "our," "us") operates the website
                app.pdimarketplace.com (the "Website"). We are committed to
                protecting and respecting your privacy in accordance with
                applicable data protection laws, including the General Data
                Protection Regulation (GDPR).
                <br />
                <br />
                This Privacy Policy explains how we collect, use, and protect
                personal data that you provide to us when you use our services,
                and it outlines your rights regarding your personal data.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                1. Information We Collect
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                We collect and process personal data about you when you use our
                website or our services.
                <br /> This may include:
                <ul className="list-style-06">
                  <li>Personal Identifiers: Name, email address.</li>
                  <li>
                    Property Data: Information you provide about properties
                    during use of our analysis services.
                  </li>
                  <li>
                    Technical Data: IP address, browser type and version, time
                    zone settings, and location-based data.
                  </li>
                  <li>
                    Usage Data: Information on how you use our website and
                    services.
                  </li>
                </ul>
                <br />
                We may collect this information when you:
                <ul className="list-style-06">
                  <li>Visit our website.</li>
                  <li>Create an account or subscribe to our services.</li>
                  <li>Contact us for customer support.</li>
                  <li>Provide feedback or participate in surveys.</li>
                </ul>
              </p>
              {/* <Lists theme="list-style-06" data={ListData} animationDelay={0} /> */}
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                2. How We Use Your Data
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                We use your data for the following purposes:
                <ul className="list-style-06">
                  <li>
                    To provide and manage your access to our Website and
                    services.
                  </li>
                  <li>
                    To personalize and improve our services, such as by
                    providing property insights based on your preferences.
                  </li>
                  <li>
                    To communicate with you regarding your account, services, or
                    any inquiries.
                  </li>
                  <li>To comply with legal obligations.</li>
                  <li>
                    To protect the security and integrity of our Website and
                    services.
                  </li>
                </ul>
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                3. Legal Basis for Processing Your Data
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Under GDPR, the lawful bases for processing your personal data
                are:
                <ul className="list-style-06">
                  <li>Consent: Where you have given us explicit permission.</li>
                  <li>
                    Contractual Necessity: To perform a contract with you (e.g.,
                    providing property data analysis).
                  </li>
                  <li>
                    Legal Obligation: To comply with laws and regulations.
                  </li>
                  <li>
                    Legitimate Interests: For the purpose of operating and
                    improving our business (e.g., fraud prevention and ensuring
                    the security of our services).
                  </li>
                </ul>
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                4. Sharing Your Data
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                We do not sell, trade, or otherwise transfer your personal data
                to outside parties, except as outlined in this policy:
                <ul className="list-style-06">
                  <li>
                    Service Providers: We may share your data with trusted
                    service providers who assist us in operating our Website,
                    such as hosting services, or processing payments.
                  </li>
                  <li>
                    Legal Compliance: We may disclose your personal data if
                    required to do so by law or in response to valid requests by
                    public authorities.
                  </li>
                </ul>
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                5. Data Retention
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                We retain personal data only as long as necessary to fulfill the
                purposes for which it was collected, including any legal or
                reporting requirements. When we no longer need your personal
                data, we will securely delete or anonymize it.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                6. Data Security
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                We take appropriate technical and organizational measures to
                protect your personal data from unauthorized access, disclosure,
                alteration, or destruction. However, please note that no method
                of transmission over the internet is entirely secure, and we
                cannot guarantee absolute security.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                7. Your Rights Under GDPR
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                As a data subject, you have the following rights:
                <ul className="list-style-06">
                  <li>
                    Right to Access: You can request copies of your personal
                    data.
                  </li>
                  <li>
                    Right to Rectification: You can request correction of
                    inaccurate or incomplete data.
                  </li>
                  <li>
                    Right to Erasure: You can request the deletion of your data
                    where there is no legal reason for us to retain it.
                  </li>
                  <li>
                    Right to Restriction of Processing: You can request that we
                    limit how your data is processed.
                  </li>
                  <li>
                    Right to Data Portability: You can request your personal
                    data in a commonly used format to transfer to another
                    service provider.
                  </li>
                  <li>
                    Right to Object: You can object to the processing of your
                    personal data in some circumstances, such as for direct
                    marketing.
                  </li>
                </ul>
                If you wish to exercise any of these rights, please contact us
                at info@pdimarketplace.com. We will respond to your request
                within one month.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                8. Cookies
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                We use cookies to enhance your experience on our Website and to
                gather analytical data. You can control your cookie preferences
                through your browser settings. For more information, please see
                our Cookie Policy.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                9. International Data Transfers
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                If we transfer personal data outside of the European Economic
                Area (EEA), we ensure appropriate safeguards are in place to
                protect your personal data in compliance with GDPR.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                10. Children’s Privacy
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Our services are not intended for children under the age of 16,
                and we do not knowingly collect personal data from children. If
                we learn that we have inadvertently collected data from a child
                under 16, we will take steps to delete the information as soon
                as possible.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                11. Changes to This Privacy Policy
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                We may update this Privacy Policy anytime to reflect changes in
                our practices or legal obligations. Any updates will be posted
                on this page.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                12. Contact Us
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                If you have any questions or concerns about this Privacy Policy
                or how we handle your personal data, please contact us at:
              </p>
              <ul className="mb-[25px] md:mb-[20px] sm:mb-[15px] list-style-03">
                <li>PDI Marketplace Kenya</li>
                <li>New Rehema House, Nairobi</li>
                <li>Email: info@pdimarketplace.com</li>
              </ul>
              <hr />
              <br />
              By using our Website and services, you acknowledge that you have
              read and understood this Privacy Policy.
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

export default Privacy;
