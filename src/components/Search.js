import React, { Component } from "react";

import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from "./Articles";

class Search extends Component {

    state = {
        articles: {},
        status: null
    }
    render() {
        var searched = this.props.match.params.search;
        return (
            <div id="blog">
                <Slider
                    title={'Busqueda: ' + searched}
                    size="slider-small"
                />
                <div className='center'>
                    <div id="content" >
                        {/*listado de Articulos que vendran de API rest de node*/}
                        <h1 className="subheader">Lista de Articulos</h1>
                        <Articles
                        search={searched}></Articles>

                    </div>
                    <Sidebar
                        blog="true"
                    />
                </div>
            </div>
        );
    }
}
export default Search;