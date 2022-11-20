import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pelicula extends Component {

    mark =()=>{
        this.props.markFavorite(this.props.pelicula);
    }

    render() {
        
        const { title, image } = this.props.pelicula;
        return (
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={image} alt={title} />
                </div>
                <h2>{title}</h2>
                <span className="date">
                    5 minutes ago
                </span>
                <Link to="/blog">Read more</Link>
                <button onClick={this.mark}>Mark as favorite</button>
                <div className="clearfix"></div>
            </article>

        )
    }
}

export default Pelicula;