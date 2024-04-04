import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCharacter } from './redux/slice/characterSlices';
import { Link } from 'react-router-dom';

const Characters = () => {
    const dispatch =  useDispatch();
    const characters = useSelector((state) => state.character.data);
    console.log("character",characters);

    useEffect(() => {
        dispatch(fetchAllCharacter());
        // const fetchCharacters = async() => {
        //     try {
        //         // **** Using Axios ****
        //         const response = await axios.get('https://rickandmortyapi.com/api/character');
        //         const data = response.data.results;
        //         console.log(data);
        //         setCharacters(data);
        //     }catch(error){
        //         console.error('Error fetching characters:', error)
        //     }
        // };
        // fetchCharacters();
    }, []);

    if(!characters){
        return <div>Loading....</div>
    }
      return (   
        <div className="container-fluid">
            <div className="row">
            <h1>Rick and Morty Characters</h1>
                {characters.map(character => (
                    <div className="col-lg-3 col-md-3 col-sm-4">
                        <div key={character.id} className="col-lg-12 mt-5 mb-3">
                            <div className="card profile-card-5">
                                <div className="card-img-block">
                                    <img className="card-img-top" src={character.image} alt={character.image} width={100} />
                                </div>
                                <div className="card-body pt-0">
                                    <div><h6 className="card-title">{character.name}</h6></div>
                                    <div> <span className={character.status === 'Alive' ? 'alive' : character.status === 'Dead' ? 'dead' : character.status === 'unknown' ? 'unknown' : ''}>{' '}</span>{character.status}, <span>{character.gender}</span></div>

                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <Link to={`/character/${character.id}`} style={{ textDecoration: 'none' }}>
                                        <button className='btn btn-outline-warning text-dark'>Character Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>  
                 ))}
           </div>
        </div>
      );
    }

export default Characters;