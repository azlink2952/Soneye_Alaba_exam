import "../src/styles/index.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home() {   
  const [user, setUser] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showViewMore, setShowViewMore] = useState("")
  const [picture, setPicture] = useState('')
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("");
  const [repoName, setRepoName] = useState('');
  const [repoDescription, setRepoDescription] = useState('');
  const [repoId, setRepoId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  

  const fetchRepos = () => {
    fetch(`https://api.github.com/users/azlink2952/repos?per_page=6&page=${currentPage}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`,
      },})
    .then((response) => (response.json()))
    .then((data) => {
      if (data.length === 0) {
        setShowViewMore("End of Repos")
      }else {
        setUser([...user, ...data])
        setShowViewMore("View More")
      }
    })
  }

  useEffect(() => {
    fetchRepos()
  }, [currentPage]) 

  useEffect(() => {
    fetch('https://api.github.com/users/azlink2952', {
      headers: {
        Authorization: `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },})
      .then(response => response.json())
      .then(data => setPicture(data.avatar_url));
  }, []);

  const viewMore = () => {
    setCurrentPage(currentPage + 1)
  };

  const filterRepos = (repo) => {
    return (
      (languageFilter === "" || repo.language === languageFilter) &&
      (visibilityFilter === "" || repo.visibility === visibilityFilter) &&
      (searchTerm === "" ||
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };
    const createRepo = () => {
      fetch('https://api.github.com/users/azlink2952', {
        method: 'POST',
        headers: {
          Authorization: `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: repoName,
          description: repoDescription
        })
      })
      .then(response => response.json())
      .then(data => {
        setRepoId(data.id);
        setIsEditing(true);
      })
      .catch(error => {
        console.error(error);
      });
    };
  
    const updateRepo = () => {
      fetch(`https://api.github.com/users/azlink2952`, {
        method: 'PATCH',
        headers: {
          Authorization: `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: repoName,
          description: repoDescription
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    };
  
    const deleteRepo = () => {
      fetch(`https://api.github.com/users/azlink2952`, {
        method: 'DELETE',
        headers: {
          Authorization: `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        setRepoId(null);
        setIsEditing(false);
      })
      .catch(error => {
        console.error(error);
      });
    };





const userElements = user.filter(filterRepos).map((userElement) => {
    return (
        <div className="repo-card" key={userElement.id}>
          <div><img src={picture} alt="Profile Picture" /></div>
           <div><Link to={`/repodetails/${userElement.name}`}><h2 className="repo-name">{userElement.name}</h2></Link>
            <p className="language">Langauge: {userElement.language === null ? "none" : userElement.language}</p>
            <p className="date">Start date & time: {userElement.created_at}</p>
            <p className="visibility">Visibility: {userElement.visibility}</p></div>
        </div>
    )
})
  

    return (
      <>
      <div className="filter-container" style={{ boxShadow: '2px 4px 0px rgb(114, 101, 235)', textAlign: "center" }}>
        <div className="dule">
        <input className="put"
          type="text"
          placeholder="Search repo name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /></div>
        <div className="sel1">
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
        >
          <option value="">Filter by Language</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="Javascript">JavaScript</option>
          <option value="React">React</option>
        </select></div>
        <select
          value={visibilityFilter}
          onChange={(e) => setVisibilityFilter(e.target.value)}
        >
          <option value="">Filter by Visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <div className="pros">
      <input
        type="text"
        value={repoName}
        onChange={e => setRepoName(e.target.value)}
        placeholder="Repository name"
      />
      <input
        type="text"
        value={repoDescription}
        onChange={e => setRepoDescription(e.target.value)}
        placeholder="Repository description"
      />
      
      <button onClick={createRepo}>Create Repository</button>
          <button onClick={updateRepo}>Update Repository</button>
          <button onClick={deleteRepo}>Delete Repository</button>
        
      
        
      
    </div>
        
        <section className="repo-container">
            {userElements}
        </section>
        <p className="view-more" onClick={viewMore}><button>{showViewMore}</button></p>
      </>
    )
}


export default Home