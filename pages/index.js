import React, { useRef,useState } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Cursor from "../components/Cursor";
import data from "../data/portfolio.json";
import ListCard from "../components/List";
import AccordionItem from "../components/accordion/index";
import { useRouter } from "next/router";


export default function Home() {
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const urbanRef = useRef();
  const modelRef = useRef();
  const climateRef = useRef();
  const territoryRef = useRef();
  const historyRef = useRef();
  const router = useRouter();
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const scrollToParagraph = (index) => {
    switch (index) {
      case 0:
        window.scrollTo({
          top: urbanRef.current.offsetTop,
          left: 0,
          behavior: "smooth",
        });
        break;
      case 1:
        window.scrollTo({
          top: modelRef.current.offsetTop,
          left: 0,
          behavior: "smooth",
        });
        break;
      case 2:
        window.scrollTo({
          top: climateRef.current.offsetTop,
          left: 0,
          behavior: "smooth",
        });
        break;
      case 3:
        window.scrollTo({
          top: territoryRef.current.offsetTop,
          left: 0,
          behavior: "smooth",
        });
        break;
      case 4:
        window.scrollTo({
          top: historyRef.current.offsetTop,
          left: 0,
          behavior: "smooth",
        });
        break;
      default:
        break;
    }
  };
  const [open, setOpen] = useState(false);
  const toggle = (index) => {
    if (open === index) {
      setOpen(false);
    } else {
      setOpen(index);
    }
  
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title >{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />

        <div className="w-full laptop:w-5/5  p-4 mt-20">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-4xl tablet:text-6xl laptop:text-5xl xl:text-7xl p-1 tablet:p-2 font-bold w-full"
            >
              {data.headerTaglineOne}
            </h1>

            <div className="w-full laptop:w-5/5">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                <h1
                  ref={textTwo}
                  className="text-base tablet:text-3xl laptop:text-3xl xl:text-4xl p-1 tablet:p-2 text-bold w-full"
                >
                  {data.headerTaglineTwo}
                </h1>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                <h1
                  ref={textThree}
                  className="text-base tablet:text-3xl laptop:text-3xl xl:text-4xl p-1 tablet:p-2 text-bold w-full"
                >
                  {data.headerTaglineThree}
                </h1>
              </div>
            </div>

            <h1
              ref={textFour}
              className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-4xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineFour}
            </h1>
          </div>
          <div id="image_vverte" className="mt-5"></div>
        </div>
        <div className="container_principale">
          <div className="container_3D_model">
            <div className="model_3d">
              {data.services.map((service, index) => (
                <ServiceCard
                  key={index}
                  name={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
          <div className=" rounded-s-lg  container_list grid col-start-2 row-start-1  border-8   pl-5 text-center align-middle text-2xl md:text-4xl lg:text-4xl p-1 md:p-2 font-bold w-full lg:w-4/5">
            <div className=" rounded-s-lg button-list-container grid col-start-2 row-start-1    pl-5 text-center align-middle text-2xl md:text-4xl lg:text-4xl p-1 md:p-2 font-bold w-full lg:w-4/5">
              <h1 className="text_style ">On This page : </h1>
              <div className="border_style">
                <ul id="text_list">
                  {data.liste && data.liste.length > 0 ? (
                    data.liste.map((item, index) => (
                      <ListCard
                        key={index}
                        item={item}
                        index={item.index} // Pass the index
                        scrollToParagraph={scrollToParagraph}
                      />
                    ))
                  ) : (
                    <li>Les données ne sont pas disponibles.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="aboutref" ref={urbanRef}>
            <h1 className="tablet:m-10 text-4xl text-bold">Urban Model</h1>
            
            <div className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
              <button className="animated-button" onClick={() => router.push("/urban")} >
                <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
                <span className="text">Urban model</span>
                <span className="circle"></span>
                <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
              </button>

            </div >
            <div className="px-[20px] max-w-[800px]">
            {data.accordion1.map((data, index) => {
              return (
                <AccordionItem 
              key={index}
               open={index === open} 
               title={data.title} 
                desc={data.desc} 
               toggle={() => toggle(index)} />
              ); 
                
              ;
            
            } )}
            </div >
            <div className="aboutref" ref={modelRef}>
              <h1 className="tablet:m-10 text-4xl text-bold">3D Mesh and virtual city</h1>

            <div className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
              <button className="animated-button" onClick={() => router.push("/urban")} >
                <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
                  <span className="text">3D Mesh and VC</span>
                <span className="circle"></span>
                <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
              </button>

            </div >
            <div className="px-[20px] max-w-[800px]">
              {data.accordion2.map((data, index) => {
                return (
                  <AccordionItem
                    key={index}
                    open={index === open}
                    title={data.title}
                    desc={data.desc}
                    toggle={() => toggle(index)} />
                );

                ;

              })}
            </div >
            </div>
            <div className="aboutref" ref={climateRef}>
              <h1 className="tablet:m-10 text-4xl text-bold">Climate and Energy Atlas</h1>

            <div className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
              <button className="animated-button" onClick={() => router.push("/urban")} >
                <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
                  <span className="text">Climate and Energy Atlas</span>
                <span className="circle"></span>
                <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
              </button>

            </div >
            <div className="px-[20px] max-w-[800px]">
              {data.accordion3.map((data, index) => {
                return (
                  <AccordionItem
                    key={index}
                    open={index === open}
                    title={data.title}
                    desc={data.desc}
                    toggle={() => toggle(index)} />
                );

                ;

              })}
            </div >
            </div>
          </div>

          
        </div>
        <Footer />
      </div>
    </div>
  );
}
