import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacterById } from './redux/slice/characterSlices';
import { useParams, useNavigate, Link } from 'react-router-dom';
import imageLoader from './loader.gif';

function CharacterDetails() {

    const {error, loading, currentCharacter} = useSelector(state => state.character);
    console.log("currentCharacter",currentCharacter);
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
    dispatch(fetchCharacterById(id));
    },[dispatch, id])

    const handlePrevious = () => {
        const previousId = currentCharacter.id - 1;
        // dispatch(fetchCharacterById(previousId));
        navigate(`/character/${previousId}`);
      };
    
      const handleNext = () => {
        const nextId = currentCharacter.id + 1;
        // dispatch(fetchCharacterById(nextId));
        navigate(`/character/${nextId}`);
      };

    if(error){
        return <div>Error: {error}</div>
    }

    return (
        <div className="container-fluid">
            <div className="row">
            <h1 className="text-center">Characters Details</h1>
            <div className="col-lg-3 col-md-3 col-sm-4">
                <Link to="/characters/">
                    <button className="btn btn-outline-secondary" style={{marginRight: `10px`}}>Home</button>
                </Link>
                    <button className='btn btn-outline-primary' disabled={parseInt(id) <= 1} onClick={handlePrevious} style={{cursor:parseInt(id) <= 1 ? 'none': 'pointer', backgroundColor: parseInt(id) <= 1 ? '#eee': ''}}>Previous</button>
                    <button className='btn btn-outline-primary' style={{marginLeft: `10px`}} onClick={handleNext}>Next</button>
            </div>
            {loading || !currentCharacter ? ( <div className='loader'><img src={imageLoader} alt='loader' width={80} height={80}/></div>) : (
                <main>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div key={currentCharacter.id} className="col-lg-12 mt-5 mb-3">
                            <div className="card profile-card-5">
                                <div className="card-img-block">
                                    <img className="card-img-top" src={currentCharacter.image} alt={currentCharacter.image} width={100} />
                                </div>
                                <div className="card-body pt-0">
                                    <div><h6 className="card-title">{currentCharacter.name}</h6></div>
                                    <div> <span className={currentCharacter.status === 'Alive' ? 'alive' : currentCharacter.status === 'Dead' ? 'dead' : currentCharacter.status === 'unknown' ? 'unknown' : ''}>{' '}</span>{currentCharacter.status}, <span>{currentCharacter.gender}</span></div>
                                    <div>
                                    <p className="card-title"><strong>Origin:</strong> {currentCharacter.origin.name}</p>
                                    <p className="card-title"><strong>Location:</strong> {currentCharacter.location.name}</p>
                                    </div>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>  
                </main>
              )}
           </div>
        </div>
    );
}
export default CharacterDetails;