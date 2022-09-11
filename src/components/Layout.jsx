import React from 'react';
import {Link, Outlet } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
// import Main from "./Pages/Main";

const Layout = () => {
    return (
       <>
       <Header/>
       <Outlet/>
       <Footer/>
       </>
    );
};

export  {Layout}