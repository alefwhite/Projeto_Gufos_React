import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function NotFound() {    
    return( 
        <div>
            <Header/>
            <div className="container">
                <h1>Not Found</h1>
            </div>
            <Footer/>
        </div>
    );
}

export default NotFound;