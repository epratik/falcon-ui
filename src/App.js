
// import './App.css';
// import React,{ useEffect, useState } from 'react';
// import page1 from './data.json'
// import page2 from './page2.json'
// import Post from './components/Post'
// import InfiniteScroll from 'react-infinite-scroll-component';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import PageLayout from './components/PageLayout';


function App() {

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   setData(page1);
  // }, [])
  
  return (

     <PageLayout>  </PageLayout>

    // <InfiniteScroll
    //   dataLength={data.length}
    //   next={() => {
    //     setData(page1.concat(page2))
    //   }}
    //   hasMore={true}
    //   loader={<h4>Loading...</h4>}>
    //   {
    //     data.map((item) => {
    //       return (
    //         <Post item={item}> </Post>
    //       );
    //     })
    //   }
    // </InfiniteScroll>
  );
}

// class App extends React.Component
// {
//   render() {
//     return <h1>Hello from a class</h1>
//   }
// }
export default App;
