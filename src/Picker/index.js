import React from "react";
import { Link } from 'react-router-dom';
import { blogdata } from '../blogdata';
import { ModalHelp } from '../Modal';
import museolili from '../InputCodigo/resources/museolili.png';
import './picker.css';

import { useMyContext } from '../SeleccionCargando/MyContext';


import logoGuia from './logos/logoGuia.png';
import logoHuaquero from './logos/logoHuaquero.png';
import logoInterprete from './logos/logoInterprete.png';
import logoAntropologo from './logos/logoAntropologo.png';
import logoGuiaBN from '../SeleccionCargando/logos/logoGuiaBN.png';
import logoHuaqueroBN from '../SeleccionCargando/logos/logoHuaqueroBN.png';
import logoInterpreteBN from '../SeleccionCargando/logos/logoInterpreteBN.png';
import logoAntropologoBN from '../SeleccionCargando/logos/logoAntropologoBN.png';

function Picker() {
    const [userData, setUserData] = useState({
        _id: "",
        name: "",
        identification: "",
        email: "",
        rol: "",
        finalizadaTarea: "false",
        tipoUsuario: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserData(); // asssuming this function fetches user data
                if (data) {
                    setUserData(data);
                    console.log('User data set:', data);
                } else {
                    console.error('No user data received');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData(); // invoke the function to fetch and set user data
    }, []);

    const userId = localStorage.getItem("userId"); // ID from local storage
    const getUserData = async () => {
        try {
            const response = await axios.get("/users"); // Adjusted the endpoint
            const users = response.data;
            const user = users.find((u) => u._id === userId); // Assuming each user object has an _id field
            if (user) {
                return user;
            } else {
                console.error("User not found");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    return (
        <>
            <div className="divPicker">
                <h1>Escoge tu rol</h1>
                <ul>
                    {blogdata.map(post => (
                        <IntroduccionRol post={post} key={post.slug} />
                    ))}
                </ul>
                <img className="imglogo" src={museolili} alt="Logo del museo lili" />
            </div>
        </>
    );
}

function IntroduccionRol({ post }) {

    const {
        esGuia,
        setEsGuia,
        esHuaquero,
        setEsHuaquero,
        esInterprete,
        setEsInterprete,
        esAntropologo,
        setEsAntropologo,
    } = useMyContext();

    // Define the logo variable based on the role
    let logo;


    let isDisabled = false;

    if (post.rol === "Guía") {
        logo = !esGuia ? logoGuia : logoGuiaBN;
        if (logo === logoGuiaBN) {
            isDisabled = true;
        }
    } else if (post.rol === "Huaquero") {
        logo = !esHuaquero ? logoHuaquero : logoHuaqueroBN;
        if (logo === logoHuaqueroBN) {
            isDisabled = true;
        }
    } else if (post.rol === "Intérprete") {
        logo = !esInterprete ? logoInterprete : logoInterpreteBN;
        if (logo === logoInterpreteBN) {
            isDisabled = true;
        }
    } else if (post.rol === "Antropólogo") {
        logo = !esAntropologo ? logoAntropologo : logoAntropologoBN;
        if (logo === logoAntropologoBN) {
            isDisabled = true;
        }
    } else {
        // Proporciona un logotipo predeterminado en caso de que el rol no coincida con ninguno de los anteriores
        logo = logoInterprete;
    }

    // Ahora puedes usar la variable isDisabled según tus necesidades.




    console.log(`post.rol: ${post.rol}`); // Add this line for debugging purposes


    return (
        <>
            <li>
                {/* Use the selected logo */}
                {
                    isDisabled ? (
                        <a className={`txtRoles linkRoles disabled-link`} disabled>
                            <img className="logos" src={logo} alt={`Logo ${post.rol}`} />
                            {post.rol}
                        </a>
                    ) : (
                        <Link className={`txtRoles linkRoles`} to={`/introduccion/${post.slug}`}>
                            <img className="logos" src={logo} alt={`Logo ${post.rol}`} />
                            {post.rol}
                        </Link>
                    )
                }
            </li>
        </>
    );
}

export { Picker };


