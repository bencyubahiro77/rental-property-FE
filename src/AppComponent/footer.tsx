const footer = () => {
    const Year = new Date().getFullYear();
    return (
        <>
            <footer className="text-center h-20 items-center justify-center flex border-t-2 border-gray-200 mr-16 ml-16">
                <p>COPYRIGHT © {Year} BENO RENTAL  BOOKING PROPERTY</p>
            </footer>
        </>
    )
}

export default footer