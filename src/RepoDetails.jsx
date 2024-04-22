import { FaRegStar, FaRegEye, FaCodeBranch } from 'react-icons/fa';
import { TbGitFork } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function RepoDetails() {

  const { id } = useParams()
  const [details, setDetails] = useState({})
  const [branch, setBranch] = useState({})
  const [deployment, setDeployment] = useState({})
 
  useEffect(() => {
    fetch(`https://api.github.com/repos/azlink252/${id}`, {
      // headers: {
      //   Authorization: `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`
      // },
    })
    .then((response) => (response.json()))
    .then((data) => {
      setDetails(data)
    })
  }, []) 

  useEffect(() => {
    fetch(`https://api.github.com/repos/azlink2952/${id}/branches`, {
      // headers: {
      //   Authorization: `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`
      // },
    })
    .then((response) => (response.json()))
    .then((data) => {
      setBranch(data)
    })
  }, []) 

  useEffect(() => {
    fetch(`https://api.github.com/repos/azlink2952/${id}/deployments`, {
      // headers: {
      //   Authorization: `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`
      // },
    })
    .then((response) => (response.json()))
    .then((data) => {
      setDeployment(data)
    })
  }, []) 

  return (
    <div id="repodetail">
        <div className="repodetail-card">
            <h2 className="repo-name">{details.name}</h2>
            <div className="repo-mini-details">
              <p><FaRegStar className="icons" /> Stars: {details.stargazers_count}</p>
              <p><FaRegEye className="icons" /> Watch: {details.watchers}</p>
              <p><TbGitFork className="icons" /> Forks: {details.forks}</p>
              <p><FaCodeBranch className="icons" /> Branches: {branch.length}</p>
            </div>
            <p>Main Language: {details.language === null ? "none": details.language}</p>
            <p>Live site: {deployment.length === 0 ? `none` : <a href={`https://azlink2952.github.io/${details.name}`}>azlink2952.github.io/{details.name}</a>}</p>
            <p><a href={`https://github.com/${details.full_name}`}>View on Github</a></p>
        </div>
    </div>
  )
}

export default RepoDetails