"use client";
import Header from "../components/header/header";
import Navbar from "../components/navbar/navbar";
import React, { useState } from 'react';
import './style.css'; 
import "../globals.css";

const UploadSection = () => {
    const [title, setTitle] = useState(''); 
    const [subtitle, setSubtitle] = useState('');
    const [uploadOption, setUploadOption] = useState(''); 
    const [video, setVideo] = useState(null); 
    const [videoLink, setVideoLink] = useState(''); 
    const [text, setText] = useState(''); 
    const [extraFileType, setExtraFileType] = useState('');
    const [extraFile, setExtraFile] = useState(null);
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};
        if (!title) newErrors.title = 'Es necesario un título';
        if (!subtitle) newErrors.subtitle = 'Es necesario un subtítulo';
        if (!uploadOption) newErrors.uploadOption = 'Se requiere una selección';
        if (uploadOption === 'local' && !video) newErrors.video = 'Se requiere el archivo';
        if (uploadOption === 'web' && !videoLink) newErrors.videoLink = 'Es necesario el link';
        if (!text) newErrors.text = 'Texto requerido';
        return newErrors;
    };

    const handleSave = () => {
        const fieldErrors = validateFields();
        if (Object.keys(fieldErrors).length === 0) {
            
            console.log('Guardadito :v :', { title, subtitle, uploadOption, video, videoLink, text, extraFileType, extraFile });
            // LOGIC DE GUARDADO CHICO BACKEND :v plis
            setTitle('');
            setSubtitle('');
            setUploadOption('');
            setVideo(null);
            setVideoLink('');
            setText('');
            setExtraFileType('');
            setExtraFile(null);
            setErrors({});
        } else {
            setErrors(fieldErrors);
        }
    };

    return (
        <div>
            <Header />
            <Navbar />
            <div className="container">
                <h2>Cursos</h2>
            </div>
            <div className="upload-section">
                <div className="upload-container">
                    <input 
                        type="text" 
                        placeholder="Título" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    {errors.title && <p className="error-message">{errors.title}</p>}
                    
                    <input 
                        type="text" 
                        placeholder="Subtítulo" 
                        value={subtitle} 
                        onChange={(e) => setSubtitle(e.target.value)} 
                    />
                    {errors.subtitle && <p className="error-message">{errors.subtitle}</p>}
                    
                    <div className="upload-options">
                        <label>
                            <input 
                                type="radio" 
                                value="local" 
                                checked={uploadOption === 'local'} 
                                onChange={(e) => setUploadOption(e.target.value)} 
                            />
                            Video local
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="web" 
                                checked={uploadOption === 'web'} 
                                onChange={(e) => setUploadOption(e.target.value)} 
                            />
                            Link Video
                        </label>
                    </div>
                    {errors.uploadOption && <p className="error-message">{errors.uploadOption}</p>}

                    {uploadOption === 'local' && (
                        <>
                            <input 
                                type="file" 
                                accept="video/*"
                                onChange={(e) => setVideo(e.target.files[0])} 
                            />
                            {errors.video && <p className="error-message">{errors.video}</p>}
                        </>
                    )}

                    {uploadOption === 'web' && (
                        <>
                            <input 
                                type="text" 
                                placeholder="Link del video" 
                                value={videoLink} 
                                onChange={(e) => setVideoLink(e.target.value)} 
                            />
                            {errors.videoLink && <p className="error-message">{errors.videoLink}</p>}
                        </>
                    )}

                    <textarea
                        placeholder="Texto..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    {errors.text && <p className="error-message">{errors.text}</p>}

                    <select value={extraFileType} onChange={(e) => setExtraFileType(e.target.value)}>
                        <option value="">Archivo (opcional)</option>
                        <option value="image">Imagen</option>
                        <option value="pdf-word">PDF/Word</option>
                    </select>

                    {extraFileType && (
                        <>
                            <input 
                                type="file" 
                                accept={extraFileType === 'image' ? 'image/*' : 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'}
                                onChange={(e) => setExtraFile(e.target.files[0])} 
                            />
                            {extraFileType === 'image' && extraFile && (
                                <p>Imagen seleccionada: {extraFile.name}</p>
                            )}
                            {extraFileType === 'pdf-word' && extraFile && (
                                <p>Archivo seleccionado: {extraFile.name}</p>
                            )}
                        </>
                    )}
                </div>
                <button className="save-button" onClick={handleSave}>
                    Guardar
                </button>
            </div>
        </div>
    );
};

export default UploadSection;