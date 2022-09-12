import Head from 'next/head';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { isEmpty } from 'lodash';
import {NavbarMain} from 'styles/NavbarMain.styled'

// import { BurgerIcon, TailwindIcon, Bag, User, Wishlist } from '../../icons';
import { FaBeer, FaHamburger, FaWind, FaShoppingBag, FaUserCircle,  } from 'react-icons/fa';
import { GiFallingStar } from 'react-icons/gi'
import { AppContext } from 'components/Context';

const Header = ( { data } ) => {

  console.log(data);
	
	const [ cart, setCart ] = useContext( AppContext );
	const { headerMenuItems, siteDescription, siteLogoUrl, siteTitle, favicon } = data || {};
	
	const [ isMenuVisible, setMenuVisibility ] = useState( false );
	
	return (
		<>
      <Head>
        <title>{ siteTitle || 'There\'s a Will There\'s a Website' }</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href={ favicon || '/favicon.ico' }/>
      </Head>

			<header className="header">

				<NavbarMain className="main">
						<div className="Logo flex items-center flex-shrink-0 text-black mr-20">
							<Link href="/">
								<a>
									{
										siteLogoUrl ? (
											<img src={ siteLogoUrl } alt={ `${ siteTitle } logo` }
											     width="86"
											     height="86"/>
										) : <FaWind/>
									}
								</a>
							</Link>

							<span>
								<Link href="/">
									<a >{ siteTitle || 'There\'s a Will There\'s a Website' }</a>
								</Link>
								{ siteDescription ? <p>{ siteDescription }</p> : null }
							</span>
						</div>


						<div className="block lg:hidden">
							<button
								onClick={ () => setMenuVisibility( ! isMenuVisible ) }
								className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black">
								<FaHamburger className="fill-current h-3 w-3"/>
							</button>
						</div>

            
						<div
							className={ `${ isMenuVisible ? 'max-h-full' : 'h-0' } overflow-hidden w-full lg:h-full block flex-grow lg:flex lg:items-center lg:w-auto` }>
							<ul className="menu main">
								{ ! isEmpty( headerMenuItems ) && headerMenuItems.length ? headerMenuItems.map( menuItem => (
                  <li>
                    <Link key={ menuItem?.ID } href={ menuItem?.url ?? '/' }>
                      <a dangerouslySetInnerHTML={ { __html: menuItem.title } }/>
                    </Link>
                  </li>
								) ) : null }
							</ul>

							<ul className="menu util">
                <li>
                  <a href="#responsive-header"
                    className="flex mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
                    <span className="flex flex-row items-center lg:flex-col">
                      <FaUserCircle className="mr-1 lg:mr-0"/>
                      Profile
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#responsive-header"
                    className="flex mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
                    <span className="flex flex-row items-center lg:flex-col">
                      <GiFallingStar className="mr-1 lg:mr-0"/>
                      Wishlist
                    </span>
                  </a>
                </li>
                <li>
                  <Link href="/cart">
                    <a className="flex mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
                    <span className="flex flex-row items-center lg:flex-col">
                      <FaShoppingBag className="mr-1 lg:mr-0"/>
                      <span className="ml-1">Bag{ cart?.totalQty ? `(${cart?.totalQty})` : null }</span>
                    </span>
                    </a>
                  </Link>
                </li>
							</ul>

						</div>
				</NavbarMain>

			</header>
		</>
	);
};

export default Header;