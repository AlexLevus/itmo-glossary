import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useRoutes } from './router/routes';
import './App.css';

const App: React.FC = () => {
    const routes = useRoutes();

    return (
        <Router>
            <div className="App">
                <header className="header">
                    <h1 className="title">Левусь Александр P42081</h1>
                    <div className="links">
                        <div className="link-wrapper">
                            <Link to="/glossary" className="subtitle link">
                                Глоссарий терминов
                            </Link>
                        </div>
                        <div className="link-wrapper">
                            <Link to="/mindmap" className="subtitle link">
                                Семантический граф
                            </Link>
                        </div>
                    </div>
                </header>
                <div className="container">{routes}</div>
            </div>
        </Router>
    );
};

export default App;
