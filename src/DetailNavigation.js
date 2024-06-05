import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function DetailNavigation() {
    
    const navigate = useNavigate();
    const {currentCharacter} = useSelector(state => state.character);
    console.log("currentCharacter",currentCharacter);

    const handlePrevious = () => {
        const previousId = currentCharacter.id - 1;
        navigate(`/character/${previousId}`);
      }
    
      const handleNext = () => {
        const nextId = currentCharacter.id + 1;
        navigate(`/character/${nextId}`);
      }

    return (
        <div className="col-lg-3 col-md-3 col-sm-4">
                <Link to="/characters/">
                    <button className="btn btn-outline-secondary" style={{marginRight: `10px`}}>Home</button>
                </Link>
                    <button className='btn btn-outline-primary' onClick={handlePrevious}>Previous</button>
                    <button className='btn btn-outline-primary' style={{marginLeft: `10px`}} onClick={handleNext}>Next</button>
        </div>
    )
}

export default DetailNavigation;