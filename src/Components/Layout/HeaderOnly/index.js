import Header from "~/Components/Layout/components/Header";



function HeaderOnly({children}) {
    return ( 
        <div>
            <Header />
            {children}
        </div>
     );
}

export default HeaderOnly;