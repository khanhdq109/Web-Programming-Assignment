import { faRegistered, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect,  useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../../pages/admin/assets/scss/Header.scss'
import { ToastContainer, toast } from 'react-toastify';
import { setUserId,getUserId } from '../AutheUser'

export const MainNav = () => {
    const [user, setUserDetail] = useState(null);
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchUser = async () => {
          if (getUserId() !== undefined) {
            try {
              const response = await fetch(`http://localhost:80/api.php/user/read/${getUserId()}`, {
                method: 'GET',
                credentials: 'include',
              });
    
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
    
              const data = await response.json();
              console.log(data.data[0])
              setUserDetail(data.data[0]); // Update user state only after successful fetch
            } catch (error) {
              console.error('Error fetching user details:', error);
            }
          }
          else{
            setUserDetail(undefined);
          }
        };
    
        fetchUser();
      }, [getUserId()]);


    const handleLogOut = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
      
        try {
          const response = await fetch('http://localhost:80/api.php/auth/logout', {
            method: 'GET',
            credentials: 'include'
          });
          if (response.ok) {
            setUserId(null)
            navigate(`/Guest`);
          } else {
            const errorData = await response.json();
            toast.error('Logout failed! Please check your credentials.', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              toastId: "logoutError", // Optional: unique ID for the alert
            });
            console.error('Logout failed:', errorData);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An unexpected error occurred. Please try again later.');
        }
      };
      console.log(getUserId())
      console.log(user)
    return (
        <div className="header-bottom">
            <div className="container d-flex justify-content-between align-items-center">
                <nav className="header-bottom-nav py-3">
                    <ul className="list-unstyled d-flex align-items-center gap-3 m-0">
                        <li><Link className="header-bottom-nav-link" to="/home">Trang chủ</Link></li>
                        <li><Link className="header-bottom-nav-link" to="/all">Sản phẩm</Link></li>
                        <li><Link className="header-bottom-nav-link" to="/news">Tin tức</Link></li>
                        <li><Link className="header-bottom-nav-link" to="/login">Quản trị viên</Link></li>
                    </ul>
                </nav>
                <div className="header-bottom-auth-btns">
                    {(getUserId() === null || user === undefined || user === null) ? (<>
                        <button>
                            <Link to="/guest/login">
                                <FontAwesomeIcon icon={faRightToBracket} />
                                <span>Đăng nhập</span>
                            </Link>
                        </button>

                    <button>
                        <Link to="/guest/register">
                            <FontAwesomeIcon icon={faRegistered} />
                            <span>Đăng ký</span>
                        </Link>
                    </button></>
                    ):
                    (<>
                        <button>
                            <Link to={`/profile/${getUserId()}`} className="nav-link">
                                <span>{user.fullname}</span>
                            </Link>
                        </button>

                        <button onClick={handleLogOut}>  
                        <FontAwesomeIcon icon={faRightToBracket} />
                            <span>LogOut</span>
                        </button>
                    </>)}
                    
                </div>
            </div>
        </div>
    )
}
