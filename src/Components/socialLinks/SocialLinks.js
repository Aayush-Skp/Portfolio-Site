import React, { useState } from 'react';
import './SocialLinks.css';
import { FaGithub, FaLinkedin, FaTimes, FaUserPlus } from 'react-icons/fa';

const SocialLinks = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const socialLinks = [
        {
            name: 'GitHub',
            icon: <FaGithub />,
            url: 'https://github.com/Aayush-Skp',
            color: '#24292e'
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin />,
            url: 'https://www.linkedin.com/in/krishna-panthi/',
            color: '#0077b5'
        }
    ];

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`social-links-container ${isExpanded ? 'expanded' : ''}`}>
            {isExpanded && (
                <div className="social-links-menu">
                    <div className="social-links-header">
                        <FaUserPlus />
                        <span>Connect With Me</span>
                    </div>
                    <div className="social-links-items">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link-item"
                                style={{ '--link-color': link.color }}
                                aria-label={`Visit my ${link.name} profile`}
                            >
                                <span className="social-icon">{link.icon}</span>
                                <span className="social-name">{link.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
            <button
                className="social-links-toggle"
                onClick={toggleExpand}
                aria-label={isExpanded ? 'Close social links' : 'Open social links'}
            >
                {isExpanded ? <FaTimes /> : <FaUserPlus />}
            </button>
        </div>
    );
};

export default SocialLinks;

