import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCharacter } from './redux/slice/characterSlices';
import { Link } from 'react-router-dom';
import imageLoader from './loader.gif'

const Characters = () => {
    const dispatch =  useDispatch();
    const {loading, error, data} = useSelector((state) => state.character);
    console.log("character",data);

    useEffect(() => {
        dispatch(fetchAllCharacter())
        .catch((error) => console.error(error.message)); // Log any errors caught during API fetch
    }, [dispatch]);

      return ( 
        <div className="container-fluid mt-5">
            <h1 className='text-center'>Rick & Morty Characters</h1>
            {loading ? (
                <div className='text-center loader'><img src={imageLoader} alt='loader' width={80} height={80}/></div>
                ) : 
            !data ? (
                <div className='centerError'>{error}</div>
                ) : (
                <div className="row">
                    {data.map(character => (
                            <div key={character.id} className="col-lg-3 col-md-3 col-sm-4">
                            <div className="col-lg-12 mt-5 mb-3">
                                <div className="card profile-card-5">
                                    <div className="card-img-block">
                                        <img className="card-img-top" src={character.image} alt={character.image} width={100} />
                                    </div>
                                    <div className="card-body pt-0">
                                        <div><h6 className="card-title">{character.name}</h6></div>
                                        <div> <span className={character.status === 'Alive' ? 'alive' : character.status === 'Dead' ? 'dead' : character.status === 'unknown' ? 'unknown' : ''}>{' '}</span>{character.status}, <span>{character.gender}</span></div>

                                        <p className="card-text">Some quick Redux example text to build on the card title and make up the bulk of the card's content.</p>
                                        <Link to={`/character/${character.id}`} style={{ textDecoration: 'none' }}>
                                            <button className='btn btn-outline-warning text-dark'>Character Details</button>
                                        </Link>
                                        <button className='btn btn-outline-warning text-dark mx-1'>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    ))}
           </div>
      )}
        </div>
      );
    }

export default Characters;