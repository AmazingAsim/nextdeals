'use client'; // Required for client-side interactivity

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [storeList, setStoreList] = useState([]);
  const [categoryList, setCategoryList] = useState(['fashion', 'electronics', 'books']);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Using environment variable

 const handleClose = async () => {
  if (typeof window !== 'undefined') {
    const { Offcanvas } = await import('bootstrap');
    const sidebarElement = document.getElementById('kasim');
    const sidebar = Offcanvas.getInstance(sidebarElement) || new Offcanvas(sidebarElement);
    sidebar.hide();
  }
};


  async function getAllCategories() {
    try {
      let res = await fetch(`${baseUrl}/product_api/list-category.php`);
      let data = await res.json();
      let List = data.map((item) => item.category);
      setCategoryList(List);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchStoreName() {
    try {
      let res = await fetch(`${baseUrl}/product_api/list-storename.php`);
      let data = await res.json();
      let storelistdata = data.map((item) => item.store_name);
      setStoreList(storelistdata);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSearch(e) {
    setSearch(e.target.value);
    if (e.key === 'Enter') {
      router.push(`/products/${e.target.value}`);
    }
  }

  function handleSearchClick() {
    router.push(`/products/${search}`);
  }

  useEffect(function () {
    fetchStoreName();
    getAllCategories();
  }, []);

  return (
    <div className="sticky-top bg-white">
      <nav className="navbar navbar-expand-md navbar-light bg-white border border-bottom p-2">
        <Link className="navbar-brand fw-bold fs-3 text-primary" href="/">
          <span> DealsfromAmerica</span>
        </Link>
        <button className="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#kasim">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="asim">
          <ul className="navbar-nav ms-auto">
            <div id="searchbox">
              <input 
                type="text" 
                placeholder="Search deals" 
                id="searchinput" 
                onKeyDown={handleSearch} 
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button className="btn" onClick={handleSearchClick}>
                <i className="fa-solid fa-magnifying-glass text-primary fw-bold"></i>
              </button>
            </div>

            <li className="nav-item">
              <Link className="nav-link" href="/">Home</Link>
            </li>
           
            <li className="nav-item">
              <Link className="nav-link" href="https://www.theblackfriday.com/weekly-ads" target="_blank">Weekly Ads</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/feedback">Feedback</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/suggestions">Suggestion</Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="kasim">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">DealsfromAmerica.com</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <ul className="navbar-nav m-3">
          <div id="searchbox">
            <input 
              type="text" 
              placeholder="Search deals" 
              id="searchinput" 
              onKeyDown={handleSearch}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button className="btn" onClick={handleSearchClick}>
              <i className="fa-solid fa-magnifying-glass text-primary fw-bold"></i>
            </button>
          </div>

          <li className="nav-item">
            <Link className="nav-link" href="/" onClick={handleClose}>Home</Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" href="https://www.theblackfriday.com/weekly-ads" target="_blank" onClick={handleClose}>Weekly Ads</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/freebies" onClick={handleClose}>Freebies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/travel_deals" onClick={handleClose}>Travel Deals</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/feedback" onClick={handleClose}>Feedback</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/suggestions" onClick={handleClose}>Suggestion</Link>
          </li>
        </ul>

        <div className="p-3">
          {storeList.map((item) => (
            <Link 
              className="btn btn-outline-primary btn-sm rounded-4 mx-2 mb-2" 
              href={`/store/${item}`} 
              key={item} 
              onClick={handleClose}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="p-3">
          {categoryList.map((item) => (
            <Link 
              className="btn btn-outline-primary btn-sm rounded-4 mx-2 my-2" 
              href={`/category/${item}`} 
              key={item} 
              onClick={handleClose}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      <nav className="p-1 shadow-sm px-5 navbar-expand-md py-3">
        <div className="collapse navbar-collapse" id="asim">
          <div className="hscroll">
            {storeList.map((item) => (
              <div key={item}>
                <Link className="btn btn-outline-primary btn-sm rounded-4 mx-2" href={`/store/${item}`}>
                  {item}
                </Link>
              </div>
            ))}

            {categoryList.map((item) => (
              <div key={item}>
                <Link className="btn btn-outline-primary btn-sm rounded-4 mx-2" href={`/category/${item}`}>
                  {item}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}