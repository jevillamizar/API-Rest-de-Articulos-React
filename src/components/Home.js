import React, { Component } from "react";

import Articles from "./Articles";
import Slider from './Slider';
import Sidebar from './Sidebar';

class Home extends Component {

    render() {

        var buttonString = "Go to the blog";

        return (
            <div id="home">
                <Slider title="Welcome to the React for Front-end development course"
                    btn={buttonString}
                    size="slider-big"
                ></Slider>
                <div className='center'>
                    <div id="content">
                        <h1 className="subheader">Ultimos Articulos</h1>
                        <Articles home="true"></Articles>
                    </div>
                    <Sidebar />
                </div>
            </div>
        );
    }
}
export default Home;