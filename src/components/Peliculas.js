import React from "react";
import Pelicula from "./Pelicula";
import Slider from "./Slider";
import Sidebar from "./Sidebar";

class Peliculas extends React.Component {

    state = {};


    cambiarTitulo = () => {

        var { peliculas } = this.state;
        peliculas[0].title = "Batman Begins";
        /* setState() programa una actualización al objeto estado de un componente. 
        Cuando el estado cambia, el componente responde volviendo a renderizar.*/
        this.setState({
            peliculas: peliculas
        });
    }

    favorite = (pelicula) => {
        console.log(pelicula);
        this.setState({
            favorite: pelicula
        })
    }

    // Metodos de ciclo de vida

    // componentWillMount() se ejecuta antes que la salida
    // del componente ha sido renderizada en el DOM
    componentWillMount() {
        //alert('Se va montar el componente');
        this.setState({
            peliculas: [
                { title: 'Batman vs Superman', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjFcueyw-WHpwA1VaosSJQ30UmzJfcdsME-g&usqp=CAU' },
                { title: 'Alicia En El Pais De Las Maravillas', image: 'https://i0.wp.com/cineyvaloressj.com/wp-content/uploads/2020/08/alicia-en-el-pais-de-las-maravillas-tim-burton-pelicula-dvd-d_nq_np_883758-mlm27912689216_082018-f.jpg?resize=835%2C1200&ssl=1' },
                { title: 'Looper', image: 'https://images.justwatch.com/poster/248498976/s592/looper' }
            ],
            name: 'Esteban',
            favorite: {}
        })
    }

    // componentDidMount() se ejecuta después que la salida
    // del componente ha sido renderizada en el DOM.
    componentDidMount() {
        //alert('Ya se monto el componente');
    }

    // componentWillUnmount() se ejecuta después que la salida
    // del componente ha sido eliminada en el DOM.
    componentWillUnmount() {
        //alert("Se va desmontar el componente");
    }


    render() {
        return (
            <div id="peliculas">
                <Slider
                    title="Movies"
                    size="slider-small"
                />
                <div className='center'>
                    <div id="content" >                        
                        <p>{this.state.name}'s favorite Movies</p>
                        <p>{this.state.peliculas[0].title}</p>
                        <p>
                            <button onClick={this.cambiarTitulo}>
                                Change  Batman vs Superman Title
                            </button>
                        </p>
                        {/** Forma de hacer Condicionales en JSX*/}
                        {/** if
                {this.state.favorite.title &&
                    <p className="favorite">
                        <strong>Most Favorite Movie is: </strong>
                        <span>{this.state.favorite.title}</span>
                    </p>
                }
                */}
                        {/** if else*/}
                        {this.state.favorite.title ? (
                            <p className="favorite">
                                <strong>Most Favorite Movie is: </strong>
                                <span>{this.state.favorite.title}</span>
                            </p>
                        ) : (
                            <p className="favorite">
                                There's no favorite movie
                            </p>
                        )
                        }


                        {/*Crear componente pelicula*/}
                        <div id="articles" className="peliculas">
                            {
                                /** El bucle para recorrer un Array de Objeo en JSX se hace con .map */
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            markFavorite={this.favorite}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Sidebar
                        blog="false"
                    />
                </div>
            </div>
        );
    }
}
export default Peliculas;