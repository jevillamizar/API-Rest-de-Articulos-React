import React, { Component } from "react";

import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from "./Articles";

class Blog extends Component {

    state = {
        articles: {},
        status: null
    }
    render() {

        return (
            <div id="blog">
                <Slider
                    title="Blog"
                    size="slider-small"
                />
                <div className='center'>
                    <div id="content">
                        {/*listado de Articulos que vendran de API rest de node*/}
                        <h1 className="subheader">Lista de Articulos</h1>
                        <Articles></Articles>

                    </div>
                    <Sidebar
                        blog="true"
                    />
                </div>
            </div>
        );
    }
}
export default Blog;