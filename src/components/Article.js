import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Global from "../Global";
import Sidebar from "./Sidebar";
import Moment from "react-moment";
import 'moment/locale/es';


class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    };

    componentWillMount() {
        this.getArticle();
    }
    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
            })
            .catch(err => {
                this.setState({
                    articles: false,
                    status: 'success'
                });
            })
    }

    deleteArticle = (id) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(this.url + 'article/' + id)
                        .then(res => {
                            this.setState({
                                articles: res.data.article,
                                status: 'deleted'
                            });
                            swal("Poof! Your imaginary file has been deleted!", {
                                icon: "success",
                            });
                        });

                } else {
                    swal("Your imaginary file is safe!");
                }
            });

    }

    render() {

        if (this.state.status === 'deleted') {
            return <Redirect to="/blog" />
        }

        var article = this.state.article;


        return (
            <div className="center">
                <section id="content">
                    {this.state.article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                <img src={this.url + "get-image/" + article.image} alt={article.title} />
                            </div>
                            <h1 className="subheader">{this.state.article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>
                            <p align="justify">{article.content}</p>
                            <div className="btn-content">
                                <button onClick={
                                    () => {
                                        this.deleteArticle(article._id)
                                    }
                                }

                                    className="btn btn-danger">Eliminar</button>
                                <Link to='/blog' className="btn btn-warning">Editar</Link>
                            </div>

                            <div className="clearfix"></div>
                        </article>
                    }
                    {this.state.article == null &&
                        <div id="article">
                            <h2 className="subheader">Cargando...</h2>
                            <p>Espera unos segundos</p>
                        </div>
                    }
                    {!this.state.article && this.state.status === "success" &&
                        <div id="article">
                            <h2 className="subheader">El articulo no existe</h2>
                            <p>Intentalo de nuevo más tarde</p>
                        </div>
                    }
                </section>
                <Sidebar />
            </div>


        );
    }
}
export default Article;