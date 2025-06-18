'use client';

import React from 'react';
import { FaGithub, FaEnvelope, FaCode } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-1 text-center">
      <div className="container-fluid">
        <div className="row align-items-center">
          <h3 className="h5">Crafted by Asim Sheikh</h3>

          <div className="d-flex justify-content-center align-items-center gap-5 flex-wrap mt-3">
            <a 
              href="mailto:asmsheikh123@gmail.com" 
              className="text-decoration-none text-white hover-primary"
            >
              <FaEnvelope className="me-2" />
              asmsheikh123@gmail.com
            </a>

            <a 
              href="https://amazingasim.github.io/portfolio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-decoration-none text-white hover-primary"
            >
              <FaCode className="me-2" />
              My Portfolio
            </a>

            <a 
              href="https://github.com/amazingasim" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-decoration-none text-white hover-primary"
            >
              <FaGithub className="me-2" />
              GitHub
            </a>
          </div>
        </div>

        <div className="border-top border-white mt-4 pt-4 text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} All rights reserved. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
