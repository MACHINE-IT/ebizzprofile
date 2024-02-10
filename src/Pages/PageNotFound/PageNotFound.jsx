import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'

const PageNotFound = () => {
    return (
        <>
            <Header />
            <div style={{ marginTop: '7em' }}>
                No Page Found. Please check your route :/
            </div>
            <Footer />
        </>
    )
}

export default PageNotFound