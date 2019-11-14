import React from 'react';

function Footer(props) {
    return (
        <footer className="rodapePrincipal">
            <section className="rodapePrincipal-patrocinadores">
                <div className="container">                    
                <p>Escola SENAI de Informática - {props.ano ? props.ano : "2019"}</p>
                </div>
            </section>
        </footer>
    );
}

export default Footer;