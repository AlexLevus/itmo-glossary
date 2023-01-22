import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './GlossaryPage.css';
import MindMap from "../components/MindMap";

const MindMapPage: React.FC = () => {
    const [data, setData] = useState<any>();

    const createMindmapData = (mindmapOpt: {connections: [[string, string]], names: any}) =>
        mindmapOpt.connections.map((conPair: [string, string]) => [mindmapOpt.names[conPair[0]], mindmapOpt.names[conPair[1]]]);

    useEffect(() => {
        fetch('http://localhost:8070/mindmap').then(r => r.json()).then(x => setData(createMindmapData(x)));
    }, []);

    return (
        <>
            {data && <MindMap data={data}/>}
            <div className="link-wrapper">
                <Link to="/glossary" className="back-link">Назад</Link>
            </div>
        </>
    );
}

export default MindMapPage;
