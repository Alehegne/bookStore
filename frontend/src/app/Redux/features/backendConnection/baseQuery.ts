export default function baseQuery(){

    return (
        process.env.NODE_ENV === "development" ? "http://localhost:5000/api/books" : process.env.REACT_APP_BACKEND_URL
    );
}