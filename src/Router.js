import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Redirect } from "react-router-dom";

// Importar componentes
import Error from "./components/Error";
import Peliculas from './components/Peliculas';
import MyComponent from "./components/MyComponet";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./components/Home";
import Blog from "./components/Blog";
import Formulario from "./components/Formulario";
import Search from "./components/Search";
import Article from "./components/Article";
import CreateArticle from "./components/CreateArticle";

class Router extends Component {
    render() {

        return (
            <BrowserRouter>
                <Header />


                {/* CONFIGURAR RUTAS Y PÁGINAS*/}
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/home' component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/articulo/:id" component={Article}/>
                    <Route exact path="/blog/crear" component={CreateArticle} />
                    <Route exact path="/blog/busqueda/:search" component={Search} />
                    <Route exact path="/redirect/:search" render={
                        (props) => {
                            var search = props.match.params.search;
                            return <Redirect to={'/blog/busqueda/' + search} />                            
                        }
                    } />

                    <Route exact path='/formulario' component={Formulario} />
                    <Route exact path='/peliculas' component={Peliculas} />

                    <Route exact path='/segunda-ruta' component={MyComponent} />
                    <Route exact path="/pagina-1" render={() => (
                        <React.Fragment>
                            <h1>Hola mundo desde la pagina 1</h1>
                            <MyComponent saludo="Hola amigo" />

                        </React.Fragment>
                    )} />

                    <Route exact path="/pruebas/:nombre/:apellido?" render={(props) => {
                        var nombre = props.match.params.nombre;
                        var apellido = props.match.params.apellido;

                        return (
                            <div id="content">
                                <h1 className="subheader">Página de pruebas</h1>
                                <h2>
                                    {nombre && !apellido &&
                                        <span>{nombre}</span>
                                    }
                                    {nombre && apellido &&
                                        <span>{nombre + ' ' + apellido}</span>
                                    }
                                </h2>
                            </div>
                        );
                    }
                    } />
                    <Route exact component={Error} />

                </Switch>

                <div className='clearfix'></div>
                <Footer />
            </BrowserRouter>

        );
    }
}

export default Router;
