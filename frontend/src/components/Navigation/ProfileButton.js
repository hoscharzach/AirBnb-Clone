import './navigation.css'

export default function ProfileButton ({showMenu, setShowMenu, user}) {
    return (
        <div className="profile-button">
            <i className="fas fa-user-circle" onClick={(e) => {
                showMenu === false ? setShowMenu(true) : setShowMenu(false)
                console.log(user)
            }}></i>
            {showMenu && <div>
                <p>Dropdown Menu</p>
                <ul>
                    <li>Username: {user.username}</li>
                    <li>Email: {user.email}</li>
                </ul>
                </div>}
        </div>
    )
}
