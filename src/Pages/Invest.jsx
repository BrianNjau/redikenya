import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalHeader from "../Components/GlobalHeader";
import { Col, Container, Row } from "react-bootstrap";
import Typed from "react-typed";
import { fadeIn } from "../Functions/GlobalAnimations";
// import { MockResponse } from "@/ProChat/mocks/streamResponse";
import MultiRangeSlider from "../Components/MultiRangeSlider";
import {
  Checkbox,
  Select,
  Skeleton,
  Result,
  FloatButton,
  Button,
  Modal,
  List,
  Space,
  Spin,
  Tooltip,
  Drawer,
  Row as RowAnt,
  Col as ColAnt,
  ConfigProvider,
  Progress,
  Tour,
} from "antd";
import {
  GlobalContext,
  NotificationContext,
  useSupabaseAuth,
} from "../Context/Context";
import { Supabase } from "../Functions/SupabaseClient";
import {
  CodeOutlined,
  DollarOutlined,
  HomeOutlined,
  MonitorOutlined,
  QuestionCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import MapPin from "../Assets/img/CilLocationPin.svg";
import InvestIcon from "../Assets/img/investIcon.svg";
import SearchInvest from "../Assets/img/searchInvest.svg";

import yHImage from "../Assets/img/yht.svg";
import LsqImage from "../Assets/img/lsqm.svg";
import HGRIImage from "../Assets/img/hgri.svg";
import { useNavigate } from "react-router-dom";
import { ProChat } from "@ant-design/pro-chat";
import OpenAI from "openai";
import { consumeToken } from "../Functions/ConsumeToken";
import { title } from "process";
import GlobalFooter from "../Components/GlobalFooter";
// import { OpenAIStream, StreamingTextResponse } from "ai";
// import { useCompletion } from "ai/react";
// import { useChatCompletion } from "openai-streaming-hooks";

const Invest = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [loadingPropData, setLoadingPropData] = useState([]);
  const [loadingPropOverview, setLoadingPropOverview] = useState([]);
  const [propData, setPropData] = useState([]);
  const [propOverview, setPropOverview] = useState([]);
  const [selectedMarketPrice, setSelectedMarketPrice] = useState([]);
  const [selectedRentPrice, setSelectedRentPrice] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([
    "Nairobi Kileleshwa",
  ]);
  const [selectedTypology, setSelectedTypology] = useState(["1BR", "2BR"]);
  const [filterSearchLoading, setFilterSearchLoading] = useState(false);
  const [filterSearchResults, setFilterSearchResults] = useState([]);
  const [isConfirmSearchModalOpen, setIsConfirmSearchModalOpen] =
    useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isAlgorithmModalOpen, setAlgorithmIsModalOpen] = useState(false);

  const { setHeaderHeight } = useContext(GlobalContext);

  const mapsApi = process.env.REACT_APP_GOOGLEMAPSAPI;
  const openAIKEY = process.env.REACT_APP_OPENAPIKEY;
  const navigate = useNavigate();
  const { openNotification } = useContext(NotificationContext);

  //consume token load
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("active"); // Possible statuses: 'active', 'exception', 'success'
  const [consumeTokenLoading, setConsumeTokenLoading] = useState(false);
  const session = useSupabaseAuth();
  const [openTour, setTourOpen] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    setHeaderHeight(120);
    fetchPropData();
    fetchPropOverview();
  }, [session]);

  async function fetchPropData() {
    try {
      setLoadingPropData(true);

      //get data
      let { data: PropData } = await Supabase.from("PropData").select("*");
      setPropData(PropData);

      // console.log("prop data =>", PropData);
      setLoadingPropData(false);
    } catch (error) {
      setLoadingPropData(false);
      console.log("Fetch property Data err >", error);
    }
  }

  async function fetchPropOverview() {
    try {
      setLoadingPropOverview(true);
      //get data
      let { data: PropOverview } = await Supabase.from(
        "Property Overview"
      ).select("*");
      setPropOverview(PropOverview);
      console.log("Prop Overview =>", PropOverview);
      setLoadingPropOverview(false);
    } catch (err) {
      setLoadingPropOverview(false);
      console.log(err);
    }
  }

  const showAlgorithmModal = () => {
    setAlgorithmIsModalOpen(true);
  };

  const handleAlgorithmModalOk = () => {
    setAlgorithmIsModalOpen(false);
  };

  const handleAlgorithmModalCancel = () => {
    setAlgorithmIsModalOpen(false);
  };

  const marketPrices = propData.map((val) => val["Market Price"]) || [];
  const rents = propData.map((val) => val["Rent"]) || [];
  const locations =
    [...new Set(propOverview.map((val) => val["Location"]))] || [];

  const handleMarketPricePicker = (marketPrices) => {
    setSelectedMarketPrice(marketPrices);
  };
  // const handleMarketPriceNumberPicker =  (marketPrices) => {
  //   setSelectedMarketPrice(marketPrices);
  // }
  const handleRentPricePicker = (rentPrices) => {
    setSelectedRentPrice(rentPrices);
  };
  const handleLocationPicker = (locations) => {
    setSelectedLocation(locations);
  };
  const handleTypologyPicker = (typologies) => {
    setSelectedTypology(typologies);
  };

  function filterByValue(data, selectedPrice, type) {
    try {
      const isValidPrice = (marketPrice) => {
        return !isNaN(parseFloat(marketPrice)) && isFinite(marketPrice);
      };
      const filterPriceRange = (result, property) => {
        const marketPrice = property[type];

        if (!marketPrice || !isValidPrice(marketPrice)) {
          result.discarded.push(property); // add to discarded items
          return false;
        }

        if (
          selectedPrice.length !== 0 &&
          (marketPrice < selectedPrice[0] || marketPrice > selectedPrice[1])
        ) {
          result.discarded.push(property); // add to discarded items
          return result;
        }
        result.filtered.push(property);
        return result;
      };
      const initialResult = { filtered: [], discarded: [] };
      const { filtered, discarded } = data.reduce(
        filterPriceRange,
        initialResult
      );
      return { filtered, discarded };
    } catch (err) {
      console.log(err);
    }
  }

  function filterByLocation(data, selectedLocation, lookUpData) {
    try {
      if (selectedLocation.length === 0) {
        return data;
      }
      const filterLocations = (result) => {
        const propertyID = result["PropertyID"];
        const foundLocation = lookUpData.find(
          (a) =>
            a["Property ID"] === propertyID &&
            selectedLocation.includes(a["Location"])
        );
        // console.log(foundLocation);
        if (foundLocation) {
          return result;
        }
        return false;
      };
      const filteredResults = data.filter(filterLocations);
      return filteredResults;
    } catch (err) {
      console.log(err);
    }
  }

  function filterByTypology(data, typologies) {
    try {
      // console.log("typolo", typologies);
      // console.log("data", data);
      if (typologies.length === 0) {
        return data;
      }

      const filteredResults = data.filter((property) =>
        typologies.includes(property["Typology"])
      );
      // console.log("in typology", filteredResults);

      return filteredResults;
    } catch (err) {
      console.log(err);
    }
  }

  function filterProperties() {
    try {
      setFilterSearchLoading(true);
      const filterByMarketPrice = filterByValue(
        propData,
        selectedMarketPrice,
        "Market Price"
      ); // filter by marketprice
      // console.log("MarketPrice filtered result", filterByMarketPrice);
      const filterByRent = filterByValue(
        filterByMarketPrice.filtered,
        selectedRentPrice,
        "Rent"
      );
      // console.log("Rent filtered result", filterByRent);
      const locationFiltered = filterByLocation(
        filterByRent.filtered,
        selectedLocation,
        propOverview
      );
      // console.log("FILTERED WITH LOcation", locationFiltered);
      const typologyFiltered = filterByTypology(
        locationFiltered,
        selectedTypology
      );

      // console.log("typology filtered", typologyFiltered);

      const enrichedData = typologyFiltered.map((el) => {
        let locationName = propOverview.find(
          (prop) => prop["Property ID"] === el["PropertyID"]
        )["Name"];
        console.log("location name", locationName);
        let location = propOverview.find(
          (prop) => prop["Property ID"] === el["PropertyID"]
        )["Location"];
        let road = propOverview.find(
          (prop) => prop["Property ID"] === el["PropertyID"]
        )["Road"];
        let saleType = propOverview.find(
          (prop) => prop["Property ID"] === el["PropertyID"]
        )["Sale type"];

        return {
          propertyName: locationName,
          location: location,
          road: road,
          ...el,
        };
      });
      // console.log("FILTERED By Typology", typologyFiltered);
      // console.log("enrichedData", enrichedData);
      setFilterSearchResults(enrichedData);
      setFilterSearchLoading(false);
      setHasSearched(true);
      // setTourOpen(true);
    } catch (error) {
      setFilterSearchLoading(false);
      // console.log("FILTER PROPERTIES ERROR=>", error);
    }
  }
  // const ref1 = useRef(null);
  // const aiAlert = [
  //   {
  //     title: <span>Understand your search results!</span>,
  //     description: "Use our algorithms and AI",
  //     target: () => ref1.current,
  //   },
  // ];

  const showConfirmModal = () => {
    setIsConfirmSearchModalOpen(true);
  };
  const handleOkSearch = async () => {
    try {
      setConsumeTokenLoading(true);

      setProgress(30);

      setTimeout(() => 60, 1000);

      //check user login
      if (!session) {
        setIsConfirmSearchModalOpen(false);
        navigate("/login");
        openNotification(
          "topRight",
          "Login required",
          "You must login to get our data insights"
        );
        return;
      }
      //try to consume token
      const consumeTokenResult = await consumeToken(session.user.id);
      console.log("consume token result", consumeTokenResult);

      if (consumeTokenResult.success) {
        setProgress(100);
        setStatus("success");
        setTimeout(() => {
          filterProperties();
          setIsConfirmSearchModalOpen(false);
          openNotification(
            "topRight",
            "Successfully completed search",
            consumeTokenResult.message
          );
          setConsumeTokenLoading(false);
          setProgress(0);
          setStatus("active");
        }, 1000);
      } else {
        setProgress(100);
        setStatus("exception"); // Show error status if something goes wrong
        setTimeout(() => {
          openNotification(
            "topRight",
            "Failed to complete search",
            consumeTokenResult.message
          );
          setConsumeTokenLoading(false);
          setIsConfirmSearchModalOpen(false);
          setProgress(0);
          setStatus("active");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelSearch = () => {
    setIsConfirmSearchModalOpen(false);
  };

  const IconText = ({ icon, text }) => {
    return (
      <Space>
        {icon}
        {text}
      </Space>
    );
  };

  const mapContainerStyle = {
    minWidth: "17vh",
    minHeight: "15vh",
    borderRadius: "10px",
    boxShadow: "rgba(black, 0.66) 0 30px 60px 0",
    transition: "1s $returnEasing",
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapsApi,
  });
  // console.log(
  //   "Context=>",
  //   filterSearchResults.map((item) => JSON.stringify(item)).join(" ")
  // );

  // AI SETUP
  async function HandleAIMessages(messages) {
    console.log("messages", messages);

    // Function to chunk data based on the specified chunk size
    // const chunkData = (data, chunkSize) => {
    //   const chunks = [];
    //   let currentChunk = [];

    //   data.forEach((item) => {
    //     const currentSize = JSON.stringify(currentChunk).length;
    //     const itemSize = JSON.stringify(item).length;

    //     if (currentSize + itemSize < chunkSize) {
    //       currentChunk.push(item);
    //     } else {
    //       chunks.push(currentChunk);
    //       currentChunk = [item];
    //     }
    //   });

    //   if (currentChunk.length) chunks.push(currentChunk);
    //   return chunks;
    // };

    try {
      const openai = new OpenAI({
        apiKey: openAIKEY,
        dangerouslyAllowBrowser: true,
      });
      // Ensure the messages format is appropriate for ChatGPT

      //create embeddings
      // const getEmbeddings = async (text) => {
      //   try {
      //     const response = await openai.embeddings.create({
      //       model: "text-embedding-3-small", // Model for generating embeddings
      //       input: text,
      //     });

      //     return response.data[0].embedding;
      //   } catch (err) {
      //     console.log("Embedding Error: ", err);
      //     return null;
      //   }
      // };

      // Function to calculate cosine similarity between two embeddings
      // const cosineSimilarity = (vecA, vecB) => {
      //   const dotProduct = vecA.reduce(
      //     (acc, val, idx) => acc + val * vecB[idx],
      //     0
      //   );
      //   const magnitudeA = Math.sqrt(
      //     vecA.reduce((acc, val) => acc + val * val, 0)
      //   );
      //   const magnitudeB = Math.sqrt(
      //     vecB.reduce((acc, val) => acc + val * val, 0)
      //   );
      //   return dotProduct / (magnitudeA * magnitudeB);
      // };

      // Function to get top N relevant chunks based on query embedding and similarity threshold
      // const getRelevantChunks = async (
      //   chunks,
      //   queryEmbedding,
      //   topN = 3,
      //   threshold = 0.7
      // ) => {
      //   const chunkEmbeddings = await Promise.all(
      //     chunks.map((chunk) => getEmbeddings(JSON.stringify(chunk)))
      //   );

      //   const similarities = chunkEmbeddings.map((chunkEmbedding) =>
      //     cosineSimilarity(chunkEmbedding, queryEmbedding)
      //   );

      //   // Filter chunks based on similarity threshold
      //   const relevantChunks = similarities
      //     .map((similarity, idx) => ({ similarity, idx }))
      //     .filter((item) => item.similarity >= threshold) // Only include chunks above the threshold
      //     .sort((a, b) => b.similarity - a.similarity) // Sort by similarity
      //     .slice(0, topN) // Get top N relevant chunks
      //     .map((item) => chunks[item.idx]);

      //   // Fallback: if no chunk meets the threshold, return the top N most similar chunks
      //   if (relevantChunks.length === 0) {
      //     return chunks.slice(0, topN); // Fall back to first N chunks
      //   }

      //   return relevantChunks;
      // };
      // const deduplicateResponse = (responseText) => {
      //   const sentences = responseText.split(". ");
      //   const uniqueSentences = [...new Set(sentences)];
      //   return uniqueSentences.join(". ");
      // };

      // Define the chunk size (adjust according to your token limit)
      // const CHUNK_SIZE = 9000; // Example chunk size; adjust as needed
      // const chunkedResults = chunkData(filterSearchResults, CHUNK_SIZE);

      // Prepare the base system message
      // const baseSystemMessage = {
      //   role: "system",
      //   content: `PDI-AI is an intelligent property investment assistant. You can only answer questions based on the provided context. Never return the property key. If question not in context, say I may not have enough information to answer that question based on your search`,
      // };

      // // // Get the embedding for the user's latest query message
      // const userMessage = messages[messages.length - 1].content;
      // const queryEmbedding = await getEmbeddings(userMessage);

      // // Get top 3 relevant chunks based on query embedding
      // const relevantChunks = await getRelevantChunks(
      //   chunkedResults,
      //   queryEmbedding,
      //   2,
      //   0.65
      // );

      // let responseContent = "";

      // // chunk implementation
      // for (const chunk of relevantChunks) {
      //   // Format messages for each chunk
      //   const formattedMessages = [
      //     baseSystemMessage,
      //     ...messages.map((message) => ({
      //       role: "user", // Assuming all other messages are from the user
      //       content: message.content,
      //     })),
      //     {
      //       role: "system",
      //       content: `Context: ${JSON.stringify(chunk)}\n\n`,
      //     },
      //   ];

      //   //   // Make a request to your ChatGPT API endpoint with streaming enabled
      //   const response = await openai.chat.completions.create({
      //     model: "gpt-4o", // Specify the model you want to use
      //     messages: formattedMessages,
      //     n: 1,
      //     // stream: true,
      //     // temperature: 0,
      //     // max_tokens: 100,
      //   });
      //   responseContent += response.choices[0].message["content"];
      // }

      const formattedMessages = [
        {
          role: "system",
          content: `PDI-AI is an intelligent property investment assistant. Never return the property key. You will answer questions based on this JSON context. Context: ${JSON.stringify(
            filterSearchResults
          )} and if the question can't be answered based on the context, say "Your question is not related to the investment search."`,
        },
        ...messages.map((message) => ({
          role: "user", // Assuming all other messages are from the user
          content: message.content,
        })),
      ];
      // // Make a request to your ChatGPT API endpoint with streaming enabled
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Specify the model you want to use
        messages: [...formattedMessages],

        //   //   //   // stream: true,
      });
      // If no useful response was generated, handle the fallback message
      // if (!responseContent.trim()) {
      //   responseContent = "That is all I know";
      // }

      return new Response(response.choices[0].message["content"]);
      // return new Response(responseContent);
      // Create a stream from the response and pipe it to the ProChat component
      // const stream = OpenAIStream(response);

      // // console.log("Stream", stream);
      // return new StreamingTextResponse(stream, {
      //   headers: { "Content-Type": "text/plain; charset=utf-8" },
      // });
    } catch (err) {
      console.log("Chat Error: ", err);
    }
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            dotActiveBorderColor: "#3eb489",
            handleActiveColor: "#08415c",
            handleColor: "#08415c",
            trackBg: "#3eb489",
            trackHoverBg: "#3eb489",
            colorPrimaryBorderHover: "#08415c",
          },
          Button: {
            colorPrimaryHover: "#3eb489",
          },
          Select: {
            colorPrimaryHover: "#3eb489",
          },
          Checkbox: {
            colorPrimaryHover: "#3eb489",
            colorPrimary: "#08415c",
          },
        },
      }}
    >
      <GlobalHeader theme="light" />
      {/* TO DO Make this section a component */}
      <section className="bg-lightgray py-[25px]">
        <Container>
          <Row className="items-center justify-center">
            <Col xl={8} lg={6}>
              {/* <h1 className="font-serif text-darkgray font-medium mb-0 text-lg md:text-center"></h1> */}
            </Col>
            <Col
              xl={4}
              lg={6}
              className="breadcrumb mb-0 justify-end font-serif md:justify-center sm:mt-[10px] text-sm"
            >
              <ul className="xs-text-center">
                <li>Invest</li>
                <li>
                  <Typed
                    className="font-semibold text-[#3eb489]"
                    strings={[
                      "PDI",
                      "Property Development And Investments",
                      "Property Data And Insights",
                    ]}
                    typeSpeed={60}
                    backSpeed={60}
                    loop
                    showCursor
                    cursorChar="|"
                  />
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Ensure at least one filter is applied for ai to be used              */}
      {filterSearchResults.length === 0 && !hasSearched ? (
        ""
      ) : (
        <FloatButton.Group
          trigger="click"
          type="default"
          badge={{
            dot: true,
            classNames: {
              indicator: "animate-pulse",
            },
            color: "#3eb489",
          }}
          icon={<MonitorOutlined />}
          className=" text-slate-600"
        >
          <Tooltip title="Generate PDI investment insights">
            <FloatButton
              badge={{ dot: true }}
              icon={<QuestionCircleOutlined />}
              onClick={showAlgorithmModal}
            />
          </Tooltip>

          <Tooltip title="Let our AI analyze your results">
            <FloatButton
              badge={{ dot: true }}
              icon={<CodeOutlined />}
              onClick={showDrawer}
            />
          </Tooltip>
        </FloatButton.Group>
      )}
      {/* <Tour
        steps={aiAlert}
        open={openTour}
        onClose={() => setTourOpen(false)}
        mask={false}
        type="primary"
        className="w-50%"
      /> */}
      {/* PDI INSIGHTS DRAWER */}

      <Drawer
        size="large"
        title="PDI AI"
        onClose={onCloseDrawer}
        open={openDrawer}
      >
        <ProChat
          locale="en-US"
          helloMessage={
            "Greetings, I am your PDI assistant. Let me help you understand invest search results."
          }
          request={async (message) => {
            const response = await HandleAIMessages(message);
            return response;
          }}
        />
      </Drawer>

      <Modal
        // title="Basic Modal"
        open={isAlgorithmModalOpen}
        onOk={handleAlgorithmModalOk}
        onCancel={handleAlgorithmModalCancel}
        width={1350}
        footer={null}
        className=""
      >
        {/* <!-- main card --> */}
        <div className="m-4 rounded-xl">
          {/* <!-- headers content--> */}
          <div className="p-4 flex flex-col justify-center items-center text-center">
            <span className="font-bold font-sans text-xlg">
              Let our algorithms help you match properties based on specific
              strategies
            </span>
            <div className="font-light max-w-lg mt-5 text-sm">
              PDI Algorithms will analyze properties based on the searched
              investment results and apply the selected strategy
            </div>
          </div>

          {/* <!-- subscriptions --> */}
          <RowAnt className="mb-20" gutter={{ xs: 4, sm: 16, md: 24, lg: 32 }}>
            <ColAnt span={7} className="bg-[#08415c] rounded-xl gutter-row m-4">
              <div className="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96  md:w-auto">
                <img src={yHImage} className="w-24 h-16" alt="Yield Hotspots" />
                <div className="mt-3 font-semibold text-lg">Yield Hotspots</div>
                <div className="text-sm font-light">
                  Properties with the highest estimated rental yields
                </div>
                <div className="my-4">
                  <span className="font-bold text-base">Greater than 9%</span>
                  <span className="font-light text-sm"> Rental Yield</span>
                </div>

                <button
                  onClick={() => {
                    //store the state in localstorage
                    localStorage.setItem(
                      "invest-data",
                      JSON.stringify({
                        investData: filterSearchResults,
                        propOverview: propOverview,
                      })
                    );
                    window.open("/yield-pdi-insights", "_blank");
                  }}
                  style={{
                    textAlign: "center",
                  }}
                  className="bg-[#08415c] text-[#f3efe0]  font-bold px-4 py-3 rounded-full hover:text-[#3eb489]  border border-[#F0F0F6] shadow-xl mt-4"
                >
                  Search
                </button>
              </div>
            </ColAnt>

            <ColAnt span={7} className="bg-[#08415c] rounded-xl gutter-row m-4">
              <div className="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96 h-84 sm:w-auto md:w-auto">
                <img
                  src={LsqImage}
                  className="w-24 h-16 "
                  alt="Least price per sqm"
                />
                <div className="mt-3 font-semibold text-lg">
                  Least Price/Sqm
                </div>
                <div className="text-sm font-light w-60 md:w-auto">
                  Search the least priced Ksh/sqm
                </div>
                <div className="my-4">
                  <span className="font-bold text-base">
                    Lower than ksh/sqm
                  </span>
                  <span className="font-light text-sm"> average</span>
                </div>

                <button
                  onClick={() => {
                    localStorage.setItem(
                      "invest-data",
                      JSON.stringify({
                        investData: filterSearchResults,
                        propOverview: propOverview,
                      })
                    );
                    window.open("/price-sqm-pdi-insights", "_blank");
                  }}
                  style={{
                    textAlign: "center",
                  }}
                  className="bg-[#08415c] text-[#f3efe0] hover:text-[#3eb489] font-bold px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4"
                >
                  Search
                </button>
              </div>
            </ColAnt>

            <ColAnt
              span={7}
              className="bg-[#08415c] rounded-xl  gutter-row m-4"
            >
              <div className="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96 h-84 md:w-auto">
                <img src={HGRIImage} className="w-24 h-16" alt="Low GRM" />
                <div className="mt-3 font-semibold text-lg">Low GRM</div>
                <div className="text-sm font-light w-60 md:w-auto">
                  Search the lowest gross rent multiplier
                </div>
                <div className="my-4">
                  <span className="font-bold text-base">Lower than GRM</span>
                  <span className="font-light text-sm"> average</span>
                </div>

                <button
                  onClick={() => {
                    // navigate("/grm-pdi-insights", {
                    //   state: {
                    //     investData: filterSearchResults,
                    //     propOverview: propOverview,
                    //   },
                    // })

                    localStorage.setItem(
                      "invest-data",
                      JSON.stringify({
                        investData: filterSearchResults,
                        propOverview: propOverview,
                      })
                    );
                    window.open("/grm-pdi-insights", "_blank");
                  }}
                  style={{
                    textAlign: "center",
                  }}
                  className="bg-[#08415c] text-[#f3efe0] hover:text-[#3eb489] font-bold px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4"
                >
                  Search
                </button>
              </div>
            </ColAnt>
          </RowAnt>

          {/* <div className="flex justify-center">
              <button className="mt-12 bg-slate-900 text-white px-4 rounded-full py-3">
                See all subscriptions
              </button>
            </div> */}
        </div>
      </Modal>

      {/* Section Start */}
      <section className="shopping-right-left-sidebar pt-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] mt-8">
        <Container>
          <Row>
            <Col
              lg={9}
              md={8}
              className="pl-[55px] md:pl-[15px] sm:mb-[30px] order-md-2 order-1 sm:px-0"
            >
              {/* List data here  */}

              {filterSearchResults.length === 0 && !hasSearched ? (
                <Result
                  style={{ left: "50%", right: "50%", bottom: "50%" }}
                  icon={
                    <img
                      className="h-72 ml-auto mr-auto"
                      src={InvestIcon}
                      alt="Please search to invest"
                    />
                  }
                  title="Search to uncover investment insights"
                  subTitle="1 search = 1 token"
                />
              ) : filterSearchLoading ? (
                <Spin size="large" />
              ) : (
                <div>
                  <div>
                    <span className="float-right text-sm mb-12">
                      Found results: {filterSearchResults.length} units
                    </span>
                    <br />
                    <hr />
                  </div>
                  <List
                    className="mt-12"
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                      // onChange: (page)=>{
                      //   console.log(page);
                      // },
                      pageSize: 10,
                    }}
                    dataSource={filterSearchResults}
                    footer={
                      <div>
                        <Typed
                          className="font-semibold text-[#3eb489]"
                          strings={[
                            "PDI Marketplace Kenya",
                            "Property Development And Investments",
                            "Property Data And Insights",
                          ]}
                          typeSpeed={6}
                          backSpeed={16}
                          loop
                          showCursor
                          cursorChar="|"
                        />
                      </div>
                    }
                    renderItem={(item) => (
                      <List.Item
                        key={item["Property Key"]}
                        actions={[
                          <IconText
                            icon={<DollarOutlined />}
                            text={`Market Price: ${item["Market Price"]}`}
                            key={"market-price-icon"}
                          />,
                          <IconText
                            icon={<HomeOutlined />}
                            text={`Typology: ${item["Typology"]}`}
                            key={"home-price-icon"}
                          />,
                          <IconText
                            icon={<RiseOutlined />}
                            text={`GRM: ${item["GRM (Years)"]} Years`}
                            key={"grm-price-icon"}
                          />,
                        ]}
                        extra={
                          isLoaded && (
                            <div
                              className="md:hidden sm:hidden"
                              style={mapContainerStyle}
                            >
                              <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={{
                                  lat: Number(
                                    propOverview.find(
                                      (a) =>
                                        a["Property ID"] === item["PropertyID"]
                                    )
                                      ? propOverview
                                          .find(
                                            (a) =>
                                              a["Property ID"] ===
                                              item["PropertyID"]
                                          )
                                          ["Geo-Location"].split(", ")[0]
                                      : 0
                                  ),
                                  lng: Number(
                                    propOverview.find(
                                      (a) =>
                                        a["Property ID"] === item["PropertyID"]
                                    )
                                      ? propOverview
                                          .find(
                                            (a) =>
                                              a["Property ID"] ===
                                              item["PropertyID"]
                                          )
                                          ["Geo-Location"].split(", ")[1]
                                      : 0
                                  ),
                                }}
                                zoom={15}
                              >
                                <MarkerF
                                  options={{
                                    icon: MapPin,
                                  }}
                                  key={`${Number(
                                    propOverview.find(
                                      (a) =>
                                        a["Property ID"] === item["PropertyID"]
                                    )
                                      ? propOverview
                                          .find(
                                            (a) =>
                                              a["Property ID"] ===
                                              item["PropertyID"]
                                          )
                                          ["Geo-Location"].split(", ")[0]
                                      : 0
                                  )} - ${Number(
                                    propOverview.find(
                                      (a) =>
                                        a["Property ID"] === item["PropertyID"]
                                    )
                                      ? propOverview
                                          .find(
                                            (a) =>
                                              a["Property ID"] ===
                                              item["PropertyID"]
                                          )
                                          ["Geo-Location"].split(", ")[1]
                                      : 0
                                  )}`}
                                  position={{
                                    lat: Number(
                                      propOverview.find(
                                        (a) =>
                                          a["Property ID"] ===
                                          item["PropertyID"]
                                      )
                                        ? propOverview
                                            .find(
                                              (a) =>
                                                a["Property ID"] ===
                                                item["PropertyID"]
                                            )
                                            ["Geo-Location"].split(", ")[0]
                                        : 0
                                    ),
                                    lng: Number(
                                      propOverview.find(
                                        (a) =>
                                          a["Property ID"] ===
                                          item["PropertyID"]
                                      )
                                        ? propOverview
                                            .find(
                                              (a) =>
                                                a["Property ID"] ===
                                                item["PropertyID"]
                                            )
                                            ["Geo-Location"].split(", ")[1]
                                        : 0
                                    ),
                                  }}
                                />
                              </GoogleMap>
                            </div>
                          )
                        }
                      >
                        <List.Item.Meta
                          // avatar={<Avatar src={item.avatar} />}
                          title={
                            <span>
                              {propOverview.find(
                                (a) => a["Property ID"] === item["PropertyID"]
                              ) ? (
                                propOverview.find(
                                  (a) => a["Property ID"] === item["PropertyID"]
                                )["Name"]
                              ) : (
                                <Spin />
                              )}
                            </span>
                          }
                          description={
                            <span>
                              {propOverview.find(
                                (a) => a["Property ID"] === item["PropertyID"]
                              ) ? (
                                propOverview.find(
                                  (a) => a["Property ID"] === item["PropertyID"]
                                )["Location"]
                              ) : (
                                <Spin />
                              )}
                              ,{" "}
                              {propOverview.find(
                                (a) => a["Property ID"] === item["PropertyID"]
                              ) ? (
                                propOverview.find(
                                  (a) => a["Property ID"] === item["PropertyID"]
                                )["Road"]
                              ) : (
                                <Spin />
                              )}
                            </span>
                          }
                        />
                        <div>
                          <ul>
                            <li>Rent: {item["Rent"]}</li>
                            <li>Rental Yield: {item["Rental Yield"]}</li>
                          </ul>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              )}

              {/* <ShopWide filter={false} grid="grid grid-3col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large" data={shopWideData} /> */}
            </Col>
            <div
              className="col col-lg-3 col-md-4 shopping-sidebar inline-block order-md-1 order-2"
              {...fadeIn}
            >
              <div className="border-b border-mediumgray pb-12 mb-12 relative">
                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[26px]">
                  Filter By Market Price
                </span>

                {loadingPropData ? (
                  <Skeleton active paragraph={{ rows: 1 }} />
                ) : (
                  <MultiRangeSlider
                    min={0}
                    max={Math.max(...marketPrices)}
                    onChange={handleMarketPricePicker}
                  />
                )}
              </div>

              <div className="border-b border-mediumgray pb-12 mb-12 relative">
                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[26px]">
                  Filter By Rent
                </span>
                {loadingPropData ? (
                  <Skeleton active paragraph={{ rows: 1 }} />
                ) : (
                  <MultiRangeSlider
                    min={0}
                    max={Math.max(...rents)}
                    onChange={handleRentPricePicker}
                  />
                )}
              </div>

              <div className="border-b border-mediumgray pb-12 mb-12 relative">
                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[20px]">
                  Filter By Location
                </span>

                <Select
                  loading={loadingPropOverview}
                  mode="multiple"
                  size={"large"}
                  placeholder="Please select"
                  style={{ width: "100%" }}
                  onChange={handleLocationPicker}
                  defaultValue={selectedLocation}
                  options={locations.map((a) => {
                    return { value: a, label: a };
                  })}
                />
                {/* <ul className="list-style filter-color">
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#black"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#363636" }}></span>Carbon black</a><span className="item-qty">25</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#blue"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#657fa8" }}></span>Prussian blue</a><span className="item-qty">03</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#brown"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#936f5e" }}></span>Light brown</a><span className="item-qty">15</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#green"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#97a27f" }}></span>Parrot green</a><span className="item-qty">40</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#orange"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#b95b5b" }}></span>Dark orange</a><span className="item-qty">29</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#blue"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#b7b5b5" }}></span>Slate blue</a><span className="item-qty">35</span></li>
                                </ul> */}
              </div>

              <div className="border-b border-mediumgray pb-12 mb-8 relative">
                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[20px]">
                  Filter By Typology
                </span>
                <ul className="list-style filter-category">
                  <Checkbox.Group
                    defaultValue={selectedTypology}
                    onChange={handleTypologyPicker}
                  >
                    <li>
                      <Checkbox value="Studio">Studio</Checkbox>
                    </li>
                    <li>
                      <Checkbox value="1BR">1 Bedroom</Checkbox>
                    </li>
                    <li>
                      <Checkbox value="2BR">2 Bedroom</Checkbox>
                    </li>
                    <li>
                      <Checkbox value="3BR">3 Bedroom</Checkbox>
                    </li>
                    <li>
                      <Checkbox value="4BR">4 Bedroom</Checkbox>
                    </li>
                    <li>
                      <Checkbox value="5BR">5 Bedroom</Checkbox>
                    </li>
                  </Checkbox.Group>
                </ul>
              </div>

              <Modal
                centered
                open={isConfirmSearchModalOpen}
                onOk={handleOkSearch}
                okText="Search"
                confirmLoading={filterSearchLoading}
                okType="primary"
                onCancel={handleCancelSearch}
                cancelButtonProps={{
                  disabled: consumeTokenLoading,
                }}
                okButtonProps={{
                  className: "text-white bg-black",
                  loading:
                    consumeTokenLoading ||
                    status === "exception" ||
                    status === "success",
                }}
              >
                {consumeTokenLoading ||
                status === "exception" ||
                status === "success" ? (
                  <div>
                    <br />
                    <div className="text-center mb-4">
                      <Progress
                        className="ml-auto mr-auto"
                        type="line"
                        percent={progress}
                        status={status}
                      />
                    </div>
                  </div>
                ) : (
                  <Result
                    icon={
                      <img
                        className="h-64 ml-auto mr-auto"
                        src={SearchInvest}
                        alt="Please search to invest"
                      />
                    }
                    title="Search to uncover investment opportunities"
                    subTitle="Please note that this search will consume one token"
                  />
                )}
              </Modal>

              <div>
                {/* <span className="shop-title relative font-serif font-medium text-darkgray block mb-[30px]"> </span> */}
                <Button
                  size="large"
                  loading={filterSearchLoading}
                  onClick={showConfirmModal}
                  className="w-full"
                  // type="primary"
                >
                  Search
                </Button>
                {/* <Buttons ariaLabel="filter" onClick={filterProperties} type="submit" className="btn-fill btn-fancy w-full font-medium font-serif rounded-none uppercase md:mb-[15px] sm:mb-0 mb-4" themeColor="#3eb489" color="#fff" size="md" title={`Search`} /> */}
                {/* <Buttons ariaLabel="reset" type="submit" className="btn-fill btn-fancy w-full font-medium font-serif rounded-none uppercase md:mb-[15px] sm:mb-0" themeColor="#70161e" color="#fff" size="md" title="Reset" /> */}
                {/* <div className="tag-cloud d-inline-block margin-10px-top">
                                    <Link aria-label="product-tags-link" to="#">Off Plan</Link>
                                    <Link aria-label="product-tags-link" to="#">Occupation Ready</Link>
                                </div> */}
              </div>
            </div>
          </Row>
        </Container>
      </section>
      {/* Section End */}
      <GlobalFooter
        theme="dark"
        className="bg-[#262b35] text-slateblue gym-fitness-footer"
      />
    </ConfigProvider>
  );
};

export default Invest;
